module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      alias: {
        map: [
          ['@services', './src/services'],
          ['@navigation', './src/navigation'],
          ['@screens', './src/screens'],
          ['@store', './src/store'],
          ['@constants', './src/constants'],
          ['@hooks', './src/hooks'],
        ],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
