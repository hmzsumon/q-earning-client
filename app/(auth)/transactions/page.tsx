'use client';
import CustomSelect from '@/components/CustomSelect';
import TransactionCards from '@/components/Transactions/TransactionCards';
import { useGetTransactionsQuery } from '@/redux/features/transactions/transactionApi';
import Image from 'next/image';
import React, { useState } from 'react';

const options = [
	{ label: 'All', value: 'All' },
	{ label: 'Deposit', value: 'Deposit' },
	{ label: 'Withdraw', value: 'Withdraw' },
	{ label: 'Transfer', value: 'Transfer' },
	{ label: 'Buy Package', value: 'Buy Package' },
];

const Transactions = () => {
	const { data, error, isLoading } = useGetTransactionsQuery(undefined);
	const { transactions } = data || [];

	const [purpose, setPurpose] = useState('');
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactions);

	const handleSelectPurpose = (value: any) => {
		setPurpose(value);

		if (value === 'All') {
			setFilteredTransactions(transactions);
			return;
		} else {
			const filtered = transactions.filter(
				(transaction: any) => transaction.purpose === value
			);
			setFilteredTransactions(filtered);
		}
	};

	return (
		<div className=' px-2 py-4'>
			<h3 className='text-xl text-slate-200 font-semibold my-2'>
				Transaction History
			</h3>
			<div className='w-full md:w-3/12 py-10 px-2'>
				<CustomSelect
					options={options}
					value={purpose}
					onChange={handleSelectPurpose}
					title='Filter by Purpose'
					defaultValue='All'
				/>
			</div>
			{filteredTransactions?.length === 0 ? (
				<div>
					<Image
						src='/no-data.gif'
						width={200}
						height={200}
						alt='No Data'
						className='mx-auto'
					/>
					<p className='text-center text-gray-500 font-semibold'>
						No transactions found
					</p>
				</div>
			) : (
				<div className=' space-y-2'>
					{transactions?.map((transaction: any) => (
						<TransactionCards key={transaction._id} transaction={transaction} />
					))}
				</div>
			)}
		</div>
	);
};

export default Transactions;
