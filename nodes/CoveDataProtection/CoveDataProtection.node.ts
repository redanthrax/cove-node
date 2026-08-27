import * as partners from './actions/partners';
import * as accounts from './actions/accounts';
import * as users from './actions/users';
import * as installation from './actions/installation';

import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	NodeConnectionTypes,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { jsonRpcRequest, getPartnerId } from './transport';

// Profile and product lists come back as { Id, Name } records, but the enumerate
// methods are inconsistent about prefixing those fields, so accept either form.
async function enumerateNamedOptions(
	this: ILoadOptionsFunctions,
	method: string,
): Promise<INodePropertyOptions[]> {
	const partnerId =
		(this.getCurrentNodeParameter('partnerId') as number) || (await getPartnerId.call(this));

	const result = await jsonRpcRequest.call(this, method, { partnerId });
	const records = Array.isArray(result?.result) ? result.result : result;

	if (!Array.isArray(records)) {
		return [];
	}

	const options: INodePropertyOptions[] = records.map((record: any) => {
		const id = record.Id ?? record.ProfileId ?? record.PolicyId ?? record.RetentionPolicyId;
		return {
			name: record.Name ?? record.ProfileName ?? record.PolicyName ?? `ID ${id}`,
			value: id,
		};
	});

	options.sort((a, b) => a.name.localeCompare(b.name));

	return options;
}

// EnumeratePartners returns descendants only, so the root partner itself is added by
// each caller under whatever label suits its field.
async function getDescendantPartnerOptions(
	this: ILoadOptionsFunctions,
	parentPartnerId: number,
): Promise<INodePropertyOptions[]> {
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

	partners.sort((a, b) => a.name.localeCompare(b.name));

	return partners;
}

async function getPartnerName(
	this: ILoadOptionsFunctions,
	partnerId: number,
): Promise<string> {
	try {
		const result = await jsonRpcRequest.call(this, 'GetPartnerInfoById', { partnerId });
		return result?.result?.Name ?? result?.Name ?? '';
	} catch {
		// A missing name only costs us a nicer label, so fall back to the plain one.
		return '';
	}
}

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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
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
						name: 'Installation',
						value: 'installation',
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
			...installation.description,
		],
	};

	methods = {
		loadOptions: {
		async getPartners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const parentPartnerId = await getPartnerId.call(this);
				const partners = await getDescendantPartnerOptions.call(this, parentPartnerId);

				partners.unshift({
					name: 'All Partners (Top Level)',
					value: parentPartnerId,
				});

				return partners;
			},

			async getCustomers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const rootPartnerId = await getPartnerId.call(this);
				const partners = await getDescendantPartnerOptions.call(this, rootPartnerId);
				const rootName = await getPartnerName.call(this, rootPartnerId);

				partners.unshift({
					name: rootName ? `Root Partner (${rootName})` : 'Root Partner',
					value: rootPartnerId,
				});

				return partners;
			},

			async getProfiles(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return await enumerateNamedOptions.call(this, 'EnumerateAccountProfiles');
			},

			// Retention policies are surfaced by the API as products.
			async getRetentionPolicies(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return await enumerateNamedOptions.call(this, 'EnumerateProducts');
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const { router } = await import('./actions/router');
		return await router.call(this);
	}
}
