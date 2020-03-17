<template>
  <div id="profile-cart" :style="{ 'font-size': fontSize }">
    <div class="outer">
      <div class="inner" :style="{ height }">
        <div class="first">
          <div class="word">
            <span>红包省钱卡</span>
            <span>91元红包</span>
          </div>
          <img src="~assets/img/profile/red-pkg.svg" alt="">
        </div>
        <div class="second">
          <div class="word">
            <span>红包签到</span>
            <span>立即领取</span>
          </div>
          <img src="~assets/img/profile/red-pkg-open.svg" alt="">
        </div>
        <div class="last">
          <div class="word">
            <span>会员中心</span>
            <span>最新会员权益</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCart',
  data () {
    return {
      width: window.innerWidth + 'px',
      height: window.innerHeight * .1 + 'px',
      fontSize: window.innerWidth * .035 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  #profile-cart {
    position: relative;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    margin: 10px;
    .outer {
      .inner {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;
        .first, .second, .last {
          width: 50%;
          display: flex;
          align-items: center;
          margin-right: 10px;
          @media screen and (max-width: 320px) {
            margin: 0;
          }
          .word {
            display: flex;
            flex-direction: column;
            font-weight: bold;
            margin-right: 5px;
            span {
              margin-top: 3px;
              &:last-child {
                color: rgb(224,137,79);
                &::after {
                  content: '›';
                }
              }
            }
          }
          img {
            width: 30%;
          }
        }
        .last {
          position: relative;
          margin-right: 0;
        }
        .first {
          margin-left: 10px;
        }
      }
    }
  }
</style>