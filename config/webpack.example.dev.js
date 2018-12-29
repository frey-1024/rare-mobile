const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base.js');
const { getProjectPath } = require('./utils');

const pkg = require(getProjectPath('package.json'));
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8081;

module.exports = merge(baseConfig(), {
  // 会将 process.env.NODE_ENV 的值设为 development, 告知 webpack 使用相应模式的内置优化
  mode: 'development',
  // 原始源代码（仅限行）定位到原始代码问题，比source-map 快，但是没有列映射(column mapping)的 source-map
  devtool: 'cheap-module-source-map',
  output: {
    path: getProjectPath('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js',
    publicPath: '/', // 指定资源文件引用的目录
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
            test: /\.md$/,
            use: 'raw-loader' // 把文件内容作为字符串返回
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
                  // modules: true, // 这里因为组件使用的不是css-module， 不想区分examples/src，所以这里也不再使用css-module
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
    // 启用热替换模块(Hot Module Replacement)，也被称为 HMR
    new webpack.HotModuleReplacementPlugin(),
    // 允许创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
        NODE_ENV: JSON.stringify(ENV),
        VERSION: JSON.stringify(pkg.version)
      }
    }),
    // 相关配置文档：https://github.com/geowarin/friendly-errors-webpack-plugin
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`运行链接: http://${HOST}:${PORT}`],
      },
      onErrors: null,
      clearConsole: true,
    })
  ],
  // 相关配置文档： https://webpack.docschina.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx
  devServer: {
    quiet: true,
    compress: true,
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
