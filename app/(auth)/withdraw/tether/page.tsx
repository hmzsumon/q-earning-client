'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import WithdrawSecurity from '@/components/Withdraw/WithdrawSecurity';
import PulseLoader from 'react-spinners/PulseLoader';
import { useCreateWithdrawRequestMutation } from '@/redux/features/withdraw/withdrawApi';
import { useRouter } from 'next/navigation';

const TetherUsdt = () => {
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);

	// useEffect(() => {
	// 	if (user?.sales_condition) {
	// 		router.push('/sales-condition');
	// 	}
	// }, [user]);

	// call new withdraw api
	const [withdraw, { isLoading, isSuccess, isError, error }] =
		useCreateWithdrawRequestMutation();

	const [address, setAddress] = React.useState('');
	const [network, setNetwork] = React.useState('');
	const [amount, setAmount] = React.useState('');
	const [availableAmount, setAvailable] = useState<number>(0);
	const [receiveAmount, setReceiveAmount] = useState<number>(0);
	const [errorText, setErrorText] = React.useState<string>('');
	const [codeError, setCodeError] = useState<boolean>(false);

	const [openModal, setOpenModal] = useState(false);

	// set available amount
	useEffect(() => {
		const balance = user?.m_balance;
		setAvailable(balance);
	}, [user]);

	// handle amount change
	const handleAmountChange = (e: any) => {
		const value = e.target.value;
		setAmount(value);
		if (value < 15) {
			setErrorText('Minimum amount is 15 USDT');
			return;
		} else if (value > availableAmount) {
			setErrorText('Insufficient balance');
			return;
		} else {
			setErrorText('');
		}

		setReceiveAmount(Number(value) - Number(value) * 0.05);
	};

	// handle submit form
	const handleSubmit = () => {
		// console.log('submitting form');
		const data = {
			amount: amount,
			net_amount: receiveAmount,
			charge_p: 0.05,
			charge_a: 0,
			method: {
				name: 'Tether (USDT TRC20)',
				network: 'Tron (TRC20)',
				address: address,
			},
		};

		withdraw(data);
	};
	// useEffect for withdraw
	useEffect(() => {
		if (isSuccess) {
			toast.success('Withdraw request submitted successfully');
			setAmount('');
			setAddress('');
			setReceiveAmount(0);
			setErrorText('');
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<div className='p-4'>
			<h1 className=' text-xl text-gray-200 font-bold my-4'>Withdraw USDT</h1>
			<div>
				<Card className=' light w-full text-gray-200 bg-transparent border border-cbc-blue'>
					<div className='flex flex-col gap-4'>
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='email1'
									value='Address'
									className=' text-gray-200'
								/>
							</div>
							<TextInput
								id='address'
								type='text'
								placeholder='Enter your trc-20 address'
								value={address}
								required
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='password1'
									value='Network'
									className=' text-gray-200'
								/>
							</div>
							<TextInput
								id='password1'
								type='text'
								readOnly
								value='Tron (TRC20)'
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='password1'
									value='Amount'
									className=' text-gray-200'
								/>
							</div>
							<TextInput
								id='password1'
								type='number'
								placeholder='Enter amount to withdraw'
								required
								value={amount}
								onChange={handleAmountChange}
							/>
							<small className='flex items-center justify-between px-1 mt-1 text-gray-300'>
								<span className=''>
									Available:
									{user?.m_balance >= 0 ? (
										<span className='mx-1 text-gray-200 font-bold'>
											{Number(user?.m_balance ? user?.m_balance : 0).toFixed(2)}
										</span>
									) : (
										<PulseLoader size={10} color={'#fff'} />
									)}
									USDT
								</span>
								<span>
									Min Amount:
									<span className='mx-1 text-gray-200 font-bold'>15</span>
									USDT
								</span>
							</small>
							{errorText && (
								<small className='text-red-500 font-bold'>{errorText}</small>
							)}
						</div>
						<div className=' grid grid-cols-2 gap-4 my-2'>
							<div className='space-y-1 '>
								<p className='text-xs text-blue-gray-600'>
									Processing fee:{' '}
									<span className='italic font-bold text-blue-gray-300'>
										5%
									</span>{' '}
								</p>
								<p className='text-xs text-blue-gray-600'>Receive Amount:</p>
								<p className='font-bold text-blue-gray-300'>
									<span>{receiveAmount.toFixed(2)}</span> USDT
								</p>
							</div>
							<div className='space-y-1 '>
								<Button
									onClick={() => setOpenModal(true)}
									className='w-full bg-cbc-orange text-gray-100 font-bold hover:bg-orange-400'
									disabled={
										!!errorText || !amount || !address || user?.is_block
									}
								>
									Withdraw
								</Button>
								{user?.is_block && (
									<small className='text-red-400 font-bold'>
										Your account is blocked!
									</small>
								)}
							</div>
						</div>
					</div>
				</Card>
			</div>
			<WithdrawSecurity
				openModal={openModal}
				setOpenModal={setOpenModal}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

export default TetherUsdt;
