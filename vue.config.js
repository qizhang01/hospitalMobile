module.exports = {
  productionSourceMap: true,
  transpileDependencies:['@dcloudio/uni-ui'],
  devServer: {
    hot: true,
    clientLogLevel: 'warning',
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
