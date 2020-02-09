<template>
  <div id="profile">
    <navbar>
      <div slot="left"></div>
      <div slot="center">我的</div>
      <div slot="right"></div>
    </navbar>
  </div>
</template>

<script>

import navbar from 'components/common/navbar/Navbar'

export default {
  name: 'Profile',
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