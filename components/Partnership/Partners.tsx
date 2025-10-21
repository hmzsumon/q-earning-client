'use client';
import React from 'react';
import { Accordion } from 'flowbite-react';
import { FaHandHoldingUsd, FaUsers } from 'react-icons/fa';
import { SiLevelsdotfyi } from 'react-icons/si';
import PartnerTable from './PartnerTable';
import { useGet3LevelTeamQuery } from '@/redux/features/auth/authApi';
import { formatBalance } from '@/lib/functions';
const Partners = () => {
	const {
		data: levelData,
		isLoading: isLevelDataLoading,
		isError: isErrorLevelData,
		isSuccess: isSuccessLevelData,
		error: errorLevelData,
	} = useGet3LevelTeamQuery(undefined);
	const { level_01_data, level_02_data, level_03_data } = levelData || {};

	return (
		<div className=' text-gray-200'>
			<h2 className='text-xl font-bold text-gray-200 my-4'>Your Friends</h2>
			<Accordion
				flush={true}
				className='bg-transparent border border-cbc-blue rounded-lg dark'
			>
				<Accordion.Panel>
					<Accordion.Title>
						<div className='flex gap-8 items-center  text-gray-200 '>
							<p className=' flex items-center gap-1'>
								<SiLevelsdotfyi />
								level 01
							</p>

							<p className=' flex items-center gap-1'>
								<FaUsers />
								{level_01_data?.count || 0}
							</p>
							<p className=' flex items-center gap-1'>
								<FaHandHoldingUsd />
								{formatBalance(level_01_data?.earning || 0)} USDT
							</p>
						</div>
					</Accordion.Title>
					<Accordion.Content>
						<div className=' h-auto'>
							<PartnerTable data={level_01_data?.users} />
						</div>
					</Accordion.Content>
				</Accordion.Panel>
				<Accordion.Panel>
					<Accordion.Title>
						<div className='flex gap-8 items-center text-gray-200 '>
							<p className=' flex items-center gap-1'>
								<SiLevelsdotfyi />
								level 02
							</p>

							<p className=' flex items-center gap-1'>
								<FaUsers />
								{level_02_data?.count || 0}
							</p>
							<p className=' flex items-center gap-1'>
								<FaHandHoldingUsd />
								{formatBalance(level_02_data?.earning || 0)} USDT
							</p>
						</div>
					</Accordion.Title>
					<Accordion.Content>
						<div className=' h-auto'>
							<PartnerTable data={level_02_data?.users} />
						</div>
					</Accordion.Content>
				</Accordion.Panel>
				<Accordion.Panel>
					<Accordion.Title>
						<div className='flex gap-8 items-center text-gray-200 '>
							<p className=' flex items-center gap-1'>
								<SiLevelsdotfyi />
								level 03
							</p>

							<p className=' flex items-center gap-1'>
								<FaUsers />
								{level_03_data?.count || 0}
							</p>
							<p className=' flex items-center gap-1'>
								<FaHandHoldingUsd />
								{formatBalance(level_03_data?.earning || 0)} USDT
							</p>
						</div>
					</Accordion.Title>
					<Accordion.Content>
						<div className=' h-auto'>
							<PartnerTable data={level_03_data?.users} />
						</div>
					</Accordion.Content>
				</Accordion.Panel>
			</Accordion>
		</div>
	);
};

export default Partners;
