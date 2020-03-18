<template>
  <div id="profile">
    <Scroll
      ref="scroll"
      :probeType="3"
      :pullUpLoad="{}"
      :height="height">
      <Navbar/>
      <PersonalInfo/>
      <Cart/>
      <Order/>
      <Tool/>
      <Swiper/>
      <Watch/>
      <WatchDetail/>
    </Scroll>
  </div>
</template>

<script>

import {
  Navbar,
  Scroll,
  PersonalInfo,
  Cart,
  Order,
  Tool,
  Swiper,
  Watch,
  WatchDetail
} from './index'

export default {
  name: 'Profile',
  data () {
    return {
      height: window.innerHeight * (1 - 1 / 13) + 'px'
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 500)
    })
  },
  activated () {
    this.$store.state.moduleDetail.active = false
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 500)
    })
  },
  components: {
    Navbar,
    Scroll,
    PersonalInfo,
    Cart,
    Order,
    Tool,
    Swiper,
    Watch,
    WatchDetail
  }
}
</script>

<style lang="less" scoped>
  #profile {
    background-color: rgb(248, 248, 248);
  }
</style>