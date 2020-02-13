<template>
  <div id="tab-control" :style="{ 'height': height, 'top': height, 'font-size': fontSize }">
    <div class="tab-control-item" v-for="(item, index) in title" :key="item">
      <div class="inside" :class="{active: index === active}" :style="{ 'margin': margin }" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd(index)">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    title: Array
  },
  data () {
    return {
      height: window.innerHeight / 16 + 'px',
      fontSize: window.innerWidth / 20 + 'px',
      margin: '10px 26px',
      active: 0,
      startX: 0
    }
  },
  created () {
    let wid = window.innerWidth
    if (wid >= 1024) {
      this.margin = '20px 70px'
    } else if (wid >= 512) {
      this.margin = '20px 50px'
    }
  },
  methods: {
    touchStart () {
    },
    touchMove () {
    },
    touchEnd (index) {
      this.active = index
    }
  }
}
</script>

<style lang="less">
  #tab-control {
    position: sticky;
    display: flex;
    text-align: center;
    .tab-control-item {
      flex: auto;
      border: 0;
      .inside {
        border-bottom: 4px solid transparent;
        padding: 10px;
        margin: 12px 26px;
      }
      .active {
        color: #f00;
        border-color: #f00;
      }
    }
  }
</style>