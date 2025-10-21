'use client';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/baseUrl';
import { Button, Drawer, Accordion } from 'flowbite-react';

import {
	useGetNotificationsQuery,
	useUpdateNotificationMutation,
	useUpdateNotificationStatusMutation,
} from '@/redux/features/notify/notificationApi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';

const Notification = () => {
	const { user } = useSelector((state: any) => state.auth);

	const { data, isLoading, isSuccess, isError, error, refetch } =
		useGetNotificationsQuery(undefined);

	const [
		updateNotificationStatus,
		{
			isLoading: isUpdating,
			isError: isUpdatingError,
			isSuccess: isUpdatingSuccess,
			error: updatingError,
		},
	] = useUpdateNotificationStatusMutation();

	// handle update notification
	const handleUpdateNotification = async () => {
		setIsOpen(true);
	};

	const [loadUser, setLadUser] = useState(false);

	useLoadUserQuery(undefined, {
		skip: !loadUser,
	});

	const { notifications } = data || [];
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);
	const [count, setCount] = useState(0);
	const [open, setOpen] = useState(false);
	const [openNotificationId, setOpenNotificationId] = useState(null);
	// set count 9+ if count is greater than 9
	const notificationCount = count > 99 ? '99+' : count;
	useEffect(() => {
		if (isSuccess) {
			setCount(notifications?.length);
		}
	}, [isSuccess, notifications]);

	useEffect(() => {
		if (!isOpen && notifications?.length > 0) {
			updateNotificationStatus(undefined);
		}
	}, [isOpen]);

	// handle open notification
	const handleOpenNotification = (notificationId: any) => {
		setOpen(!open);
		setOpenNotificationId(
			notificationId === openNotificationId ? null : notificationId
		);
	};

	// socket connection
	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl, {
			transports: ['websocket', 'polling'],
		});

		socket.on('connect', () => {
			console.log('connected');
		});
		socket.on('user-notification', (notification: any) => {
			// console.log('notification', notification);
			if (notification?.user_id === user?._id) {
				// console.log('Socket ', notification);
				setLadUser(true);
				refetch();
			}
		});

		socket.on('disconnect', () => {
			console.log('disconnected');
		});

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<div className='dark'>
			<div className='relative'>
				{/* Page content here */}

				<IoMdNotifications
					className='text-3xl text-white cursor-pointer '
					onClick={handleUpdateNotification}
				/>

				{count > 0 && (
					<span
						className={`bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center p-1 absolute -top-1 -right-1 cursor-pointer ${
							count > 99 ? 'text-[.6rem]' : 'text-[.7rem]'
						}`}
						onClick={() => setIsOpen(true)}
					>
						{notificationCount}
					</span>
				)}
			</div>

			<Drawer
				open={isOpen}
				onClose={handleClose}
				position='right'
				className='px-0'
			>
				<Drawer.Header
					className='text-center'
					title='Notifications'
					titleIcon={() => (
						<>
							<IoMdNotifications className='text-xl  cursor-pointer mr-3' />
						</>
					)}
				/>
				<hr />
				<Drawer.Items className=''>
					{notifications?.length > 0 ? (
						<ul className=' rounded-none'>
							{notifications?.map((notification: any) => (
								<li
									key={notification._id}
									className='  px-4  py-2 border-b cursor-pointer text-gray-50 hover:bg-gray-600'
									onClick={() => handleOpenNotification(notification._id)}
								>
									<div className='flex items-center justify-between'>
										<p className='text-gray-50'>{notification.title}</p>
										<MdKeyboardArrowDown
											className={` text-2xl ${
												openNotificationId === notification._id
													? ' rotate-180 transition-transform  duration-150 ease-in-out'
													: ''
											}`}
										/>
									</div>
									{openNotificationId === notification._id && (
										<div className=' text-left text-xs'>
											<p>
												{notification.message.length > 50
													? notification.message.substring(0, 50) + '...'
													: notification.message}
											</p>
										</div>
									)}
								</li>
							))}
						</ul>
					) : (
						<div>
							<Image
								src='/no-notifications.webp'
								width={200}
								height={200}
								alt='No-notification'
								className='mx-auto my-4'
							/>
							<p className='text-center text-gray-500'>No notifications</p>
						</div>
					)}
				</Drawer.Items>
			</Drawer>
		</div>
	);
};

export default Notification;
