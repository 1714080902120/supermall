<template>
  <div id="navbar" :style="{ 'height': height, 'font-size': fontSize, 'line-height': height }">
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
  name: 'navbar',
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
    }, 200)
  }
}
</script>

<style lang="less">
  #navbar {
    display: flex;
    color: #fff;
    background-color: #f85878;
    line-height: 44px;
    border-bottom: 1px solid rgba(100, 100, 100, .2);
    text-align: center;
    .center {
    flex: 1;
  }
  }
</style>

