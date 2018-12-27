const webpack = require('webpack');
const { getProjectPath } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require(getProjectPath('package.json'));

module.exports = (options) => {
  // 需要处理的文件目录
  const includePaths = [getProjectPath('/examples'), getProjectPath('/src')];
  // 判断是 dev 或 prod
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    // entry是唯一入口文件， 如果是一个数组，会将数组里面的文件一起打包;
    // 如果是对象，将分别输出不同的文件，output 中filename接收。
    entry: {
      main: getProjectPath('/examples/index.tsx')
    },
    module: {
      // 警告替换为Error
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|mjs|tsx?|jsx?)$/,
          enforce: 'pre', // 前置(pre), 先loader此部分，进行相应的语法检查
          loader: 'eslint-loader',
          options: {
            formatter: require("eslint-friendly-formatter"),
            eslintPath: require.resolve('eslint'),
            failOnWarning: true,
            failOnError: true,
          },
          include: includePaths
        },
      ]
    },
    // 解析
    resolve: {
      // 解析模块时应该搜索的目录, 添加一个目录到模块搜索目录，此目录优先于 node_modules 搜索
      modules: [getProjectPath('examples'), getProjectPath('node_modules')],
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        'rate-mobile': getProjectPath('src'),
        '@': getProjectPath('examples')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        // 生成的html title 内容
        title: 'Rare Mobile Doc',
        // 引入模块的排序方式
        chunksSortMode: function (a, b) {
          const entryPoints = ['vendor', 'main'];
          return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        },
        // logo
        favicon: './favicon.ico',
        stat: isProduction,
        inject: 'body',
        template: getProjectPath('examples/index.html'),
        hash: true,
        // true if mode is 'production', otherwise false
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : null
      }),
      // 为每个打包的文件头部添加 banner（版权和版本信息等）
      new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`),
    ],
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  };
};
