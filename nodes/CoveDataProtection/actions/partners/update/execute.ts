import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const partnerId = this.getNodeParameter('partnerId', index) as number;
	const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

	const params: IDataObject = {
		partner: {
			Id: partnerId,
			...updateFields,
		},
	};

	const result = await jsonRpcRequest.call(this, 'ModifyPartner', params);
	return result;
}
