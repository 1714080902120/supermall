<template>
  <div id="detail">
    <DetailNavbar/>
    <Scroll
      ref="scroll"
      :probeType="3"
      :pullUpLoad="{}">
      <Swiper :list="dataToSwiper"/>
      <DetailInfo :list="dataToDetailInfo"/>
      <ShopInfo :list="dataToShopInfo"/>
      <GoodsInfo :list="dataToGoodsInfo"/>
      <ParamsInfo :list="dataToParamsInfo" ref="paramsPosition"/>
      <DetailRate :list="dataToRateInfo" ref="ratePosition"/>
      <RecommendGoodsList :goodList="dataToRecommendGoodList" ref="recommendPosition"/>
    </Scroll>
    <TabBar ref="tabbar"/>
    <div v-if="sureToCart">
      <addToShopCart :list="dataToTabBar"/>
    </div>
  </div>
</template>

<script>
import { getDetailData, getRecommendData } from 'network/detail'
import { debounce } from 'common/utils'
import {
  // 组件
  DetailNavbar,
  Swiper,
  Scroll,
  DetailInfo,
  ShopInfo,
  GoodsInfo,
  ParamsInfo,
  DetailRate,
  RecommendGoodsList,
  TabBar,
  addToShopCart,
  // 类
  GoodsDetail,
  DefaultInfo,
  React,
  GoodList
  } from './index'
export default {
  name: 'Detail',
  data () {
    return {
      iid: '',
      detailData: null,
      dataToSwiper: [],
      dataToDetailInfo: {},
      dataToShopInfo: {},
      dataToGoodsInfo: {},
      dataToParamsInfo: {},
      dataToRateInfo: {},
      dataToRecommendGoodList: [],
      dataToTabBar: {},
      sureToCart: false
    }
  },
  components: {
    DetailNavbar,
    Swiper,
    DetailInfo,
    Scroll,
    ShopInfo,
    GoodsInfo,
    ParamsInfo,
    DetailRate,
    RecommendGoodsList,
    TabBar,
    addToShopCart
  },
  created () {
    this.$store.state.moduleDetail.active = false
    this.iid = this.$route.params.iid
    this.toGetDetailData(this.iid)
    this.toGetRecommendData()
  },
  mounted() {
  },
  activated () {
    this.$nextTick(() => {
      this.$refs.scroll.scrollTo({ x: 0, y: 0 }, 100)
      this.whenImgLoad()
    })
  },
  deactivated() {
  },
  methods: {
    // 详情页数据请求
    toGetDetailData (iid) {
      getDetailData(iid)
      .then((res) => {
        this.detailData = res.result
        this.toGetSwiperData()
        this.toGetGoodsDetailData()
        this.toGetShopData()
        this.toGetGoodsListData()
        this.toGetParamsData().then(res => {
          this.toGetSizeAndColor(res)
        })
        .catch(err => { throw new Error(err) })
        this.toGetRateData()
      })
      .catch((err) => {
        throw new Error(err)
      })
    },
    // 详情页推荐数据请求
    toGetRecommendData () {
      getRecommendData()
      .then(res => {
        this.toGetRecommendGoodListData(res.data.list)
      })
      .catch(err => {
        throw new Error(err)
      })
    },
    // 获取轮播需求的数据信息
    toGetSwiperData () {
      this.dataToSwiper = this.detailData.itemInfo.topImages
    },
    // 获取详情页介绍数据
    toGetGoodsDetailData () {
      let defaultInfo, react, itemInfo, columns
      itemInfo = this.detailData.itemInfo
      columns = this.detailData.columns
      defaultInfo = new DefaultInfo(itemInfo.title, itemInfo.price, itemInfo.oldPrice, { desc: itemInfo.discountDesc, bgColor: itemInfo.discountBgColor })
      react = new React(columns[0], columns[1], columns[2])
      this.dataToDetailInfo = new GoodsDetail(defaultInfo, react)
    },
    // 获取商铺信息
    toGetShopData () {
      this.dataToShopInfo = this.detailData.shopInfo
    },
    // 获取商品展示信息
    toGetGoodsListData () {
      this.dataToGoodsInfo = this.detailData.detailInfo
    },
    // 请求参数数据
    toGetParamsData () {
      return new Promise((resolve, reject) => {
        this.dataToParamsInfo = this.detailData.itemParams
        if (this.dataToParamsInfo) {
          resolve(this.dataToParamsInfo)
        } else {
          reject('No Ok')
        }
      })
    },
    // 请求评论数据
    toGetRateData () {
      this.dataToRateInfo = this.detailData.rate
    },
    // 获取推荐数据
    toGetRecommendGoodListData (res) {
      res.forEach(e => {
        e.discountPrice = '￥' + e.discountPrice
        this.dataToRecommendGoodList.push(new GoodList(e.image, e.title, e.item_id, e.discountPrice, e.cfav))
      })
    },
    // 刷新位置
    whenImgLoad () {
      let a, b, c
      a = debounce(this.$refs.scroll.refresh, 500)
      b = debounce(this.$refs.scroll.refresh, 500)
      c = debounce(this.$refs.scroll.refresh, 500)
      this.bus.$on('detailImgLoad', () => {
        a()
      })
      this.bus.$on('swiperIsReady', () => {
        b()
      })
      this.bus.$on('goodsImgIsReady', () => {
        c()
      })
      setTimeout(() => {
        this.goToNeedPosition()
        this.getTotalPosition()
      }, 1500)
    },
    // 获取组件的位置并且传递数据
    getTotalPosition () {
      let paramsPosition, ratePosition, recommendPosition
      this.$nextTick(() => {
        paramsPosition = -this.$refs.paramsPosition.$el.offsetTop
        ratePosition = -this.$refs.ratePosition.$el.offsetTop
        recommendPosition = -this.$refs.recommendPosition.$el.offsetTop
        this.$refs.scroll.judgePosition(paramsPosition, ratePosition, recommendPosition)
      })
    },
    goToNeedPosition () {
      this.$nextTick(() => {
        this.bus.$on('toWhere', (res) => {
          switch (res) {
            case 0:
              this.$refs.scroll.scrollTo({ x: 0, y: 0 }, 500);
              break
            case 1:
              this.$refs.scroll.scrollTo({ x: 0, y: -this.$refs.paramsPosition.$el.offsetTop }, 500)
              break
            case 2:
              this.$refs.scroll.scrollTo({ x: 0, y: -this.$refs.ratePosition.$el.offsetTop }, 500)
              break
            case 3:
              this.$refs.scroll.scrollTo({ x: 0, y: -this.$refs.recommendPosition.$el.offsetTop }, 500)
              break
          }
        })
      })

    },
    toGetSizeAndColor (res) {
      let color, size, set, img, price, available, shop, title
      set = res.info.set
      color = []
      size = []
      img = this.dataToSwiper[0]
      price = this.dataToDetailInfo.defaultInfo.currentPrice
      available = '999'
      title = this.dataToDetailInfo.defaultInfo.title
      shop = {
        shopName: this.dataToShopInfo.name,
        shopLogo: this.dataToShopInfo.shopLogo,
        shopUrl: this.dataToShopInfo.shopUrl
      }
      for(let i in set) {
        if (set[i].key === '颜色') {
          color = set[i].value.split(',')
        } else if (set[i].key === '尺码') {
          size = set[i].value.split(',')
        }
      }
      this.dataToTabBar = {
        iid: this.iid,
        size,
        color,
        img,
        price,
        available,
        title,
        shop
      }
    }
  },
  destroyed () {
  },
  watch: {
    '$route.params.iid' (newVal) {
      if (!newVal) return false
      this.iid = newVal
      this.toGetDetailData(this.iid)
      
    },
    'dataToTabBar' (newVal) {
      if (newVal) {
        this.sureToCart = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #detail {
    overflow: hidden;
  }
</style>