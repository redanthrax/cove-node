import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest, getPartnerId } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const partnerId = await getPartnerId.call(this);
	const name = this.getNodeParameter('name', index) as string;
	const emailAddress = this.getNodeParameter('emailAddress', index) as string;
	const password = this.getNodeParameter('password', index) as string;
	const roleId = this.getNodeParameter('roleId', index, 1) as number;
	
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const params: IDataObject = {
		partnerId,
		user: {
			Name: name,
			EmailAddress: emailAddress,
			Password: password,
			RoleId: roleId,
			PartnerId: partnerId,
			...additionalFields,
		},
	};

	const result = await jsonRpcRequest.call(this, 'AddUser', params);
	return result;
}
