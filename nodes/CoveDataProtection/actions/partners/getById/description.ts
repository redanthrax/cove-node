import { INodeProperties } from 'n8n-workflow';

export const getByIdDescription: INodeProperties[] = [
	{
		displayName: 'Partner ID',
		name: 'partnerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['getById'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the partner to retrieve',
	},
];
