import { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Partner name',
	},
	{
		displayName: 'Parent ID',
		name: 'parentId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Parent partner ID (0 for root level)',
	},
	{
		displayName: 'Level',
		name: 'level',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		default: 1,
		description: 'Partner level in hierarchy',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'External Code',
				name: 'ExternalCode',
				type: 'string',
				default: '',
				description: 'External reference code',
			},
			{
				displayName: 'Reference Number',
				name: 'ReferenceNumber',
				type: 'string',
				default: '',
			},
		],
	},
];
