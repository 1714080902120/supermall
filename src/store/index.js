import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    errState: false,
    goodListState: 0
  },
  mutations,
  actions,
  getters,
  modules
})
