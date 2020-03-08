<template>
  <div id="shopcart-empty" v-if="this.$store.state.GOODS_LIST.length === 0">
    <div class="outer" :style="{ 'font-size': defaultFontSize }">
      <div class="img">
        <img src="~assets/img/shopcart/cute.jpeg" alt="">
      </div>
      <div class="first">购物车竟然是空的</div>
      <div class="second">再忙，也要买点什么犒劳自己~</div>
      <div class="btn" @click="goShop()">
        去逛逛
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopcartEmpty',
  data () {
    return {
      defaultFontSize: window.innerWidth * .06 + 'px'
    }
  },
  methods: {
    goShop() {
      console.log(123)
    }
  },
  activated () {
  }
}
</script>

<style lang="less" scroped>
  #shopcart-empty {
    .outer {
      position: relative;
      text-align: center;
      .img {
        position: relative;
        img {
          width: 35%;
        }
      }
      .first {
        margin-bottom: 20px;
      }
      .second {
        @media screen and (min-width: 300px) {
          font-size: 20px;
        }
        @media screen and (min-width: 700px) {
          font-size: 40px;
        }
      }
      .btn {
        border: 3px solid rgba(150, 146, 146, 0.3);
        margin: 10px 130px;
        background: #fff;
        @media screen and (max-width: 320px) {
          margin: 10px 110px;
        }
        @media screen and (min-width: 700px) {
          margin: 30px 290px;
        }
      }
    }
  }
</style>