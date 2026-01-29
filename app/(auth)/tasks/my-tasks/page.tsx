"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import {
  useCompleteTaskMutation,
  useGetMyTasksQuery,
} from "@/redux/features/tasks/tasksApi";

const WAIT_SECONDS = 5;

// ✅ public folder এ কয়েকটা fallback রাখুন:
// /public/fallback/task1.jpg
// /public/fallback/task2.jpg
// /public/fallback/task3.jpg
const LOCAL_FALLBACK_POOL = [
  "/fallback/task1.jpg",
  "/fallback/task2.jpg",
  "/fallback/task3.jpg",
];

function getCandidateUrls(task: any) {
  const list: string[] = [];

  // ✅ NEW: backend now supports urls[]
  if (Array.isArray(task?.urls)) list.push(...task.urls);
  if (Array.isArray(task?.images)) list.push(...task.images);

  // legacy keys
  if (task?.url) list.push(task.url);
  if (task?.image) list.push(task.image);
  if (task?.img) list.push(task.img);
  if (task?.photo) list.push(task.photo);
  if (task?.thumbnail) list.push(task.thumbnail);
  if (task?.icon) list.push(task.icon);

  // clean + unique
  const cleaned = list
    .filter(Boolean)
    .map(String)
    .filter((s) => s.trim().length > 0);

  return Array.from(new Set(cleaned));
}

export default function MyTasksPage() {
  const router = useRouter();

  // load user
  useLoadUserQuery();
  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading, isFetching, refetch } = useGetMyTasksQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const message = data?.message;
  const dailyTasks = data?.dailyTasks || null;

  const tasks = Array.isArray(dailyTasks?.tasks) ? dailyTasks.tasks : [];

  // ✅ pending = completed != true
  const pendingTasks = useMemo(
    () => tasks.filter((t: any) => !t?.completed),
    [tasks],
  );

  const completedCount = tasks.length - pendingTasks.length;

  // One-by-one player state
  const [index, setIndex] = useState(0);

  // Image/URL fallback state
  const [imgSrc, setImgSrc] = useState<string>("");
  const [srcIndex, setSrcIndex] = useState<number>(0);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(WAIT_SECONDS);
  const [canSubmit, setCanSubmit] = useState(false);

  const intervalRef = useRef<any>(null);

  const currentTask = pendingTasks[index] || null;

  // ✅ candidates (urls) for current task
  const candidates = useMemo(() => {
    if (!currentTask) return [];
    const arr = getCandidateUrls(currentTask);
    return arr;
  }, [currentTask]);

  // ✅ when task changes, reset image selection
  useEffect(() => {
    if (!currentTask) {
      setImgSrc("");
      setSrcIndex(0);
      setImgLoaded(false);
      return;
    }

    setImgLoaded(false);

    // if candidate urls exist, pick random start
    if (candidates.length > 0) {
      const start = Math.floor(Math.random() * candidates.length);
      setSrcIndex(start);

      const u = candidates[start];
      // cache-bust: prevent stuck cached broken response
      const busted = `${u}${u.includes("?") ? "&" : "?"}v=${Date.now()}`;
      setImgSrc(busted);
    } else {
      // fallback local pool
      const f =
        LOCAL_FALLBACK_POOL[
          Math.floor(Math.random() * LOCAL_FALLBACK_POOL.length)
        ];
      setSrcIndex(0);
      setImgSrc(f);
    }
  }, [currentTask, candidates]);

  // ✅ timer starts ONLY after image is loaded
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!currentTask) {
      setTimeLeft(0);
      setCanSubmit(false);
      return;
    }

    if (!imgLoaded) {
      setTimeLeft(WAIT_SECONDS);
      setCanSubmit(false);
      return;
    }

    setTimeLeft(WAIT_SECONDS);
    setCanSubmit(false);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentTask, imgLoaded]);

  // ✅ preload next task image (first candidate) for smooth UX
  useEffect(() => {
    const next = pendingTasks[index + 1];
    if (!next) return;

    const nextCandidates = getCandidateUrls(next);
    const nextSrc =
      nextCandidates[0] ||
      LOCAL_FALLBACK_POOL[
        Math.floor(Math.random() * LOCAL_FALLBACK_POOL.length)
      ];

    if (nextSrc) {
      const img = new window.Image();
      img.src = `${nextSrc}${nextSrc.includes("?") ? "&" : "?"}pre=1`;
    }
  }, [pendingTasks, index]);

  const [completeTask, { isLoading: completing }] = useCompleteTaskMutation();

  // ✅ handle image error => try next candidate url => then local fallback
  const handleImgError = () => {
    setImgLoaded(false);

    // try next candidate
    const nextIndex = srcIndex + 1;
    if (candidates[nextIndex]) {
      setSrcIndex(nextIndex);
      const u = candidates[nextIndex];
      setImgSrc(`${u}${u.includes("?") ? "&" : "?"}v=${Date.now()}`);
      return;
    }

    // no more candidates => local fallback
    const fallback =
      LOCAL_FALLBACK_POOL[
        Math.floor(Math.random() * LOCAL_FALLBACK_POOL.length)
      ];
    setImgSrc(fallback);
  };

  const onComplete = async () => {
    try {
      if (!currentTask) return;

      const taskId = String(currentTask?._id || currentTask?.id || "").trim();
      if (!taskId) {
        toast.error("Task id missing");
        return;
      }

      if (!canSubmit) return;

      // ✅ Optimistic UI: immediately move to next while server updates
      setCanSubmit(false);

      await completeTask({ taskId }).unwrap();
      toast.success("Task completed ✅");

      // ✅ refresh server truth
      await refetch();

      // stay index safe (pending list shrinks)
      setIndex((prev) => prev);

      router.refresh?.();
    } catch (e: any) {
      toast.error(e?.data?.message || e?.message || "Failed to complete task");
      // on failure, allow retry if timer done
      if (imgLoaded && timeLeft === 0) setCanSubmit(true);
    }
  };

  // if pendingTasks shrink below current index => reset
  useEffect(() => {
    if (index >= pendingTasks.length) setIndex(0);
  }, [pendingTasks.length, index]);

  const total = tasks.length;
  const pending = pendingTasks.length;

  // ✅ button progress (wait bar)
  const waitProgress = imgLoaded
    ? ((WAIT_SECONDS - timeLeft) / WAIT_SECONDS) * 100
    : 0;

  return (
    <div className="px-3 md:px-6 py-4 text-gray-100">
      {/* Header */}
      <div className="max-w-2xl mx-auto space-y-2 text-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Balance: {Number(user?.m_balance || 0).toFixed(2)}$
        </h1>

        <div className="text-sm opacity-80 flex items-center justify-center gap-4">
          <span>Total: {total}</span>
          <span>Completed: {completedCount}</span>
          <span>Pending: {pending}</span>
        </div>

        {message && <p className="text-sm text-yellow-300">{message}</p>}
      </div>

      {/* Loader */}
      {(isLoading || isFetching) && (
        <div className="flex justify-center mt-6">
          <PulseLoader color="#fff" size={10} />
        </div>
      )}

      {/* Main */}
      {!isLoading && !isFetching && (
        <div className="max-w-2xl mx-auto mt-6">
          {!dailyTasks ? (
            <div className="bg-black/20 border border-white/10 rounded-xl p-5 text-center">
              <p className="opacity-80">No daily tasks for today.</p>
            </div>
          ) : !currentTask ? (
            <div className="bg-black/20 border border-white/10 rounded-xl p-5 text-center space-y-3">
              <p className="text-lg font-semibold">All tasks completed ✅</p>

              {dailyTasks?.is_completed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/done.gif"
                  alt="done"
                  className="mx-auto rounded-lg w-full h-auto"
                />
              )}

              <button
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                Refresh
              </button>
            </div>
          ) : (
            <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden">
              {/* Image */}
              <div className="relative w-full">
                {imgSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgSrc}
                    alt="task"
                    className="w-full h-[240px] md:h-[360px] object-cover"
                    onLoad={() => setImgLoaded(true)}
                    onError={handleImgError}
                  />
                ) : (
                  <div className="w-full h-[240px] md:h-[360px] flex items-center justify-center bg-white/5">
                    <span className="text-sm opacity-70">Loading image...</span>
                  </div>
                )}

                {/* Progress badge */}
                <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-full text-xs">
                  Task {completedCount + 1} / {total || 0}
                </div>

                {/* Countdown badge */}
                <div className="absolute top-3 right-3 bg-black/60 px-3 py-1 rounded-full text-xs">
                  {canSubmit
                    ? "Ready ✅"
                    : imgLoaded
                      ? `Wait: ${timeLeft}s`
                      : "Loading..."}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 space-y-3">
                {/* overall progress bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-2 bg-purple-400"
                    style={{
                      width:
                        total > 0 ? `${(completedCount / total) * 100}%` : "0%",
                    }}
                  />
                </div>

                {/* Submit button with wait progress */}
                <button
                  onClick={onComplete}
                  disabled={!canSubmit || completing}
                  className={`w-full py-3 rounded-xl font-bold text-lg transition relative overflow-hidden
                    ${
                      !canSubmit || completing
                        ? "bg-white/10 opacity-80 cursor-not-allowed"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                >
                  {!canSubmit ? (
                    <div className="relative w-full">
                      <div className="absolute inset-0 bg-white/10" />
                      <div
                        className="absolute inset-y-0 left-0 bg-purple-500/60"
                        style={{ width: `${waitProgress}%` }}
                      />
                      <span className="relative z-10">
                        {imgLoaded
                          ? `Please wait: ${timeLeft}s`
                          : "Loading image..."}
                      </span>
                    </div>
                  ) : (
                    <span>{completing ? "Submitting..." : "Submit "}</span>
                  )}
                </button>

                {/* optional controls */}
                <div className="flex items-center justify-between text-xs opacity-70">
                  <button
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10"
                    onClick={() => refetch()}
                  >
                    Refresh
                  </button>

                  <button
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10"
                    onClick={() =>
                      setIndex((p) => (p + 1 < pendingTasks.length ? p + 1 : p))
                    }
                    disabled={pendingTasks.length <= 1}
                  >
                    Next (optional)
                  </button>
                </div>

                {/* ✅ English text */}
                <p className="text-xs opacity-60 text-center">
                  After viewing the image for 5 seconds, the Submit button will
                  appear. Then, when you click it, the task will be completed.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
