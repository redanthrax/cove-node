import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const userId = this.getNodeParameter('userId', index) as number;
	const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

	const params: IDataObject = {
		user: {
			Id: userId,
			...updateFields,
		},
	};

	const result = await jsonRpcRequest.call(this, 'ModifyUser', params);
	return result;
}
