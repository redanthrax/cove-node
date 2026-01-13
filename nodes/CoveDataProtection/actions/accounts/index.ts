import * as getAll from './getAll';
import * as getById from './getById';
import * as getStatistics from './getStatistics';
import * as create from './create';
import * as update from './update';
import * as deleteAccount from './delete';
import { INodeProperties } from 'n8n-workflow';

export { getAll, getById, getStatistics, create, update, deleteAccount as delete };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['accounts'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new account',
				action: 'Create an account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an account',
				action: 'Delete an account',
			},
			{
				name: 'Get by ID',
				value: 'getById',
				description: 'Get an account by ID',
				action: 'Get an account by ID',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Enumerate accounts for a partner',
				action: 'Enumerate accounts',
			},
			{
				name: 'Get Statistics',
				value: 'getStatistics',
				description: 'Enumerate account statistics with column codes',
				action: 'Enumerate account statistics',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an account',
				action: 'Update an account',
			},
		],
		default: 'getAll',
	},
	...getAll.description,
	...getById.description,
	...getStatistics.description,
	...create.description,
	...update.description,
	...deleteAccount.description,
];
