<template>
  <div id="category">
    <navbar>
      <div slot="left"></div>
      <div slot="center">分类</div>
      <div slot="right"></div>
    </navbar>
  </div>
</template>

<script>

import navbar from 'components/common/navbar/Navbar'

export default {
  name: 'Category',
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