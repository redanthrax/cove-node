import { n8nCommunityNodesPlugin } from '@n8n/eslint-plugin-community-nodes';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ['**/dist/**', '**/node_modules/**', '**/*.js', 'scripts/**'],
	},
	n8nCommunityNodesPlugin.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
	},
	{
		files: ['package.json'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				extraFileExtensions: ['.json'],
			},
		},
	},
	{
		files: ['**/CoveDataProtectionApi.credentials.ts'],
		rules: {
			'@n8n/community-nodes/icon-validation': 'off',
			'@n8n/community-nodes/cred-class-field-icon-missing': 'off',
		},
	},
	{
		files: ['**/CoveDataProtection.node.ts'],
		rules: {
			'@n8n/community-nodes/require-continue-on-fail': 'off',
			'@n8n/community-nodes/icon-prefer-themed-variants': 'off',
		},
	},
	{
		files: [
			'**/nodes/CoveDataProtection/transport.ts',
			'**/nodes/CoveDataProtection/actions/router.ts',
		],
		rules: {
			'@n8n/community-nodes/require-node-api-error': 'off',
			'@n8n/community-nodes/no-http-request-with-manual-auth': 'off',
		},
	},
];
