import RubyIcon from '@/lib/RubyIcon';
import StarIcon from '@/lib/StarIcon';
import { Card } from 'flowbite-react';
import React from 'react';
import { FaCoins, FaUser, FaUsers } from 'react-icons/fa6';

function convertToK(num: number) {
	if (num >= 1000) {
		return Math.floor(num / 1000) + 'k'; // No decimals
	}
	return num.toString();
}

const RankCard = ({ item, amount }: any) => {
	return (
		<div className='my-4'>
			<div className=' bg-gray-100 rounded my-2'>
				<div className=' flex items-center justify-between gap-2 p-2'>
					{/* Start Icon */}
					<div className='space-y-2'>
						<h2 className='text-center text-xs font-bold'>{item.title}</h2>
						<div className='flex items-center justify-start gap-1'>
							{item.icon}
						</div>
					</div>
					{/* End Icon */}
					<div className='space-y-2'>
						<p className='text-xs font-bold '>{item.deposit}</p>
						<div className='flex items-center justify-between gap-2'>
							<div className='flex items-center text-xs gap-2 font-bold'>
								<FaUser /> {item.user}
							</div>
							<div className='flex items-center text-xs gap-2 font-bold '>
								<FaUsers /> {item.users}
							</div>
						</div>

						<div>
							<div className='flex items-center text-xl justify-center gap-2 font-bold mt-2'>
								<FaCoins />{' '}
								{item.salary > 0 ? `${item.salary}$` : item.s_salary}
							</div>
						</div>
					</div>
					<div className='space-y-4'>
						<button
							className=' bg-orange-500 p-2 rounded text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={!item.is_active}
						>
							{item.is_active ? 'Available' : 'Unavailable'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RankCard;
