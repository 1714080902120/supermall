<template>
  <div id="carousel" :style="{ width, height }" v-cloak>
    <CarouselBase :leng="length" :bannersList="bannersList" :firstImage="firstImage">
      <div slot="carouselBase" class="part" v-for="item in bannersList" :key="item.acm">
        <CarouselItem>
          <a slot="img" :href="item.link">
            <img ref="img" :src="item.image" :width="width" :height="height">
          </a>
        </CarouselItem>
      </div>
      <CarouselBall slot="carouselBall" :len="bannersList"></CarouselBall>
    </CarouselBase>
  </div>
</template>

<script>
import { CarouselBase, CarouselItem, CarouselBall } from './index.js'
export default {
  name: 'Carousel',
  props: {
    bannersList: Array,
    length: Number,
    firstImage: String
  },
  data () {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight / 3
    }
  },
  created () {
  },
  methods: {
  },
  components: {
    CarouselBase,
    CarouselItem,
    CarouselBall
  },
  watch: {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less">
 [v-cloak] {
   display: none;
 }
</style>