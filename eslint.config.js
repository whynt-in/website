import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import astro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import globals from 'globals'

export default [
	js.configs.recommended,

	// TypeScript
	{
		files: ['**/*.{ts,tsx,mts,cts}'],

		languageOptions: {
			parser: tsParser,

			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module'
			},

			globals: {
				...globals.browser,
				...globals.node,
				...globals.serviceworker
			}
		},

		plugins: {
			'@typescript-eslint': tsPlugin
		},

		rules: {
			...tsPlugin.configs.recommended.rules,

			'@typescript-eslint/no-explicit-any': 'off',

			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					'ts-ignore': 'allow-with-description',
					'ts-expect-error': 'allow-with-description'
				}
			],

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],

			'require-await': 'warn'
		}
	},

	// Astro
	...astro.configs['flat/recommended'],

	{
		files: ['**/*.astro'],

		languageOptions: {
			parser: astroParser,

			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro']
			},

			globals: {
				...globals.browser,
				...globals.node
			}
		},

		plugins: {
			'@typescript-eslint': tsPlugin
		}
	},

	// JS files
	{
		files: ['**/*.{js,mjs,cjs}'],

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.serviceworker
			}
		}
	},

	{
		ignores: ['dist', '.astro', 'node_modules', 'worker-configuration.d.ts']
	}
]
