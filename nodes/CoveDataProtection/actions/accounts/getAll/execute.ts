import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
	const partnerId = this.getNodeParameter('partnerId', index) as number;
	const fetchRecursively = this.getNodeParameter('fetchRecursively', index, false) as boolean;
	const returnAll = this.getNodeParameter('returnAll', index, true) as boolean;
	const limit = returnAll ? 0 : (this.getNodeParameter('limit', index, 50) as number);

	const params: IDataObject = {
		partnerId,
		fetchRecursively,
	};

	const result = await jsonRpcRequest.call(this, 'EnumerateAccounts', params);

	if (result && result.result && Array.isArray(result.result)) {
		return returnAll ? result.result : result.result.slice(0, limit);
	}
	
	if (result && Array.isArray(result)) {
		return returnAll ? result : result.slice(0, limit);
	}

	return [];
}
