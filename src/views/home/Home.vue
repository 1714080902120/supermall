<template>
  <div id="home">
    <navbar>
      <div slot="left"></div>
      <div slot="center">首页</div>
      <div slot="right"></div>
    </navbar>
    <div v-if="ready">
      <Carousel
        :bannersList="bannersList"
        :length="length"
        :firstImage="firstImage"
        v-cloak>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { navbar, Carousel } from './index'
import { getHomeMultaData } from 'network/home'

export default {
  name: 'Home',
  data () {
    return {
      multaData: null,
      bannersList: null,
      length: 0,
      firstImage: '',
      ready: true
    }
  },
  components: {
    navbar,
    Carousel
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
    }, 500)
  }
}
</script>

<style lang="less" scoped>

</style>