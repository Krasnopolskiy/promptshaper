import jsdoc from 'eslint-plugin-jsdoc';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

// Common rule sets that will be reused across configurations
const commonIgnores = [
  'node_modules/**',
  'dist/**',
  'build/**',
  '.git/**',
  'src/components/ui/**',
];

// Documentation rules
const documentationRules = {
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
};

// Code complexity rules
const codeComplexityRules = {
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
  'complexity': ['error', 5],
  'max-depth': ['error', 3],
  'max-nested-callbacks': ['error', 3],
  'max-params': ['error', 4],
};

// React rules
const reactRules = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true }
  ],
};

// TypeScript-specific rules
const typeScriptRules = {
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
};

export default [
  // Common ignores configuration
  {
    ignores: commonIgnores
  },

  // JavaScript configuration
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
      // Use spread operator to combine rule sets
      ...documentationRules,
      ...codeComplexityRules,
      ...reactRules,
    }
  },

  // TypeScript configuration
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
      // Use spread operator to combine rule sets
      ...documentationRules,
      ...codeComplexityRules,
      ...reactRules,
      ...typeScriptRules,

      // Add TypeScript-specific documentation rule
      'jsdoc/require-param-type': 'error',
    }
  }
];
