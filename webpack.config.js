const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, './index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    open: true,
    port: 5050,
  },
}
