import { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['delete'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the account to delete',
	},
];
