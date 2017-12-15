const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')




const config = {
    entry: {
        index: path.join(__dirname, 'app/index.js'),
        about: path.join(__dirname, 'app/about.js')
    }
,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.join(__dirname, 'node_modules')]
      },
      module: {
        rules: [
          {
            test: /\.(pug|jade)$/i,
            use: ['html-loader', {
              loader: 'pug-html-loader',
              query: {
                pretty: true
              }
            }]
          },
          {
            test: /\.(webm|mp4|avi|mp3|aac|mov|ttf|woff?2)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                  name: '[hash:6].[ext]',
                  outputPath: './assets/',
                  publicPath: '/'
                }
              }]
          },
    
          {
            test: /\.(png|jpe?g|gif|ico|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                  name: '[hash:6].[ext]',
                  outputPath: './assets/',
                  publicPath: '/'
                }
              }, 'image-webpack-loader']
          },
          {
            test: /\.html$/i,
            use: [
              {
                loader: 'html-loader?interpolate!' + "./app/index.pug",
                options: {
                  minimize: true,
                  removeComments: true,
                  collapseWhitespace: true
                }
              }
            ]
          },
          {
            test: /.sass$/i,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [{
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: false
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                  plugins: [autoprefixer()]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
              ],
              publicPath: '/dist'
            })
          }

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: "errors-only",
        open: true,
        port: 8080,
        https: false
      },

      plugins: [
        new HtmlWebpackPlugin({
            title: 'Graduation',
            filename: 'index.html',
            inject: false,
            minify: {
              collapseWhitespace: true,
              removeComments: true
            },
            favicon: false,
            hash: true,
            template: './app/index.pug'
          }),

          new HtmlWebpackPlugin({
            title: 'About',
            filename: 'about.html',
            inject: false,
            minify: {
              collapseWhitespace: true,
              removeComments: true
            },
            favicon: false,
            hash: true,
            template: './app/about.pug'
          }),
    
        new ExtractTextPlugin({
          filename: 'styles/[name].bundle.css',
          disable: false,
          allChunks: true
        })
    
      ]
  }
  
  module.exports = config

