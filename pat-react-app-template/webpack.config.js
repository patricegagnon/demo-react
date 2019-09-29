const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')

const path = require('path');
module.exports = function(env) {

  const entryPath = path.join(__dirname,'src','index.js')

  const server = env.server || 'local'
  console.log('building env ' + server)

  const configFilename = path.join(__dirname, `./build.${server}.js`)
  const appConfig = require(configFilename)

  return {
    entry: {
        main: ['@babel/polyfill', entryPath]
    },
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'index.js',
        publicPath: '/'
      },
    devServer: {
      publicPath: '/',
      contentBase: path.join(__dirname, 'dist'),
      inline: true,
      port: 8086,
      historyApiFallback:true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new CopyWebpackPlugin([ { from: 'src/public', to: './public'}]),
      new webpack.DefinePlugin({
        'envConfig.marvelProxyServiceBaseUrl': '"' + appConfig.marvelProxyServiceBaseUrl + '"'
      })
    ],
    devtool: "source-map"
  };
}