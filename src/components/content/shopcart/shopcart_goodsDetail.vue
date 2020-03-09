<template>
  <div id="shopcart-goods-detail">
    <div v-if="$store.state.GOODS_LIST.length !== 0">
      <div v-for="(shop, index) in $store.state.GOODS_LIST" :key="shop[0].iid">
        <div class="outer" :style="{ 'font-size': defaultFontSize }">
          <div class="shopLogo-shopName" :style="{ 'height': shopHeight, 'line-height': shopHeight }">
            <span class="select"><img @click="shopManage(index)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="shopDefaultManageState(index)" src="~assets/img/shopcart/all.svg" alt=""></span>
            <span class="select"><img @click="shopManageActive(index)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="shopActiveManageState(index)" src="~assets/img/shopcart/all_active.svg" alt=""></span>
            <div class="shopLogo-shopName">
              <img :src="shop[0].shop.shopLogo" alt="">
              <a :href="shop[0].shop.shopUrl">
              {{shop[0].shop.shopName}}
              </a>
            </div>
          </div>
          <div v-for="(goods, indey) in shop" :key="indey">
            <div class="discount" :style="{ 'font-size': discountFontSize, 'height': shopHeight, 'line-height': shopHeight }">
              <span class="discount-label">网店满减</span>
              <span class="discount-content">3.5 0点开享，每满200减15</span>
              <span class="discount-collect-bill">
                <a :href="goods.shop.shopUrl">凑单</a>
              </span>
            </div>
            <div class="shop-goods-detail">
              <span class="select"><img @click="goodsManage(index, indey)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="goodsDefaultManageState(index, indey)" src="~assets/img/shopcart/all.svg" alt=""></span>
              <span class="select"><img @click="goodsManageActive(index, indey)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="goodsActiveManageState(index, indey)" src="~assets/img/shopcart/all_active.svg" alt=""></span>
              <div class="img-title-sizeAndColor-priceAndNum" :style="{ 'font-size': discountFontSize, 'height': descOuterHeight }">
                <div class="img">
                  <img :src="goods.imgAndTitle.img" alt="">
                </div>
                <div class="title-sizeAndColor-priceAndNum">
                  <p class="title" :style="{ 'height': titleHeight }">{{goods.imgAndTitle.title}}</p>
                  <p class="size-color" :style="{ 'font-size': discountFontSize, 'height': descHeight, 'line-height': descHeight }">{{goods.sizeAndColor.size}},{{goods.sizeAndColor.color}}</p>
                  <div class="price-num">
                    <p class="price" :style="{ 'font-size': priceFontSize, 'height': descHeight }">{{goods.priceAndNum.price}}</p>
                    <div class="num">
                      <div class="num-1">
                        <span></span>
                      </div>
                      <div class="num-2">
                        <span>-</span>
                        <span>{{goods.priceAndNum.num}}</span>
                        <span>+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopcartGoodsDetail',
  data () {
    return {
      inActive: false,
      activeArr: [],
      defaultFontSize: window.innerWidth * .05 + 'px',
      shopHeight: window.innerHeight * .07 + 'px',
      selectImgWidth: window.innerWidth * .05 + 'px',
      discountFontSize: window.innerWidth * .04 + 'px',
      descHeight: window.innerHeight * .04 + 'px',
      descOuterHeight: window.innerHeight * .2 + 'px',
      titleHeight: window.innerHeight * .08 + 'px',
      priceFontSize: window.innerWidth * .08 + 'px'
    }
  },
  mounted () {
    this.goDelete()
  },
  methods: {
    goDelete () {
      this.bus.$on('iAmGoingToDelete', () => {
        this.manage = true
      })
      this.bus.$on('iAmFinishDelete', () => {
        this.manage = false
      })
    },
    shopManage (index) {
      this.activeArr.push(this.$store.state.GOODS_LIST[index])
      console.log(this.activeArr)
    },
    shopManageActive (x) {
      if (this.activeArr.length <= 0) {
        return false
      }
      this.activeArr.splice(this.activeArr.find((value, index) => {
        console.log(value)
        if (value[0].position.x === x) return index
      }), 1)
    },
    goodsManage() {
      
    },
    goodsManageActive () {

    }
  },
  computed: {
    shopDefaultManageState () {
      let arr = this.activeArr
      return (x) => {
        if (arr.length <= x) { return true }
        return false
      }
    },
    shopActiveManageState () {
       let arr = this.activeArr
      return (x) => {
        if (arr.length > x) { return true }
        return false
      }
    },
    goodsDefaultManageState () {
      let arr = this.activeArr
      return (x, y) => {
        console.log()
        if (arr.length === 0 || arr.length <= x || arr[x].length <= y) {
          return true
        }
        return false
      }
    },
    goodsActiveManageState () {
      let arr = this.activeArr
      return (x, y) => {
        if (arr.length === 0 || arr.length <= x || arr[x].length <= y) {
          return false
        }
        return true
      }
    }
  }
}
</script>

<style lang="less" scroped>
  #shopcart-goods-detail {
    display: flex;
    flex-direction: column;
    margin-top: -10px;
    overflow: hidden;
    .outer {
      display: flex;
      flex-direction: column;
      margin: 10px;
      background-color: rgb(255,255,255);
      border-radius: 12px;
      .shopLogo-shopName {
        position: relative;
        display: flex;
        .select {
          img {
            width: 50%;
            vertical-align: middle;
            margin: 10px;
          }
        }
        .shopLogo-shopName {
          flex: auto;
          display: flex;
          align-items: center;
          font-weight: bold;
          img {
            width: 10%;
          }
          a {
            &::after {
              content: '›';
              opacity: .5;
            }
          }
        }
      }
      .discount {
        display: flex;
        align-items: center;
        margin: 0;
        background-color: rgb(255,248,245);
        .discount-label {
          border: 1px solid #f00;
          color: #f00;
          margin: 0 5px;
          line-height: 20px;
          margin-left: 50px;
          @media screen and (max-width: 320px) {
            line-height: 20px;
            margin-left: 38px;
          }
          @media screen and (min-width: 700px) {
            margin-left: 70px;
            line-height: 40px;
          }
          @media screen and (min-width: 1024px) {
            line-height: 50px;
          }
        }
        .discount-content {
          flex: auto;
          margin: 0 5px;
        }
        .discount-collect-bill {
          a {
            &::after {
              content: '›';
              margin-right: 10px;
            }
            color: #f00;
          }
        }
      }
      .shop-goods-detail {
        position: relative;
        background-color: rgb(249,241,238);
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .select {
          position: relative;
          img {
            width: 34%;
            margin-left: 10px;
          }
        }
        .img-title-sizeAndColor-priceAndNum {
          flex: auto;
          display: flex;
          justify-content: space-around;
          .img {
            margin: 0 -180px 0 20px;
            img {
              width: 30%;
            }
            @media screen and (max-width: 320px) {
              margin: 0 -230px 0 20px;
              img {
                width: 20%;
              }
            }
            @media screen and (min-width: 700px) {
              margin: 0 -190px 0 30px;
              img {
                width: 40%;
              }
            }
          }
          .title-sizeAndColor-priceAndNum {
            display: flex;
            flex-direction: column;
            .title {
              overflow: hidden;
              text-overflow: ellipsis;
              // white-space: pre-wrap;
            }
            .size-color {
              opacity: .6;
              &:after {
                content: '∨';
                transform: rotate(0, 0, -90deg);
              }
            }
            .price-num {
              .price {
                color: #f00;
              }
              .num {
                display: flex;
                justify-content: space-between;
                .num-1 {
                  flex: auto;
                }
                .num-2 {
                  flex: auto;
                  text-align: center;
                  display: flex;
                  justify-content: space-around;
                  span {
                    flex: auto;
                    border: 1px solid rgb(228, 228, 228);
                  }
                }
              }
            }
          }
        }
      }
    }

  }
</style>