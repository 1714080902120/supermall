const actions = {
  actions_addToGoodsList ({ state, commit }, payload) {
    let branch = []
    let exist = false
    let data = { key: -1, value: [] }
    let sameData = {}
    branch.push(payload)
    if (state.GOODS_LIST.length <= 0) {
      branch[0]['position'] = { x: 0, y: 0 }
      data.value = branch
      commit('pushToGOODS_LISTByActionsToAddToShopCart', data)
      commit('changeLengthAdd')
    } else {
      for (let i in state.GOODS_LIST) {
        let length = state.GOODS_LIST[i].length
        if (state.GOODS_LIST[i][0].iid === payload.iid) {
          for (let j = 0; j < state.GOODS_LIST[i].length; j++) {
            if (
              state.GOODS_LIST[i][j].sizeAndColor.size === payload.sizeAndColor.size &&
              state.GOODS_LIST[i][j].sizeAndColor.color === payload.sizeAndColor.color
            ) {
              exist = true
              sameData = {
                i,
                j,
                num: payload.priceAndNum.num
              }
              commit('changeNumFromGOODS_LISTByActionsToAddToShopCart', sameData)
              break
            }
          }
          if (!exist) {
            exist = true
            data.key = i
            payload['position'] = { x: i, y: length }
            data.value = payload
            commit('pushToGOODS_LISTByActionsToAddToShopCart', data)
            commit('changeLengthAdd')
          }
          break
        }
      }
      if (!exist) {
        let length = state.GOODS_LIST.length
        branch[0]['position'] = { x: length, y: 0 }
        data.value = branch
        commit('pushToGOODS_LISTByActionsToAddToShopCart', data)
        commit('changeLengthAdd')
      }
    }
  },
}

export default actions