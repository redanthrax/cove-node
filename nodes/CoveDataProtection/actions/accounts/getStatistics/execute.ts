import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
	const partnerId = this.getNodeParameter('partnerId', index) as number;
	const columns = this.getNodeParameter('columns', index, []) as string[];
	const additionalOptions = this.getNodeParameter('additionalOptions', index, {}) as IDataObject;
	const returnAll = this.getNodeParameter('returnAll', index, true) as boolean;
	const limit = returnAll ? 0 : (this.getNodeParameter('limit', index, 50) as number);

	const columnArray = columns.length > 0 ? columns : [
		'I0',
		'I1',
		'I4',
		'I14',
		'I18',
	];

	const query: IDataObject = {
		PartnerId: partnerId,
		Columns: columnArray,
		SelectionMode: additionalOptions.selectionMode || 'Merged',
		StartRecordNumber: 0,
		RecordsCount: returnAll ? 9999999 : limit,
	};
	
	if (additionalOptions.filter) {
		query.Filter = additionalOptions.filter;
	}

	const params: IDataObject = {
		query,
	};

	const result = await jsonRpcRequest.call(this, 'EnumerateAccountStatistics', params);

	if (result && result.result && Array.isArray(result.result)) {
		return result.result.map((item: any) => {
			const normalized: IDataObject = {
				accountId: item.AccountId,
				partnerId: item.PartnerId,
				flags: item.Flags,
			};
			
			if (item.Settings) {
				item.Settings.forEach((setting: any) => {
					Object.keys(setting).forEach(key => {
						const columnCode = key;
						let fieldName = columnCode;
						
						switch(columnCode) {
							case 'I0': fieldName = 'deviceId'; break;
							case 'I1': fieldName = 'deviceName'; break;
							case 'I2': fieldName = 'deviceNameAlias'; break;
							case 'I4': fieldName = 'creationDate'; break;
							case 'I5': fieldName = 'expirationDate'; break;
							case 'I8': fieldName = 'customer'; break;
							case 'I10': fieldName = 'product'; break;
							case 'I11': fieldName = 'storageLocation'; break;
							case 'I14': fieldName = 'usedStorage'; break;
							case 'I15': fieldName = 'email'; break;
							case 'I16': fieldName = 'osVersion'; break;
							case 'I17': fieldName = 'clientVersion'; break;
							case 'I18': fieldName = 'computerName'; break;
							case 'I19': fieldName = 'internalIps'; break;
							case 'I20': fieldName = 'externalIps'; break;
							case 'I21': fieldName = 'macAddress'; break;
							case 'I78': fieldName = 'activeDataSources'; break;
						}
						
						normalized[fieldName] = setting[columnCode];
					});
				});
			}
			return normalized;
		});
	}

	return [];
}
