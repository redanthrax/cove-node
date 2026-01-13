import { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Partner ID',
		name: 'partnerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['delete'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the partner to delete',
	},
];
