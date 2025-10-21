'use client';
import { Card } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';
import {
	MdCall,
	MdEmail,
	MdKeyboardArrowRight,
	MdOutlinePassword,
	MdSecurity,
} from 'react-icons/md';
import IcmIcon from '@/components/IcmIcon';
import { SiAuthy } from 'react-icons/si';

const PasswordAndSecurity = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div className='p-4'>
			<div className='my-4'>
				<h1 className=' text-gray-200 font-semibold tracking-tight'>
					Password and Security
				</h1>
			</div>
			<div>
				<Card href='#' className='w-full '>
					{/* Password */}
					<Card href='/settings/change-password'>
						<div className=' list-none flex items-center justify-between'>
							<li className=' flex items-center gap-2'>
								<IcmIcon icon={<MdSecurity />} />

								<span className='text-primary tracking-tight font-semibold'>
									Change Password
								</span>
							</li>
							<li className='text-xl text-primary '>
								<MdKeyboardArrowRight />
							</li>
						</div>
					</Card>
					{/* Two-factor */}
					{/* <Card href='#'>
						<div className=' list-none flex items-center justify-between'>
							<li className=' flex items-center gap-2'>
								<IcmIcon icon={<SiAuthy />} />
								<span className='text-primary tracking-tight font-semibold'>
									Two-factor authentication
								</span>
							</li>
							<li className=' text-primary text-xl'>
								<MdKeyboardArrowRight />
							</li>
						</div>
					</Card> */}
					{/* Pin Setup */}
					{/* <Card href='/settings/change-pin'>
						<div className=' list-none flex items-center justify-between'>
							<li className=' flex items-center gap-2'>
								<IcmIcon icon={<MdOutlinePassword />} />
								<span className='text-primary tracking-tight font-semibold'>
									Change Pin
								</span>
							</li>
							<li className=' text-primary text-xl'>
								<MdKeyboardArrowRight />
							</li>
						</div>
					</Card> */}
				</Card>
			</div>
		</div>
	);
};

export default PasswordAndSecurity;
