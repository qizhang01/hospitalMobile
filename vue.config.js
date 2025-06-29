
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
  productionSourceMap: true,
  transpileDependencies:['@dcloudio/uni-ui'],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://example.com', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {'^/api' : ''} // 重写路径
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
