import HomeFooter from '@/components/Layouts/HomeFooter';
import HomeNavbar from '@/components/Layouts/HomeNavbar';
import VantaBackground from '@/components/VantaBackground';
import React from 'react';

const HomeLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='relative min-h-screen overflow-hidden'>
			{/* Navbar */}
			<HomeNavbar />

			{/* Background Layer */}
			{/* <div className='absolute inset-0 -z-10'>
				<VantaBackground />
			</div> */}

			{/* Main Content Over Background */}

			<main className='home-wrapper'>{children}</main>

			{/* Footer */}
			<HomeFooter />
		</div>
	);
};

export default HomeLayout;
