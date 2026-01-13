import { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['update'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the account to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Password',
				name: 'Password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'New password for the account',
			},
			{
				displayName: 'Partner Name',
				name: 'PartnerName',
				type: 'string',
				default: '',
				description: 'Account name',
			},
		],
	},
];
