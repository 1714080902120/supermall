<template>
  <div id="detail-tab-bar-to-shopcart" :style="{ 'font-size': defaultFontSize, width, height }" :class="{ 'startAddToShopCart': start === 1 }" v-if="Object.keys(list).length !== -1">
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
          <div class="size" v-for="size in list.size" :key="size">
            <div>{{size}}</div>
          </div>
        </div>
      </div>
      <hr>
      <div class="color-outer">
        <div class="type">颜色</div>
        <div class="color-inner">
          <div class="color" v-for="color in list.color" :key="color">
            <div>{{color}}</div>
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
    <div class="btn" @click="sure()">确定</div>
  </div>
</template>

<script>
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
      height: window.innerHeight * 0.75 + 'px',
      sizeFontSize: window.innerWidth * 0.0533 + 'px',
      num: 0,
      start: 0
    }
  },
  mounted () {
    this.appear()
  },
  methods: {
    sure () {
      this.$emit('sure')
    },
    sub () {
      if (this.num <= 0) return false
      this.num -= 1
    },
    inc () {
      this.num += 1
    },
    appear () {
      this.bus.$on('toAppear', () => {
        this.start = 1
      })
    },
    close () {
      
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
  #detail-tab-bar-to-shopcart {
    position: absolute;
    border-radius: 1.5% 1.5% 0 0;
    bottom: 0;
    z-index: 991;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 253, 253);
    overflow: hidden;
    transform: translate(0, 100%);
    .img-price-available {
      position: relative;
      margin: 5px;
      .img {
        img {
          margin-right: 20px;
          float: left;
          width: 25%;
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
          margin-top: 20px;
          .size {
            flex: auto;
            margin: 0 10px;
            border: 1px solid rgb(226, 186, 7);
            border-radius: 5px;
            color: rgb(32, 2, 15);
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
          margin-top: 20px;
          .color {
            flex: auto;
            margin: 0 10px;
            border: 1px solid rgb(226, 186, 7);
            border-radius: 5px;
            color: rgb(32, 2, 15);
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
    .btn {
      position: absolute;
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
</style>