<template>
  <div id="shopcart">
    <Navbar/>
    <Scroll
      :probeType="1"
      :pullUpLoad="{}"
      ref="scroll">
      <Ad/>
      <Empty/>
      <GoodsDetail/>
      <Recommend/>
    </Scroll>
    <CountBar/>
    <BottomItem/>
  </div>
</template>

<script>
import { debounce } from 'common/utils'
import {
  Navbar,
  Scroll,
  Ad,
  Empty,
  Recommend,
  BottomItem,
  GoodsDetail,
  CountBar
} from './index'

export default {
  name: 'ShopCart',
  data () {
    return {

    }
  },
  components: {
    Navbar,
    Scroll,
    Ad,
    Empty,
    Recommend,
    BottomItem,
    GoodsDetail,
    CountBar
  },
  mounted () {
    this.$nextTick(() => {
      this.toRefresh()
    })
  },
  activated () {
    this.$store.state.moduleDetail.active = false
    this.$nextTick(() => {
      this.toRefresh()
    })
  },
  methods: {
    // 重新定位函数
    toRefresh () {
      let refresh = debounce(this.$refs.scroll.refresh, 500)
      this.bus.$on('shopcartImgLoad', () => {
        refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #shopcart {
    background-color: rgb(250,250,250);
  }
</style>