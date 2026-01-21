# n8n-nodes-cove

An n8n community node for integrating with Cove Data Protection (formerly N-able Backup) JSON-RPC API.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install n8n-nodes-cove
```

## Prerequisites

- Cove Data Protection account with API access
- Partner name (company/reseller name)
- User credentials with API Authentication enabled
- API endpoint URL (default: https://api.backup.management/jsonapi)

## Setup

### Enabling API Authentication

1. Log into your Cove Data Protection Management Console
2. Navigate to **Settings > Users**
3. Edit your user account or create a dedicated API user
4. Enable **API Authentication** checkbox
5. Note down your partner name, username (email), and password for use in n8n

### Configuring Credentials in n8n

1. **API URL**: The JSON-RPC endpoint (default: `https://api.backup.management/jsonapi`)
2. **Partner Name**: Your company/reseller name as it appears in Cove
3. **Username**: Your email address for API access
4. **Password**: Your password

**Important**: The user account must have **API Authentication** enabled in the Management Console.

## Supported Operations

### Partners
Manage partner/reseller hierarchy and relationships:
- **Create** - Create a new partner
- **Delete** - Delete a partner
- **Get by ID** - Retrieve a specific partner by ID
- **Get Many** - Enumerate partners with optional recursive fetching
- **Update** - Update partner information

### Accounts
Manage backup accounts (devices) with comprehensive operations:
- **Create** - Create a new backup account
- **Delete** - Delete an account
- **Get by ID** - Retrieve a specific account by ID
- **Get Many** - Enumerate accounts for a partner
- **Get Statistics** - Get detailed account statistics with column codes (normalized field names)
- **Update** - Update account information

#### Account Statistics Column Codes
The **Get Statistics** operation automatically normalizes Cove's column codes to friendly field names:

**Common Mappings**:
- `I0` → `deviceId` - Unique device identifier
- `I1` → `deviceName` - Device/account name
- `I4` → `creationDate` - Unix timestamp of creation
- `I14` → `usedStorage` - Storage used in bytes
- `I16` → `osVersion` - Operating system version
- `I17` → `clientVersion` - Backup client version
- `I18` → `computerName` - Computer/hostname
- `I19` → `internalIps` - Internal IP addresses
- `I20` → `externalIps` - External IP addresses
- `I21` → `macAddress` - MAC address
- `I78` → `activeDataSources` - Active backup data sources (D1=Files, D2=System State, etc.)

For a complete list of column codes, see the [Column Codes Documentation](https://documentation.n-able.com/covedataprotection/USERGUIDE/documentation/Content/service-management/json-api/api-column-codes.htm).

### Users
Comprehensive user management operations:
- **Create** - Create a new user with role assignment
- **Delete** - Delete a user
- **Get by ID** - Retrieve a specific user by ID
- **Get Many** - Enumerate users for a partner
- **Update** - Update user information

## API Authentication

Cove Data Protection uses a visa-based authentication system:
- Initial login with partner name, username, and password
- Receives a **visa** (session token) valid for 15 minutes
- Each API response includes a new visa to maintain the session
- The node automatically manages visa renewal and caching

## Resources

- [Cove Data Protection API Documentation](https://documentation.n-able.com/covedataprotection/USERGUIDE/documentation/Content/service-management/json-api/home.htm)
- [Column Codes Reference](https://documentation.n-able.com/covedataprotection/USERGUIDE/documentation/Content/service-management/json-api/api-column-codes.htm)
- [JSON-RPC Schema](https://cdn.cloudbackup.management/maxdownloads/MXB_JSON-RPC_API_Schema.zip)
- [n8n Documentation](https://docs.n8n.io)
- [Repository](https://github.com/redanthrax/cove-node)

## License

MIT
