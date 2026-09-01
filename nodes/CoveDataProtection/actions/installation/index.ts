import * as generateToken from './generateToken';
import { INodeProperties } from 'n8n-workflow';

export { generateToken };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['installation'],
			},
		},
		options: [
			{
				name: 'Generate Token',
				value: 'generateToken',
				description: 'Generate an agent installation token for a partner',
				action: 'Generate an installation token',
			},
		],
		default: 'generateToken',
	},
	...generateToken.description,
];
