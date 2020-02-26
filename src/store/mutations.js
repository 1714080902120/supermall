const mutations = {
  applyGoodList (state, payload) {
    state.goodListState = payload
  },
  toChangeAppear (state) {
    state.moduleHome.appear = true
  }
}

export default mutations