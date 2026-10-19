#!/usr/bin/env node
/**
 * Copies node icons (png/svg) from nodes/ into dist/nodes, preserving directory layout.
 */
import { cpSync, statSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const ICON_EXTENSIONS = new Set(['.png', '.svg']);

cpSync(resolve(root, 'nodes'), resolve(root, 'dist/nodes'), {
	recursive: true,
	filter: (source) => statSync(source).isDirectory() || ICON_EXTENSIONS.has(extname(source).toLowerCase()),
});
