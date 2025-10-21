'use client';
import {
	useCreatePackageMutation,
	useGetPackageByIdQuery,
} from '@/redux/features/package/packageApi';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Package } from '@/types/types';
import { Card, Spinner } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';

const PackageDetails = ({ params }: any) => {
	const router = useRouter();
	const packageId = params.packageId;

	const { user } = useSelector((state: any) => state.auth);

	// useEffect(() => {
	// 	if (user?.sales_condition) {
	// 		router.push('/sales-condition');
	// 	}
	// }, [user]);

	const { data, isLoading, isError, isSuccess, error } =
		useGetPackageByIdQuery(packageId);

	const { package: packageData } = data || { package: {} };

	const [sPackage, setSPackage] = useState<Package | null>(null);

	useEffect(() => {
		if (isSuccess) {
			setSPackage(packageData);
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
			setSPackage(null);
		}
	}, [isSuccess, packageData, isError, error]);

	// call create package mutation
	const [
		createPackage,
		{
			isLoading: isCreating,
			isError: isCreatingError,
			isSuccess: isCreateSuccess,
			error: createError,
		},
	] = useCreatePackageMutation();

	// handle create package
	const handleCreatePackage = async (packageId: any) => {
		const data = {
			packageId,
		};
		createPackage(data);
	};

	// useEffect for create package
	useEffect(() => {
		if (isCreateSuccess) {
			toast.success('Package created successfully');
			router.push('/investment/my-package');
		}
		if (isCreatingError) {
			toast.error((createError as fetchBaseQueryError).data?.message);
			if ((createError as fetchBaseQueryError).status === 420) {
				router.push('/deposit/binance-pay');
			}
		}
	}, [isCreateSuccess, isCreatingError, createError]);

	let content;

	if (isLoading) {
		content = (
			<div className='text-center flex items-center justify-center h-[60vh]'>
				<Spinner aria-label='Center-aligned spinner example' size='xl' />
			</div>
		);
	}

	if (sPackage === null || isError) {
		content = (
			<div className='text-center flex items-center justify-center h-[60vh]'>
				<Spinner aria-label='Center-aligned spinner example' size='xl' />
			</div>
		);
	}

	if (!isLoading && sPackage) {
		content = (
			<div className=' p-4 tracking-tight text-gray-700 w-full md:w-6/12 mx-auto '>
				<h2 className=' text-xl font-medium text-gray-200 my-4 text-center'>
					Your selected package is:{' '}
					<span className='text-xl  font-semibold text-gray-200  '>
						{sPackage.title}
					</span>
				</h2>
				<Card className='w-full '>
					<h5 className='text-xl  font-semibold text-center text-gray-700  '>
						{sPackage.title}
					</h5>
					<div className='flex items-baseline gap-1 '>
						<span className='text-2xl font-extrabold tracking-tight '>
							Price:{' '}
							{Number(sPackage.price).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</span>
						<span>USDT</span>
					</div>
					<ul className='my-4 space-y-4'>
						<li className='flex space-x-3'>
							<svg
								className='h-5 w-5 shrink-0 text-cbc-orange dark:text-icm-green-500'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='text-base font-normal leading-tight text-gray-700 dark:text-gray-400'>
								Tasks/Day - {sPackage.daily_tasks}
							</span>
						</li>
						<li className='flex space-x-3'>
							<svg
								className='h-5 w-5 shrink-0 text-cbc-orange dark:text-cyan-500'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='text-base font-normal leading-tigh700 dark:text-gray-400'>
								Tasks Value - {sPackage.tasks_value}
							</span>
						</li>

						<li className='flex space-x-3'>
							<svg
								className='h-5 w-5 shrink-0 text-cbc-orange dark:text-cyan-500'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='text-base font-normal leading-tigh700 dark:text-gray-400'>
								Return/Day - {sPackage.daily_return}${' '}
							</span>
						</li>
						<li className='flex space-x-3'>
							<svg
								className='h-5 w-5 shrink-0 text-cbc-orange dark:text-cyan-500'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='text-base font-normal leading-tight dark:text-gray-400'>
								Return Percent - ${sPackage.return_percent}
							</span>
						</li>

						<li className='flex space-x-3'>
							<svg
								className='h-5 w-5 shrink-0 text-cbc-orange dark:text-cyan-500'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='text-base font-normal leading-tight dark:text-gray-400'>
								Total Return - ${sPackage.total_return}$
							</span>
						</li>
					</ul>
					<button
						type='button'
						className='inline-flex w-full justify-center rounded-lg bg-cbc-orange px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={() => handleCreatePackage(sPackage._id)}
						disabled={isCreating}
					>
						{isCreating ? (
							<PulseLoader color='#fff' size={8} margin={2} />
						) : (
							'Activate Now'
						)}
					</button>
					<Link href='/investment' passHref>
						<button
							type='button'
							className='inline-flex w-full justify-center rounded-lg bg-orange-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none   '
						>
							Change Plan
						</button>
					</Link>
				</Card>
			</div>
		);
	}

	return <div>{content}</div>;
};

export default PackageDetails;
