import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Reactコンポーネントはdefault exportを強制
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true }
      ],
      
      // コンポーネントファイルでdefault exportを強制
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
    },
  },
  // コンポーネントフォルダ専用のルール
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      // コンポーネントフォルダではdefault exportを必須に
      'import/prefer-default-export': 'error',
      'import/no-named-export': 'error', // named exportを禁止
    },
  },
])
