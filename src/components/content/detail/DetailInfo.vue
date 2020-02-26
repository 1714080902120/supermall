<template>
  <div id="detail-info" v-show="list" v-if="Object.keys(list).length !== 0">
    <div class="default-info">
      <h3 :style="{ 'font-size': titleSize }">{{title()}}</h3>
      <div class="price">
        <span :style="{ 'font-size': currentPriceSize }">{{list.defaultInfo.currentPrice}}</span>
        <span :style="{ 'font-size': oldPriceSize }"><s>{{list.defaultInfo.originPrice}}</s></span>
        <span :style="{'background-color': list.defaultInfo.discount.bgColor, 'font-size': descSize, 'height': descSize, 'line-height': descSize }">{{list.defaultInfo.discount.desc}}</span>
      </div>
    </div>
    <div class="react" :style="{ 'font-size': oldPriceSize }">
      <span>{{list.react.salesVolume}}</span>
      <span>{{list.react.collect}}</span>
      <span>{{list.react.deliver}}</span>
    </div>
    <hr>
    <div class="servey" :style="{ 'font-size': serveySize }">
      <p>
        <input :style="{ 'width': serveySize, 'height': serveySize }" type="checkbox" id="select">延误必赔
      </p>
      <p><img :style="{ 'width': serveySize, 'height': serveySize }" src="~assets/img/detail/checked.svg" alt="">退货补运费</p>
      <p><img :style="{ 'width': serveySize, 'height': serveySize }" src="~assets/img/detail/checked.svg" alt="">全国包邮</p>
      <p><img :style="{ 'width': serveySize, 'height': serveySize }" src="~assets/img/detail/checked.svg" alt="">7天无理由退货</p>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'DetailInfo',
  props: {
    list: {
      type: Object
    }
  },
  data () {
    return {
      width: window.innerWidth,
      titleSize: window.innerWidth / 20.03 + 'px',
      currentPriceSize: window.innerWidth / 13.39 + 'px',
      oldPriceSize: window.innerWidth / 23.44 + 'px',
      descSize: window.innerWidth / 27 + 'px',
      serveySize: window.innerWidth / 31.25 + 'px'
    }
  },
  computed: {
    title () {
      return () => {
        return this.list.defaultInfo.title
      }
    }
  }
}
</script>

<style lang="less">
  #detail-info {
    position: relative;
    margin-top: 12px;
    .price {
      display: flex;
      span {
        margin: 8px 2px;
        &:first-child {
          font-size: 28px;
          color: #f00;
        }
        &:nth-child(2) {
          display: flex;
          align-items: flex-end;
          font-size: 16px;
        }
        &:last-child {
          font-size: 10px;
          color: #fff;
          height: 14px;
          line-height: 14px;
          border-radius: 20%;
        }
      }
    }
    .react {
      position: relative;
      display: flex;
      margin: 6px 8px 10px 8px;
      justify-content: space-between;
      font-weight: 1000;
      color: rgba(50, 50, 50, .6);
    }
    hr {
      margin: 10px 0;
      opacity: .2;
      &:last-child {
        margin: 30px 0;
        border: 1px solid;
        opacity: .2.5;
      }
    }
    .servey {
      display: flex;
      justify-content: space-around;
      font-size: 10px;
      p {
        display: flex;
        img {
          width: .7rem;
        }
      }
    }
  }
</style>