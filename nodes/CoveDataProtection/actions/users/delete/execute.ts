import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const userId = this.getNodeParameter('userId', index) as number;

	const params: IDataObject = {
		userId,
	};

	await jsonRpcRequest.call(this, 'RemoveUser', params);
	return { success: true, userId };
}
