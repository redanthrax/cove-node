import { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Account name',
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Account password',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Product ID',
				name: 'ProductId',
				type: 'number',
				default: 0,
				description: 'Product/backup type ID',
			},
			{
				displayName: 'Retention Period',
				name: 'RetentionPeriodInDays',
				type: 'number',
				default: 28,
				description: 'Retention period in days',
			},
		],
	},
];
