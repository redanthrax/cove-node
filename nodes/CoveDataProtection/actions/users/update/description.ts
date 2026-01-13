import { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['update'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the user to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Email Address',
				name: 'EmailAddress',
				type: 'string',
				default: '',
				description: 'New email address',
			},
			{
				displayName: 'Full Name',
				name: 'FullName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Password',
				name: 'Password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'New password',
			},
			{
				displayName: 'Phone Number',
				name: 'PhoneNumber',
				type: 'string',
				default: '',
			},
		],
	},
];
