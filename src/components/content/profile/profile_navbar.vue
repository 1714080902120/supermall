<template>
  <div id="profile-navbar" :style="{ height, width }">
    <div class="outer">
      <div class="empty"><span></span></div>
        <div class="inner"  :style="{ 'width': innerWidth, 'left': innerWidth }">
          <span class="family-number"><img src="~assets/img/profile/family-number.svg" alt="">亲情号</span>
          <span class="personal-info"><img src="~assets/img/profile/personal-info.svg" alt=""></span>
          <span class="set"><img src="~assets/img/profile/set.svg" alt=""></span>
        </div>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileNavBar',
  data () {
    return {
      height: window.innerHeight / 16 + 'px',
      width: window.innerWidth + 'px',
      innerWidth: window.innerWidth * .5 + 'px'
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
  #profile-navbar {
    overflow: hidden;
    display: flex;
    margin: auto;
    text-align: center;
    .outer {
      display: flex;
      .empty {
        flex: auto;
      }
      .inner {
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          font-size: 8px;
          @media screen and (max-width: 320px) {
            font-size: 5px;
          }
          @media screen and (min-width: 700px) {
            font-size: 20px;
          }
          img {
            display: flex;
            margin: auto;
            width: 40%;
          }
        }
      }
    }
  }
</style>