const path = require('path')
const nodeExternals = require('webpack-node-externals');

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.node']
  },
  devtool: 'source-map',
  entry: path.resolve(rootPath, 'electron', 'main.ts'),
  target: 'electron-main',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'native-addon-loader'
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  node: {
    __dirname: false
  },
  devServer: {
    contentBase: path.join(rootPath, 'dist/main'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 4999,
    publicPath: '/'
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js'
  }
}
