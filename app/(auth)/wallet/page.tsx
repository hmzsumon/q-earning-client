'use client';
import React from 'react';
import { IoMdLock } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';

const Wallet = () => {
	return (
		<div className=' px-2 py-4'>
			<h3 className='text-[1.25rem] text-slate-800 font-semibold '>
				My Wallet
			</h3>
			<div className=' my-4'>
				<div className='border rounded-lg w-full duration-300 verification-card '>
					<div className='p-4 border-b flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<img className='' src='/assets/images/binance.svg' alt='' />
							<h3 className='text-lg text-black font-medium'>Main Wallet</h3>
						</div>
						<div className=''>
							<div
								className=''
								data-tooltip-id='unavialble'
								data-tooltip-content='You need complete the verification'
								data-tooltip-place='bottom'
								data-tooltip-class-name='custom-tooltip'
							>
								<p className='flex items-center gap-1 rounded-xl secondary-bg px-2 py-1 text-sm text-[#745500]'>
									<span>201</span>
									<span>Unavilable</span>
									<Tooltip id='unavialble' />
								</p>
							</div>
						</div>
					</div>
					<div className='p-4 text-sm font-light'>
						<p>
							Processing time{' '}
							<span className='text-black font-normal'>
								instant - 30 minutes
							</span>
						</p>
						<p>
							Fee <span className='text-black font-normal'>0%</span>
						</p>
						<p>
							Limits{' '}
							<span className='text-black font-normal'>1 - 20,000 USD</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Wallet;
