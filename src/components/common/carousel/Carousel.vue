<template>
  <div id="carousel" :style="{ 'width': width, 'height': height }" v-cloak>
    <CarouselBase :leng="leng" :bannersList="list" :firstImage="firstImage">
      <div slot="carouselBase" class="part" v-for="item in list" :key="item.acm">
        <CarouselItem>
          <a slot="img" :href="item.link">
            <img ref="img" :src="item.image" :width="width" :height="height">
          </a>
        </CarouselItem>
      </div>
      <CarouselBall slot="carouselBall" :len="list"></CarouselBall>
    </CarouselBase>
  </div>
</template>

<script>
import { CarouselBase, CarouselItem, CarouselBall } from './index.js'
export default {
  name: 'Carousel',
  props: {
    list: Array
  },
  data () {
    return {
      width: window.innerWidth + 'px',
      height: window.innerHeight / 3 + 'px',
      banners: null,
      leng: 0,
      firstImage: ''
    }
  },
  created () {
    setTimeout(() => {
      this.banners = this.list
      this.leng = this.list.length
      this.firstImage = this.banners[0].image
      this.toFit()
    }, 100)
  },
  methods: {
    toFit () {
      if (document.body.clientWidth > 1024) {
        this.height = window.innerHeight + 'px'
      } else if (document.body.clientWidth > 800) {
        this.height = window.innerHeight / 2 + 'px'
      }
    }
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

<style lang="less" scoped>
 [v-cloak] {
   display: none;
 }
 #carousel {
   margin-bottom: 5px;
 }
</style>