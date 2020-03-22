<template>
  <div id="carousel-ball">
    <a href="javascript:;" v-for="(item, index) in len" :key="index">
      <div ref="balls" class="img-ball" :style="{ width, height }" :class="{toRed: index === active }">
      </div>
    </a>
  </div>
</template>

<script>
import { Bus } from './index'
export default {
  name: 'CarouselBall',
  props: {
    len: Array
  },
  data () {
    return {
      active: 0,
      width: parseInt(window.innerWidth) / 30 + 'px',
      height: parseInt(window.innerWidth) / 30 + 'px'
    }
  },
  methods: {
    addEventListener () {
      let balls, length
      this.$nextTick(() => {
        balls = this.$refs.balls
        length = balls.length
        for (let i = 0; i < length; i++) {
          balls[i].addEventListener('touchstart', () => {
          })
        }
      })
    }
  },
  watch: {
    'len' () {
      this.addEventListener()
    }
  },
  updated () {

  },
  mounted() {
    Bus.$on('ballActive', (res) => {
      this.active = res
    })
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
  #carousel-ball {
    position: absolute;
    display: flex;
    bottom: 6%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    a {
      margin: 0px 1px;
      .img-ball {
        background-color: rgba(100, 100, 100, 0.5);
        border-radius: 50%;
        border: 3px solid rgba(129, 128, 128, 0.2)
      }
      .toRed {
        background-color: rgba(228, 60, 205, 0.8);
      }
    }
  }  

</style>