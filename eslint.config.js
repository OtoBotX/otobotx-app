import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'

export default await tseslint.config({
  files: ['**/*.{ts,tsx,js,jsx}'],
  languageOptions: {
    parserOptions: {
      tsconfigPath: './tsconfig.json',
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: {
    react: require('eslint-plugin-react'),
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': 'warn',
  },
}).then((baseConfig) => [
  ...baseConfig,
  prettier,
])
