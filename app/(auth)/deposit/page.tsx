'use client';

import {
	useLoadUserQuery,
	useMyWalletQuery,
} from '@/redux/features/auth/authApi';
import { Button, Card } from 'flowbite-react';
import { link } from 'fs';
import Link from 'next/link';
import React from 'react';
import { CiUnlock } from 'react-icons/ci';
import { FaRegCreditCard } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GoHistory } from 'react-icons/go';
import { IoMdLock } from 'react-icons/io';
import { IoLogoUsd } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { SiBinance, SiTether } from 'react-icons/si';

import {
	TbBrandNetflix,
	TbBrandTether,
	TbCircleLetterS,
	TbLetterS,
} from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

const depositMethods = [
	{
		id: 1,
		title: 'Binance',
		isActive: true,
		processingTime: 30,
		fee: 0,
		limit: '10 - 20,000',
		icon: <SiBinance />,
		img: null,
		link: '/deposit/binance-pay',
	},
	{
		id: 2,
		title: 'Tether (USDT TRC20)',
		isActive: false,
		processingTime: 1,
		fee: 0,
		limit: '10 - 10,000,000',
		icon: <SiTether />,
		link: '/deposit/tether-trc20',
	},
	{
		id: 20,
		title: 'Tron (TRX)',
		isActive: false,
		processingTime: 30,
		fee: 0,
		limit: '10 - 10,000,000',
		icon: null,
		img: '/assets/icons/tron-trx.webp',
		link: '/deposit/tron-trx',
	},

	{
		id: 3,
		title: 'Bank Card',
		isActive: false,
		processingTime: 30,
		fee: 0,
		limit: '10 - 10,000',
		icon: <FaRegCreditCard />,
		link: '/deposit/bank-card',
	},
	{
		id: 4,
		title: 'Neteller',
		isActive: false,
		processingTime: 30,
		fee: 0,
		limit: '10 - 50,000',
		icon: <TbBrandNetflix />,
		link: '/deposit/neteller',
	},
	{
		id: 5,
		title: 'Perfect Money',
		isActive: false,
		processingTime: 30,
		fee: 0,
		limit: '10 - 100,000',
		icon: <FcMoneyTransfer />,
		link: '/deposit/perfect-money',
	},
	{
		id: 6,
		title: 'Skrill',
		isActive: false,
		processingTime: 30,
		fee: 0,
		limit: '10 - 100,000',
		icon: <TbLetterS />,
		link: '/deposit/skrill',
	},
	{
		id: 7,
		title: 'SticPay',
		isActive: false,
		processingTime: 30,
		fee: 0,
		limit: '10 - 100,000',
		icon: <TbCircleLetterS />,
		link: '/deposit/sticpay',
	},
	{
		id: 8,
		title: 'Tether (USDT ERC20)',
		isActive: false,
		processingTime: 1,
		fee: 0,
		limit: '10 - 100,000,000',
		icon: <TbBrandTether />,
		link: '/deposit/tether-erc20',
	},
	{
		id: 9,
		title: 'USD Coin (USDT ERC20)',
		isActive: false,
		processingTime: 1,
		fee: 0,
		limit: '10 - 100,000,000',
		icon: <IoLogoUsd />,
		link: '/deposit/usd-coin',
	},
	{
		id: 10,
		title: 'USD Coin (USDT ERC20)',
		isActive: false,
		processingTime: 1,
		fee: 0,
		limit: '10 - 100,000,000',
		icon: <IoLogoUsd />,
		link: '/deposit/usd-coin',
	},
];

const Deposit = () => {
	// Load user
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, isSuccess, error } =
		useMyWalletQuery(undefined);
	const { wallet } = data || {};
	return (
		<div className=' px-4 py-6'>
			<div className=' flex items-center justify-between'>
				<h3 className='text-xl text-slate-800 font-semibold my-4'>Deposits</h3>
				<Link
					href='/deposit/history'
					className='flex items-center gap-1 text-sm font-bold text-primary duration-300 hover:text-icm-green'
				>
					<GoHistory />
					History
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				{depositMethods.map((method) => {
					return (
						<div key={method.id}>
							<div className='border rounded-lg w-full duration-300 verification-card '>
								<div className='p-4 border-b flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										{method.img ? (
											<img
												src={method.img}
												alt={method.title}
												className='w-8 h-8 rounded-full'
											/>
										) : (
											<span className='text-3xl'>{method.icon}</span>
										)}

										<h3 className='text-lg font-medium'>{method.title}</h3>
									</div>
									{method.isActive ? (
										<div className='relative'>
											<div
												className=''
												data-tooltip-id='unavailable'
												data-tooltip-content='You need complete the verification'
												data-tooltip-place='bottom'
												data-tooltip-class-name='custom-tooltip'
											>
												<p className='flex items-center gap-1 rounded-xl bg-green-100 px-2 py-1 text-sm text-black'>
													<span>
														<CiUnlock />
													</span>
													<span>Recommended</span>
													<Tooltip id='unavailable' />
												</p>
											</div>
										</div>
									) : (
										<div className='relative'>
											<div
												className=''
												data-tooltip-id='unavailable'
												data-tooltip-content='You need complete the verification'
												data-tooltip-place='bottom'
												data-tooltip-class-name='custom-tooltip'
											>
												<p className='flex items-center gap-1 rounded-xl secondary-bg px-2 py-1 text-sm text-[#745500]'>
													<span>
														<IoMdLock />
													</span>
													<span>Unavailable</span>
													<Tooltip id='unavailable' />
												</p>
											</div>
										</div>
									)}
								</div>
								<div className='p-4 text-sm font-light'>
									<p>Processing time instant - {method.processingTime}</p>
									<p>Fee {method.fee}%</p>
									<p>Limits {method.limit} USD</p>
								</div>
								<div className=' p-4'>
									<Link href={method.link}>
										<Button
											gradientMonochrome='success'
											className='w-full'
											disabled={!method.isActive}
										>
											Pay Now
										</Button>
									</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Deposit;
