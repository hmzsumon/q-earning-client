'use client';
import React from 'react';

import { Package } from '@/types/types';
import Link from 'next/link';

const PricingCard = ({ pac }: any) => {
	return (
		<div>
			<div className='w-full mx-auto overflow-hidden bg-transparent border border-cbc-blue rounded-lg '>
				<div className='px-6 py-4 bg-gradient-to-r from-cbc-blue to-cbc-orange'>
					<h2 className='text-2xl font-semibold text-white text-center'>
						{pac?.title}
					</h2>
				</div>
				<div className='px-6 py-4'>
					<h3 className=' text-2xl font-bold text-center'>
						Price:{' '}
						<span className='text-2xl font-normal text-gray-200'>
							${pac?.price}
						</span>
					</h3>

					{/* <p className='text-gray-600'>Billed annually</p> */}
				</div>
				<div className='px-6 py-4'>
					<ul className='text-gray-200'>
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
							<span className='text-base font-normal leading-tight text-gray-200 dark:text-gray-400'>
								Tasks Value - {pac?.tasks_value}
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
								Return/Day - {pac?.daily_return}$
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
								Return Percent - {pac?.return_percent}
							</span>
						</li>
						{/* <li className='flex items-center'>
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
							<span className='text-base font-normal leading-tigh700 dark:text-gray-400'>
								Total Return - {pac?.total_return}$
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
							<span className='text-base font-normal leading-tigh700 dark:text-gray-400'>
								Duration - {pac?.duration} Days
							</span>
						</li> */}
					</ul>
				</div>
				<div className='px-6 pt-4 pb-6'>
					<Link
						href={`/investment/${pac?._id}`}
						passHref
						className='block w-full px-4 py-2 font-semibold text-center text-white bg-cbc-orange rounded hover:bg-orange-400 focus:bg-indigo-700 focus:outline-none'
					>
						Buy Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PricingCard;
