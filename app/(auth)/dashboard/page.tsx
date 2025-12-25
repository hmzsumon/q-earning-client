"use client";

import ItemCard from "@/components/Dashboard/ItemCard";
import { formatBalance } from "@/lib/functions";
import { useGetDashboardQuery } from "@/redux/features/auth/authApi";
import confetti from "canvas-confetti";
import { Button, Card, Modal, ModalBody, ModalHeader } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFilterCircleDollar, FaHandHoldingDollar } from "react-icons/fa6";
import { PiDownloadSimpleBold, PiWarningLight } from "react-icons/pi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useGetDashboardQuery(undefined);
  const { dashboardData } = data || {};
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    if (!openModal) return;

    // Confetti burst when modal opens
    const end = Date.now() + 900;

    const frame = () => {
      confetti({
        particleCount: 8,
        spread: 70,
        startVelocity: 35,
        origin: { x: 0.2, y: 0.2 },
      });

      confetti({
        particleCount: 8,
        spread: 70,
        startVelocity: 35,
        origin: { x: 0.8, y: 0.2 },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, [openModal]);

  return (
    <div className="z-0 px-2">
      <div className="py-4">
        {/* if user is_p_expired */}
        {user?.is_p_expired && (
          <Card className="w-full bg-red-100 border border-red-400 shadow-md my-4 p-2">
            <div className="flex items-center gap-4">
              <PiWarningLight className="text-3xl text-red-600" />
              <div>
                <h2 className="text-lg font-semibold text-red-700">
                  Your Package Has Expired!
                </h2>
                <p className="text-sm text-red-600">
                  To continue earning, please purchase a new package.
                </p>
              </div>
            </div>

            {/* Display Total Earnings & Investment */}
            <div className="mt-3 p-3 bg-white rounded-md shadow-sm border">
              <p className="text-gray-700 font-medium">
                💰 <span className="font-semibold">Total Earnings:</span> $
                {dashboardData?.total_earning?.toFixed(2)}
              </p>
              <p className="text-gray-700 font-medium">
                📊 <span className="font-semibold">Total Investment:</span> $
                {dashboardData?.total_investment?.toFixed(2)}
              </p>
            </div>

            {/* Buy New Package Button */}
            <div className="mt-3 flex justify-end">
              <Link href="/investment">
                <Button className="bg-red-600 text-white hover:bg-red-700">
                  Buy New Package
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/*Start Balance Card */}
        <div className="space-y-4">
          <Card href="#" className="w-full bg-transparent">
            <div className="py-2">
              {/* Buttons */}
              <div className="grid md:grid-cols-3 items-center gap-5">
                <Link href="/deposit/binance-pay">
                  <Button className="w-full flex items-center gap-2 bg-cbc-orange">
                    <span className="text-xl mr-2">
                      <PiDownloadSimpleBold />
                    </span>
                    Deposit
                  </Button>
                </Link>

                <Link href="/withdraw/tether">
                  <Button className="w-full flex items-center gap-2 bg-cbc-orange">
                    <span className="text-xl mr-2">
                      <FaHandHoldingDollar />
                    </span>
                    Withdraw
                  </Button>
                </Link>

                <Link href="/investment">
                  <Button className="w-full flex items-center gap-2 bg-cbc-orange">
                    <span className="text-xl mr-2">
                      <FaFilterCircleDollar />
                    </span>
                    <span>Buy Package</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <Card href="#" className="w-full bg-transparent hover:bg-transparent">
            <div className="py-5 text-gray-200">
              <p className="md:mb-0 mb-5 text-lg">
                <span className="font-semibold text-xl">
                  Main Balance: {formatBalance(user?.m_balance)}
                </span>{" "}
                USDT
              </p>
              <p className="md:mb-0 mb-5 text-lg">
                <span className="font-semibold text-xl">
                  Game Balance: {formatBalance(user?.g_balance)}
                </span>{" "}
                USDT
              </p>
            </div>
          </Card>
        </div>
        {/*End Balance Card */}

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <ItemCard
            title="Total Investment"
            balance={dashboardData?.total_investment}
          />
          <ItemCard title="Total Earn" balance={dashboardData?.total_earning} />
          <ItemCard
            title="Total Withdraw"
            balance={dashboardData?.total_withdraw}
          />
          <ItemCard
            title="Referral Earn"
            balance={dashboardData?.total_referral_earning}
          />
          <ItemCard
            title="Total Return"
            balance={dashboardData?.total_return}
          />
          <ItemCard
            title="Generation Earn"
            balance={dashboardData?.generation_earning}
          />
        </div>
      </div>

      {/* Christmas Modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="mt-20 md:mt-0"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-gray-200">
              🎄 Merry Christmas! 🎅✨
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wishing you a Merry Christmas filled with joy, peace, and
              prosperity. 🎁
            </p>

            <Button
              className="mt-5 w-full bg-cbc-orange"
              onClick={() => setOpenModal(false)}
            >
              Awesome! 🎊
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Dashboard;
