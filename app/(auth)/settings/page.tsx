'use client';
import CardWrapper from '@/components/Settings/CardWrapper';
import SecuritySetting from '@/components/Settings/SecuritySetting';
import TopCard from '@/components/Settings/TopCard';
import TradingConditions from '@/components/Settings/TradingConditions';
import TradingTerminals from '@/components/Settings/TradingTerminals';
import React from 'react';

const Settings = () => {
	return (
		<div className=' px-4 py-5'>
			<div className=' space-y-4'>
				<div>
					<CardWrapper />
				</div>
			</div>
		</div>
	);
};

export default Settings;
