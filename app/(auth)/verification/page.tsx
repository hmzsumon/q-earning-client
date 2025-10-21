'use client';
import Identification from '@/components/Verification/Identification';
import PersonalInfo from '@/components/Verification/PersonalInfo';
import Selfie from '@/components/Verification/Selfie';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Verification = () => {
	const { user } = useSelector((state: any) => state.auth);
	const step = user?.kyc_step || 1;

	return (
		<div className='px-5 py-4'>
			<div>
				<h1 className=' text-2xl text-gray-700 font-semibold'>
					Account verification
				</h1>
				<div className=' max-w-md my-2'>
					<p className=' text-gray-500 text-justify text-sm tracking-tight leading-5 font-medium '>
						Please read through the fields below and fill in correct and
						complete information. All fields are required in order to proceed in
						the KYC process. Please use correct information, which matches any
						ID or other required documents uploaded to the server.
					</p>
				</div>
			</div>

			{step === 1 && <PersonalInfo />}
			{step === 2 && <Identification />}
			{step === 3 && <Selfie />}
		</div>
	);
};

export default Verification;
