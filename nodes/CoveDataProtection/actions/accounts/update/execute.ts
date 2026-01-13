import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const accountId = this.getNodeParameter('accountId', index) as number;
	const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

	const params: IDataObject = {
		modifyRequest: {
			Id: accountId,
			...updateFields,
		},
	};

	const result = await jsonRpcRequest.call(this, 'ModifyAccount', params);
	return result;
}
