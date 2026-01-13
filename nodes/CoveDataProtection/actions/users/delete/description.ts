import { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['delete'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the user to delete',
	},
];
