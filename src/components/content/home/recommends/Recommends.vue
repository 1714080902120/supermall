<template>
  <div id="recommends" v-cloak>
    <div v-for="item in recommendsList" :key="item.acm">
      <RecommendsItem>
        <a :href="item.link">
          <img :src="item.image" :width="width" :height="height">
        </a>
        <div class="recommends-title" :style="{'font-size': fontSize}">{{item.title}}</div>
      </RecommendsItem>
    </div>
  </div>
</template>

<script>
import RecommendsItem from './RecommendsItem'
export default {
  name: 'Recommends',
  props: {
    recommendsList: Array
  },
  data () {
    return {
      width: 0,
      height: 0,
      list: null,
      fontSize: ''
    }
  },
  components: {
    RecommendsItem
  },
  created () {
    setTimeout(() => {
      let width = document.body.clientWidth
      this.list = this.recommendsList
      this.width = width / this.list.length - 3 * this.list.length
      this.height = width / this.list.length - 3 * this.list.length
      if (width >= 1024) {
        this.fontSize = '36px'
      } else if (width >= 600) {
        this.fontSize = '24px'
      } else {
        this.fontSize = '18px'
      }
    }, 300)
  }
}
</script>

<style lang="less" scoped>
  #recommends {
    display: flex;
    background: transparent;
    border-bottom: 10px solid rgba(100, 100, 100, .12);
  }
  [v-cloak] {
    display: none;
  }
</style>