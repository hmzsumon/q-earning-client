import Login from '@/components/Login/Login';
import HomeLayout from './(home)/layout';
import VantaBackground from '@/components/VantaBackground';
export default function Home() {
	return (
		<HomeLayout>
			<div className='relative'>
				<div className='py-10 px-4 mx-auto md:w-6/12'>
					<Login />
				</div>
			</div>
		</HomeLayout>
	);
}
