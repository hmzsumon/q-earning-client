'use client';
import PartnerLinkCard from '@/components/Partnership/PartnerLinkCard';
import Partners from '@/components/Partnership/Partners';
import { formatBalance } from '@/lib/functions';
import {
	useGet3LevelTeamQuery,
	useMyWalletQuery,
} from '@/redux/features/auth/authApi';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RWebShare } from 'react-web-share';

const PartnerProgram = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useMyWalletQuery(undefined);
	const { wallet } = data || {};
	// console.log(wallet);
	const { user } = useSelector((state: any) => state.auth);
	// get host
	const host = window.location.host;

	// create referral link wit user customer_id
	let referralLink = '';
	if (process.env.NODE_ENV === 'development') {
		referralLink = `http://${host}/register?referral_code=${user?.customer_id}`;
	} else {
		referralLink = `https://${host}/register?referral_code=${user?.customer_id}`;
	}

	return (
		<div className=''>
			<div className=' w-full '>
				<div className='my-5 gap-5 grid grid-cols-1 md:grid-cols-2 px-2 '>
					<div className=''>
						<div className='bg-transparent border border-cbc-blue p-5 rounded'>
							<div className='flex justify-between items-center'>
								<p className='flex items-center gap-2'>
									<span className='text-cbc-orange text-2xl'>
										<MdOutlineAccountBalanceWallet />
									</span>
									<span className='font-semibold text-gray-200'>Balance</span>
								</p>
								<Link
									href=''
									className='bg-cbc-orange rounded-full p-1 text-2xl text-gray-200'
								>
									<RiArrowRightUpLine />
								</Link>
							</div>
							<div className='text-center my-10'>
								<p className='text-gray-200 text-lg'>
									<span className='text-2xl font-bold '>
										{formatBalance(wallet?.total_level_earning || 0)}
									</span>{' '}
									USDT
								</p>
							</div>
						</div>

						<PartnerLinkCard
							partnerId={user?.customer_id}
							referralLink={referralLink}
						/>
					</div>
					{/* Partners */}
					<Partners />
				</div>
			</div>
		</div>
	);
};

export default PartnerProgram;
