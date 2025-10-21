'use client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import Image from 'next/image';
import { Card } from 'flowbite-react';
import CopyToClipboard from '@/lib/CopyToClipboard';
import { useDepositWithBinanceMutation } from '@/redux/features/deposit/depositApi';

const BinancePayment = () => {
	const [depositWithBinance, { isLoading, isError, isSuccess, error }] =
		useDepositWithBinanceMutation();
	const depositAddress = 'TJVnLiPQxpUXL32rWE9Lefs3SRGE4jbt8V';
	const [txId, setIxId] = React.useState('');

	const handleConfirm = () => {
		if (!txId) {
			toast.error('Please enter a valid transaction ID');
			return;
		}
		depositWithBinance({ txId });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Deposit confirmed');
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);
	return (
		<div>
			{isLoading ? (
				<div>
					<div className='flex items-center justify-center h-96'>
						<Image src='/loading.gif' width={200} height={200} alt='loading' />
					</div>
				</div>
			) : (
				<div className=' p-4 text-gray-200 '>
					<h2 className=' text-center text-2xl font-semibold mb-4'>
						Binance Payment
					</h2>
					<div className=' space-y-2 '>
						<h1 className=' text-center font-bold '>Deposit USDT</h1>
						<div className=' md:w-fit mx-auto '>
							<Image
								src='/binance_qr.png'
								width={200}
								height={200}
								alt='Binance'
								className='mx-auto'
							/>
						</div>
						<div>
							<Card className='w-full mx-auto bg-transparent '>
								<div>
									<h3 className=' text-gray-200'>Network</h3>
									<h2 className=' text-gray-400 font-semibold'>Tron (TRC20)</h2>
								</div>
								<hr className='my-2 border-gray-600 border-b-1' />
								<div className=' w-full'>
									<h3 className=' text-gray-200'>TRC20 Address</h3>
									<div className=' flex items-center'>
										<h2 className=' text-gray-400 font-semibold text-xs '>
											{depositAddress}
										</h2>
										<CopyToClipboard text={depositAddress} />
									</div>
								</div>

								<div>
									<div className=' '>
										<label className='block mb-1 text-gray-200'>
											Transaction ID (txId):
										</label>
										<input
											type='text'
											className='border bg-transparent border-gray-300 rounded px-3 py-2 w-full'
											value={txId}
											onChange={(e) => setIxId(e.target.value)}
										/>
									</div>
								</div>
							</Card>
						</div>

						<div className=''>
							<button
								type='submit'
								className='bg-cbc-blue text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={!txId}
								onClick={handleConfirm}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BinancePayment;
