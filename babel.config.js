module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10',
        }
      }
    ],
    '@babel/preset-react',
    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }]
  ],

  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-modules-commonjs'
  ]
};
