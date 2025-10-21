'use client';

import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import {
	HiChartPie,
	HiClipboard,
	HiCollection,
	HiInformationCircle,
	HiLogin,
	HiPencil,
	HiSearch,
	HiShoppingBag,
	HiUsers,
} from 'react-icons/hi';
import navItems from '@/lib/navItems';
import Link from 'next/link';
import Image from 'next/image';
import UserSidebar from './UserSidebar';
import Logo from '@/public/icon.png';
const SmallDeviceDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	return (
		<>
			<div className='flex  items-center justify-center md:hidden'>
				<span onClick={() => setIsOpen(true)}>
					<FaBars className=' text-3xl text-white' />
				</span>
			</div>
			<Drawer
				open={isOpen}
				onClose={handleClose}
				className=' bg-gray-800 px-0 '
			>
				<Drawer.Header
					className='text-center border-b border-gray-600'
					title=''
					titleIcon={() => (
						<>
							<Link className='flex items-center   mt-2' href='/'>
								<Image src={Logo} alt='ClickByCash' width={25} height={25} />
								<h2 className=' text-xl uppercase fon-bold text-cbc-orange'>
									Quickearning
								</h2>
							</Link>
						</>
					)}
				/>
				<Drawer.Items className=' h-full'>
					<UserSidebar handleClose={handleClose} />
				</Drawer.Items>
			</Drawer>
		</>
	);
};

export default SmallDeviceDrawer;
