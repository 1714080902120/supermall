<template>
  <div id="shopcart-navbar">
    <navbar>
      <div class="left-outer" slot="left"><div :style="{ 'font-size': fontSize }" class="left-inner">购物车</div></div>
      <div class="center-outer" slot="center"><div class="center-inner"></div></div>
      <div class="right-outer" slot="right"><div @click="options()" class="right-inner">{{finish.value}}</div></div>
    </navbar>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/Navbar'
export default {
  name: 'ShopCartNavBar',
  data () {
    return {
      finish: {
        time: 0,
        value: '管理'
      },
      fontSize: window.innerWidth * 0.07 + 'px'
    }
  },
  components: {
    navbar
  },
  mounted () {
  },
  methods: {
    options () {
      this.finish.time = (this.finish.time + 1) % 2
      this.finish.value = this.finish.time % 2 !== 0 ? '完成': '管理'
    }
  },
  watch: {
    'finish.time' (newVal) {
      if (newVal === 1) {
        this.bus.$emit('iAmGoingToDelete')
      } else {
        this.bus.$emit('iAmFinishDelete')
        this.bus.$emit('cancel')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #shopcart-navbar {
    background-color: var(--color-high-text);
    .left-outer {
      position: relative;
      .left-inner {
        font-weight: bold;
        border-bottom: none;
      }
    }
    .right-outer {
      position: relative;
      .right-inner {
        text-align: center;
        font-weight: 500;
      }
    }
  }
</style>