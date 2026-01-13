import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest, getPartnerId } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
	const parentPartnerId = await getPartnerId.call(this);
	const fetchRecursively = this.getNodeParameter('fetchRecursively', index, true) as boolean;
	const fields = this.getNodeParameter('fields', index, [0, 1, 3, 4, 5, 8]) as number[];
	const returnAll = this.getNodeParameter('returnAll', index, true) as boolean;
	const limit = returnAll ? 0 : (this.getNodeParameter('limit', index, 50) as number);

	const params: IDataObject = {
		parentPartnerId,
		fetchRecursively,
		fields,
	};

	const result = await jsonRpcRequest.call(this, 'EnumeratePartners', params);
	
	if (result && result.result && Array.isArray(result.result)) {
		return returnAll ? result.result : result.result.slice(0, limit);
	}
	
	if (result && Array.isArray(result)) {
		return returnAll ? result : result.slice(0, limit);
	}

	return [];
}
