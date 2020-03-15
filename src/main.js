import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import FastClick from 'fastclick'
import LazyLoad from 'lazy-load'
Vue.prototype.bus = new Vue ()
Vue.use(MintUI)
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(LazyLoad)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

