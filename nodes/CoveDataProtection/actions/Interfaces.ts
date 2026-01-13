export type CoveDataProtection = {
	resource: 'partners' | 'accounts' | 'users';
	operation: string;
};

export interface PartnerInfo {
	Id: number;
	Name: string;
	Level: number;
	ParentId: number;
	ExternalCode?: string;
	ReferenceNumber?: string;
	State?: string;
	Creation?: number;
	Deleted?: number;
}

export interface AccountInfo {
	Id: number;
	PartnerID: number;
	PartnerName: string;
	BackupServerUID: string;
	Flags: string[];
	Settings: Record<string, any>;
}

export interface UserInfo {
	Id: number;
	Name: string;
	FullName: string;
	EmailAddress: string;
	RoleId: number;
	PartnerId: number;
	Flags: string[];
}

export interface AccountStatistics {
	deviceId?: string;
	deviceName?: string;
	deviceNameAlias?: string;
	creationDate?: number;
	expirationDate?: number;
	customer?: string;
	product?: string;
	storageLocation?: string;
	usedStorage?: number;
	email?: string;
	osVersion?: string;
	clientVersion?: string;
	computerName?: string;
	internalIps?: string;
	externalIps?: string;
	macAddress?: string;
	activeDataSources?: string;
}
