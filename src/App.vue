<template>
  <div id="app">
    <keep-alive>
      <router-view/>  
    </keep-alive>
    <div v-if="notInDetail">
      <tabbar/>
    </div>
  </div>
</template>

<script>
import tabbar from 'components/common/tabbar/Tabbar';
export default {
  name: 'app',
  data () {
    return {
      notInDetail: true
    }
  },
  components: {
    tabbar
  },
  watch: {
    '$route' () {
      if (this.$route.path.indexOf('/detail') !== -1) {
        this.notInDetail = false
      } else {
        this.notInDetail = true
      }
    }
  }
}
</script>

<style lang="less">
@import 'assets/css/base.css';
</style>
