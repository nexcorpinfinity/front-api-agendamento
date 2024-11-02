import pluginJs from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslint from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parser: typescriptEslint,
            parserOptions: {
                project: './tsconfig.eslint.json',
            },
        },
    },
    pluginJs.configs.recommended,
    {
        plugins: {
            import: eslintPluginImport,
            react: pluginReact,
            '@typescript-eslint': typescriptEslintPlugin,
            prettier,
        },
        rules: {
            // Regras de formatação
            indent: ['error', 4],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external'], 'internal', ['sibling', 'parent'], 'index'],
                    'newlines-between': 'always-and-inside-groups',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/first': 'error',

            // Regras de variáveis e erros comuns
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error', // Proíbe o uso de 'any'
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Força o uso de 'interface' em vez de 'type' para definições de objetos
            '@typescript-eslint/explicit-module-boundary-types': 'error', // Exige tipos explícitos para funções e métodos exportados

            // Regras do React
            'react/react-in-jsx-scope': 'error',
            'react/jsx-boolean-value': ['error', 'never'], // Omite o valor booleano explícito
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

            '@typescript-eslint/no-floating-promises': 'error', // Garante que todas as Promises sejam tratadas
            'prettier/prettier': ['error'],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    eslintConfigPrettier,
    pluginReact.configs.flat.recommended,
];
