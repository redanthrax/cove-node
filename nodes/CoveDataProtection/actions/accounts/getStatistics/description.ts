import { INodeProperties } from 'n8n-workflow';

export const getStatisticsDescription: INodeProperties[] = [
	{
		displayName: 'Partner Name or ID',
		name: 'partnerId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getPartners',
		},
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getStatistics'],
			},
		},
		default: '',
		description: 'The partner to enumerate account statistics for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		required: true,
	},
	{
		displayName: 'Columns',
		name: 'columns',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getStatistics'],
			},
		},
	options: [
		{ name: 'Active Data Sources (I78)', value: 'I78' },
		{ name: 'Client Version (I17)', value: 'I17' },
		{ name: 'Computer Name (I18)', value: 'I18' },
		{ name: 'Creation Date (I4)', value: 'I4' },
		{ name: 'Customer (I8)', value: 'I8' },
		{ name: 'Device ID (I0)', value: 'I0' },
		{ name: 'Device Name (I1)', value: 'I1' },
		{ name: 'Device Name Alias (I2)', value: 'I2' },
		{ name: 'Email (I15)', value: 'I15' },
		{ name: 'Expiration Date (I5)', value: 'I5' },
		{ name: 'External IPs (I20)', value: 'I20' },
		{ name: 'Internal IPs (I19)', value: 'I19' },
		{ name: 'MAC Address (I21)', value: 'I21' },
		{ name: 'OS Version (I16)', value: 'I16' },
		{ name: 'Product (I10)', value: 'I10' },
		{ name: 'Storage Location (I11)', value: 'I11' },
		{ name: 'Used Storage (I14)', value: 'I14' },
	],
		default: ['I0', 'I1', 'I4', 'I14', 'I18'],
		description: 'Statistics columns to retrieve (uses column codes)',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getStatistics'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'Filter expression (e.g., "ANY =~ "Device*"")',
			},
			{
				displayName: 'Selection Mode',
				name: 'selectionMode',
				type: 'options',
				options: [
					{
						name: 'Merged',
						value: 'Merged',
					},
					{
						name: 'Detailed',
						value: 'Detailed',
					},
				],
				default: 'Merged',
				description: 'Selection mode for statistics',
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getStatistics'],
			},
		},
		default: true,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getStatistics'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
