import { INodeProperties } from 'n8n-workflow';

export const getByIdDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['getById'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the user to retrieve',
	},
];
