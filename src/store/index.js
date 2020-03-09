import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import modules from './modules'
import { GOODS_LIST } from 'common/const'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    errState: false,
    goodListState: 0,
    GOODS_LIST,
    length: 4
  },
  mutations,
  actions,
  getters,
  modules
})
