'use client';
import { formatBalance } from '@/lib/functions';
import Link from 'next/link';
import React, { useState } from 'react';
import { PiDownloadSimpleBold, PiWarningLight } from 'react-icons/pi';
import { FaHandHoldingDollar } from 'react-icons/fa6';
import { FaFilterCircleDollar } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Button, Card, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaWallet } from 'react-icons/fa6';
import ItemCard from '@/components/Dashboard/ItemCard';
import { GiReceiveMoney } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';
import { RiArrowRightUpLine, RiGlobalFill } from 'react-icons/ri';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
import {
	useGetDashboardQuery,
	useMyWalletQuery,
} from '@/redux/features/auth/authApi';
import AdSense from '@/components/AdSense';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Dashboard = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, isSuccess, error } =
		useGetDashboardQuery(undefined);
	const { dashboardData } = data || {};
	const [openModal, setOpenModal] = useState(true);
	return (
		<div className=' z-0 px-2 '>
			<div className='py-4   '>
				{/* if user is_p_expired */}
				{user?.is_p_expired && (
					<Card className='w-full bg-red-100 border border-red-400 shadow-md my-4 p-2'>
						<div className='flex items-center gap-4'>
							<PiWarningLight className='text-3xl text-red-600' />
							<div>
								<h2 className='text-lg font-semibold text-red-700'>
									Your Package Has Expired!
								</h2>
								<p className='text-sm text-red-600'>
									To continue earning, please purchase a new package.
								</p>
							</div>
						</div>

						{/* Display Total Earnings & Investment */}
						<div className='mt-3 p-3 bg-white rounded-md shadow-sm border'>
							<p className='text-gray-700 font-medium'>
								💰 <span className='font-semibold'>Total Earnings:</span> $
								{dashboardData?.total_earning.toFixed(2)}
							</p>
							<p className='text-gray-700 font-medium'>
								📊 <span className='font-semibold'>Total Investment:</span> $
								{dashboardData?.total_investment.toFixed(2)}
							</p>
						</div>

						{/* Buy New Package Button */}
						<div className='mt-3 flex justify-end'>
							<Link href='/investment'>
								<Button className='bg-red-600 text-white hover:bg-red-700'>
									Buy New Package
								</Button>
							</Link>
						</div>
					</Card>
				)}

				{/* if user is_p_expired */}
				{/*Start Balance Card */}
				<div className=' space-y-4'>
					<Card href='#' className='w-full bg-transparent'>
						<div className='py-2'>
							{/* Buttons */}
							<div className='grid md:grid-cols-3  items-center gap-5'>
								<Link href='/deposit/binance-pay'>
									<Button className=' w-full flex items-center gap-2 bg-cbc-orange'>
										<span className='text-xl mr-2'>
											{' '}
											<PiDownloadSimpleBold />
										</span>{' '}
										Deposit
									</Button>
								</Link>

								<Link href='/withdraw/tether'>
									<Button className=' w-full flex items-center gap-2 bg-cbc-orange'>
										<span className='text-xl mr-2'>
											{' '}
											<FaHandHoldingDollar />
										</span>{' '}
										Withdraw
									</Button>
								</Link>

								<Link href='/investment'>
									<Button className=' w-full flex items-center gap-2 bg-cbc-orange '>
										<span className='text-xl mr-2'>
											{' '}
											<FaFilterCircleDollar />
										</span>{' '}
										<span className=''>Buy Package</span>
									</Button>
								</Link>
							</div>
						</div>
					</Card>
					<Card href='#' className='w-full bg-transparent hover:bg-transparent'>
						<div className='py-5 text-gray-200'>
							<p className=' md:mb-0 mb-5 text-lg '>
								<span className='font-semibold text-xl '>
									Main Balance: {formatBalance(user?.m_balance)}
								</span>{' '}
								USDT
							</p>
							<p className=' md:mb-0 mb-5 text-lg '>
								<span className='font-semibold text-xl '>
									Game Balance: {formatBalance(user?.g_balance)}
								</span>{' '}
								USDT
							</p>
						</div>
					</Card>
				</div>
				{/*End Balance Card */}
				<div className=' my-6 grid md:grid-cols-2 gap-4'>
					<ItemCard
						title='Total Investment'
						balance={dashboardData?.total_investment}
					/>
					<ItemCard title='Total Earn' balance={dashboardData?.total_earning} />
					<ItemCard
						title='Total Withdraw'
						balance={dashboardData?.total_withdraw}
					/>

					<ItemCard
						title='Referral Earn'
						balance={dashboardData?.total_referral_earning}
					/>

					<ItemCard
						title='Total Return'
						balance={dashboardData?.total_return}
					/>

					<ItemCard
						title='Generation Earn'
						balance={dashboardData?.generation_earning}
					/>
				</div>
			</div>
			<>
				{/* <Modal
					show={openModal}
					size='md'
					onClose={() => setOpenModal(false)}
					popup
					className='mt-20 md:mt-0'
				>
					<ModalHeader />
					<ModalBody>
						<div className='text-center'>
							<h3 className='mb-5 text-lg font-semibold text-gray-700 dark:text-gray-300'>
								🚀 Exciting News!
							</h3>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Click By Cash MasterCard & Coin are launching very soon. Stay
								tuned for the official release and get ready to experience the
								future of earning and spending!
							</p>
						</div>
					</ModalBody>
				</Modal> */}
			</>
		</div>
	);
};

export default Dashboard;
