<template>
  <div id="home">
    <navbar>
      <div slot="left"></div>
      <div slot="center">首页</div>
      <div slot="right"></div>
    </navbar>
    <div v-if="ready">
      <Carousel
      :banners="banners"
      :length="length"
      :firstImage="firstImage"
      :lastImage="lastImage">
      </Carousel>
    </div>
  </div>
</template>

<script>

import navbar from 'components/common/navbar/Navbar'
import Carousel from 'components/common/carousel/Carousel'
import { getHomeMultaData } from 'network/home'
export default {
  name: 'Home',
  data () {
    return {
      multaData: null,
      banners: null,
      length: 0,
      firstImage: '',
      lastImage: '',
      ready: false
    }
  },
  components: {
    navbar,
    Carousel
  },
  created () {
    this.getMultaData(),
    this.ready = true
  },
  methods: {
    getMultaData () {
      getHomeMultaData().then((res) => {
          this.multaData = res.data
          this.banners = res.data.banner.list
          this.length = this.banners.length
          this.firstImage = this.banners[0].image
          this.lastImage = this.banners[this.length - 1].image
      })
    },
    test () {
      alert('msg')
    }
  }
}
</script>

<style lang="less" scoped>

</style>