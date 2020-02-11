<template>
    <tabbarBase>
            <tabbarItem v-for="item in arr" :key="item.key" :path="item.path">
              <img slot="tabbar-icon" :src="item.disactivated">
              <img slot="tabbar-icon_active" :src="item.activated">
              <div slot="tabbar-text">
                {{item.name}}
              </div>
            </tabbarItem>
    </tabbarBase>
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
          activated: require('assets/img/tabbar/home_active.svg'),
          key: Math.random() * 100000
        },
        {
          name: '分类',
          path: '/category',
          disactivated: require('assets/img/tabbar/kinds.svg'),
          activated: require('assets/img/tabbar/kinds_active.svg'),
          key: Math.random() * 100000
        },
        {
          name: '购物车',
          path: '/shopcart',
          disactivated: require('assets/img/tabbar/shoppingCar.svg'),
          activated: require('assets/img/tabbar/shoppingCar_active.svg'),
          key: Math.random() * 100000
        },
        {
          name: '我的',
          path: '/profile',
          disactivated: require('assets/img/tabbar/profile.svg'),
          activated: require('assets/img/tabbar/profile_active.svg'),
          key: Math.random() * 100000
        }
      ]
    }
  },
  components: {
    tabbarBase,
    tabbarItem
  }
}
</script>

<style lang="less">
  
</style>