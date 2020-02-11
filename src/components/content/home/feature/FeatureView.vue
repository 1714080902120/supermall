<template>
  <div>
    <a href="https://act.mogujie.com/zzlx67">
      <img :width="width" src="~assets/img/home/recommend_bg.jpg" alt="feature">
    </a>
  </div>
</template>

<script>
export default {
  name: 'Feature',
  data () {
    return {
      width: 0
    }
  },
  created () {
    setTimeout(() => {
      let width
      width = document.body.clientWidth
      this.width = width + 'px'
    }, 300)
  }
}
</script>

<style lang="less">
  
</style>