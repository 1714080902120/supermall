<template>
  <div id="category-sidebar" v-if="sidebarData">
    <div class="outer">
      <ul class="ul" :style="{ width, height, 'font-size': fontSize }">
        <li class="li" v-for="data in sidebarData" :key="data.title" @click="showContent(data.maitKey)" :class="{ 'sidebar-active': data.maitKey === titleKey }">
          <div class="content">{{data.title}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategorySideBar',
  props: {
    sidebarData: {
      type: Array
    }
  },
  data () {
    return {
      titleKey: '-1',
      height: (1 - 1 / 13 - 1 / 16) * window.innerHeight + 'px',
      width: window.innerWidth * .25 + 'px',
      fontSize: window.innerWidth * .042 + 'px'
    }
  },
  mounted () {
    this.showContent('3627')
  },
  methods: {
    showContent (key) {
      if (this.titleKey === key) return false
      this.titleKey = key
      this.bus.$emit('toGetSubData', this.titleKey)
    }
  }
}
</script>

<style lang="less" scoped>
  #category-sidebar {
    flex: auto;
    .outer {
      .ul {
        display: flex;
        flex-direction: column;
        .li {
          text-align: center;
          list-style: none;
          flex: auto;
          background-color: rgb(246,246,246);
          display: flex;
          .content {
            margin: auto;
          }
        }
        .sidebar-active {
          background-color: #fff;
          color: #f00;
          font-weight: bold;
        }
      }
    }
  }
</style>