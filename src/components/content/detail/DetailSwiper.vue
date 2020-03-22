<template>
  <div id="detail-swiper">
    <Swiper :show-indicators="true" :style="{ width, height }">
      <SwiperItem v-for="item in list" :key="item">
        <img :src="item" alt="" @load="swiperIsReady()">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  name: 'DetailSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      width: window.innerWidth + 'px',
      height: window.innerHeight / 2 + 'px'
    }
  },
  components: {
    Swiper: Swipe,
    SwiperItem: SwipeItem
  },
  methods: {
    swiperIsReady () {
      this.bus.$emit('swiperIsReady')
    }
  }
}
</script>

<style lang="less" scoped>
  #detail-swiper {
    img {
      width: 100%;
    }
  }
</style>