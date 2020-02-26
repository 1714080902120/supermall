<template>
  <div id="home">
    <Loading class="loading" v-if="$store.state.loading"></Loading>
    <div v-if="ready">
      <Navbar color="#f85878">
        <div slot="left"></div>
        <div slot="center">购物街</div>
        <div slot="right"></div>
      </Navbar>
      <div v-show="$store.state.moduleHome.appear">
        <TabControl :titles="titles" :active="active" ref="toShowGoods-copy"></TabControl>
      </div>
      <div v-if="$store.state.errState">
        <Error/>
      </div>
      <BetterScroll
        ref="scroll"
        :probeType="3"
        :fixLocation="offsetTop"
        :pullUpLoad="{ threshold: 100 }"
        @addGoods="addNewGoods()"
        @positionFromScroll="showing()">
        <div v-if="!$store.state.errState">
          <Carousel
            :list="bannersList"
            v-cloak>
          </Carousel>
          <Recommends
            :recommendsList="recommendsList"
            v-cloak>
          </Recommends>
          <FeatureView/>
          <TabControl :titles="titles" :active="active" ref="toShowGoods"></TabControl>
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
import { debounce } from 'common/utils'
export default {
  name: 'Home',
  data () {
    return {
      bannersList: null,
      recommendsList: null,
      ready: true,
      screenWidth: document.body.clientWidth,
      offsetTop: 0,
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
      need: [],
      active: 0,
      y: 0
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
  activated () {
    if (this.y !== 0) {
      this.$refs.scroll.scrollTo({x: 0, y: this.y}, 500)
      this.$refs.scroll.refresh()
    }
  },
  deactivated () {
    this.$nextTick(() => {
      this.y = -this.$refs.scroll.y
    })
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
      this.goods[type].page += 1
      page = this.goods[type].page
      this.getGoods(type, page)
      this.whenNeed(this.goods[type].list)
      this.whenImgLoad()
    },
    whenImgLoad () {
      let refresh
      refresh = debounce(this.$refs.scroll.refresh, 200)
      this.bus.$on('imgLoad', () => {
        refresh()
      })
    },
    fixTheTabControl () {
      this.$nextTick(() => {
        this.offsetTop = this.$refs.toShowGoods.$el.offsetTop
      })
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      this.reload()
    }, 150)
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      }) ()
    }
    this.whenImgLoad()
    setTimeout(() => { this.fixTheTabControl() }, 1000)
  },
  watch: {
    'screenWidth' () {
      setTimeout(() => {
        this.reload()
      }, 100)
    },
    '$store.state.goodListState' (newVal) {
      let type
      this.active = newVal
      type = this.titles[newVal].en
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