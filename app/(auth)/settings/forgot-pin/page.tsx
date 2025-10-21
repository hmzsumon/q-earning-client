'use client';
import React from 'react';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';

const ForgotPin = () => {
	return (
		<div className=' p-4'>
			<div>
				<Card className='w-full'>
					<div className='my-4'>
						<h1 className=' text-primary font-semibold tracking-tight'>
							Forgot Your Pin?
						</h1>
						<p className=' text-sm tracking-tight text-primary'>
							We will send you an email with a security code to reset your pin.
						</p>
					</div>
					<form className='flex flex-col gap-4 '>
						<div className=' relative'>
							<TextInput
								id='pin1'
								type='text'
								placeholder='Enter security code'
								required
								autoComplete='off'
								className=''
							/>
							<button className='bg-icm-green text-xs font-bold px-3 py-3 absolute top-0 right-0 rounded-r-md'>
								Get Code
							</button>
						</div>
						<div>
							<TextInput
								id='password1'
								type='password'
								placeholder='New Pin'
								required
								autoComplete='off'
							/>
						</div>
						<div>
							<TextInput
								id='password2'
								type='password'
								placeholder='Repeat New Pin'
								required
								autoComplete='off'
							/>
						</div>

						<Button
							type='submit'
							className='w-full bg-green-500 hover:bg-green-600'
							disabled={true}
						>
							Submit
						</Button>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default ForgotPin;
