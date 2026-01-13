module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:n8n-nodes-base/nodes',
	],
	rules: {
		'no-unused-vars': ['error', { argsIgnorePattern: '^(_|this$)' }],
	},
	ignorePatterns: [
		'dist/**',
		'node_modules/**',
		'.eslintrc.prepublish.js'
	],
};
