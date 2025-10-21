'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import {
	useResendVerificationEmailMutation,
	useSecurityVerifyMutation,
} from '@/redux/features/auth/authApi';
import { addEmail } from '@/redux/resetPassSlice';
import { useDispatch } from 'react-redux';
const ForgotPassword = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	// call resend email verification api
	const [
		resendVerificationEmail,
		{
			isLoading: isResendLoading,
			isSuccess: isResendSuccess,
			isError: isResendError,
			error: resendError,
		},
	] = useResendVerificationEmailMutation();

	// call verify security code api
	const [
		verifySecurityCode,
		{
			isLoading: isVerifyLoading,
			isSuccess: isVerifySuccess,
			isError: isVerifyError,
			error: verifyError,
		},
	] = useSecurityVerifyMutation();
	// State variables for verification code and timer
	const [email, setEmail] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [codeError, setCodeError] = useState(false);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [timer, setTimer] = useState(30);
	const [send, setSend] = useState(false);
	const [sendError, setSendError] = useState(false);

	//handle change email
	const handleChangeEmail = (e: any) => {
		setEmail(e.target.value);
		setSendError(false);
	};

	// Handle resend click
	const handleResend = (e: any) => {
		e.preventDefault();
		resendVerificationEmail({ email });
		setResendDisabled(true); // Disable resend button
		setTimer(30); // Reset timer
	};

	// handle verification
	const handleVerify = (e: any) => {
		e.preventDefault();
		const data = {
			email,
			code: verificationCode,
			url: '/',
		};
		verifySecurityCode(data);
	};

	// useEffect to handle timer countdown
	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (timer > 0 && resendDisabled) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else {
			setResendDisabled(false); // Enable resend button when timer finishes
		}

		return () => clearInterval(intervalId); // Cleanup interval
	}, [timer, resendDisabled]);

	// use effect to handle resend success
	useEffect(() => {
		if (isResendSuccess) {
			toast.success('Email sent successfully');
			setSend(true);
		}

		if (resendError) {
			if (isResendError) {
				toast.error((resendError as fetchBaseQueryError).data?.message);
				setSendError(true);
			}
		}
	}, [isResendSuccess, resendError, isResendError]);

	// use effect to handle verification success
	useEffect(() => {
		if (isVerifySuccess) {
			toast.success('Verification successful');
			dispatch(addEmail(email));
			router.push('/reset-password');
		}

		if (verifyError) {
			if (isVerifyError) {
				toast.error((verifyError as fetchBaseQueryError).data?.message);
				setCodeError(true);
			}
		}
	}, [isVerifySuccess, verifyError, isVerifyError]);
	return (
		<div className='p-4 home-wrapper h-[50vh] flex items-center justify-center  '>
			{send ? (
				<Card className='mx-auto bg-transparent w-full '>
					<div>
						<h2 className=' text-gray-100 font-medium text-center'>
							We have sent a verification code to{' '}
							<span className='font-semibold text-cbc-orange'>{email}</span>
						</h2>
					</div>
					<form className='flex flex-col gap-4' onSubmit={handleVerify}>
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='password1'
									value='Your Code'
									className=' text-gray-100'
								/>
							</div>
							<TextInput
								id='text1'
								type='text'
								required
								placeholder=' e.g. 123456'
								value={verificationCode}
								onChange={(e) => setVerificationCode(e.target.value)}
							/>
							<span className='mt-1 flex justify-end pr-2 text-xs text-gray-100'>
								Didn’t get the code?{' '}
								<span
									className={`font-bold cursor-pointer hover:text-cbc-orange ml-1 ${
										resendDisabled ? 'text-cbc-orange' : 'text-gray-100'
									}`}
									onClick={handleResend}
								>
									{resendDisabled ? `Resend in ${timer} seconds` : 'Resend'}
								</span>
							</span>
						</div>

						<Button type='submit' className=' bg-cbc-orange'>
							Submit
						</Button>
					</form>
				</Card>
			) : (
				<Card className='mx-auto bg-transparent w-full'>
					<div>
						<h2 className=' text-gray-100 font-medium text-center'>
							Forgot your password?
						</h2>
					</div>
					<form className='flex flex-col gap-4' onSubmit={handleResend}>
						<div>
							<div className='mb-2 block '>
								<Label
									htmlFor='email1'
									value='Enter Your email'
									className='text-gray-100'
								/>
							</div>
							<TextInput
								id='email1'
								type='email'
								placeholder='e.g. example@gmail.com'
								required
								value={email}
								autoComplete='off'
								onChange={handleChangeEmail}
							/>
							{sendError && (
								<span className='text-xs text-red-500'>
									It seem we are having trouble sending the email.
								</span>
							)}
						</div>

						<Button type='submit' className=' bg-cbc-orange'>
							{isResendLoading ? (
								<PulseLoader color='#fff' size={8} margin={2} />
							) : (
								'	Continue'
							)}
						</Button>
					</form>
				</Card>
			)}
		</div>
	);
};

export default ForgotPassword;
