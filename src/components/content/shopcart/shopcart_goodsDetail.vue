<template>
  <div id="shopcart-goods-detail">
    <div v-if="$store.state.GOODS_LIST.length !== 0">
      <div v-for="(shop) in $store.state.GOODS_LIST" :key="shop[0].iid">
        <div class="outer" :style="{ 'font-size': defaultFontSize }">
          <div class="shopLogo-shopName" :style="{ 'height': shopHeight, 'line-height': shopHeight }">
            <span class="select"><img @click="shopManage(shop[0].position.x)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="shopDefaultManageState(shop[0].position.x)" src="~assets/img/shopcart/all.svg" alt=""></span>
            <span class="select"><img @click="shopManageActive(shop[0].position.x)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="shopActiveManageState(shop[0].position.x)" src="~assets/img/shopcart/all_active.svg" alt=""></span>
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
              <span class="select"><img @click="goodsManage(goods.position.x, goods.position.y)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="goodsDefaultManageState(goods.position.x, goods.position.y)" src="~assets/img/shopcart/all.svg" alt=""></span>
              <span class="select"><img @click="goodsManageActive(goods.position.x, goods.position.y)" :style="{ 'width': selectImgWidth, 'height': selectImgWidth }" v-if="!goodsDefaultManageState(goods.position.x, goods.position.y)" src="~assets/img/shopcart/all_active.svg" alt=""></span>
              <div class="img-title-sizeAndColor-priceAndNum" :style="{ 'font-size': discountFontSize, 'height': descOuterHeight }">
                <div class="img">
                  <img :src="goods.imgAndTitle.img" alt="">
                </div>
                <div class="title-sizeAndColor-priceAndNum">
                  <p class="title" :style="{ 'height': titleHeight }">{{goods.imgAndTitle.title}}</p>
                  <p class="size-color" :style="{ 'font-size': discountFontSize, 'height': descHeight, 'line-height': descHeight }">{{goods.sizeAndColor.size}},{{goods.sizeAndColor.color}}</p>
                  <div class="price-num">
                    <div class="num">
                      <div class="num-1">
                        <span><p class="price" :style="{ 'font-size': priceFontSize}">{{goods.priceAndNum.price}}</p></span>
                      </div>
                      <div class="num-2">
                        <span @click="sub(goods.position.x, goods.position.y)">-</span>
                        <span>{{goods.priceAndNum.num}}</span>
                        <span @click="inc(goods.position.x, goods.position.y)">+</span>
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
      priceFontSize: window.innerWidth * .068 + 'px'
    }
  },
  mounted () {
    this.goDelete()
    this.selectAll()
    this.cancelSelectAll()
    this.delete()
  },
  methods: {
    judge (x, y) {
      for (let i = 0; i < this.$store.state.GOODS_LIST.length; i++) {
        let outer = this.$store.state.GOODS_LIST[i]
        if (outer[0].position.x === x) {
          for (let j = 0; j < outer.length; j++) {
            if (outer[j].position.y === y) {
              console.log(i, j);
              
              return { a: i, b: j }
            }
          }
        }
      }
    },
    goDelete () {
      this.bus.$on('iAmGoingToDelete', () => {
        this.manage = true
      })
      this.bus.$on('iAmFinishDelete', () => {
        this.manage = false
      })
    },
    selectAll () {
      this.bus.$on('selectAll', () => {
        this.activeArr = []
        let arr = []
        for (let i = 0; i < this.$store.state.GOODS_LIST.length; i++) {
          arr = this.$store.state.GOODS_LIST[i].filter(n => {
            return n
          })
          this.activeArr.push(arr)
        }
      })
    },
    cancelSelectAll () {
      this.bus.$on('cancel', () => {
        this.activeArr = []
        this.bus.$emit('theMoney', 0)
      })
    },
    shopManage (index) {
      let arr = []
      for (let i = 0; i < this.$store.state.GOODS_LIST.length; i++) {
        let outer = this.$store.state.GOODS_LIST[i]
        if (outer[0].position.x === index) {
          arr = this.$store.state.GOODS_LIST[i].filter(n => {
            return n
          })
          this.activeArr.push(arr)
        }
      }
    },
    shopManageActive (x) {
      if (this.activeArr.length <= 0) {
        return false
      }
      this.activeArr.forEach((value, index) => {
        if (value[0].position.x === x) {
          this.activeArr.splice(index, 1)
        }
      })
      this.bus.$emit('theMoney', 0)
    },
    goodsManage(x, y) {
      let exist = false,
          arr = []
      if (this.activeArr.length >= 0) {
        for (let i = 0; i < this.activeArr.length; i++) {
          let outer = this.activeArr[i]
          if (outer[0].position.x === x) {
            for (let j = 0; j < outer.length; j++) {
              if (outer[j].position.y === y) {
                exist = true
              }
            }
            if (!exist) {
              let obj = {}
              exist = true
              let { a, b } = this.judge(x, y)
              for (let key in this.$store.state.GOODS_LIST[a][b]) {
                obj[key] = this.$store.state.GOODS_LIST[a][b][key]
              }
              this.activeArr[i].push(obj)
            }
          }
        }
      }
      if (!exist) {
        let obj = {}
        let { a, b } = this.judge(x, y)
        console.log(a,b)
        for (let key in this.$store.state.GOODS_LIST[a][b]) {
          obj[key] = this.$store.state.GOODS_LIST[a][b][key]
        }
        arr.push(obj)
        this.activeArr.push(arr)
      }
    },
    goodsManageActive (x, y) {
      if (this.activeArr.length <= 0) {
        return false
      } else {
        for (let i = 0; i < this.activeArr.length; i++) {
          let outer = this.activeArr[i]
          if (outer[0].position.x === x) {
            for (let j = 0; j < outer.length; j++) {
              if (outer[j].position.y === y) {
                this.activeArr[i].splice(j, 1)
                if (this.activeArr[i].length <= 0) {
                  this.activeArr.splice(i, 1)
                  console.log(111)
                }
              }
            }
          }
        }
      }
      this.bus.$emit('theMoney', 0)
    },
    sub (x, y) {
      this.$store.dispatch('actions_changeGoodsNum', { state: 0, x, y })
    },
    inc (x, y) {
      this.$store.dispatch('actions_changeGoodsNum', { state: 1, x, y })
    },
    delete () {
      this.bus.$on('iAmReadyDelete', () => {
        if (this.activeArr.length <= 0) return false
        for (let i = 0; i < this.activeArr.length; i++) {
          let X = this.activeArr[i]
          for (let j = 0; j < X.length; j++) {
            let Y = this.activeArr[i][j]
            this.$store.dispatch('actions_deleteGoods', { x: Y.position.x, y: Y.position.y })
          }
        }
        this.activeArr = []
      })
    }
  },
  computed: {
    shopDefaultManageState () {
      return (x) => {
        for (let i = 0; i < this.activeArr.length; i++) {
          if (this.activeArr[i][0].position.x === x) {
            return false
          }
        }
        return true
      }
    },
    shopActiveManageState () {
      return (x) => {
        for (let i = 0; i < this.activeArr.length; i++) {
          if (this.activeArr[i][0].position.x === x) {
            return true
          }
        }
        return false
      }
    },
    goodsDefaultManageState () {
      return (x, y) => {
        if (this.activeArr.length <= 0) {
          return true
        } else {
          for (let i = 0; i < this.activeArr.length; i++) {
            let outer = this.activeArr[i]
            if (outer[0].position.x === x) {
              for (let j = 0; j < outer.length; j++) {
                if (outer[j].position.y === y) {
                  return false
                }
              }
            }
          }
        }
        return true
      }
    }
  },
  watch: {
    'activeArr' () {
      let total = 0
      if (this.activeArr.length <= 0) return false
      for (let i = 0; i < this.activeArr.length; i++) {
        for (let j = 0; j < this.activeArr[i].length; j++) {
          let price = parseInt(this.activeArr[i][j].priceAndNum.price.substr(1))
          let num = this.activeArr[i][j].priceAndNum.num
          if (!Number.isNaN(price)) {
            total += (price * num)
            this.bus.$emit('theMoney', total)
          } else {
            console.log(this.activeArr[i][j].priceAndNum.price)
          }
        }
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
            margin: 0 -140px 0 20px;
            img {
              width: 30%;
            }
            @media screen and (max-width: 320px) {
              margin: 0 -170px 0 20px;
              img {
                width: 20%;
              }
            }
            @media screen and (min-width: 700px) {
              margin: 0 -130px 0 30px;
              img {
                width: 40%;
              }
            }
          }
          .title-sizeAndColor-priceAndNum {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .title {
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .size-color {
              opacity: .6;
              &:after {
                content: '∨';
                transform: rotate(0, 0, -90deg);
              }
            }
            .price-num {
              .num {
                align-items: flex-end;
                display: flex;
                justify-content: space-between;
                .num-1 {
                  margin-right: 20px;
                  .price {
                    color: #f00;
                  }
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