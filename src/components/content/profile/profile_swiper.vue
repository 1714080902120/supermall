<template>
  <div id="profile-swiper">
    <Swipe :show-indicators="true" :style="{ height }">
      <SwipeItem>
        <img :style="{ width, height }" src="~assets/img/profile/photo_1.jpg" alt="">
      </SwipeItem>
      <SwipeItem>
        <img :style="{ width, height }" src="~assets/img/profile/photo_2.jpg" alt="">
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  name: 'ProfileSwiper',
  data () {
    return {
      width: window.innerWidth + 'px',
      height: window.innerHeight * .14 + 'px'
    }
  },
  components: {
    Swipe,
    SwipeItem
  }
}
</script>

<style lang="less" scoped>
  #profile-swiper {
    margin: 10px;
    img {
      border-radius: 10px;
    }
  }
</style>