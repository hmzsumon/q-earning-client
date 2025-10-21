'use client';
import React from 'react';
import PricingCard from '@/components/Packages/PricingCard';
import { useGetUserPackagesQuery } from '@/redux/features/package/packageApi';
import { Card } from 'flowbite-react';
import RingLoader from 'react-spinners/RingLoader';
import MyPackageCard from '@/components/Packages/MyPackageCard';
const MyPackage = () => {
	const { data, isLoading, isSuccess, isError, error } =
		useGetUserPackagesQuery(undefined);

	const { userPackages } = data || { userPackages: [] };
	console.log(userPackages);
	return (
		<div className='p-4'>
			{isLoading ? (
				<div className='flex items-center justify-center h-[50vh] w-full'>
					<RingLoader color='#34E834' size={100} />
				</div>
			) : (
				<div className='w-full md:w-7/12 mx-auto'>
					{userPackages.length > 0 ? (
						<div className='w-full '>
							<h5 className='text-xl font-semibold text-center text-gray-200 my-4'>
								Your package
							</h5>
							{userPackages.map((p: any) => (
								<MyPackageCard pac={p} key={p._id} />
							))}
						</div>
					) : (
						<div className=' h-[50vh] flex items-center justify-center'>
							<div className='text-center bg-icm-green rounded-md py-3 px-6 '>
								<p className='text-primary text-xs font-bold'>
									You have no package yet!
								</p>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default MyPackage;
