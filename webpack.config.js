const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, './index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
}
