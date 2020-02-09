<template>
  <div id="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'navbar',
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
  #navbar {
    display: flex;
    background-color: #fef6f6;
    line-height: 44px;
    border-bottom: 1px solid rgba(100, 100, 100, .2);
    text-align: center;
    .left, .right {
    width: 80px;
    }
    .center {
    flex: 1;
  }
  }
</style>

