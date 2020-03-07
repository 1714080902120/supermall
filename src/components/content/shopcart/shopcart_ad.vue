<template>
  <div id="shopcart-ad">
    <div v-if="ifShow">
      <div class="outer" :style="{ 'font-size':fontSize, height, 'line-height': height }">
        <div class="inner">
          <a href="javascript:;">
            {{content}}
          </a>
        </div>
        <div class="close" @click="close()">
          <img src="~assets/img/detail/close.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopcartAd',
  data () {
    return {
      content: '您有90元红包待领取，速领！',
      fontSize: window.innerWidth * .07 + 'px',
      height: window.innerHeight * .1 + 'px',
      ifShow: true
    }
  },
  methods: {
    close () {
      this.ifShow = false
    }
  }
}
</script>

<style lang="less" scoped>
  #shopcart-ad {
    position: relative;
    margin: 12px 0;
    background-color: rgb(255,248,245);
    border-radius: 15px;
    .outer {
      position: relative;
      .inner {
        margin: 0 10px;
        a {
          color: #f00;
        }
      }
      .close {
        img {
          position: absolute;
          top: 0;
          right: 0;
          width: 10%;
        }
      }
    }
  }
</style>