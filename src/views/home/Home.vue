<template>
  <div id="home">
    <navbar>
      <div slot="left"></div>
      <div slot="center">购物街</div>
      <div slot="right"></div>
    </navbar>
    <div v-if="ready">
      <Carousel
        :bannersList="bannersList"
        :length="length"
        :firstImage="firstImage"
        v-cloak>
      </Carousel>
      <Recommends
      :recommendsList="recommendsList"
      v-cloak>
      </Recommends>
    </div>
  </div>
</template>

<script>
import { navbar, Carousel, Recommends } from './index'
import { getHomeMultaData } from 'network/home'

export default {
  name: 'Home',
  data () {
    return {
      multaData: null,
      bannersList: null,
      recommendsList: null,
      length: 0,
      firstImage: '',
      ready: true
    }
  },
  components: {
    navbar,
    Carousel,
    Recommends
  },
  created () {
    this.getMultaData()
  },
  methods: {
    getMultaData () {
      getHomeMultaData().then((res) => {
        this.multaData = res.data
        this.bannersList = res.data.banner.list
        this.length = this.bannersList.length
        this.firstImage = this.bannersList[0].image
        this.recommendsList = this.multaData.recommend.list
      })
    },
    reload () {
      this.ready = false
      this.$nextTick(() => {
        this.ready = true
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.reload()
    }, 100)
  }
}
</script>

<style lang="less" scoped>

</style>