const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const glob = require('glob')
const markdown = require( "markdown" ).markdown;

const pkg = require('./package.json')

module.exports = (env = {
  port: 8088,
  publicPath: '/',
  // chunkPublicPath: ''
}) => {
  env.port = env.port === undefined || env.port === null || env.port === '' ? 8088 : env.port
  env.publicPath = env.publicPath === undefined || env.publicPath === null || env.publicPath === '' ? '/' : env.publicPath

  return {
    entry: './src/index.js',

    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: env.publicPath,
      filename: 'index.js',
      chunkFilename: 'chunks/[id].js'
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons/commons.js'
      }),
      new ExtractTextPlugin({
        filename: '[name].css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
      }),
      function() {
        const contents = glob.sync('./src/contents/*.md')
        /*
          [
            { title: '', file: '', date: ''},
          ]
         */
        let data = [];

        for (const i in contents) {
          const content = contents[i]
          const dirname = path.dirname(content)
          const filename = path.basename(content, '.md')
          const regex = /^\[([0-9]{14})\](.*)/g
          if (!regex.test(filename)) {
            continue;
          }
          const date = filename.replace(regex,'$1')
          const title = filename.replace(regex,'$2')
          data.push({title, filename, date})
        }

        data.sort(function (a, b) {
          if (a.date > b.date) {
            return 1;
          }
          if (a.date < b.date) {
            return -1;
          }
          return 0;
        });

        fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2), 'utf8');
      }
    ],
    module: {
      rules: [
        {
          test: [/\.jsx$/, /\.js$/],
          enforce: 'pre',
          loader: 'eslint-loader',
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },/*
        {
          test: /\.html$/,
          use: [ {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }],
        },*/
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.(md)$/,
          use: 'file-loader?name=[hash].[ext]&publicPath=./contents/&outputPath=contents/'
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: 'file-loader?name=[name]-[hash].[ext]&publicPath=./images/&outputPath=images/'
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader?name=[name]-[hash].[ext]&publicPath=./fonts/&outputPath=fonts/'
        },
        {
          test: [/\.js$/, /\.jsx$/],
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-3'],
            'plugins': [
              'lodash',
              'dynamic-import-webpack',
              'transform-object-assign'
            ]
          }
        }
      ]
    },
    resolve: {
      alias: {
        '_components': path.resolve(__dirname, 'src/components/'),
        '_contents': path.resolve(__dirname, 'src/contents/')
      }
    },

    devServer: {
      historyApiFallback: true,
      inline: true,
      hot: true,
      port: env.port,
      host: '0.0.0.0',
      contentBase: 'dist'
    }
  }
}

