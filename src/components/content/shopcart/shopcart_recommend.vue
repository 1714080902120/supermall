<template>
  <div id="shopcart-recommend">
    <div class="title-outer">
      <div class="inner" :style="{ 'font-size': fontSize }">
        <img src="~assets/img/shopcart/like.svg" alt="">
        你可能还喜欢
      </div>
    </div>
    <RecommendGoodsList :goodList="dataToRecommendGoodList" ref="recommendPosition"/>
  </div>
</template>

<script>
class GoodList {
  show = {
    img: ''
  }
  title
  iid
  orgPrice
  cfav
  constructor (img, title, iid, orgPrice, cfav) {
    this.show.img = img
    this.title = title
    this.iid = iid
    this.orgPrice = orgPrice
    this.cfav = cfav
  }
}
import { getRecommendData } from 'network/detail'
import RecommendGoodsList from 'components/content/good_list/GoodList'

export default {
  name: 'ShopcartRecommend',
  data () {
    return {
      dataToRecommendGoodList: [],
      fontSize: window.innerWidth * .06 + 'px'
    }
  },
  mounted () {
    this.toGetRecommendData()
    this.$nextTick(() => {
    })
  },
  components: {
    RecommendGoodsList
  },
  methods: {
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
    // 获取推荐数据
    toGetRecommendGoodListData (res) {
      res.forEach(e => {
        e.discountPrice = '￥' + e.discountPrice
        this.dataToRecommendGoodList.push(new GoodList(e.image, e.title, e.item_id, e.discountPrice, e.cfav))
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #shopcart-recommend {
    margin: 25px 0;
    position: relative;
    .title-outer {
      position: relative;
      .inner {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color:rgb(253, 94, 21);
        img {
          width: 10%;
        }
        &:before {
          content: '~•';
          text-align: center;
        }
        &:after {
          content: '•~';
        }
      }
    }
  }
</style>