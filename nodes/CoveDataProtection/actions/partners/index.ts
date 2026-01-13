import * as getAll from './getAll';
import * as getById from './getById';
import * as enumerateChildren from './enumerateChildren';
import * as create from './create';
import * as update from './update';
import * as deletePartner from './delete';
import { INodeProperties } from 'n8n-workflow';

export { getAll, getById, enumerateChildren, create, update, deletePartner as delete };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['partners'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new partner',
				action: 'Create a partner',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a partner',
				action: 'Delete a partner',
			},
			{
				name: 'Enumerate Children',
				value: 'enumerateChildren',
				description: 'Get child partners in tree structure',
				action: 'Enumerate child partners',
			},
			{
				name: 'Get by ID',
				value: 'getById',
				description: 'Get a partner by ID',
				action: 'Get a partner by ID',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of partners',
				action: 'Enumerate partners',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a partner',
				action: 'Update a partner',
			},
		],
		default: 'getAll',
	},
	...getAll.description,
	...getById.description,
	...enumerateChildren.description,
	...create.description,
	...update.description,
	...deletePartner.description,
];
