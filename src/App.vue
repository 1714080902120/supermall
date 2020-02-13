<template>
  <div id="app">
    <router-view/>
    <tabbar/>
  </div>
</template>

<script>
import tabbar from 'components/common/tabbar/Tabbar';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    tabbar
  }
}
</script>

<style lang="less">
@import 'assets/css/base.css';
</style>
