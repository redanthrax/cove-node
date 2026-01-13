import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestOptions,
	NodeApiError,
} from 'n8n-workflow';

let visaCache: { visa: string; timestamp: number; partnerId?: number } | null = null;
const VISA_LIFETIME_MS = 14 * 60 * 1000;

interface JsonRpcRequest {
	jsonrpc: string;
	method: string;
	visa?: string;
	params?: IDataObject;
	id: string;
}

interface JsonRpcResponse {
	jsonrpc: string;
	result?: any;
	error?: {
		code: number;
		message: string;
		data?: any;
	};
	visa?: string;
	id: string;
}

export async function getPartnerId(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
): Promise<number> {
	await getVisa.call(this);
	if (visaCache?.partnerId) {
		return visaCache.partnerId;
	}
	throw new NodeApiError(this.getNode(), {
		message: 'Partner ID not available from authentication',
	} as any);
}

export async function getVisa(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
): Promise<string> {
	const now = Date.now();
	
	if (visaCache && (now - visaCache.timestamp) < VISA_LIFETIME_MS) {
		return visaCache.visa;
	}

	const creds = await this.getCredentials('coveDataProtectionApi');

	const loginRequest = {
		jsonrpc: '2.0',
		id: 'jsonrpc',
		method: 'Login',
		params: {
			partner: String(creds.partner),
			username: String(creds.username),
			password: String(creds.password),
		},
	};

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: 'https://api.backup.management/jsonapi',
		headers: {
			'Content-Type': 'application/json',
		},
		body: loginRequest,
		json: true,
		returnFullResponse: false,
	};

	try {
		const response = await this.helpers.httpRequest(options) as JsonRpcResponse;

		if (response.error) {
			throw new NodeApiError(this.getNode(), response.error, {
				message: `Login failed: ${response.error.message}`,
			});
		}

		if (!response.visa) {
			throw new NodeApiError(this.getNode(), {
				message: 'Login successful but no visa received',
				response,
			} as any);
		}

		const partnerId = response.result?.result?.PartnerId;
		visaCache = {
			visa: response.visa,
			timestamp: now,
			partnerId: partnerId ? Number(partnerId) : undefined,
		};

		return response.visa;
	} catch (error) {
		visaCache = null;
		throw new NodeApiError(this.getNode(), error, {
			message: 'Failed to authenticate with Cove Data Protection API',
		});
	}
}

export async function jsonRpcRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	params: IDataObject = {},
): Promise<any> {
	const visa = await getVisa.call(this);

	const requestBody: JsonRpcRequest = {
		id: 'jsonrpc',
		visa,
		method,
		jsonrpc: '2.0',
		params,
	};

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: 'https://api.backup.management/jsonapi',
		headers: {
			'Content-Type': 'application/json',
		},
		body: requestBody,
		json: true,
	};

	try {
		const response = await this.helpers.httpRequest(options) as JsonRpcResponse;

		if (response.visa) {
			visaCache = {
				visa: response.visa,
				timestamp: Date.now(),
				partnerId: visaCache?.partnerId,
			};
		}

		if (response.error) {
			if (response.error.message?.toLowerCase().includes('visa') && visaCache) {
				visaCache = null;
				return await jsonRpcRequest.call(this, method, params);
			}

			throw new NodeApiError(this.getNode(), response.error, {
				message: `JSON-RPC Error: ${response.error.message}`,
			});
		}

		return response.result;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
