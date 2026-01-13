import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class CoveDataProtectionApi implements ICredentialType {
	name = 'coveDataProtectionApi';
	displayName = 'Cove Data Protection API';
documentationUrl = 'https://documentation.n-able.com/covedataprotection/USERGUIDE/documentation/Content/service-management/json-api/home.htm';
	icon: Icon = {
		light: 'file:../nodes/CoveDataProtection/cove.svg',
		dark: 'file:../nodes/CoveDataProtection/cove.svg',
	};
	properties: INodeProperties[] = [
		{
			displayName: 'Partner Name',
			name: 'partner',
			type: 'string',
			default: '',
			required: true,
			description: 'The name of the partner/customer you want to log in under',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			description: 'Your email address for access to the service',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your password for access to the service',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.backup.management/jsonapi',
			url: '',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				jsonrpc: '2.0',
				id: 'jsonrpc',
				method: 'Login',
				params: {
					partner: '={{$credentials.partner}}',
					username: '={{$credentials.username}}',
					password: '={{$credentials.password}}',
				},
			},
		},
	};
}
