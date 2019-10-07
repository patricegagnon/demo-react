const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')

const path = require('path');
module.exports = function(env) {
  const appName = env.app
  const server = env.server || 'local'
  console.log('building ' + appName)
  const configFilename = path.join(__dirname, `./build.${server}.js`)
  const appConfig = require(configFilename)

  const entryPath = path.join(__dirname,'src',appName + '.js')
  return {
    entry: {
        main: ['@babel/polyfill', entryPath]
    },
    output: {
        path: path.join(__dirname,'dist'),
        filename: appName + '.js',
        publicPath: '/'
      },
    devServer: {
      publicPath: '/',
      contentBase: path.join(__dirname, 'dist'),
      inline: true,
      port: 8085,
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
      }),
    ],
    devtool: "source-map"
  };
}