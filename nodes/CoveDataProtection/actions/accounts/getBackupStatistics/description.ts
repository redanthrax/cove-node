import { INodeProperties } from 'n8n-workflow';

export const getBackupStatisticsDescription: INodeProperties[] = [
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
				operation: ['getBackupStatistics'],
			},
		},
		default: '',
		description: 'The partner to enumerate device backup statistics for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		required: true,
	},
	{
		displayName: 'Data Sources',
		name: 'dataSources',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getBackupStatistics'],
			},
		},
		options: [
			{ name: 'Bare Metal Restore (D17)', value: 'D17' },
			{ name: 'Files and Folders (D01)', value: 'D01' },
			{ name: 'Hyper-V (D14)', value: 'D14' },
			{ name: 'Microsoft 365 Exchange (D19)', value: 'D19' },
			{ name: 'Microsoft 365 OneDrive (D20)', value: 'D20' },
			{ name: 'Microsoft 365 SharePoint (D05)', value: 'D05' },
			{ name: 'Microsoft 365 Teams (D23)', value: 'D23' },
			{ name: 'MySql (D15)', value: 'D15' },
			{ name: 'Network Shares (D06)', value: 'D06' },
			{ name: 'Oracle (D12)', value: 'D12' },
			{ name: 'System State (D02)', value: 'D02' },
			{ name: 'Total (D09)', value: 'D09' },
			{ name: 'Virtual Disaster Recovery (D16)', value: 'D16' },
			{ name: 'VMware Virtual Machines (D08)', value: 'D08' },
			{ name: 'VssExchange (D04)', value: 'D04' },
			{ name: 'VssMsSql (D10)', value: 'D10' },
			{ name: 'VssSharePoint (D11)', value: 'D11' },
			{ name: 'VssSystemState (D07)', value: 'D07' },
		],
		default: ['D01', 'D02'],
		description: 'Which data sources to retrieve backup statistics for',
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getBackupStatistics'],
			},
		},
		options: [
			{ name: 'Last Session Status (F00)', value: 'F00' },
			{ name: 'Last Session Timestamp (F15)', value: 'F15' },
			{ name: 'Last Successful Session Status (F16)', value: 'F16' },
			{ name: 'Last Successful Session Timestamp (F09)', value: 'F09' },
			{ name: 'Last Completed Session Status (F17)', value: 'F17' },
			{ name: 'Last Completed Session Timestamp (F18)', value: 'F18' },
		],
		default: ['F00', 'F15'],
		description: 'Which backup statistics fields to retrieve for each selected data source',
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
				operation: ['getBackupStatistics'],
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
						name: 'Detailed (Per Installation)',
						value: 'PerInstallation',
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
				operation: ['getBackupStatistics'],
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
				operation: ['getBackupStatistics'],
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
