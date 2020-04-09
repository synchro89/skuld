const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.normalize(path.join(__dirname, "..", "src", "index.js")),
    vendor: path.normalize(path.join(__dirname, "..", "src", "vendor.js"))
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]',
          outputPath: 'assets/'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "entry"
                }
              ]
            ],
            plugins: [
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
            ],
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WriteFilePlugin(),
    new CopyPlugin([
      {
        from: path.normalize(path.join(__dirname, '..', 'src', 'robots.txt')),
        to: path.normalize(path.join(__dirname, '..', 'build', 'robots.txt'))
      }
    ]),
    new HtmlWebpackPlugin({
      title: 'tris-home-page',
      filename: 'index.html',
      template: path.normalize(path.join(__dirname, "..", "src", "index.html")),
      inject: 'head',
      favicon: path.normalize(path.join(__dirname, "..", "src", "images", "favicon.png"))
    }),
    new HtmlWebpackPlugin({
      title: 'tris-404-page',
      filename: '404.html',
      template: path.normalize(path.join(__dirname, "..", "src", "404.html")),
      inject: 'head'
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return 'font';
      },
      fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
      include: 'allAssets',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ],
  externals: {
    $: 'jquery',
    jquery: 'jQuery',
    'window.$': 'jquery'
  }
};
