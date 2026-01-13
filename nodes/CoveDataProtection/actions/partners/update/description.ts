import { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Partner ID',
		name: 'partnerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['update'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the partner to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'Partner name',
			},
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
