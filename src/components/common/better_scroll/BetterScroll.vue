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
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      BS: null,
      width: window.innerWidth + 'px',
      height: window.innerHeight * (1 - (1 / 16) - (1 / 13)) + 'px',
      show: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getBetterScroll()
      this.startScroll()
      this.pullingUp()
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
      console.log(this.BS)
    },
    backToTop () {
      this.BS.scrollTo(0, 0, 500)
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
      if (this.pullUpLoad) {
        this.BS.on('pullingUp', () => {
          setTimeout(() => {
            this.$emit('addGoods')
          }, 2000)
          console.log('上拉加载更多')
          setTimeout(() => {
            this.BS.finishPullUp()
          }, 4000)
        })
      }
    }
  }
}
</script>

<style lang="less">
  .wrapper {
    overflow: hidden;
  }
</style>