'use client';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/icon.png';
import UserImg from '@/public/user.png';
import SmallDeviceDrawer from './SmallDeviceDrawer';
import { useSelector } from 'react-redux';
import { FcMoneyTransfer } from 'react-icons/fc';
import Notification from './Notification';
import CopyToClipboard from '@/lib/CopyToClipboard';
import { useRouter } from 'next/navigation';
import {
	useLoadUserQuery,
	useLogoutUserMutation,
} from '@/redux/features/auth/authApi';
import { useEffect } from 'react';

const UserNavbar = () => {
	useLoadUserQuery();
	const router = useRouter();
	const [logout, { data, isLoading, isSuccess, isError, error }] =
		useLogoutUserMutation();

	const { user } = useSelector((state: any) => state.auth);

	// handle logout
	const handleLogout = async () => {
		logout(undefined);
		router.push('/');
		Cookies.remove('icm-token');
	};

	// useEffect to handle success
	useEffect(() => {
		if (isSuccess) {
			toast.success('Logout successful');
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<Navbar
			fluid
			rounded
			className=' fixed w-full rounded-none bg-cbc-black z-40 border-b-2 border-gray-700'
		>
			<div className=' md:hidden '>
				{/*Start Small Device drawer content here */}
				<SmallDeviceDrawer />
				{/*End Small Device drawer content here */}
			</div>
			<Navbar.Brand>
				<div className='md:flex items-center gap-2 lg:navbar-start navbar-center'>
					<Link href='/dashboard' className='flex items-center gap-2'>
						<Image src={Logo} alt='ClickByCash' width={25} height={25} />
						<h2 className=' text-xl uppercase fon-bold text-cbc-orange'>
							Quickearning
						</h2>
					</Link>
				</div>
			</Navbar.Brand>

			{/* <div className=' hidden md:block'>
				<div className=' text-gray-100 flex items-center gap-2 md:text-xl '>
					<FcMoneyTransfer />
					{Number(user?.m_balance).toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}{' '}
					USDT
				</div>
			</div> */}

			<div className=' flex items-center justify-between gap-6'>
				{/*Start Notification Nav Item  */}
				<div className=' '>
					<Notification />
				</div>
				{/*End Notification Nav Item  */}

				{/* Start  Dropdown */}
				<Dropdown
					arrowIcon={false}
					className=''
					inline
					label={
						<Avatar
							alt='User settings'
							img='https://i.ibb.co/1rkfT6y/user-1.png'
							rounded
						/>
					}
				>
					<Dropdown.Header className='space-y-1'>
						<span className='block text-sm'>{user?.name}</span>
						<span className='block truncate text-sm font-medium'>
							{user?.email}
						</span>
						<span className=' flex text-left col-span-5 text-[#73787C] font-semibold '>
							User ID: {user?.customer_id}
							<CopyToClipboard text={user?.customer_id} />
						</span>
					</Dropdown.Header>
					<Dropdown.Item className=' flex flex-col text-xs'>
						<div className=' text-gray-700 flex  gap-2 font-bold '>
							<p>M Balance:</p>
							{Number(user?.m_balance).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}{' '}
							USDT
						</div>
						<div className=' text-gray-700 flex  gap-2 font-bold '>
							<p>G Balance:</p>
							{Number(user?.m_balance).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}{' '}
							USDT
						</div>
					</Dropdown.Item>

					<Dropdown.Divider />
					<Dropdown.Item
						onClick={handleLogout}
						className=' flex items-center justify-center text-white font-semibold p-0 '
					>
						<button className=' bg-cbc-orange flex items-center justify-center text-white font-semibold hover:bg-orange-400 w-full py-1 '>
							<span className='text-center'>Sign out</span>
						</button>
					</Dropdown.Item>
				</Dropdown>
			</div>
		</Navbar>
	);
};

export default UserNavbar;
