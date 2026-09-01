import { INodeProperties } from 'n8n-workflow';

export const generateTokenDescription: INodeProperties[] = [
	{
		displayName: 'Customer Name or ID',
		name: 'partnerId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCustomers',
		},
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		default: '',
		description: 'The customer the installation token is issued for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		required: true,
	},
	{
		displayName: 'Retention Policy Name or ID',
		name: 'retentionPolicyId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getRetentionPolicies',
			loadOptionsDependsOn: ['partnerId'],
		},
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		default: '',
		description: 'The retention policy assigned to devices installed with this token. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		required: true,
	},
	{
		displayName: 'Profile Name or ID',
		name: 'profileId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getProfiles',
			loadOptionsDependsOn: ['partnerId'],
		},
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		default: '',
		description: 'The backup profile assigned to devices installed with this token. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		required: true,
	},
	{
		displayName: 'Encryption',
		name: 'encryption',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		options: [
			{
				name: 'Managed',
				value: 'managed',
				description: 'Cove generates and stores the encryption key',
			},
			{
				name: 'Self-Managed',
				value: 'selfManaged',
				description: 'The encryption key is supplied at install time and not stored by Cove',
			},
		],
		default: 'managed',
		description: 'Who holds the encryption key for devices installed with this token',
	},
	{
		displayName: 'Device Name',
		name: 'accountName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		default: '',
		description: 'Name given to the device created by this token. Leave empty to let Cove assign one.',
	},
	{
		displayName: 'Never Expires',
		name: 'unlimitedExpiration',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		default: true,
		description: 'Whether the installer stays valid indefinitely',
	},
	{
		displayName: 'Installer Expiry Date',
		name: 'expirationTimestamp',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
				unlimitedExpiration: [false],
			},
		},
		default: '',
		description: 'When the installer stops working. Sent to the API as a Unix timestamp in seconds. To supply a timestamp directly, convert it in an expression, for example {{ DateTime.fromSeconds(1788148800) }}.',
		required: true,
	},
	{
		displayName: 'Unlimited Devices',
		name: 'unlimitedCount',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		default: true,
		description: 'Whether the installer can be used on an unlimited number of devices',
	},
	{
		displayName: 'Number of Devices',
		name: 'installationCount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
				unlimitedCount: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'How many devices the installer may be used on',
	},
	{
		displayName: 'Extra Properties',
		name: 'extraProperties',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['installation'],
				operation: ['generateToken'],
			},
		},
		default: '{}',
		description: 'Additional JSON properties merged into the request body, for fields this node does not expose yet',
	},
];
