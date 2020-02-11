<template>
  <div class="carousel-item">
    <slot name="img"></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
  .carousel-item {
    position: relative;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    border: 0;
    img {
      height: 100%;
    }
  }
</style>