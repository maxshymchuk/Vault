import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import type { Linter } from 'eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['package-lock.json', 'public', 'node_modules', 'dist', 'build'] },
    { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
] satisfies Linter.Config[];
