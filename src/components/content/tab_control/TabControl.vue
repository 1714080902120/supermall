<template>
  <div id="tab-control" :style="{ 'height': height, 'top': height, 'font-size': fontSize }">
    <div :style="{ 'height': height }" class="tab-control-item" v-for="(item, index) in titles" :key="item.ch">
      <div class="inside" :class="{ active: index === active }" :style="{ 'margin': margin }" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd(index)">{{item.ch}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: Array,
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      height: window.innerHeight / 16 + 'px',
      fontSize: window.innerWidth / 20 + 'px',
      margin: '10px 36px',
      startX: 0
    }
  },
  created () {
    let wid = window.innerWidth
    if (wid >= 1024) {
      this.margin = '20px 100px'
    } else if (wid >= 512) {
      this.margin = '20px 70px'
    }
  },
  methods: {
    touchStart () {
    },
    touchMove () {
    },
    touchEnd (index) {
      if (this.active === index) return false
      this.$store.commit('applyGoodList', index)
    }
  }
}
</script>

<style lang="less" scoped>
  #tab-control {
    position: sticky;
    display: flex;
    text-align: center;
    background: #fff;
    z-index: 3;
    .tab-control-item {
      flex: auto;
      border: 0;
      .inside {
        border-bottom: 3px solid transparent;
        padding-bottom: 5px;
      }
      .active {
        color: #f00;
        border-color: #f00;
      }
    }
  }
</style>