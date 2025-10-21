import AddressInfo from '@/components/Settings/AddressInfo';
import ContactInfo from '@/components/Settings/ContactInfo';
import Profile from '@/components/Settings/Profile';
import React from 'react';

const PersonalDetails = () => {
	return (
		<div className='p-4 space-y-4 text-gray-200'>
			<h2>Personal Details</h2>
			<div>
				<Profile />
			</div>
			<div>
				<ContactInfo />
			</div>
			<div>
				<AddressInfo />
			</div>
		</div>
	);
};

export default PersonalDetails;
