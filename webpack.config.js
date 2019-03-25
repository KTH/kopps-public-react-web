const path = require('path')
module.exports = {
  entry: {
    app: './public/js/app/app.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
