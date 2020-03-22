<template>
  <div id="detail-goods-info">
    <div class="desc-outer">
      <span></span>
      <div class="desc" :style="{ 'font-size': fontSize }">
        {{desc()}}
      </div>
      <span></span>
    </div>
    <div class="model-outer" v-for="item in list.detailImage" :key="item.key">
      <div class="key">{{item.key}}</div>
      <div class="img" v-for="imgList in item.list" :key="imgList">
        <img :src="imgList" alt="" @load="goodsImgIsReady()">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
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
      fontSize: window.innerWidth / 20.83 + 'px'
    }
  },
  computed: {
    desc () {
      return () => {
        return this.list.desc
      }
    }
  },
  methods: {
    goodsImgIsReady () {
      this.bus.$emit('goodsImgIsReady')
    }
  }
}
</script>

<style lang="less" scoped>
@color: rgba(69, 4, 107, 0.7);
  #detail-goods-info {
    .desc-outer {
      position: relative;
      margin: 50px 0;
      display: flex;
      .desc {
        margin: 20px 0;
      }
      span {
        position: absolute;
        width: 50px;
        height: 14px;
        border: 0;
        &:first-child {
          left: 0;
          top: 0;
          border-top: 5px solid @color;
          border-left: 4px solid @color;
        }
        &:last-child {
          bottom: 0;
          right: 0;
          border-bottom: 5px solid @color;
          border-right: 4px solid @color;
        }
      }
    }
    .model-outer {
      font-weight: bold;
      .key {
        &::before {
          content: '〖';
        }
        &::after {
          content: '〗';
        }
      }
      .img {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
</style>