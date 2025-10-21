'use client';
import Generations from '@/components/Partnership/Generations';
import GenerationSellsInfo from '@/components/Partnership/GenerationSellsInfo';
import { useMyWalletQuery } from '@/redux/features/auth/authApi';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RWebShare } from 'react-web-share';
import { formatBalance } from '@/lib/functions';

const GenerationProgram = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useMyWalletQuery(undefined);
	const { wallet } = data || {};

	const { user } = useSelector((state: any) => state.auth);
	// get host
	const host = window.location.host;
	// create referral link wit user customer_id
	let referralLink = '';
	if (process.env.NODE_ENV === 'development') {
		referralLink = `http://${host}/register?partner_code=${user?.customer_id}`;
	} else {
		referralLink = `https://${host}/register?partner_code=${user?.customer_id}`;
	}
	return (
		<div className=''>
			<div className=' w-full custom-shadow'>
				<div className='my-5 gap-5 grid grid-cols-1 md:grid-cols-2 px-2 '>
					<div className=''>
						<div className='bg-white border p-5 rounded'>
							<div className='flex justify-between items-center'>
								<p className='flex items-center gap-2'>
									<span className='text-[#0022FF]'>
										<MdOutlineAccountBalanceWallet />
									</span>
									<span className='font-semibold text-primary'>Balance</span>
								</p>
								<Link
									href=''
									className='bg-[#ffcf01] rounded-full p-1 text-2xl text-primary'
								>
									<RiArrowRightUpLine />
								</Link>
							</div>
							<div className='text-center my-10'>
								<p className='text-primary text-lg'>
									Current Balance:{' '}
									{formatBalance(wallet?.current_generation_earning || 0)} USDT
								</p>
								<p className='text-secondary'>
									Total Generation Bonus:{' '}
									{formatBalance(wallet?.generation_bonus)} USDT
								</p>
							</div>
						</div>

						<div className=' '>
							<GenerationSellsInfo
								total_sells={wallet?.total_sales}
								level_01_sells={wallet?.level_1_sales}
							/>
						</div>
					</div>
					{/* Partners */}
					<Generations />
				</div>
			</div>
		</div>
	);
};

export default GenerationProgram;
