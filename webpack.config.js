const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts', // TypeScript entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'MinhaBibliotecaReact',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [nodeExternals()], // Exclude external dependencies 
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // TypeScript and TSX rules
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], //Resolve files TS
  },
  devtool: 'source-map',  // for depuration
};
