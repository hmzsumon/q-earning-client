'use client';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useLoginUserMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';

const Login = () => {
	const [loginUser, { isLoading, isError, error, isSuccess }] =
		useLoginUserMutation();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	// handle login
	const handleLogin = async (e: any) => {
		e.preventDefault();
		if (email.length > 0 && !email.includes('@')) {
			setEmailError(true);
			toast.error('Please enter a valid email address');
			return;
		}
		loginUser({ email, password });
	};

	// useEffect to handle success
	useEffect(() => {
		if (isSuccess) {
			toast.success('Login successful');
			router.push('/dashboard');
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
			if ((error as fetchBaseQueryError).status === 421) {
				router.push('/verify-email?email=' + email);
			}
			if ((error as fetchBaseQueryError).status === 422) {
				router.push('/suspend');
			}
		}
	}, [isSuccess, isError, error]);

	return (
		<div>
			<h1 className='text-xl text-center font-bold text-gray-300 mb-4'>
				Please Login to your account.
			</h1>
			<Card className='max-w-md mx-auto w-full bg-transparent border border-cbc-blue'>
				<form
					className='flex flex-col text-gray-300 gap-4'
					onSubmit={handleLogin}
				>
					{/* Start Email */}
					<div className=' block '>
						<div className='mb-2 block '>
							<Label
								htmlFor='email1'
								value='Your email'
								color={emailError ? 'failure' : ''}
							/>
						</div>
						<TextInput
							className='bg-transparent text-gray-800 '
							id='email'
							type='email'
							placeholder='Enter your email address'
							required
							color={emailError ? 'failure' : ''}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={() =>
								setEmailError(email.length > 0 && !email.includes('@'))
							}
							helperText={
								<>
									{emailError && (
										<span className='text-xs text-failure-600'>
											Please enter a valid email address
										</span>
									)}
								</>
							}
						/>
					</div>
					{/* End Email */}
					<div>
						<div className='mb-2 block '>
							<Label
								htmlFor='password1'
								value='Your password'
								color={emailError ? 'failure' : ''}
							/>
						</div>
						<div className='mb-2 block relative'>
							<TextInput
								id='password1'
								type={showPassword ? 'text' : 'password'}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Enter your password'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute inset-y-0 text-gray-500 right-0 pr-3 flex items-center text-sm leading-5'
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</div>
					<div className='flex items-center text-xs  justify-between gap-2'>
						<p className='text-primary-500  hover:text-blue-700 font-bold cursor-pointer hover:underline '>
							<Link href='/forgot-password'>
								<span className='text-primary-500'>Forgot password?</span>
							</Link>
						</p>

						<p className=''>
							Don't have an account?{' '}
							<Link href='/register'>
								<span className='text-sm text-primary-500 hover:underline hover:text-blue-700 '>
									Register
								</span>
							</Link>
						</p>
					</div>
					<Button type='submit' className='bg-cbc-blue text-white'>
						{isLoading ? (
							<PulseLoader color='#fff' size={8} margin={2} />
						) : (
							<span>Login</span>
						)}
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default Login;
