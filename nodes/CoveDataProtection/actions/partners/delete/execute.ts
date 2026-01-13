import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const partnerId = this.getNodeParameter('partnerId', index) as number;

	const params: IDataObject = {
		partnerId,
	};

	await jsonRpcRequest.call(this, 'RemovePartner', params);
	return { success: true, partnerId };
}
