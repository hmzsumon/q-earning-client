'use client';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetMyRankRecordQuery } from '@/redux/features/rank/rankApi';
import RankCard from '@/components/RankAndRewards/RankCard';
import RankDataCard from '@/components/RankAndRewards/RankDataCard';
import GridLoader from 'react-spinners/GridLoader';

import SilverIcon from '@/lib/SilverIcon';
import BronzeIcon from '@/lib/BronzeIcon';
import GoldIcon from '@/lib/GoldIcon';
import RubyIcon from '@/lib/RubyIcon';
import RoyaltyIcon from '@/lib/RoyaltyIcon';

const RankAndReward = () => {
	const { user = {} } = useSelector((state: any) => state.auth);
	const { data = {}, isLoading } = useGetMyRankRecordQuery(undefined);
	const { rankData = {} } = data;

	// Titan rank condition
	const titanCondition = { directRefer: 10, teamMembers: 50, salesValue: 5000 };
	const isTitanCondition = useMemo(
		() =>
			rankData.directReferUsers >= titanCondition.directRefer &&
			rankData.teamMembers >= titanCondition.teamMembers &&
			rankData.salesValue >= titanCondition.salesValue,
		[rankData]
	);

	// Define rank items
	const rankItems = useMemo(
		() => [
			{
				id: 1,
				title: 'Gold',
				deposit: 'Over 5,000$ Team Deposit.',
				salary: 200,
				icon: <SilverIcon width={45} height={45} />,
				target: 5000,
				is_active: isTitanCondition,
				user: 10,
				users: 50,
			},
			{
				id: 2,
				title: 'Platinum',
				deposit: 'Over 10,000$ Team Deposit.',
				salary: 500,
				icon: <BronzeIcon width={50} height={50} />,
				target: 10000,
				is_active: false,
				user: 12,
				users: 100,
			},
			{
				id: 3,
				title: 'Diamond',
				deposit: 'Over 20,000$ Team Deposit.',
				salary: 2000,
				icon: <GoldIcon width={50} height={50} />,
				target: 20000,
				is_active: false,
				user: 15,
				users: 150,
			},
			{
				id: 4,
				title: 'Ambassador',
				deposit: 'Over 50,000$ Team Deposit.',
				salary: 5000,
				icon: <RubyIcon width={50} height={50} />,
				target: 50000,
				is_active: false,
				user: 18,
				users: 200,
			},
			{
				id: 5,
				title: 'Crown Ambassador',
				deposit: 'Over 100,000$ Team Deposit.',
				salary: 10000,
				icon: <RoyaltyIcon width={50} height={50} />,
				target: 100000,
				is_active: false,
				user: 20,
				users: 250,
			},
		],
		[isTitanCondition]
	);

	return (
		<div className='p-2 pb-20'>
			<h1 className='text-center text-xl font-semibold text-gray-200'>
				Rank and Reward
			</h1>
			{isLoading ? (
				<div className='flex justify-center my-4'>
					<GridLoader size={25} color='#fff' />
				</div>
			) : (
				<div>
					<div className='my-4'>
						<h2 className='ml-1 text-gray-50'>My Rank Record:</h2>
						<RankDataCard rankData={rankData} rank={user.rank} />
					</div>
					<div>
						{rankItems.map((item) => (
							<RankCard key={item.id} item={item} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default RankAndReward;
