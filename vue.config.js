module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      'T': 'T'
    },
    performance: {
      hints: false
    },
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'common': '@/common',
        'network': '@/network',
        'store': '@/store'
      }
    }
  },
  // // devServer 选项单独配置
  // devServer: {
  //   https: false,
  //   proxy: {
  //     '/home': {
  //       target: 'http://123.207.32.32:8000/api/wh',
  //       // 这个是全局的环境配置变量，单独建立的文件，以VUE_APP_开头的变量，每个文件中都可以访问，假设这里是http://www.sweeeper.com
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/home': ''   //需要rewrite重写的,
  //       }
  //     },
  //     '/detail': {
  //       target: 'http://123.207.32.32:8000/api/wh',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/detail': ''   //需要rewrite重写的,
  //       }
  //     },
  //     '/recommend': {
  //       target: 'http://123.207.32.32:8000/api/wh',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/recommend': ''   //需要rewrite重写的,
  //       }
  //     },
  //     '/category': {
  //       target: 'http://123.207.32.32:8000/api/wh',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/category': ''   //需要rewrite重写的,
  //       }
  //     },
  //     '/subcategory': {
  //       target: 'http://123.207.32.32:8000/api/wh',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/subcategory': ''   //需要rewrite重写的,
  //       }
  //     }
  //   }
  // }
}
