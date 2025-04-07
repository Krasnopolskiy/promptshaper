import jsdoc from 'eslint-plugin-jsdoc';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.git/**',
      'src/components/**',
    ]
  },
  // JS configuration (for JS files)
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      jsdoc,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Documentation rules
      'jsdoc/require-jsdoc': ['error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }],
      'jsdoc/require-description': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-description': 'error',

      // File length rule
      'max-lines': ['error', {
        max: 200,
        skipBlankLines: true,
        skipComments: true
      }],

      // Function length rule
      'max-lines-per-function': ['error', {
        max: 10,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true
      }],

      // Additional code quality rules
      'complexity': ['error', 5],
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],
      'max-params': ['error', 4],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
    }
  },
  // TS configuration (for TS files)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      jsdoc,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      // Documentation rules
      'jsdoc/require-jsdoc': ['error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }],
      'jsdoc/require-description': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-description': 'error',

      // File length rule
      'max-lines': ['error', {
        max: 200,
        skipBlankLines: true,
        skipComments: true
      }],

      // Function length rule
      'max-lines-per-function': ['error', {
        max: 10,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true
      }],

      // Additional code quality rules
      'complexity': ['error', 5],
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],
      'max-params': ['error', 4],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // TypeScript rules - updated to use available rules
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn'
    }
  }
];
