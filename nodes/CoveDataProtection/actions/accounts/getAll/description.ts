import { INodeProperties } from 'n8n-workflow';

export const getAllDescription: INodeProperties[] = [
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
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'The partner to enumerate accounts for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		required: true,
	},
	{
		displayName: 'Fetch Recursively',
		name: 'fetchRecursively',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to fetch all sub-partner accounts recursively',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getAll'],
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
				operation: ['getAll'],
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
