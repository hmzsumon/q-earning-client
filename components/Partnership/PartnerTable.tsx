import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const PartnerTable = ({ data }: any) => {
	console.log(data);
	const columns: GridColDef<any>[] = [
		{
			field: 'name',
			headerName: 'name',
			width: 150,
			renderCell: (params: any) => (
				<div className='text-gray-100'>
					<p>{params.row.name}</p>
				</div>
			),
		},
		{
			field: 'customer_id',
			headerName: 'Customer ID',
			width: 150,
			renderCell: (params: any) => (
				<div className='text-center'>
					<p>{params.row.customer_id}</p>
				</div>
			),
		},

		{
			field: 'email',
			headerName: 'Email',
			width: 200,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.email}</p>
				</div>
			),
		},

		{
			field: 'package',
			headerName: 'Package',
			width: 200,
			renderCell: (params: any) => (
				// console.log(params.row.packages),
				<div className=' flex items-center gap-1'>
					{params.row.packages.length > 0 ? (
						params.row.packages.map((packageData: any, i: number) => {
							return <p key={i}>{packageData},</p>;
						})
					) : (
						<p>No Package</p>
					)}
				</div>
			),
		},
	];

	const rows: any = [];
	data &&
		data.map((record: any) => {
			return rows.push({
				id: record.customer_id ? record.customer_id : record._id,
				customer_id: record.customer_id,
				name: record.name,
				email: record.email,
				packages: record.active_packages,
			});
		});
	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					autoHeight
					rows={rows}
					columns={columns}
					// rowHeight={38}
					// initialState={{
					// 	pagination: {
					// 		paginationModel: { pageSize: 5, page: 0 },
					// 	},
					// }}
				/>
			</ThemeProvider>
		</div>
	);
};

export default PartnerTable;
