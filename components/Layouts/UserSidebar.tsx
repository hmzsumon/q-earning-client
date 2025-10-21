'use client';

import { Button, CustomFlowbiteTheme, Sidebar } from 'flowbite-react';
import Link from 'next/link';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { RiShareForward2Fill } from 'react-icons/ri';
import { FaFilterCircleDollar, FaHandshakeSimple } from 'react-icons/fa6';
import { GiRank3, GiTimeTrap } from 'react-icons/gi';
import { IoSettingsSharp } from 'react-icons/io5';
import { TiSocialInstagram } from 'react-icons/ti';
import { IoIosSend } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';

const UserSidebar = ({ handleClose }: any) => {
	return (
		<Sidebar
			aria-label='Sidebar with multi-level dropdown example'
			className='dark w-full '
		>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Link href='/dashboard' onClick={handleClose}>
						<Sidebar.Item icon={LuLayoutDashboard}>Dashboard</Sidebar.Item>
					</Link>
					<Link href='/deposit/binance-pay' onClick={handleClose}>
						<Sidebar.Item icon={PiDownloadSimpleBold}>Deposit</Sidebar.Item>
					</Link>

					<Link href='/withdraw/tether' onClick={handleClose}>
						<Sidebar.Item icon={RiShareForward2Fill}>Withdraw</Sidebar.Item>
					</Link>

					<Link href='/send' onClick={handleClose}>
						<Sidebar.Item icon={IoIosSend}>Send</Sidebar.Item>
					</Link>

					{/* Start Investment */}
					<Sidebar.Collapse icon={FaFilterCircleDollar} label='Packages'>
						<Link href='/investment' onClick={handleClose}>
							<Sidebar.Item>All Packages</Sidebar.Item>
						</Link>
						<Link href='/investment/my-package' onClick={handleClose}>
							<Sidebar.Item> My Package</Sidebar.Item>
						</Link>
					</Sidebar.Collapse>
					{/* End investment */}

					{/* Start Partnership */}
					<Sidebar.Collapse icon={FaHandshakeSimple} label='Referral'>
						<Link href='/partner-program' onClick={handleClose}>
							<Sidebar.Item>Referral Program</Sidebar.Item>
						</Link>
						<Link href='/generation-program' onClick={handleClose}>
							<Sidebar.Item>Generation Program</Sidebar.Item>
						</Link>
					</Sidebar.Collapse>
					{/* End Partnership */}

					{/* Start Tasks */}
					<Sidebar.Collapse icon={FaTasks} label='Tasks'>
						<Link href='/tasks/my-tasks' onClick={handleClose}>
							<Sidebar.Item>My Tasks</Sidebar.Item>
						</Link>
						<Link href='/tasks/tasks-report' onClick={handleClose}>
							<Sidebar.Item>Tasks Report</Sidebar.Item>
						</Link>
					</Sidebar.Collapse>
					{/* End Tasks */}

					{/* Send Option */}
					{/* <Link href='/send' onClick={handleClose}>
						<Sidebar.Item icon={IoIosSend}>Send USDT</Sidebar.Item>
					</Link> */}
					{/* End Send Option */}
					{/* Start Rank and reward */}
					<Link href='/rank-and-reward' onClick={handleClose}>
						<Sidebar.Item icon={GiRank3}>Rank and Reward</Sidebar.Item>
					</Link>
					{/* End Rank and reward */}

					{/* start transaction */}
					<Link href='/transactions' onClick={handleClose}>
						<Sidebar.Item icon={GiTimeTrap}>Transactions</Sidebar.Item>
					</Link>
					{/* end transaction */}

					{/* start settings */}
					<Link href='/settings' onClick={handleClose}>
						<Sidebar.Item icon={IoSettingsSharp}>Settings</Sidebar.Item>
					</Link>
					{/* end settings */}

					{/* start support */}
					<Link href='/contact' onClick={handleClose}>
						<Sidebar.Item icon={TiSocialInstagram}>Support</Sidebar.Item>
					</Link>
					{/* end support */}
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
};

export default UserSidebar;
