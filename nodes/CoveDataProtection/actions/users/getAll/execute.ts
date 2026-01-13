import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest, getPartnerId } from '../../../transport';

export async function execute(this: IExecuteFunctions): Promise<IDataObject[]> {
	const partnerId = await getPartnerId.call(this);

	const params: IDataObject = {
		partnerId,
	};

	const result = await jsonRpcRequest.call(this, 'EnumerateUsers', params);

	if (result && Array.isArray(result)) {
		return result;
	}

	return [];
}
