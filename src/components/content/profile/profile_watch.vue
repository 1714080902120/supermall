<template>
  <div id="profile-watch">
    <div class="outer">
      <div class="inner" :style="{ 'font-size': fontSize }">
        <span>我关注的频道</span>
        <span>
          <img v-for="item in list" :key="item" :src="item" alt="">
          去关注更多
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileWatch',
  data () {
    return {
      list: [
        require('assets/img/profile/special-price.svg'),
        require('assets/img/profile/home-suitable.svg'),
        require('assets/img/profile/famous-brand.svg'),
        require('assets/img/profile/work.svg')
      ],
      fontSize: window.innerWidth * .05 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  #profile-watch {
    margin: 20px 10px;
    overflow: hidden;
    .outer {
      position: relative;
      .inner {
        display: flex;
        align-items: center;
        justify-content: space-around;
        span {
          width: 50%;
          flex: auto;
          &:last-child {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            opacity: .7;
            img {
              width: 8%;
              height: 8%;
            }
            &::after {
              content: '›';
              opacity: .7;
            }
          }
        }
      }
    }
  }
</style>