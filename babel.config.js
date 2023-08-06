module.exports = {
  presets: ['babel-preset-expo'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@store': './src/store',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
