import { INodeProperties } from 'n8n-workflow';

export const enumerateChildrenDescription: INodeProperties[] = [
	{
		displayName: 'Partner ID',
		name: 'partnerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['enumerateChildren'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the parent partner to enumerate children for',
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['enumerateChildren'],
			},
		},
		options: [
			{
				name: 'Name',
				value: 0,
				description: 'Partner name',
			},
			{
				name: 'Level',
				value: 1,
				description: 'Partner level in hierarchy',
			},
			{
				name: 'Child Service Types',
				value: 3,
				description: 'Available service types for children',
			},
			{
				name: 'Service Type',
				value: 4,
				description: 'Service type of this partner',
			},
			{
				name: 'State',
				value: 5,
				description: 'Partner state',
			},
			{
				name: 'Location ID',
				value: 8,
				description: 'Location identifier',
			},
			{
				name: 'Flags',
				value: 9,
				description: 'Partner flags',
			},
			{
				name: 'Company Info',
				value: 10,
				description: 'Company information',
			},
			{
				name: 'External Code & Mail From',
				value: 18,
				description: 'External code and mail from address',
			},
			{
				name: 'Creation Time',
				value: 20,
				description: 'Partner creation timestamp',
			},
		],
		default: [0, 1, 3, 4, 5, 8],
		description: 'Partner fields to include in the response',
	},
];
