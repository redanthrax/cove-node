import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
import { restRequest } from '../../../transport';

// The console only ever sends "Initial", so it is not worth a UI field. Override it
// through Extra Properties if another type turns up.
const INSTALLATION_TYPE = 'Initial';

// The API wants Unix seconds. n8n's dateTime picker hands over an ISO string, but an
// expression may already resolve to a timestamp, so accept either.
function toUnixSeconds(
	context: IExecuteFunctions,
	value: string | number,
	index: number,
): number {
	if (typeof value === 'number') {
		return Math.floor(value);
	}

	const trimmed = (value ?? '').trim();

	if (/^\d+$/.test(trimmed)) {
		return Number(trimmed);
	}

	const parsed = Date.parse(trimmed);
	if (Number.isNaN(parsed)) {
		throw new NodeOperationError(
			context.getNode(),
			`Installer Expiry Date is not a valid date: ${value}`,
			{ itemIndex: index },
		);
	}

	return Math.floor(parsed / 1000);
}

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const partnerId = this.getNodeParameter('partnerId', index) as number;
	const retentionPolicyId = this.getNodeParameter('retentionPolicyId', index) as number;
	const profileId = this.getNodeParameter('profileId', index) as number;
	const encryption = this.getNodeParameter('encryption', index, 'managed') as string;
	const accountName = this.getNodeParameter('accountName', index, '') as string;
	const unlimitedExpiration = this.getNodeParameter('unlimitedExpiration', index, true) as boolean;
	const unlimitedCount = this.getNodeParameter('unlimitedCount', index, true) as boolean;
	const extraProperties = this.getNodeParameter('extraProperties', index, '{}') as string | IDataObject;

	let extra: IDataObject = {};
	if (typeof extraProperties === 'string') {
		if (extraProperties.trim() !== '') {
			try {
				extra = JSON.parse(extraProperties) as IDataObject;
			} catch {
				throw new NodeOperationError(this.getNode(), 'Extra Properties is not valid JSON', {
					itemIndex: index,
				});
			}
		}
	} else if (extraProperties) {
		extra = extraProperties;
	}

	const body: IDataObject = {
		InstallationType: INSTALLATION_TYPE,
		PartnerId: Number(partnerId),
		ProfileId: Number(profileId),
		RetentionPolicyId: Number(retentionPolicyId),
		ManagedEncryptionKey: encryption === 'managed',
	};

	// The API treats these as mutually exclusive: send the unlimited flag or the
	// concrete value, never both.
	if (unlimitedCount) {
		body.UnlimitedCount = true;
	} else {
		body.InstallationCount = this.getNodeParameter('installationCount', index, 1) as number;
	}

	if (unlimitedExpiration) {
		body.UnlimitedExpiration = true;
	} else {
		const expiry = this.getNodeParameter('expirationTimestamp', index) as string | number;
		body.ExpirationTimestamp = toUnixSeconds(this, expiry, index);
	}

	if (accountName !== '') {
		body.AccountName = accountName;
	}

	Object.assign(body, extra);

	return await restRequest.call(this, 'PUT', '/agent/installation', body);
}
