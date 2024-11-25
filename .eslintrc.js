module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'import', 'react', 'react-compiler'],
    extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                modifiers: ['const'],
                format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
            },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        'no-debugger': 'off',
        'no-console': 'off',
        'class-methods-use-this': 'off',
        'comma-spacing': ['error', { before: false, after: true }],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false,
                packageDir: './',
            },
        ],
    },
};
