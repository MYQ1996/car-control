const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const vuxLoader = require('vux-loader');
const webpack = require('webpack')
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用包时的基本 URL
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    port: 8080, // 端口号
    host: 'localhost',
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://59.215.223.193:8181',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    } // 配置多个代理
  },
  configureWebpack: config => {
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true, // console
          drop_debugger: false,
          pure_funcs: ['console.log'] // 移除console
        }
      }
    });
    vuxLoader.merge(config, {
      plugins: [
        { name: 'vux-ui' },
        { name: 'less-theme', path: 'src/themes/index.less' }, // 配置主题 指定用以覆盖的less文件路径
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "windows.jQuery": "jquery"
        })
      ]
    });
  },
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'VCharts': 'v-charts'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  }
};