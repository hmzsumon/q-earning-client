'use client';
import React from 'react';
import { Accordion } from 'flowbite-react';
import { FaHandHoldingUsd, FaUsers } from 'react-icons/fa';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
import { useGet5LevelTeamQuery } from '@/redux/features/auth/authApi';
import { formatBalance } from '@/lib/functions';
import PartnerTable from './PartnerTable';

const Generations = () => {
	const {
		data: levelData,
		isLoading: isLevelDataLoading,
		isError: isErrorLevelData,
		isSuccess: isSuccessLevelData,
		error: errorLevelData,
	} = useGet5LevelTeamQuery(undefined);

	const levels = [
		{ data: levelData?.level_01_data, label: '1st' },
		{ data: levelData?.level_02_data, label: '2nd' },
		{ data: levelData?.level_03_data, label: '3rd' },
		{ data: levelData?.level_04_data, label: '4th' },
		{ data: levelData?.level_05_data, label: '5th' },
		{ data: levelData?.level_06_data, label: '6th' },
		{ data: levelData?.level_07_data, label: '7th' },
		{ data: levelData?.level_08_data, label: '8th' },
		{ data: levelData?.level_09_data, label: '9th' },
		{ data: levelData?.level_10_data, label: '10th' },
	];

	return (
		<div>
			<h2 className='text-xl font-bold text-gray-200 my-4'>
				Your Team Members
			</h2>
			<Accordion>
				{levels.map((level, index) => (
					<Accordion.Panel key={index}>
						<Accordion.Title>
							<div className='flex gap-8 items-center text-green-400'>
								<p className='flex items-center gap-1'>
									<BiLogoMicrosoftTeams />
									<span>{level.label}</span> Generation
								</p>

								<p className='flex items-center gap-1'>
									<FaUsers />
									{level.data?.count || 0}
								</p>
								<p className='flex items-center gap-1'>
									<FaHandHoldingUsd />
									{formatBalance(level.data?.earning || 0)}$
								</p>
							</div>
						</Accordion.Title>
						<Accordion.Content>
							<div className='h-auto'>
								<PartnerTable data={level.data?.users} />
							</div>
						</Accordion.Content>
					</Accordion.Panel>
				))}
			</Accordion>
		</div>
	);
};

export default Generations;
