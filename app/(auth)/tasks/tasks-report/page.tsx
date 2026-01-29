"use client";
import mData from "@/lib/mock_data.json";
import { useMemo } from "react";

import TasksReportTable from "@/components/Tasks/TasksReportTable";
import { useGetTasksReportQuery } from "@/redux/features/tasks/tasksApi";

const TasksReport = () => {
  const {
    data: tasksData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTasksReportQuery(undefined);
  const { tasksReports } = tasksData || [];

  const data = useMemo(() => mData, []);
  const columns = [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Tasks Value",
      accessor: "tasks_value",
    },
    {
      Header: "Total Earning",
      accessor: "total_earning",
    },
  ];

  return (
    <div className=" px-4 py-6 ">
      <h1 className=" text-center text-gray-200">Tasks Report</h1>
      <div className="my-4">
        <TasksReportTable data={tasksReports} />
      </div>
    </div>
  );
};

export default TasksReport;
