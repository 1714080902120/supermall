<template>
  <div id="tabbar-base">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabbarBase',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
  #tabbar-base {
    position: fixed;
    z-index: 999;
    background-color: #f6f6f6;
    display: flex;
    left: 0px;
    right: 0px;
    bottom: -1px;
    box-shadow: 0px -1px 0 rgba(200, 200, 200, .5);
  }
</style>