<template>
  <div id="category-goods-list" v-if="goodsList" :style="{ 'font-size': fontSize }">
    <div class="outer">
      <div class="inner" v-for="item in goodsList" :key="item.acm" @click="toDetail(item.link)">
        <span class="img"><img v-lazy="item.image" alt="" @load="toRefresh()"></span>
        <span class="title">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryGoodsList',
  props: {
    goodsList: {
      type: Array
    }
  },
  data () {
    return {
      fontSize: window.innerWidth * .05 + 'px'
    }
  },
  methods: {
    toDetail (link) {
      window.location.href = link
    },
    toRefresh () {
      this.bus.$emit('IAmFinishLoading')
    }
  }
}
</script>

<style lang="less" scoped>
  #category-goods-list {
    .outer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      .inner {
        margin-bottom: 20px;
        width: 33%;
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 18px;
        img {
          width: 100%;
        }
      }
    }
  }
</style>