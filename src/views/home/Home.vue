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
      <div v-else-if="!$store.state.errState">
        <Carousel
          :bannersList="bannersList"
          v-cloak>
        </Carousel>
        <Recommends
          :recommendsList="recommendsList"
          v-cloak>
        </Recommends>
        <FeatureView/>
        <TabControl :title="title"></TabControl>
        <ul v-for="item in 100" :key="item">
        <li></li>
        </ul>
      </div>
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
      title: [
        '流行',
        '新款',
        '精选'
      ],
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        }
      }
    }
  },
  components: {
    Navbar,
    Carousel,
    Recommends,
    FeatureView,
    Loading,
    Error,
    TabControl
  },
  created () {
    this.getMultaData()
    this.getGoods('pop')
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
    getGoods (type) {
      const page = this.goods[type].page + 1
      console.log(page)
      getHomeGoods(type, page).then(res => {
        console.log(res)
        this.goods[type].list.push(...res.data.list)
        console.log(res)
      })
      console.log(this.goods)
    },
    reload () {
      this.ready = false
      this.$nextTick(() => {
        this.ready = true
      })
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
    immediate: true
  }
}
</script>

<style lang="less" scoped>
  .loading {
    position: absolute;
  }
</style>