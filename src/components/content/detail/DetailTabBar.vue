<template>
  <div id="detail-tab-bar">
    <tabbarBase :style="{ 'height': height, 'font-size': fontSize }">
      <tabbarItem v-for="item in arr" :key="item.name" :path="item.path" :color="'#000'">
        <img :width="imgHeight" :height="imgHeight" slot="tabbar-icon" :src="item.disactivated">
        <img :width="imgHeight" :height="imgHeight" slot="tabbar-icon_active" :src="item.activated">
        <div slot="tabbar-text">
          {{item.name}}
        </div>
      </tabbarItem>
      <div class="outer" :style="{ 'line-height': height }">
        <div class="to-shopcart" @click="addToShopCart()">加入购物车</div>
        <div class="purchase" @click="addToShopCart()">购买</div>
      </div>
    </tabbarBase>
  </div>

</template>

<script>
import tabbarBase from 'components/common/tabbar/TabbarBase';
import tabbarItem from 'components/common/tabbar/TabbarItem';
export default {
  name: 'DetailTabBar',
  data () {
    return {
      arr: [
        {
          name: '客服',
          path: '',
          disactivated: require('assets/img/detail/tabbar/service_active.svg'),
          activated: require('assets/img/detail/tabbar/service_active.svg')
        },
        {
          name: '店铺',
          path: '',
          disactivated: require('assets/img/detail/tabbar/shop.svg'),
          activated: require('assets/img/detail/tabbar/shop.svg')
        },
        {
          name: '收藏',
          path: '',
          disactivated: require('assets/img/detail/tabbar/collect.svg'),
          activated: require('assets/img/detail/tabbar/collect_active.svg')
        }
      ],
      imgHeight: window.innerHeight / 26 + 'px',
      fontSize: '',
      height: window.innerHeight / 13 + 'px'
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
      let width = window.innerWidth
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
  #detail-tab-bar {
    overflow: hidden;
    .outer {
      flex: auto;
      display: flex;
      .to-shopcart, .purchase {
        text-align: center;
      }
      .to-shopcart {
        color: #000;
        background-color: rgb(244, 248, 7);
      }
      .purchase {
        flex: auto;
        color: #fff;
        background-color: rgb(248, 131, 186);
      }
    }

  }
</style>