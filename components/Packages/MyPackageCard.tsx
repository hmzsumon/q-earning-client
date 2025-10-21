'use client';
import React from 'react';
import { GiReceiveMoney } from 'react-icons/gi';
import { MyPackage } from '@/types/types';
import Link from 'next/link';
import { Card } from 'flowbite-react';
import {
	formatBalance,
	formatDate,
	formDateWithDayMonthTime,
} from '@/lib/functions';
interface MyPackageCardProps {
	pac: MyPackage;
}

const MyPackageCard: React.FC<MyPackageCardProps> = ({ pac }) => {
	return (
		<div className='mb-4'>
			<div className='w-full mx-auto overflow-hidden bg-transparent border border-x-cbc-blue  rounded-lg shadow-lg'>
				<div className='px-6 py-4 bg-gradient-to-r from-cbc-blue to-cbc-orange'>
					<h2 className='text-2xl font-semibold text-white'>{pac?.title}</h2>
				</div>
				<div className='px-6 py-4'>
					<div className='text-3xl font-bold text-gray-200 text-center'>
						Price ${pac?.price}
					</div>
					{/* <p className='text-gray-600'>Billed annually</p> */}
				</div>
				<div className='px-6 py-4 flex flex-col md:flex-row items-center gap-10'>
					<ul className='text-gray-200 order-2 md:order-1 text-sm'>
						<li className='flex items-center'>
							<svg
								className='w-4 h-4 mr-2 text-cbc-orange'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 13l4 4L19 7'
								></path>
							</svg>
							<span className=' font-normal leading-tight text-gray-200 dark:text-gray-400'>
								Return/Day -{' '}
								<span className='text-sm font-bold'>
									{formatBalance(pac?.daily_return || 0)} USDT
								</span>
							</span>
						</li>

						<li className='flex items-center'>
							<svg
								className='w-4 h-4 mr-2 text-cbc-orange'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 13l4 4L19 7'
								></path>
							</svg>
							<span className='text-base font-normal leading-tight text-gray-200 dark:text-gray-400'>
								Tasks/Day - {pac?.daily_tasks}
							</span>
						</li>

						<li className='flex items-center'>
							<svg
								className='w-4 h-4 mr-2 text-cbc-orange'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 13l4 4L19 7'
								></path>
							</svg>
							<span className=' font-normal leading-tight text-gray-200 dark:text-gray-400'>
								Tasks Value -{' '}
								<span className='text-sm font-bold'>
									{formatBalance(pac?.tasks_value || 0)} USDT
								</span>
							</span>
						</li>

						<li className='flex items-center'>
							<svg
								className='w-4 h-4 mr-2 text-orange-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 13l4 4L19 7'
								></path>
							</svg>
							<span className=' font-normal leading-tigh700 dark:text-gray-400'>
								Weekly - <span className='text-sm font-bold'>5 days</span>
							</span>
						</li>

						<li className='flex items-center'>
							<svg
								className='w-4 h-4 mr-2 text-orange-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 13l4 4L19 7'
								></path>
							</svg>
							<span className=' font-normal leading-tigh700 dark:text-gray-400'>
								Total Return -{' '}
								<span className='text-sm font-bold'>${pac?.total_return}</span>
							</span>
						</li>

						{/* <li className='flex items-center'>
							<svg
								className='w-4 h-4 mr-2 text-orange-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 13l4 4L19 7'
								></path>
							</svg>
							<span className=' font-normal leading-tigh700 dark:text-gray-400'>
								Duration-{' '}
								<span className='text-sm font-bold'>{pac?.duration} Days</span>
							</span>
						</li> */}

						{pac?.is_expired && (
							<>
								<li className='flex items-center'>
									<svg
										className='w-4 h-4 mr-2 text-green-500'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M5 13l4 4L19 7'
										></path>
									</svg>
									<span className=' font-normal leading-tigh700 dark:text-gray-400'>
										Expired on -{' '}
										<span className='text-xs font-bold'>
											{formatDate(pac?.expire_date)}
										</span>
									</span>
								</li>

								<li className='flex items-center'>
									<svg
										className='w-4 h-4 mr-2 text-green-500'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M5 13l4 4L19 7'
										></path>
									</svg>
									<span className=' font-normal leading-tigh700 dark:text-gray-400'>
										Duration:{' '}
										<span className='text-sm font-bold'>
											{pac?.p_duration} days
										</span>
									</span>
								</li>
							</>
						)}
					</ul>
					{/* icon */}
				</div>
				<div className='px-6 pt-4 pb-6'>
					<button
						disabled
						className='block w-full px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 font-semibold text-center text-white bg-cbc-orange rounded hover:bg-orange-500 focus:bg-indigo-700 focus:outline-none'
					>
						{pac?.is_expired ? 'Complete' : 'Active'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default MyPackageCard;
