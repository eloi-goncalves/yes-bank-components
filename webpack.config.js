const path = require('path');

module.exports = {
  entry: './src/index.ts', // TypeScript entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'YesBankComponents',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },// Exclude external dependencies 
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
