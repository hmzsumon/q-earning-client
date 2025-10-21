import React from 'react';
import { Card } from 'flowbite-react';
import { BiSolidUserDetail } from 'react-icons/bi';
import {
	MdOutlinePayment,
	MdPersonRemoveAlt1,
	MdSecurity,
	MdVerified,
} from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

const cardItems = [
	{
		id: 1,
		title: 'Personal Details',
		Icon: <BiSolidUserDetail />,
		link: '/settings/personal-details',
	},
	{
		id: 2,
		title: 'Password and Security',
		Icon: <MdSecurity />,
		link: '/settings/password-and-security',
	},
	// {
	// 	id: 3,
	// 	title: 'Payment Methods',
	// 	Icon: <MdOutlinePayment />,
	// 	link: '/settings/payment-methods',
	// },
	// {
	// 	id: 4,
	// 	title: 'Verification',
	// 	Icon: <MdVerified />,
	// 	link: '/settings/verification',
	// },
];

const CardWrapper = () => {
	return (
		<div>
			<Card href='#' className='w-full'>
				<div>
					<h2 className=' text-gray-700 font-semibold'>Accounts Center</h2>
					<p className='text-gray-400 text-sm'>
						Manage your connected accounts and settings.
					</p>
				</div>
				<div className='space-y-3'>
					{cardItems.map((item) => (
						<Card key={item.id} href={item.link} className=''>
							<div className='flex items-center gap-3 '>
								<span className='text-2xl border-4 p-2 rounded-full '>
									{item.Icon}
								</span>
								<div className='space-y-1'>
									<p className='text-sm font-semibold   text-primary'>
										{item.title}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Card>

			<div className='my-4'>
				<Link href='/settings/remove-account'>
					<Card className=''>
						<div className='flex items-center gap-3 '>
							<span className='text-2xl border-4 p-2 rounded-full text-black'>
								{<MdPersonRemoveAlt1 />}
							</span>
							<div className='space-y-1'>
								<p className='text-[12px] font-medium text-primary'>
									Remove Account
								</p>
							</div>
						</div>
					</Card>
				</Link>
			</div>
		</div>
	);
};

export default CardWrapper;
