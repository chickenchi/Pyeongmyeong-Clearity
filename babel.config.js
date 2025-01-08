module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-class-properties', {loose: true}],
      ['@babel/plugin-transform-private-methods', {loose: true}],
      ['@babel/plugin-transform-private-property-in-object', {loose: true}],
      [
        'module-resolver',
        {
          root: ['./screen'],
          alias: {
            '@account': './screen/account',
            '@assets': './screen/assets',
            '@components': './screen/components',
            '@main': './screen/main',
            '@quiz': './screen/quiz',
            '@utils': './screen/utils',
            '@word': './screen/word',
            '@atoms': './screen/atoms',
            '@category': './screen/category',
          },
        },
      ],
    ],
  };
};
