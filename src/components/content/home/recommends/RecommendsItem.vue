<template>
  <div class="recommends-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RecommendsItem',
  data () {
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style lang="less">
  .recommends-item {
    padding: 0;
    margin: 6px;
    border: 0;
    border-radius: 50%;
    flex: auto;
    text-align: center;
    border-bottom: 3px solid transparent;
    margin-bottom: 10px;
    a, img {
      padding: 0;
      margin:0;
      border: 0;
    }
    .recommends-title {
      padding: 0;
      margin: 3px 0px 0px 0px;
      border: 0;
      line-height: 100%;
    }
  }
</style>