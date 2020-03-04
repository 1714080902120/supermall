const mutations = {
  applyGoodList (state, payload) {
    state.goodListState = payload
  },
  toChangeAppear (state) {
    state.moduleHome.appear = true
  },
  addToGoodsList (state, payload) {
    let branch = []
    if (state.GOODS_LIST.length <= 0) {
      state.GOODS_LIST.push(branch.push(payload))
    } else {
      for (let i in state.GOODS_LIST) {
        if (state.GOODS_LIST[i][0].iid === payload.iid) {
          for (let j = 0; j < state.GOODS_LIST[i].length; j++) {
            if (
              state.GOODS_LIST[i][j].size === payload.sizeAndColor.size &&
              state.GOODS_LIST[i][j].color === payload.sizeAndColor.color
            ) {
              state.GOODS_LIST[i][j].priceAndNum.num += payload.priceAndNum.num
              break;
            }
          }
          state.GOODS_LIST[i].push(payload)
          break;
        }
      }
      branch.push(payload)
      state.GOODS_LIST.push(branch)
    }
  },
  removeFromGoodsList (state, payload) {
    // 判断删除的数组长度
    if (payload.length === state.GOODS_LIST.length) {
      state.GOODS_LIST = []
    } else {
      for (let i of payload) {
        for (let j of state.GOODS_LIST) {
          if (payload[i].iid === state.GOODS_LIST[j][0].iid) {
            for (let n of state.GOODS_LIST[j]) {
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
  }
}

export default mutations