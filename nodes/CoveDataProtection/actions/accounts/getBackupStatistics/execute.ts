import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { jsonRpcRequest } from '../../../transport';

const SESSION_STATUS_LABELS: Record<string, string> = {
	'1': 'In process',
	'2': 'Failed',
	'3': 'Aborted',
	'5': 'Completed',
	'6': 'Interrupted',
	'7': 'NotStarted',
	'8': 'CompletedWithErrors',
	'9': 'InProgressWithFaults',
	'10': 'OverQuota',
	'11': 'NoSelection',
	'12': 'Restarted',
};

const FIELD_CODE_NAMES: Record<string, string> = {
	F00: 'lastSessionStatus',
	F09: 'lastSuccessfulSessionTimestamp',
	F15: 'lastSessionTimestamp',
	F16: 'lastSuccessfulSessionStatus',
	F17: 'lastCompletedSessionStatus',
	F18: 'lastCompletedSessionTimestamp',
};

const STATUS_FIELD_CODES = new Set(['F00', 'F16', 'F17']);

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
	const partnerId = this.getNodeParameter('partnerId', index) as number;
	const dataSources = this.getNodeParameter('dataSources', index, []) as string[];
	const fields = this.getNodeParameter('fields', index, []) as string[];
	const additionalOptions = this.getNodeParameter('additionalOptions', index, {}) as IDataObject;
	const returnAll = this.getNodeParameter('returnAll', index, true) as boolean;
	const limit = returnAll ? 0 : (this.getNodeParameter('limit', index, 50) as number);

	const dataSourceArray = dataSources.length > 0 ? dataSources : ['D01', 'D02'];
	const fieldArray = fields.length > 0 ? fields : ['F00', 'F15'];

	const backupColumns = dataSourceArray.flatMap((dataSource) =>
		fieldArray.map((field) => `${dataSource}${field}`),
	);

	const columnArray = ['I0', 'I1', 'I18', 'I78', ...backupColumns];

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
				backupStatistics: {},
			};

			const backupStatistics = normalized.backupStatistics as IDataObject;

			if (item.Settings) {
				item.Settings.forEach((setting: any) => {
					Object.keys(setting).forEach((columnCode) => {
						const value = setting[columnCode];

						if (columnCode === 'I0') {
							normalized.deviceId = value;
							return;
						}
						if (columnCode === 'I1') {
							normalized.deviceName = value;
							return;
						}
						if (columnCode === 'I18') {
							normalized.computerName = value;
							return;
						}
						if (columnCode === 'I78') {
							normalized.activeDataSources = (value as string).match(/.{1,3}/g) || [];
							return;
						}

						const match = columnCode.match(/^(D\d{2})(F\d{2})$/);
						if (match) {
							const [, dataSourceCode, fieldCode] = match;
							const fieldName = FIELD_CODE_NAMES[fieldCode] || fieldCode;

							const dataSourceStats = (backupStatistics[dataSourceCode] ||
								(backupStatistics[dataSourceCode] = {})) as IDataObject;

							dataSourceStats[fieldName] = value;
							if (STATUS_FIELD_CODES.has(fieldCode)) {
								dataSourceStats[`${fieldName}Label`] = SESSION_STATUS_LABELS[value as string] || value;
							}
						}
					});
				});
			}

			return normalized;
		});
	}

	return [];
}
