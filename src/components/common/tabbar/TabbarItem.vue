<template>
  <div id="tabbar-item" @click="activated">
    <div v-if="!show">
      <slot name="tabbar-icon"></slot>
    </div>
    <div v-else-if="show">
      <slot name="tabbar-icon_active"></slot>
    </div>
    <div :style="activeStyle">
     <slot name="tabbar-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props: {
    path: String,
    color: {
      type: String,
      default: '#f00'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    activated () {
      this.$router.replace(this.path)
      console.log(this.$router)
    }
  },
  computed: {
    show () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.show ? {color: this.color} : {}
    }
  },
}
</script>

<style lang="less">
  #tabbar-item {
    flex: 1;
    text-align: center;
    margin-top: 2px;
    img {
      vertical-align: middle;
      margin-bottom: 1px;
    }
  }
  .active {
    color: #f00;
  }
</style>