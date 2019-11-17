const webpack = require('webpack')
let baseUrl = './'
module.exports = {
    publicPath: baseUrl,
    lintOnSave: true,
    runtimeCompiler:true,
    productionSourceMap: false,
    devServer: {
        port: 8087, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/fengchi': {
                target: "http://192.168.1.1",
                ws: true,
                pathRewrite: {
                    '^/fengchi': '',
                    changeOrigin: true
                },
            },
        }
    },
    configureWebpack: (config) => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: ['vux-ui',
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })]
        }); 
    },
    chainWebpack: (config) => {
        //忽略的打包文件
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
        })
    },
    // add end
}