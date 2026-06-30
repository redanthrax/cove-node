import { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Partner name',
	},
	{
		displayName: 'Parent ID',
		name: 'parentId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Parent partner ID (0 for root level)',
	},
	{
		displayName: 'Level',
		name: 'level',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Undefined',
				value: 'Undefined',
			},
			{
				name: 'Distributor',
				value: 'Distributor',
			},
			{
				name: 'SubDistributor',
				value: 'SubDistributor',
			},
			{
				name: 'Reseller',
				value: 'Reseller',
			},
			{
				name: 'EndCustomer',
				value: 'EndCustomer',
			},
		],
		default: 'EndCustomer',
		description: 'Partner level in hierarchy',
	},
	{
		displayName: 'Create Default Account',
		name: 'createDefaultAccount',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether to create a default account for the new partner',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['partners'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'External Code',
				name: 'ExternalCode',
				type: 'string',
				default: '',
				description: 'External reference code',
			},
			{
				displayName: 'Service Type',
				name: 'ServiceType',
				type: 'options',
				default: 'AllInclusive',
				options: [
					{
						name: 'Undefined',
						value: 'Undefined',
					},
					{
						name: 'AllInclusive',
						value: 'AllInclusive',
					},
					{
						name: 'SoftwareOnly',
						value: 'SoftwareOnly',
					},
				],
				description: 'Service type provided to this partner',
			},
			{
				displayName: 'Child Service Types',
				name: 'ChildServiceTypes',
				type: 'multiOptions',
				default: [],
				options: [
					{
						name: 'Undefined',
						value: 'Undefined',
					},
					{
						name: 'AllInclusive',
						value: 'AllInclusive',
					},
					{
						name: 'SoftwareOnly',
						value: 'SoftwareOnly',
					},
				],
				description: 'Service types this partner can provide to child partners',
			},
			{
				displayName: 'State',
				name: 'State',
				type: 'options',
				default: 'Undefined',
				options: [
					{
						name: 'Undefined',
						value: 'Undefined',
					},
					{
						name: 'InProduction',
						value: 'InProduction',
					},
					{
						name: 'InTrial',
						value: 'InTrial',
					},
				],
				description: 'Current partner state',
			},
			{
				displayName: 'Country',
				name: 'Country',
				type: 'string',
				default: '',
				description: 'Country code or name, for example US',
			},
			{
				displayName: 'Device Country',
				name: 'DeviceCountry',
				type: 'string',
				default: '',
				description: 'Device country code or name',
			},
			{
				displayName: 'Location ID',
				name: 'LocationId',
				type: 'number',
				default: 0,
				description: 'Location ID for default storage pool',
			},
			{
				displayName: 'Reference Number',
				name: 'ReferenceNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Company',
				name: 'Company',
				type: 'collection',
				placeholder: 'Add Company Field',
				default: {},
				options: [
					{
						displayName: 'Phone Number',
						name: 'PhoneNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Fax Number',
						name: 'FaxNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Website Address',
						name: 'WebsiteAddress',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Legal Company Name',
						name: 'LegalCompanyName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Chamber of Commerce Number',
						name: 'ChamberOfCommerceNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'VAT Number',
						name: 'VatNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Bank Account Number',
						name: 'BankAccountNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Billing Contact Person ID',
						name: 'BillingContactPersonId',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Post Address',
						name: 'PostAddress',
						type: 'collection',
						placeholder: 'Add Address Field',
						default: {},
						options: [
							{
								displayName: 'Country',
								name: 'Country',
								type: 'string',
								default: '',
							},
							{
								displayName: 'State',
								name: 'State',
								type: 'string',
								default: '',
							},
							{
								displayName: 'District',
								name: 'District',
								type: 'string',
								default: '',
							},
							{
								displayName: 'City',
								name: 'City',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Zip Code',
								name: 'ZipCode',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Address',
								name: 'Address',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
		],
	},
];
