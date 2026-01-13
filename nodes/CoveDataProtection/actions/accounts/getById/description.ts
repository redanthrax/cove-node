import { INodeProperties } from 'n8n-workflow';

export const getByIdDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getById'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the account to retrieve',
	},
];
