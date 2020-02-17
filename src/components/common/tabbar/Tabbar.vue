<template>
  <div id="tab-bar">
    <tabbarBase :style="{ 'height': height, 'font-size': fontSize }">
      <tabbarItem v-for="item in arr" :key="item.name" :path="item.path">
        <img :width="imgHeight" :height="imgHeight" slot="tabbar-icon" :src="item.disactivated">
        <img :width="imgHeight" :height="imgHeight" slot="tabbar-icon_active" :src="item.activated">
        <div slot="tabbar-text">
          {{item.name}}
        </div>
      </tabbarItem>
    </tabbarBase>
  </div>

</template>

<script>
import tabbarBase from './TabbarBase';
import tabbarItem from './TabbarItem';
export default {
  name: 'Tabbar',
  data () {
    return {
      arr: [
        {
          name: '首页',
          path: '/home',
          disactivated: require('assets/img/tabbar/home.svg'),
          activated: require('assets/img/tabbar/home_active.svg')
        },
        {
          name: '分类',
          path: '/category',
          disactivated: require('assets/img/tabbar/kinds.svg'),
          activated: require('assets/img/tabbar/kinds_active.svg')
        },
        {
          name: '购物车',
          path: '/shopcart',
          disactivated: require('assets/img/tabbar/shoppingCar.svg'),
          activated: require('assets/img/tabbar/shoppingCar_active.svg')
        },
        {
          name: '我的',
          path: '/profile',
          disactivated: require('assets/img/tabbar/profile.svg'),
          activated: require('assets/img/tabbar/profile_active.svg')
        }
      ],
      imgHeight: '',
      fontSize: '',
      height: ''
    }
  },
  components: {
    tabbarBase,
    tabbarItem
  },
  created () {
    setTimeout(() => {
      this.reSet()
    }, 100)
  },
  methods: {
    reSet () {
      let width = document.body.clientWidth
      this.height = parseInt(window.innerHeight) / 13 + 'px'
      this.imgHeight = parseInt(window.innerHeight) / 26 + 'px'
      if (width >= 1024) {
        this.fontSize = '36px'
      } else if (width >= 600) {
        this.fontSize = '24px'
      } else {
        this.fontSize = '18px'
      }
    }
  }
}
</script>

<style lang="less">

</style>