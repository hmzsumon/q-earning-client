'use client';
import { Card } from 'flowbite-react';
import React from 'react';

const SalesCondition = () => {
	return (
		<div className='pt-10 px-4 h-screen  text-gray-900 dark:bg-gray-900 dark:text-gray-200 '>
			<Card className=''>
				<h5 className='text-3xl font-extrabold tracking-wide text-orange-500 dark:text-orange-400 text-center'>
					Sales Condition
				</h5>
				<p className='mt-4 text-lg font-medium text-gray-800 dark:text-gray-300'>
					We would like to inform all existing users about an important update
					to the sales requirements. Each existing user is now required to
					contribute a minimum of{' '}
					<span className='font-semibold text-orange-500'>300 USDT</span> in
					sales to their respective teams.
				</p>
				<hr className='my-4 border-gray-300 dark:border-gray-700' />
				<p className='mt-2 text-lg text-gray-700 dark:text-gray-400'>
					<span className='font-semibold text-orange-500'>Please Note:</span>{' '}
					This condition applies solely to existing users. New users are exempt
					from this requirement.
				</p>
			</Card>
		</div>
	);
};

export default SalesCondition;
