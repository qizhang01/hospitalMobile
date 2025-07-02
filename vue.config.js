
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
  productionSourceMap: true,
  transpileDependencies:['@dcloudio/uni-ui'],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://infusion.us.to:8443/', // 目标接口域名
        changeOrigin: true, // 是否跨域
      }
    },
    
    hot: true,
    clientLogLevel: 'warning',
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
