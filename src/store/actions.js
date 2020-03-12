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
            payload['position'] = { x: parseInt(i), y: parseInt(length) }
            data.value = payload
            commit('pushToGOODS_LISTByActionsToAddToShopCart', data)
            commit('changeLengthAdd')
          }
          break
        }
      }
      if (!exist) {
        let leng = parseInt(state.GOODS_LIST.length)
        branch[0]['position'] = { x: leng, y: 0 }
        data.value = branch
        commit('pushToGOODS_LISTByActionsToAddToShopCart', data)
        commit('changeLengthAdd')
      }
    }
  },
  actions_changeGoodsNum ({ state, commit }, payload) {
    let outer = state.GOODS_LIST
    for (let i = 0; i < outer.length; i++) {
      if (payload.x === outer[i][0].position.x) {
        let inner = outer[i]
        for (let j = 0; j < inner.length; j++) {
          if (payload.y === inner[j].position.y) {
            commit('changeGoodsNumByActionschangeGoodsNum', { state: payload.state, x: parseInt(i), y: parseInt(j) })
          }
        }
      }
    }
  },
  actions_deleteGoods ({ state, commit }, payload) {
    let outer = state.GOODS_LIST
    for (let i = 0; i < outer.length; i++) {
      if (payload.x === outer[i][0].position.x) {
        let inner = outer[i]
        for (let j = 0; j < inner.length; j++) {
          if (payload.y === inner[j].position.y) {
            commit('deleteByActionsDeleteGoods', { x: parseInt(i), y: parseInt(j) })
          }
        }
      }
    }
  }
}

export default actions