module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'mommon': '@/common',
        'network': '@/network'
      }
    }
  }
}
