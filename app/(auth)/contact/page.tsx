import ContactUsBanner from '@/components/Contact/ContactUsBanner';
import { Card } from 'flowbite-react';
import React from 'react';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';

const Contact = () => {
	return (
		<div>
			<ContactUsBanner />
			<div className='pb-8'>
				{/* Start Upper */}
				<div className=' px-4 w-full md:w-9/12 mx-auto'>
					<div className='  gap-4 my-8'>
						{/* <Card>
							<div className=' flex items-center justify-center'>
								<Card className=' w-20 h-20 rounded-full  flex items-center justify-center'>
									<BiSolidPhoneCall className=' text-icm-green text-3xl' />
								</Card>
							</div>
							<h2 className=' text-2xl font-bold text-gray-800 text-center'>
								Call Us
							</h2>
							<div className=' list-none'>
								<li className=' text-center flex flex-col'>
									<span>
										General:{' '}
										<a
											className='text-gray-800 font-bold'
											href='tel:+234-547-456-3245'
										>
											+1(226)906-0895
										</a>
									</span>
									<small className=' text-xs'>
										(International charges may apply)
									</small>
								</li>
							</div>
						</Card> */}
						<Card className=' w-full  mx-auto p-4 text-gray-800 bg-transparent border border-cbc-orange rounded-lg'>
							<div className=' flex items-center justify-center'>
								<Card className=' w-20 h-20 rounded-full  flex items-center justify-center'>
									<MdEmail className=' text-cbc-orange text-3xl' />
								</Card>
							</div>
							<h2 className=' text-2xl font-bold text-gray-100 text-center'>
								Our Email
							</h2>
							<div className=' list-none'>
								<li className=' text-center '>
									<span className='font-bold text-xs text-gray-100'>
										Support:{' '}
										<a
											className='text-gray-200 font-semibold '
											href='mailto:support@quickerning.com'
										>
											support@quickerning.com
										</a>
									</span>
								</li>
								<li className=' text-center flex flex-col'>
									<span className='font-bold text-xs text-gray-100'>
										Accounts:{' '}
										<a
											className='text-gray-200 font-semibold '
											href='support@quickerning.com'
										>
											service@quickerning.com
										</a>
									</span>
								</li>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
