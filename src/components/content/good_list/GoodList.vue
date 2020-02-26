<template>
  <div id="good-list">
    <div v-for="(item, index) in goodList" :key="index">
      <GoodListItem :iid="item.iid">
        <a slot="img" href="javascript:;">
          <img :src="item.show.img" alt="" @load="refresh()">
        </a>
        <p slot="title" :title="item.title">
          {{item.title}}
        </p>
        <span slot="price">{{item.orgPrice}}</span>
          <img :width="width" :height="width" slot="svg" src="~assets/img/good_list/collect.svg" alt="">
          <img :width="width" :height="width" slot="svg-active" src="~assets/img/good_list/collect_active.svg" alt="">
        <span slot="collectNum">
          {{item.cfav}}
        </span>
      </GoodListItem>
    </div>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
  name: 'GoodList',
  props: {
    goodList: Array
  },
  data () {
    return {
      goods: null,
      width: window.innerWidth / 20 + 'px'
    }
  },
  created () {
    setTimeout(() => {
      this.getGoods()
    }, 100)
  },
  components: {
    GoodListItem
  },
  methods: {
    getGoods () {
      this.goods = this.goodList
    },
    refresh () {
      if (this.$route.path.indexOf('home') !== -1) {
        this.bus.$emit('imgLoad')
      } else if (this.$route.path.indexOf('detail') !== -1) {
        this.bus.$emit('detailImgLoad')
      }
    }
  }
}
</script>

<style lang="less">
  #good-list {
    color: #000;
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>