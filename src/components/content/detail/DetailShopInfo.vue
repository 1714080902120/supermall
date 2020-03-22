<template>
  <div id="detail-shop-info" :style="{ 'font-size': defaultSize }">
    <div class="shop-logo-name" :style="{ 'line-height': shopLogoWidth }">
        <img :style="{ 'width': shopLogoWidth, 'height': shopLogoWidth }" :src="list.shopLogo" alt="">
        <p :style="{ 'font-size': shopNameWidth }">{{list.name}}</p>
      </div>
    <div class="shop-detail">
      <div class="shop-sells-goods">
        <div class="sells">
          <span>{{sells}}</span><br>
          <span>总销量</span>
        </div>
        <div class="goods">
          <span>{{goods}}</span><br>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="line" :style="{ 'height': shopDetailLineHehgit }"></div>
      <div class="shopScore-desc-price-quality">
        <div class="part" v-for="item in list.score" :key="item.name">
          <span>{{item.name}}</span>
          <span>{{item.score}}</span>
          <span :class="assess(item.isBetter)"></span>
        </div>
      </div>
    </div>
    <div class="shop-url" :style="{ 'font-size': shopNameWidth }">
      <a :href="list.shopUrl">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    list: Object
  },
  data () {
    return {
      width: window.innerWidth,
      shopLogoWidth: window.innerWidth / 6.25 + 'px',
      shopNameWidth: window.innerWidth / 15.63 + 'px',
      defaultSize: window.innerWidth / 23.44 + 'px',
      shopDetailLineHehgit: window.innerHeight / 8.78 + 'px'
    }
  },
  computed: {
    sells () {
      return this.list.cSells / 10000 + '万'
    },
    goods () {
      return this.list.cGoods
    },
    desc () {
      return this.list.score[0].name
    },
    assess () {
      return (isBetter) => {
        return isBetter ? { 'better': true } : { 'bad': true }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #detail-shop-info {
    margin: 20px 0;
    .shop-logo-name {
      display: flex;
      margin: 10px 0;
      img {
        border-radius: 50%;
      }
      p {
        margin-left: 10px;
        vertical-align: middle;
      }
    }
    .shop-detail {
      position: relative;
      display: flex;
      justify-content: space-between;
      .shop-sells-goods {
        flex: auto;
        display: flex;
        margin: 20px 0;
        text-align: center;
        flex: auto;
        .sells {
          flex: auto
        }
        .goods {
          flex: auto;
        }
      }
      .line {
        height: 60px;
        width: 2px;
        background-color: #000;
        margin: 0 20px;
        vertical-align: middle;
      }
      .shopScore-desc-price-quality {
        flex: auto;
        margin: 10px 0;
        display: block;
        .part {
          display: flex;
          span {
            flex: auto;
          }
        }
      }
    }
    .shop-url {
      position: relative;
      margin: 20px auto;
      text-align: center;
      a {
        border-radius: 10%;
        margin: 30px auto;
        text-align: center;
        color: #fff;
        background-color: rgba(179, 77, 14, 0.5)
      }
    }    
  }
  .better {
    &::before {
      content: '高';
      color: #fff;
      background-color: rgb(252, 7, 129);
    }
  }
  .bad {
    &::before {
      content: '低';
      color: #fff;
      background-color: rgb(0, 255, 115);
    }
  }
</style>