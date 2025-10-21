'use client';
import React from 'react';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';

const ChangePassword = () => {
	return (
		<div className=' p-4'>
			<div>
				<Card className='w-full'>
					<div className='my-4'>
						<h1 className=' text-primary font-semibold tracking-tight'>
							Change Password
						</h1>
						{/* <p className=' text-sm tracking-tight text-primary'>
							Your password must be at least 6 characters long and contain at
							least one letter and one number. Should include both uppercase and
							lowercase letters and special characters (!$@%).
						</p> */}
					</div>
					<form className='flex flex-col gap-4 '>
						<div>
							<TextInput
								id='email1'
								type='password'
								placeholder='Current Password'
								required
								autoComplete='off'
							/>
						</div>
						<div>
							<TextInput
								id='password1'
								type='password'
								placeholder='New Password'
								required
								autoComplete='off'
							/>
						</div>
						<div>
							<TextInput
								id='password1'
								type='password'
								placeholder='Repeat New Password'
								required
								autoComplete='off'
							/>
						</div>

						<Button
							type='submit'
							className='w-full bg-cbc-orange hover:bg-green-600'
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

export default ChangePassword;
