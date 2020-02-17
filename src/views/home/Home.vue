<template>
  <div id="home">
    <Loading class="loading" v-if="$store.state.loading"></Loading>
    <div v-if="ready">
      <Navbar>
        <div slot="left"></div>
        <div slot="center">购物街</div>
        <div slot="right"></div>
      </Navbar>
      <div v-if="$store.state.errState">
        <Error/>
      </div>
      <BetterScroll :probeType="3" :pullUpLoad="{ threshold: 100 }" @addGoods="addNewGoods()">
        <div v-if="!$store.state.errState">
          <Carousel
            :bannersList="bannersList"
            v-cloak>
          </Carousel>
          <Recommends
            :recommendsList="recommendsList"
            v-cloak>
          </Recommends>
          <FeatureView/>
          <TabControl :titles="titles" ref="toShowGoods"></TabControl>
          <GoodList :goodList="need"></GoodList>
        </div>
      </BetterScroll>
    </div>
  </div>
</template>

<script>
import {
  Navbar,
  Carousel,
  Recommends,
  FeatureView,
  TabControl,
  GoodList,
  BetterScroll,
  // others
  Error
} from './index'

import { getHomeMultaData, getHomeGoods } from 'network/home'
// other
import Loading from 'components/common/mix/loading'

export default {
  name: 'Home',
  data () {
    return {
      bannersList: null,
      recommendsList: null,
      ready: true,
      screenWidth: document.body.clientWidth,
      titles: [
        {
          ch: '流行',
          en: 'pop'
        },
        {
          ch: '热销',
          en: 'sell'
        },
        {
          ch: '最新',
          en: 'new'
        }
      ],
      goods: {
        'pop': {
          page: 1,               
          list: []
        },
        'sell': {
          page: 1,
          list: []
        },
        'new': {
          page: 1,
          list: []
        }
      },
      need: []
    }
  },
  components: {
    Navbar,
    Carousel,
    Recommends,
    FeatureView,
    Loading,
    Error,
    TabControl,
    GoodList,
    BetterScroll
  },
  created () {
    this.getMultaData()
    this.getGoods('pop', 1)
    this.getGoods('sell', 1)
    this.getGoods('new', 1)
    this.whenNeed(this.goods.pop.list)
  },
  updated () {
  },
  methods: {
    getMultaData () {
      getHomeMultaData().then(res => {
        this.bannersList = res.data.banner.list
        this.recommendsList = res.data.recommend.list
      })
    },
    getGoods (type, page) {
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
      })
    },
    reload () {
      this.ready = false
      this.$nextTick(() => {
        this.ready = true
      })
    },
    whenNeed (list) {
      this.need = list
    },
    addNewGoods () {
      let type, page
      type = this.titles[this.$store.state.goodListState].en
      console.log(type)
      this.goods[type].page += 1
      page = this.goods[type].page
      this.getGoods(type, page)
      this.whenNeed(this.goods[type].list)
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      this.reload()
    }, 100)
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      }) ()
    }
  },
  watch: {
    'screenWidth' () {
      setTimeout(() => {
        this.reload()
      }, 100)
    },
    '$store.state.goodListState' (newVal) {
      let type
      type = this.titles[newVal].en
      if (this.goods[type].page === 0) {
        this.goods[type].page += 1
        this.getGoods(type, 1)
      }
      this.whenNeed(this.goods[type].list)
    },
    immediate: true
  }
}
</script>

<style lang="less" scoped>
  #home {
    overflow: hidden;
  }
  .loading {
    position: absolute;
  }
</style>