<template>
  <div id="tabbar-base">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
  #tabbar-base {
    position: fixed;
    background-color: #f6f6f6;
    display: flex;
    left: 0px;
    right: 0px;
    bottom: 0px;
    box-shadow: 0px -1px 0 rgba(200, 200, 200, .5);
    font-size: 18px;
    font-family: cursive;
    font-weight: bold;
  }
</style>