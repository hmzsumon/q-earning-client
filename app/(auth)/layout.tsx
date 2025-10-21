import HomeFooter from '@/components/Layouts/HomeFooter';
import UserNavbar from '@/components/Layouts/UserNavbar';
import UserSidebar from '@/components/Layouts/UserSidebar';
import VantaBackground from '@/components/VantaBackground';
import React from 'react';

const AuthLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='relative min-h-screen overflow-hidden'>
			<UserNavbar />
			<div className=' grid md:grid-cols-10 pt-14 '>
				<div className=' hidden md:block md:col-span-2'>
					<UserSidebar />
				</div>
				{/* Background Layer */}

				<div className=' md:col-span-8 home-wrapper   w-full '>{children}</div>
			</div>
			<HomeFooter />
		</div>
	);
};

export default AuthLayout;
