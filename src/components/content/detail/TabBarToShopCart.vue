<template>
  <div id="detail-tab-bar-to-shopcart" ref="outer" :style="{ 'font-size': defaultFontSize }">
    <div v-if="success">
      <div class="black" ref="success" :style="{ 'width': successWidth, 'height': successHeight }">
        <div class="img">
          <img src="~assets/img/detail/success2.svg" alt="">
        </div>
        <div class="word">已添加到购物车 &gt;_&lt;</div>
      </div>
    </div>
    <div class="detail-tab-bar-to-shopcart" ref="toShopCart" :style="{ width, height }" :class="{ 'startAddToShopCart': start === 1, 'toClose': start === 2 }" v-if="Object.keys(list).length !== -1">
    <div class="img-price-available">
      <div class="img">
        <img :src="list.img" alt="">
      </div>
      <div class="price-available">
        <span class="price" :style="{ 'font-size': priceFontSize }">{{list.price}}</span>
        <span class="available">库存{{list.available}}件</span>
        <span>选择 {{selectType()}}分类</span>
      </div>
      <div class="close" @click="close()"><img src="~assets/img/detail/close.svg" alt=""></div>
    </div>
    <div class="selection" :style="{ 'font-size': sizeFontSize }">
      <div class="size-outer">
        <div class="type">尺码</div>
        <div class="size-inner">
          <div class="size" v-for="(size, index) in list.size" :key="size" :class="{ 'be-selected-size': beSelectedSize === index }">
            <div @click="selectSize(index)">{{size}}</div>
          </div>
        </div>
      </div>
      <hr>
      <div class="color-outer">
        <div class="type">颜色</div>
        <div class="color-inner">
          <div class="color" v-for="(color, indey) in list.color" :key="color" :class="{ 'be-selected-color': beSelectedColor === indey }">
            <div @click="selectColor(indey)">{{color}}</div>
          </div>
        </div>
      </div>
      <hr>
      <div class="quantity-outer">
        <div class="quantity">
          <div class="type">购买数量</div>
          <div class="react">
            <span @click="sub()">-</span>
            <span>{{num}}</span>
            <span @click="inc()">+</span>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="btn-outer" :style="{ width }">
      <div class="btn" @click="sure()">确定</div>
    </div>
    </div>
  </div>
  
</template>

<script>
class Goods {
  iid
  shop
  imgAndTitle
  sizeAndColor
  priceAndNum
  constructor (iid, shop, imgAndTitle, sizeAndColor, priceAndNum) {
    this.iid = iid
    this.shop = shop
    this.imgAndTitle = imgAndTitle
    this.sizeAndColor = sizeAndColor
    this.priceAndNum = priceAndNum
  }
}
export default {
  name: 'TabBarToShopCart',
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      size: '',
      color: '',
      defaultFontSize: window.innerWidth * 0.0427 + 'px',
      priceFontSize: window.innerWidth * 0.0854 + 'px',
      width: window.innerWidth + 'px',
      height: 0,
      sizeFontSize: window.innerWidth * 0.037 + 'px',
      num: 1,
      start: 0,
      beSelectedSize: 999,
      beSelectedColor: 999,
      isBuy: 0,
      success: false,
      successWidth: window.innerWidth * .45 + 'px',
      successHeight: window.innerWidth * .28 + 'px'
    }
  },
  mounted () {
    this.appear()
  },
  components: {
  },
  activated () {
    this.strat = 0
  },
  methods: {
    sure () {
      let goods, shop, imgAndTitle, sizeAndColor, priceAndNum
      shop = this.list.shop
      imgAndTitle = {
        img: this.list.img,
        title: this.list.title
      }
      sizeAndColor = {
        size: this.list.size[this.beSelectedSize],
        color: this.list.color[this.beSelectedColor]
      }
      priceAndNum = {
        price: this.list.price,
        num: this.num
      }
      goods = new Goods(this.list.iid, shop, imgAndTitle, sizeAndColor, priceAndNum)
      if (!goods.sizeAndColor.size || !goods.sizeAndColor.color || goods.priceAndNum.num <= 0) {
        return false
      } else {
        if (!this.isBuy) {
          this.$store.dispatch('actions_addToGoodsList', goods)
          this.close()
          this.success = true
          this.$nextTick(() => {
            this.$refs.success.style.animation = 'success .5s .5s linear forwards'
          })
          setTimeout(() => {
            this.success = false
          }, 2050)
        } else {
          console.log(111)
        }
      }
    },
    sub () {
      if (this.num <= 0) return false
      this.num -= 1
    },
    inc () {
      this.num += 1
    },
    appear () {
      this.$nextTick(() => {
        this.bus.$on('addToShopCart', (res) => {
          this.height = window.innerHeight * 0.75 + 'px'
          this.start = 1
          this.isBuy = res
        })
      })
    },
    close () {
      let ref
      this.$nextTick(() => {
        ref = this.$refs.toShopCart
        ref.style.transform = 'translate(0, 0)'
        this.start = 2
        setTimeout(() => {
          this.height = 0
          ref.style.transform = 'translate(0, 100%)'
          this.start = 0
        }, 200)
      })
    },
    selectSize (index) {
      this.beSelectedSize = index
    },
    selectColor (indey) {
      this.beSelectedColor = indey
    }
  },
  computed: {
    selectType () {
      let size, color
      size = this.size
      color = this.color
      return () => {
        size = this.list.size.length === 1 ? '' : '尺码'
        color = this.list.color.length === 1 ? '' : '颜色'
        return size + ',' + color
      }
    }
  }
}
</script>

<style lang="less">
@deactive-color: rgb(32, 2, 15);
@deactive-bg-color: rgb(252, 239, 175);
@bor-color: rgb(226, 186, 7);
@active-bg-color: rgb(255, 0, 106);
@active-color: rgb(253, 251, 251);
#detail-tab-bar-to-shopcart {
  .detail-tab-bar-to-shopcart {
    position: absolute;
    border-radius: 1.5% 1.5% 0 0;
    bottom: 0;
    z-index: 991;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 253, 253);
    transform: translate(0, 100%);
    overflow: hidden;
    .img-price-available {
      position: relative;
      margin: 5px;
      .img {
        img {
          margin-right: 20px;
          float: left;
          width: 20%;
        }
      }
      .price-available {
        flex: auto;
        .price {
          color: #f00;
        }
        span {
          display: block;
          margin: 6px;
        }
        .available {
          opacity: .8;
        }
      }
      .close {
        img {
          position: absolute;
          top: 0;
          right: 0;
          width: 10%;
          opacity: .8;
        }
      }
    }
    .selection {
      position: relative;
      margin: 5px;
      .size-outer {
        .size-inner {
          display: flex;
          text-align: center;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 20px;
          .size {
            flex: auto;
            margin: 0 10px;
            border-radius: 5px;
            border: 1px solid @bor-color;
            color: @deactive-color;
            background-color: @deactive-bg-color;
          }
          .be-selected-size {
            color: @active-color;
            background-color: @active-bg-color;
          }
        }
      }
      hr {
        margin: 15px 0;
        opacity: .4;
      }
      .color-outer {
        .color-inner {
          display: flex;
          text-align: center;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 20px;
          .color {
            flex: auto;
            margin: 1px 10px;
            border: 1px solid @bor-color;
            border-radius: 5px;
            color: @deactive-color;
            background-color: @deactive-bg-color;
          }
          .be-selected-color {
            color: @active-color;
            background-color: @active-bg-color;
          }
        }
      }
    }
    .quantity-outer {
      position: relative;
      .quantity {
        display: flex;
        justify-content: space-between;
        .react {
          display: flex;
          justify-content: space-around;
          span {
            flex: auto;
            width: 1.8rem;
            margin: 0 1px;
            background-color: rgb(224, 224, 224);
            text-align: center;
            @media screen and (min-width: 600px) {
              width: 5rem;
            }
          }
        }
      }
    }
    .btn-outer {
      position: absolute;
      bottom: 0;
      background-color: #fff;
      .btn {
        width: 100%;
        height: 6vh;
        line-height: 6vh;
        bottom: 0;
        margin: 10px 0;
        background-color: rgb(253, 102, 43);
        color: #fff;
        text-align: center;
        border-radius: 25px;
      }
    }

  }
  .black {
    position: absolute;
    width: 8rem;
    height: 6rem;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:rgba(0, 0, 0, .8);
    .img {
      text-align: center;
      img {
        width: 40%;
      }
    }
    .word {
      text-align: center;
      color: #fff;
    }
  }
}
.startAddToShopCart {
  animation: appear .2s linear forwards;
}
.toClose {
  animation: disappear .2s linear forwards;
}
@keyframes appear {
  form { transform: translate(0, 100%); }
  to { transform: translate(0, 0); }
}
@keyframes disappear {
  form { transform: translate(0, 0); }
  to { transform: translate(0, 100%); }
}
@keyframes success {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
