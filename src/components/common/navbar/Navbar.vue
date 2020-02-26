<template>
  <div id="navbar" :style="{ 'height': height, 'font-size': fontSize, 'line-height': height, 'background-color': color }">
    <div class="left" :style="{ 'width': width }">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" :style="{ 'width': width }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  props: {
    color: String
  },
  data () {
    return {
      width: '',
      height: '',
      fontSize: ''
    }
  },
  created () {
    setTimeout(() => {
      let width = parseInt(window.innerWidth)
      this.height = parseInt(window.innerHeight) / 16 + 'px'
      if (width >= 1024) {
        this.fontSize = '36px'
      } else if (width >= 600) {
        this.fontSize = '24px'
      } else {
        this.fontSize = '18px'
      }
      this.width = width / 4.5 + 'px'
    }, 20)
  }
}
</script>

<style lang="less">
  #navbar {
    position: relative;
    top: 0;
    display: flex;
    color: #fff;
    background-color: transparent;
    line-height: 44px;
    border-bottom: 1px solid rgba(100, 100, 100, .2);
    text-align: center;
    z-index: 999;
    .center {
    flex: 1;
    }
  }
</style>
