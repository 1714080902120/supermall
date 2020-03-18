import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'
import { Upload } from 'element-ui'
Vue.prototype.bus = new Vue ()
Vue.use(MintUI)
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(LazyLoad, {
  error: 'assets/img/mix/卡哇伊.png',
  loading: 'assets/img/lazy-load/loading.gif',
  attempt: 1
})
Vue.use(Upload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
