'use client';
import HistoryCard from '@/components/Deposits/HistoryCard';
import { useGetMyDepositsQuery } from '@/redux/features/deposit/depositApi';
import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import GoBack from '@/components/GoBack';
import Image from 'next/image';
import WithdrawHistoryCard from '@/components/Withdraw/HistoryCard';
import { useGetMyWithdrawRequestsQuery } from '@/redux/features/withdraw/withdrawApi';

const WithdrawHistory = () => {
	const { data, isLoading } = useGetMyWithdrawRequestsQuery(undefined);
	const withdraws = data?.withdraws || [];

	return (
		<div className='p-4'>
			<div className=' flex items-center gap-1'>
				<GoBack />
				<h1 className='my-3 ml-2 font-bold'>Withdraw History</h1>
			</div>
			<div>
				{isLoading ? (
					<div className='flex justify-center items-center'>
						<GridLoader color='#2563EB' size={30} />
					</div>
				) : (
					<div>
						{withdraws.length > 0 ? (
							withdraws.map((withdraw: any) => (
								<div key={withdraw._id} className='space-y-2'>
									<WithdrawHistoryCard withdraw={withdraw} />
								</div>
							))
						) : (
							<div className='flex flex-col justify-center items-center h-64'>
								<h1 className='text-gray-400'>No withdraw history</h1>
								<Image
									src='/no-data.gif'
									alt='empty'
									width={200}
									height={200}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default WithdrawHistory;
