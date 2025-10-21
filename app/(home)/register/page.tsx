'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useCheckEmailExistOrNotMutation } from '@/redux/features/auth/authApi';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRegisterUserMutation } from '@/redux/features/admin/adminUsersApi';

const Register = () => {
	const router = useRouter();
	const [checkEmailExistOrNot, { data, isSuccess, isLoading, isError, error }] =
		useCheckEmailExistOrNotMutation();
	const { isExist } = data || {};

	useEffect(() => {
		if (isExist) {
			setEmailError(true);
			setEmailErrorText('Email already exist');
		}
	}, [isExist]);

	//call register user mutation
	const [
		registerUser,
		{
			isSuccess: isRegisterSuccess,
			isLoading: isRegisterLoading,
			isError: registerIsError,
			error: registerError,
		},
	] = useRegisterUserMutation();

	// useEffect to handle register user success
	useEffect(() => {
		if (isRegisterSuccess) {
			toast.success('User registered successfully');
			router.push('/verify-email?email=' + email);
		}

		if (registerIsError) {
			toast.error((registerError as fetchBaseQueryError).data.message);
		}
	}, [isRegisterSuccess, registerIsError, registerError]);

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorText, setEmailErrorText] = useState(
		'Please enter a valid email address'
	);

	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showPassword2, setShowPassword2] = useState<boolean>(false);

	// handle show password
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// handle show password2
	const handleShowPassword2 = () => {
		setShowPassword2(!showPassword2);
	};

	// handle password change
	const handlePasswordChange = (value: string) => {
		setPassword(value);
	};

	// handle confirm password change
	const handleConfirmPasswordChange = (value: string) => {
		setConfirmPassword(value);
	};

	const [referralCode, setReferralCode] = useState<string>('');
	const [edit, setEdit] = useState(true);
	const [phone, setPhone] = useState<string>('');
	const [phoneError, setPhoneError] = useState<boolean>(false);

	const handlePhoneNumberChange = (value: string) => {
		console.log(value);
		if (value) {
			setPhoneError(false);
		}
		setPhone(value);
	};

	const [isAgree, setIsAgree] = useState<boolean>(false);
	const [isAgreeError, setIsAgreeError] = useState<string>('');
	// handle change agree
	const handleCheckbox = () => {
		setIsAgree(!isAgree);
		setIsAgreeError('');
	};

	const searchParams = useSearchParams();
	const referral_code = searchParams.get('referral_code');

	useEffect(() => {
		if (referral_code) {
			setReferralCode(referral_code);
			setEdit(false);
		}
	}, [referral_code]);

	// handle email change
	const handleEmailCheck = () => {
		const data = {
			email,
		};
		if (email) {
			checkEmailExistOrNot(data);
		}
	};

	// handle submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (name.length === 0) {
			setNameError(true);
		}
		if (email.length === 0 || !email.includes('@')) {
			setEmailError(true);
		}
		if (phone.length === 0) {
			setPhoneError(true);
		}

		if (!isAgree) {
			setIsAgreeError('Please agree to the terms and conditions');
			return;
		}

		const data = {
			name,
			email,
			phone,
			referralCode: referralCode ? referralCode : '202004',
			password,
		};
		registerUser(data);
	};

	return (
		<div className=' py-10'>
			<div
				className='px-2'
				// style={{ height: 'calc(100vh - 20px)' }}
			>
				<div className=''>
					<h2 className=' text-center text-2xl my-4 font-bold  text-gray-300'>
						Create an account{' '}
					</h2>
					<Card className='w-full md:w-1/2 mx-auto bg-transparent border border-[#aa72ce]'>
						<form
							className='flex w-full flex-col gap-4 text-gray-300'
							onSubmit={handleSubmit}
						>
							{/* Start Name */}
							<div>
								<div className='mb-2 block'>
									<Label
										htmlFor='name1'
										value='Your name'
										color={nameError ? 'failure' : ''}
									/>
								</div>
								<TextInput
									className=' text-gray-800'
									id='name1'
									type='text'
									placeholder='Enter your name'
									required
									color={nameError ? 'failure' : ''}
									value={name}
									onChange={(e) => setName(e.target.value)}
									onBlur={() => setNameError(name.length === 0)}
									helperText={
										<>
											{nameError && (
												<span className='text-xs'>Please enter your name</span>
											)}
										</>
									}
								/>
							</div>
							{/* End Name */}
							{/* Start Phone*/}

							<div>
								<div className='mb-2 block '>
									<Label
										htmlFor='phone'
										value='Your phone number '
										className='text-gray-300'
									/>
								</div>
								<PhoneInput
									placeholder='Enter phone number'
									value={phone}
									onChange={(phoneNumber) =>
										handlePhoneNumberChange(phoneNumber)
									}
									country={'us'}
									dropdownStyle={{
										backgroundColor: '#05003A',
										color: '#fff',
									}}
									inputStyle={{
										backgroundColor: 'transparent',
										color: ` ${phoneError ? 'red' : '#fff'}`,
										width: '100%',
										height: '42px',
										border: ` ${
											phoneError ? '1px solid red' : '1px solid gray'
										}`,
										borderRadius: '5px',
									}}
									buttonStyle={{
										backgroundColor: 'transparent',
										borderColor: ` ${phoneError ? 'red' : 'gray'}`,
									}}
									countryCodeEditable={false}
									// disableDropdown={true}
								/>
							</div>

							{/* End Phone*/}
							{/* Start Email */}
							<div>
								<div className='mb-2 block'>
									<Label
										htmlFor='email1'
										value='Your email'
										color={emailError ? 'failure' : ''}
									/>
								</div>
								<TextInput
									id='email1'
									type='email'
									className=' text-gray-800'
									placeholder='Enter your email address'
									required
									color={emailError ? 'failure' : 'black'}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									onBlur={() => {
										handleEmailCheck();
										setEmailError(
											(email.length > 0 && !email.includes('@')) ||
												email.length === 0
										);
									}}
									helperText={
										<>
											{emailError && (
												<span className='text-xs'>{emailErrorText}</span>
											)}
										</>
									}
								/>
							</div>
							{/* End Email */}
							<div>
								<div className='mb-2 block'>
									<Label
										htmlFor='password'
										value='Your password'
										className=' text-gray-300'
									/>
								</div>
								<div className='relative '>
									<TextInput
										className=' text-gray-800'
										color={passwordError ? 'failure' : ''}
										id='password2'
										type={showPassword ? 'text' : 'password'}
										required
										shadow
										value={password}
										onChange={(e) => handlePasswordChange(e.target.value)}
										onBlur={() => {
											if (password.length === 0) {
												setPasswordError('Please enter your password');
											} else if (password.length < 6) {
												setPasswordError(
													'Password must be at least 6 characters'
												);
											} else {
												setPasswordError('');
											}
										}}
									/>
									{/* show Password Error */}
									{passwordError && (
										<span className='text-xs text-red-500'>
											{passwordError}
										</span>
									)}
									{/* show Password Error */}
									<span
										className='absolute right-0 flex items-center px-4 text-gray-300 top-[12px]'
										onClick={handleShowPassword}
									>
										{showPassword ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='black'
												className='w-5 h-5'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
												/>
											</svg>
										) : (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='black'
												className='w-5 h-5'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
												/>
											</svg>
										)}
									</span>
								</div>
							</div>
							<div>
								<div className='mb-2 block'>
									<Label
										htmlFor='repeat-password'
										value='Repeat password'
										className=' text-gray-300'
									/>
								</div>
								<div className='relative '>
									<TextInput
										className=' text-gray-800'
										color={confirmPasswordError ? 'failure' : ''}
										id='password2'
										type={showPassword2 ? 'text' : 'password'}
										required
										shadow
										value={confirmPassword}
										onChange={(e) =>
											handleConfirmPasswordChange(e.target.value)
										}
										onBlur={() => {
											if (confirmPassword.length === 0) {
												setConfirmPasswordError(
													'Please Re-enter your password'
												);
											} else if (confirmPassword !== password) {
												setConfirmPasswordError('Password does not match');
											} else {
												setConfirmPasswordError('');
											}
										}}
									/>
									{/* show Password Error */}
									{confirmPasswordError && (
										<span className='text-xs text-red-500'>
											{confirmPasswordError}
										</span>
									)}
									{/* show Password Error */}
									<span
										className='absolute right-0 flex items-center px-4 text-gray-300 top-[12px]'
										onClick={handleShowPassword2}
									>
										{showPassword2 ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='black'
												className='w-5 h-5'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
												/>
											</svg>
										) : (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='black'
												className='w-5 h-5'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
												/>
											</svg>
										)}
									</span>
								</div>
							</div>

							{/* Start Partner code */}

							<div>
								<div className='mb-2 block'>
									<Label
										htmlFor='partnerCode'
										value='Referral code (Optional)'
										className=' text-gray-300'
									/>
								</div>
								<TextInput
									className=' text-gray-800'
									id='partnerCode'
									type='text'
									placeholder='Enter your partner code'
									value={referralCode}
									onChange={(e) => setReferralCode(e.target.value)}
									disabled={edit ? false : true}
								/>
							</div>

							{/* End Partner code */}
							<div className='flex items-center gap-2'>
								<Checkbox id='agree' onChange={handleCheckbox} />
								<Label htmlFor='agree' className=' text-gray-300'>
									I agree with the&nbsp;
									<Link
										href='/terms-and-conditions'
										className='text-orange-300 hover:underline cursor-pointer'
									>
										terms and conditions!
									</Link>
								</Label>
							</div>
							{/* show error */}
							{isAgreeError && (
								<span className='text-xs text-red-500'>{isAgreeError}</span>
							)}

							<Button
								type='submit'
								className='bg-cbc-orange hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={
									isLoading ||
									!name ||
									!email ||
									!phone ||
									!password ||
									password.length < 6 ||
									password !== confirmPassword ||
									!isAgree
								}
							>
								{isRegisterLoading ? (
									<PulseLoader color='#fff' size={10} />
								) : (
									'Register new account'
								)}
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Register;
