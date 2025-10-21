import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from './StoreProvider';
import AdSense from '@/components/AdSense';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Quick Earning ',
	description:
		'Quick Earning is a platform that provides the latest information on online earning, digital marketing, and technology. We aim to help you stay updated with the latest trends and tips to maximize your online income.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className} suppressHydrationWarning={true}>
				<StoreProvider>{children}</StoreProvider>
				<ToastContainer
					autoClose={2000}
					position='bottom-center'
					theme='colored'
				/>

				{/* {process.env.NODE_ENV === 'production' && <FacebookMsg />} */}
				<script
					src='//code.tidio.co/c08duslbkgzjqdcpxevlusrfrisftby5.js'
					async
				></script>
			</body>
		</html>
	);
}
