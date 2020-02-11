<template>
  <div id="carousel-base">
    <div class="moving" :style="{ totalWid }" ref="moving" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
      <slot name="carouselBase"></slot>
      <a class="specA" href="javascript:;" :style="{ 'left': last }"><img :src="firstImage" :width="width" :height="height"></a>
    </div>
    <slot name="forward"></slot>
    <slot name="backup"></slot>
    <slot name="carouselBall"></slot>
  </div>
</template>

<script>
import { Bus } from './index'
export default {
  name: 'CarouselBase',
  props: {
    leng: Number,
    bannersList: Array,
    firstImage: String
  },
  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      state: true,
      last: 0,
      ballActive: 0,
      totalWid: this.width,
      startX: 1,
      endX: 1,
      movingTime: 1,
      movingPart: 1,
      timer: null,
      position: 0,
      outerTime: 2000,
      time: null,
      watingTime: 500
    }
  },
  beforeMount () {
  },
  mounted () {
    window.setTimeout(() => {
      this.tofit()
      this.moving()
    }, 100)
  },
  beforeUpdate () {
    this.first = -parseInt(this.width) + 'px'
    this.last = -parseInt(this.width) * (this.leng - 1) + 'px'
  },
  methods: {
    moving () {
      window.clearInterval(this.time)
      window.clearInterval(this.timer)
      this.$nextTick(() => {
        this.timer = window.setInterval(() => {
          this.innerInterval()
        }, this.outerTime)
      })
    },
    touchStart (e) {
      if (this.position % parseInt(this.width) !== 0) {
        e.preventDefault()
        this.state = false
        return false
      }
      this.startX = e.touches[0].pageX
      window.clearInterval(this.timer)
      window.clearInterval(this.time)
    },
    touchMove (e) {
      if (!this.state) {
        e.preventDefault()
        return false
      }
      let ref,wid
      wid = parseInt(this.width)
      if (this.startX >= e.touches[0].pageX) {
        this.position -= this.movingPart
      } else {
        if (this.position > 0 && this.position <= wid) {
          this.position = -parseInt(this.width) * this.leng
        }
        this.position += this.movingPart
      }
      this.$nextTick(() => {
        ref = this.$refs.moving
        ref.style.left = this.position + 'px'
      })
    },
    touchEnd (e) {
      if (!this.state) {
        e.preventDefault()
        return false
      }
      this.endX = e.changedTouches[0].pageX
      this.innerInterval()
      window.setTimeout(() => {
        window.clearInterval(this.time)
        this.moving()
      }, this.watingTime)
    },
    innerInterval () {
      window.clearInterval(this.time)
      let ref, wid, length, dev
      length = this.leng
      wid = parseInt(this.width)
      ref = this.$refs.moving
      this.time = window.setInterval(() => {
        if (this.startX - this.endX < 0 && Math.abs(this.endX / this.startX) >= 3) {
          this.position += this.movingPart
        } else {
          this.position -= this.movingPart
        }
        if (this.position <= -length * wid) {
          this.position = 0
        }
        ref.style.left = this.position + 'px'
        dev = Math.abs(this.position / wid)
        if (
          dev === 0 ||
          dev === 1 ||
          dev === 2 ||
          dev === 3
        ) {
          for (let i = 0; i < length; i++) {
            this.ballActive = dev
          }
          this.startX = 1
          this.endX = 1
          window.clearInterval(this.time)
        }
      }, this.movingTime)
    },
    tofit () {
      // 适配
      let wid
      wid = parseInt(this.width)
      this.calcMovingPart()
      if (wid >= 600 && wid < 1024) {
        this.movingTime = 3
        this.outerTime = 3000
      } else if (wid >= 1024) {
        this.movingTime = 3
        this.outerTime = 3500
      }
    },
    calcMovingPart () {
      let wid
      wid = parseInt(this.width)
      for (let i = 1;i < Math.sqrt(wid); i++) {
        if (wid % i === 0) {
          this.movingPart = i
        }
      }
    }
  },
  watch: {
    'ballActive' () {
      Bus.$emit('ballActive', this.ballActive)
    }
  },
  destroyed () {
    window.clearInterval(this.timer)
    window.clearInterval(this.time)
  }
}
</script>

<style lang="less">
  #carousel-base, .moving {
    position: relative;
    display: flex;
    padding: 0;
    margin: 0;
    height: 100%;
    left: 0px;
    border: 0;
    .specA {
      padding: 0px;
      margin: 0px;
      border: 0;
      img {
        height: 100%;
      }
    }
    .forward {
      right: 0;
      margin-right: 0;
    }
    .backup {
      left: 0;
      margin-left: 0;
    }
  }
  .moving {
    margin-top: 0;
  }
  #carousel-base {
    width: 100%;
    overflow: hidden;
  }
</style>