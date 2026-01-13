import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const accountId = this.getNodeParameter('accountId', index) as number;

	const params: IDataObject = {
		id: accountId,
	};

	const result = await jsonRpcRequest.call(this, 'GetAccountInfoById', params);
	return result;
}
