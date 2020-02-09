<template>
  <div id="carousel-base">
    <div class="moving" :style="{ totalWid }" ref="moving" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
      <!-- <a class="specA" href="javascript:;" :style="{ 'left': first }"><img :src="lastImage" :width="width" :height="height"></a> -->
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
    banners: Array,
    firstImage: String,
    lastImage: String
  },
  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      state: true,
      first: 0,
      last: 0,
      banner: null,
      ballActive: 0,
      totalWid: this.width,
      left: 0,
      startX: 1,
      endX: 1,
      movingTime: 1,
      movingPart: 1,
      timer: null,
      position: 0,
      outerTime: 3000,
      time: null
    }
  },
  beforeMount () {
  },
  mounted () {
    window.setTimeout(() => {
      this.moving()
    }, 100)

  },
  beforeUpdate () {
    this.first = -parseInt(this.width) + 'px'
    this.last = -parseInt(this.width) * (this.leng - 1) + 'px'
  },
  methods: {
    moving () {
      let ref, wid, length, dev
      this.$nextTick(() => {
        length = this.leng
        wid = parseInt(this.width)
        ref = this.$refs.moving
        // 适配
        if (wid >= 600) {
          this.movingPart = 2
          this.outerTime = 4000
        } else if (wid >= 1024) {
          this.movingPart = 4
          this.outerTime = 6000
        }
        this.timer = window.setInterval(() => {
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
        }, this.outerTime)
      })
    },
    touchStart (e) {
      if (this.position % parseInt(this.width) !== 0) {
        e.preventDefault()
        this.state = false
        return false
      }
      if (this.position >= 0) {
         e.preventDefault()
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
      let ref
      if (this.startX >= e.touches[0].pageX) {
        this.position -= 2
      } else {
        if (this.position >= 0) {
          e.preventDefault()
          return false
        }
        this.position += 2
      }
      this.$nextTick(() => {
        ref = this.$refs.moving
        ref.style.left = this.position + 'px'
      })
    },
    touchEnd (e) {
      if (this.position >= 0) {
         e.preventDefault()
        return false
      }
      if (!this.state) {
        e.preventDefault()
        return false
      }
      this.endX = e.changedTouches[0].pageX
      this.moving()
    },
    unload () {
      window.onbeforeunload = function () {
        alert(1111)
      }
    }
  },
  watch: {
    'banners' () {
      this.banner = this.banners
    },
    'ballActive' () {
      Bus.$emit('ballActive', this.ballActive)
    },
    'state' () {
    },
    'window.innerWidth' () {
      this.totalWid = parseInt(this.width) * (this.leng) + 'px'
      this.movingPart = 1
      this.outerTime = 3000
      this.movingTime = 1
    }
  },
  created () {
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
    margin-top: 20px;
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