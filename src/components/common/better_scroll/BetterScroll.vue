<template>
  <div class="wrapper" ref="wrapper" :style="{ width, height }">
    <div class="content">
      <slot></slot>
    </div>
    <BackToTop :show="show" @click.native="backToTop()"></BackToTop>
  </div>
</template>

<script>
import BS from 'better-scroll'
import BackToTop from './BackToTop'
export default {
  name: 'BetterScroll',
  props: {
    probeType: Number,
    pullUpLoad: {
      type: Object
    },
    fixLocation: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      BS: null,
      width: window.innerWidth + 'px',
      height: window.innerHeight * (1 - (1 / 16) - (1 / 13)) + 'px',
      show: false,
      y: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getBetterScroll()
      this.startScroll()
      this.pullingUp()
      this.position()
      this.goScrollTo()
    })
  },
  components: {
    BackToTop
  },
  methods: {
    getBetterScroll () {
      this.BS = new BS(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
    },
    backToTop () {
      this.BS.scrollTo(0, 0, 500)
    },
    goScrollTo () {
      this.BS.on('scroll', (position) => {
        this.$emit('go', position)
      })
    },
    startScroll () {
      this.BS.on('scroll', (position) => {
        if (position.y <= -3000) {
          this.show = true
        } else {
          this.show = false
        }
      })
    },
    pullingUp () {
      if (this.pullUpLoad && this.$store.state.moduleDetail.active) {
        this.BS.on('pullingUp', () => {
          setTimeout(() => {
            this.$emit('addGoods')
          }, 2200)
          console.log('上拉加载更多')
          setTimeout(() => {
            this.BS.finishPullUp()
          }, 6000)
        })
      }
    },
    scrollTo (position, delay) {
      this.BS.scrollTo(position.x, position.y, delay)
    },
    refresh () {
      this.BS.refresh()
      console.log('ready')
    },
    position () {
      this.BS.on('scroll', (position) => {
        this.y = -position.y
        if (this.y >= this.fixLocation) {
          this.$store.commit('toChangeAppear')
        } else {
          this.$store.state.moduleHome.appear = false
        }
      })
    },
    judgePosition (...args) {
      let width  = window.innerWidth * 0.14
      console.log(args)
      this.BS.on('scroll', (position) => {
        if (position.y <= args[2] + width) {
          this.bus.$emit('changeDetailNavbarIndex', 3)
        } else if (position.y <= args[1] + width) {
          this.bus.$emit('changeDetailNavbarIndex', 2)
        }  else if (position.y <= args[0] + width) {
          this.bus.$emit('changeDetailNavbarIndex', 1)
        } else {
          this.bus.$emit('changeDetailNavbarIndex', 0)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .wrapper {
    overflow: hidden;
  }
</style>