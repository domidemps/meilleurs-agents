const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = async (env, argv) => {
  return {
    context: __dirname,
    entry: ['./src/index.jsx'],
    devServer: {
      contentBase: __dirname + '/static',
      historyApiFallback: true,
      proxy: {
        '/': {
          target: 'http://0.0.0.0:5001',
        },
      },
    },
    output: {
      path: __dirname + '/static',
      filename: 'bundle.js',
      globalObject: 'this',
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
        algorithm: 'gzip',
      }),
      new HtmlWebpackPlugin({
        inject: false,
        title: 'meilleurs-agents',
        template: './src/index.ejs',
        appMountId: 'root',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|svg|pdf|ico)$/,
          use: 'url-loader?name=[path][name]-[hash:8].[ext]',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.(js|ts)x?$/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
      extensions: ['.js', '.jsx'],
    },
  }
}
