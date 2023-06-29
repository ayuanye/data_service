const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath:"./",
  css: {
    loaderOptions: {
      less: {
        // 这是less新版本的写法 还在测试中
        // prependData: `@import "~@/theme/my-theme.less";`
        javascriptEnabled: true
      }
    },
    modules: false
  },
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '^/yxdd': {
        target: 'http://192.168.1.76:5111',
        changeOrigin: true,
        pathRewrite: {
          '^/yxdd': '/yxdd'
        }
      },
      '^/api': {
        target: 'http://10.162.3.91:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('styles', resolve('src/assets/styles'))
      .set('common', resolve('src/common'))
      .set('static', resolve('static'))
  }
}
