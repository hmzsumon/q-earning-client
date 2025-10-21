import { Card } from 'flowbite-react';
import React from 'react';
import { MdPersonRemoveAlt1 } from 'react-icons/md';

const RemoveAccount = () => {
	return (
		<div className=' p-6'>
			<Card className=''>
				<div className='flex items-center justify-center gap-3 '>
					<span className='text-2xl border-4 border-red-500 p-2 rounded-full text-black'>
						{<MdPersonRemoveAlt1 className='text-red-500' />}
					</span>
					<div className='space-y-1'>
						<p className='text-xl  font-medium text-primary'>Remove Account</p>
					</div>
				</div>
				<div className=' text-primary font-semibold'>
					<p className=' text-center'>
						If you want to remove your account, please contact us.
					</p>
				</div>
				<div>
					<button
						className='bg-red-500 text-white w-full rounded-md p-2 mt-4'
						type='button'
					>
						<a
							href='mailto:support@icmmoney.com'
							className='text-gray-700 text-sm font-bold'
						>
							Contact Us
						</a>
					</button>
				</div>
			</Card>
		</div>
	);
};

export default RemoveAccount;
