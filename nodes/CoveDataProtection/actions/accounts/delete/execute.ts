import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const accountId = this.getNodeParameter('accountId', index) as number;

	const params: IDataObject = {
		accountId,
	};

	await jsonRpcRequest.call(this, 'RemoveAccount', params);
	return { success: true, accountId };
}
