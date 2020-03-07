<template>
  <div id="shopcart">
    <Navbar/>
    <Scroll
      :probeType="3"
      :pullUpLoad="{}">
      <Ad/>
      <Empty/>
    </Scroll>
  </div>
</template>

<script>

import {
  Navbar,
  Scroll,
  Ad,
  Empty
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
    Empty
  },
  activated () {
    this.$store.state.moduleDetail.active = false
  }
}
</script>

<style lang="less" scoped>

</style>