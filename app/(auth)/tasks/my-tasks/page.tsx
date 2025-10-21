'use client';
import React, { useState, useEffect, use } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import {
	useCompleteTaskMutation,
	useGetMyTasksQuery,
} from '@/redux/features/tasks/tasksApi';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';

const MyTasks = () => {
	const router = useRouter();
	// Load user
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const { data, error, isLoading, isSuccess } = useGetMyTasksQuery(undefined);
	const dailyTasks = data?.dailyTasks || {};

	// useEffect(() => {
	// 	if (user?.sales_condition) {
	// 		router.push('/sales-condition');
	// 	}
	// }, [user]);

	// call completeTask mutation here
	const [
		completeTask,
		{
			isSuccess: c_isSuccess,
			isLoading: c_isLoading,
			isError: c_isError,
			error: c_error,
		},
	] = useCompleteTaskMutation();
	// useEffect for completeTask mutation
	useEffect(() => {
		if (c_isSuccess) {
			toast.success('Task completed successfully');
		}
		if (c_isError) {
			toast.error((c_error as fetchBaseQueryError).data?.message);
		}

		return () => {};
	}, [c_isSuccess, c_isError, c_error]);

	const handleClick = (task: any) => {
		// console.log('task', task);
		const body = { taskId: task.id };
		completeTask(body);
	};

	return (
		<div className='text-gray-200 my-4 px-4'>
			<div className='my-4 space-y-3'>
				<h1 className='text-2xl font-bold text-center'>
					Balance: {user?.m_balance?.toFixed(2) || 0}$
				</h1>
				<h1 className='text-2xl font-bold text-center'>
					My Tasks: {dailyTasks?.tasks?.length > 0 && dailyTasks?.tasks?.length}
				</h1>
			</div>

			<div>
				{isLoading ? (
					<div>
						<PulseLoader color='#fff' loading={true} size={10} />
					</div>
				) : (
					<div>
						{dailyTasks?.tasks?.length > 0 ? (
							<div className='grid md:flex md:flex-wrap grid-cols-1 gap-4'>
								{dailyTasks?.tasks?.map((task: any, i: any) => (
									<div key={i} className='w-full'>
										<img
											src={task?.url}
											width={100}
											height={50}
											alt='task'
											className='w-[100%] md:w-[70%] rounded-t-lg mx-auto'
										/>

										<div className='w-full md:w-[70%] mx-auto'>
											<button
												className='bg-cbc-orange text-white px-4 py-2 w-full rounded-b-lg text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed'
												onClick={() => handleClick(task)}
												disabled={c_isLoading}
											>
												{c_isLoading ? 'Completing...' : 'Complete Task'}
											</button>
										</div>
									</div>
								))}
							</div>
						) : (
							<div>
								<h1 className='text-center'>No Task Available</h1>
								{dailyTasks?.is_completed && (
									<Image
										src='/done.gif'
										alt='done'
										width={100}
										height={100}
										className='mx-auto w-[100%] md:w-[70%] rounded-lg'
									/>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default MyTasks;
