import React from 'react';
import { FaCoins, FaUser, FaUsers } from 'react-icons/fa6';

const RankDataCard = ({ rankData, rank }: any) => {
	return (
		<div className='my-2 '>
			<div className=' bg-gray-100 rounded p-2'>
				<h2 className=' text-center text-xl font-bold capitalize text-gray-800'>
					My Rank: {rank}
				</h2>

				<div className=' my-3 space-y-2'>
					<div className='grid grid-cols-6'>
						<h4 className=' col-span-3'>Direct Refer users</h4>
						<p className=' col-span-1'>:</p>
						<p className=' col-span-1 flex items-center gap-2'>
							{rankData?.directReferUsers || 0} <FaUser />
						</p>
					</div>

					<div className='grid grid-cols-6'>
						<h4 className=' col-span-3'>Total team Members</h4>
						<p className=' col-span-1'>:</p>
						<p className=' col-span-1 flex items-center gap-2'>
							{rankData?.teamMembers || 0} <FaUsers />
						</p>
					</div>

					<div className='grid grid-cols-6'>
						<h4 className=' col-span-3'>Sales Amount</h4>
						<p className=' col-span-1'>:</p>
						<p className=' col-span-1'>
							{rankData?.salesValue ? `${rankData?.salesValue}$` : '$0'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RankDataCard;
