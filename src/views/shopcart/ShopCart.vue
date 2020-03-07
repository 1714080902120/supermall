<template>
  <div id="shopcart">
    <Navbar/>
    <Scroll
      :probeType="1"
      :pullUpLoad="{}"
      ref="scroll">
      <Ad/>
      <Empty/>
      <Recommend/>
    </Scroll>
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
  BottomItem
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
    BottomItem
  },
  mounted () {
    this.$nextTick(() => {
      this.toRefresh()
    })
  },
  activated () {
    this.$store.state.moduleDetail.active = false
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

</style>