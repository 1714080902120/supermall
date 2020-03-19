<template>
  <div id="error">
    <h2>网络有误！请刷新</h2>
    <img :width="width" src="~assets/img/mix/卡哇伊.png" alt="">
    <button @click="reload()">点击刷新</button>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
      width: window.innerWidth + 'px',
      height: window.innerHeight + 'px'
    }
  },
  methods: {
    reload () {
      this.$router.replace('/')
      this.$store.state.errState = false
    }
  }
}
</script>

<style lang="less">
  #error {
    position: absolute;
    text-align: center;
    button {
      width: 200px;
      height: 50px;
      color: #000;
      margin: 0px auto;
      font-family: cursive;
      font-weight: bold;
    }
  }
</style>