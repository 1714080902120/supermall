<template>
  <div id="shopcart">
    <navbar>
      <div slot="left"></div>
      <div slot="center">购物车</div>
      <div slot="right"></div>
    </navbar>
  </div>
</template>

<script>

import navbar from 'components/common/navbar/Navbar'

export default {
  name: 'ShopCart',
  data () {
    return {

    }
  },
  components: {
    navbar
  }
}
</script>

<style lang="less" scoped>

</style>