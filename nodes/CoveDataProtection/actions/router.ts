import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { CoveDataProtection } from './Interfaces';
import * as partners from './partners';
import * as accounts from './accounts';
import * as users from './users';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter('resource', i) as CoveDataProtection['resource'];
		const operation = this.getNodeParameter('operation', i) as string;

		const cove: CoveDataProtection = {
			resource,
			operation,
		};

		try {
			switch (cove.resource) {
				case 'partners':
					responseData = await (partners as any)[cove.operation].execute.call(this, i);
					break;
				case 'accounts':
					responseData = await (accounts as any)[cove.operation].execute.call(this, i);
					break;
				case 'users':
					responseData = await (users as any)[cove.operation].execute.call(this, i);
					break;
				default:
					break;
			}

		const executionData = this.helpers.returnJsonArray(responseData);
			operationResult.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				operationResult.push({ json: this.getInputData(i)[0].json, error: err });
			} else {
				if (err.context) err.context.itemIndex = i;
				throw err;
			}
		}
	}

	return [operationResult];
}
