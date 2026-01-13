import * as partners from './actions/partners';
import * as accounts from './actions/accounts';
import * as users from './actions/users';

import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { jsonRpcRequest, getPartnerId } from './transport';

export class CoveDataProtection implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cove Data Protection',
		name: 'coveDataProtection',
		icon: 'file:cove.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Cove Data Protection API',
		documentationUrl: 'https://github.com/redanthrax/cove-node',
		defaults: {
			name: 'Cove Data Protection',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'coveDataProtectionApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
			options: [
					{
						name: 'Account',
						value: 'accounts',
					},
					{
						name: 'Partner',
						value: 'partners',
					},
					{
						name: 'User',
						value: 'users',
					},
				],
				default: 'partners',
			},
			...accounts.description,
			...partners.description,
			...users.description,
		],
	};

	methods = {
		loadOptions: {
		async getPartners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const parentPartnerId = await getPartnerId.call(this);
				const params = {
					parentPartnerId,
					fetchRecursively: true,
					fields: [0, 1],
				};

				const result = await jsonRpcRequest.call(this, 'EnumeratePartners', params);
				const partners: INodePropertyOptions[] = [];

				if (result && result.result && Array.isArray(result.result)) {
					for (const partner of result.result) {
							partners.push({
								name: partner.Name || `Partner ${partner.Id}`,
								value: partner.Id,
							});
					}
				}

				return partners.sort((a, b) => a.name.localeCompare(b.name));
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const { router } = await import('./actions/router');
		return await router.call(this);
	}
}
