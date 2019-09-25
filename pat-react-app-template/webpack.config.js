const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin")

const path = require('path');
module.exports = function(env) {
  const entryPath = path.join(__dirname,'src','index.js')
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
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
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
      new CopyWebpackPlugin([ { from: 'src/public', to: './public'}])
    ],
    devtool: "source-map"
  };
}