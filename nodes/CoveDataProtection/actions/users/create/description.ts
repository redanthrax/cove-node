import { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Username',
	},
	{
		displayName: 'Email Address',
		name: 'emailAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Email address for the user',
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
				resource: ['users'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'User password',
	},
	{
		displayName: 'Role ID',
		name: 'roleId',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Administrator',
				value: 1,
			},
			{
				name: 'User',
				value: 2,
			},
			{
				name: 'Read Only',
				value: 3,
			},
		],
		default: 1,
		description: 'User role',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Full Name',
				name: 'FullName',
				type: 'string',
				default: '',
				description: 'Full name of the user',
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
