import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', index) as string;
	const parentId = this.getNodeParameter('parentId', index, 0) as number;
	const level = this.getNodeParameter('level', index, 1) as number;
	
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const params: IDataObject = {
		parentId,
		partner: {
			Name: name,
			Level: level,
			...additionalFields,
		},
	};

	const result = await jsonRpcRequest.call(this, 'AddPartner', params);
	return result;
}
