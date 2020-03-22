<template>
  <div id="category-navbar">
    <Navbar>
      <div slot="left"></div>
      <div slot="center">商品分类</div>
      <div slot="right"></div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
export default {
  name: 'CategoryNavBar',
  data () {
    return {

    }
  },
  components: {
    Navbar
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  #category-navbar {
    background-color: var(--color-high-text);
  }
</style>