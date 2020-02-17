<template>
  <div id="good-list">
    <div v-for="(item, index) in goodList" :key="index">
      <GoodListItem>
        <a slot="img" :href="item.link">
          <img :src="item.show.img" alt="">
        </a>
        <a :href="item.link" slot="title" :title="item.title">
          {{item.title}}
        </a>
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
    a {
      color: #000;
    }
  }
</style>