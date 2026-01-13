import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const partnerId = this.getNodeParameter('partnerId', index) as number;
	const fields = this.getNodeParameter('fields', index, [0, 1, 3, 4, 5, 8]) as number[];

	const params: IDataObject = {
		partnerId,
		fields,
	};

	const result = await jsonRpcRequest.call(this, 'EnumerateChildPartners', params);
	return result;
}
