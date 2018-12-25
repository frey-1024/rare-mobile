const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base.js');
const { getProjectPath } = require('./utils');

const pkg = require(getProjectPath('package.json'));
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8081;

module.exports = merge(baseConfig(), {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: getProjectPath('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(tsx|ts|js|jsx)$/,
            loaders: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.(bmp|gif|jpe?g|png)$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(scss|sass|css)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    autoprefixer({
                      browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 9',
                        'iOS >= 8',
                        'Android >= 4'
                      ]
                    }),
                    cssnano({
                      preset: 'default',
                      zindex: false
                    }),
                  ],
                },
              },
              {
                loader: 'sass-loader'
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|tsx|ts)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
        NODE_ENV: JSON.stringify(ENV),
        VERSION: JSON.stringify(pkg.version)
      }
    })
  ],
  devServer: {
    port: PORT,
    host: HOST,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },
    disableHostCheck: true
  }
});
