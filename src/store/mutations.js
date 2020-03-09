const mutations = {
  applyGoodList (state, payload) {
    state.goodListState = payload
  },
  toChangeAppear (state) {
    state.moduleHome.appear = true
  },
  removeFromGoodsList (state, payload) {
    // 判断删除的数组长度
    if (payload.length === state.GOODS_LIST.length) {
      state.GOODS_LIST = []
    } else {
      for (let i in payload) {
        for (let j in state.GOODS_LIST) {
          if (payload[i].iid === state.GOODS_LIST[j][0].iid) {
            for (let n in state.GOODS_LIST[j]) {
              if (
                payload[i].sizeAndColor.size === state.GOODS_LIST[j][n].sizeAndColor.size &&
                payload[i].sizeAndColor.color === state.GOODS_LIST[j][n].sizeAndColor.color
              ) {
                state.GOODS_LIST[j].splice(n, 1)
                break
              }
            }
            if (state.GOODS_LIST[j].length <= 0 || !state.GOODS_LIST[j]) {
              state.GOODS_LIST.splice(j, 1)
            }
            break
          }
        }
      }
    }
  },
  pushToGOODS_LISTByActionsToAddToShopCart (state, payload) {
    payload.key === -1 ? state.GOODS_LIST.push(payload.value) : state.GOODS_LIST[payload.key].push(payload.value)
    console.log(state.GOODS_LIST)
  },
  changeNumFromGOODS_LISTByActionsToAddToShopCart (state, payload) {
    state.GOODS_LIST[payload.i][payload.j].priceAndNum.num += payload.num
    console.log(state.GOODS_LIST)
  },
  changeLengthAdd (state) {
    state.length += 1
  },
  changeLengthSub (state) {
    state.length -= 1
  }
}

export default mutations