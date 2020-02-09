<template>
  <div id="carousel" :style="{ width, height }">
    <CarouselBase :leng="length" :banners="banners" :firstImage="firstImage" :lastImage="lastImage">
      <div slot="carouselBase" class="part" v-for="item in banners" :key="item.acm">
        <CarouselItem>
          <a slot="img" href="javascript:;">
            <img ref="img" :src="item.image" :width="width" :height="height">
          </a>
        </CarouselItem>
      </div>
      <CarouselBall slot="carouselBall" :len="banners"></CarouselBall>
    </CarouselBase>
  </div>
</template>

<script>

import { CarouselBase, CarouselItem, CarouselBall } from './index.js'


export default {
  name: 'Carousel',
  props: {
    banners: Array,
    length: Number,
    firstImage: String,
    lastImage: String
  },
  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight / 3
    }
  },
  methods: {
    select () {
      let img
      this.$nextTick(() => {
        img = this.$refs.img
        console.log(img)
      })
    }
  },
  components: {
    CarouselBase,
    CarouselItem,
    CarouselBall
  }
}
</script>

<style lang="less">

</style>