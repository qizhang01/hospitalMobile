module.exports = {
  productionSourceMap: true,
  devServer: {
    hot: true,
    clientLogLevel: 'warning',
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
