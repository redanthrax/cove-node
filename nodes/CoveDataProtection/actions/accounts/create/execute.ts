import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest, getPartnerId } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const partnerId = await getPartnerId.call(this);
	const name = this.getNodeParameter('name', index) as string;
	const password = this.getNodeParameter('password', index) as string;
	
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const params: IDataObject = {
		partnerId,
		account: {
			PartnerID: partnerId,
			PartnerName: name,
			Password: password,
			...additionalFields,
		},
	};

	const result = await jsonRpcRequest.call(this, 'AddAccount', params);
	return result;
}
