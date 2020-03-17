<template>
  <div id="profile-personal-info" :style="{ 'font-size': defaultFontSize }">
    <div class="outer">
      <div class="head-name" :style="{ 'font-size': nameFontSize }">
        <span class="head"><img src="~assets/img/profile/head.svg" alt=""><div>设置淘宝昵称</div></span>
      </div>
      <div class="select-fork-footPrint-cart">
        <div class="inner" v-for="item in detail" :key="item.label">
          <span>{{item.num}}</span>
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePersonalInfo',
  data () {
    return {
      detail: [
        {
          num: 7,
          label: '收藏夹'
        },
        {
          num: 0,
          label: '关注店铺'
        },
        {
          num: 61,
          label: '足迹'
        },
        {
          num: 3,
          label: '红包卡券'
        }
      ],
      nameFontSize: window.innerWidth * .06 + 'px',
      defaultFontSize: window.innerWidth * .042 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  #profile-personal-info {
    position: relative;
    margin: 10px;
    .outer {
      display: flex;
      flex-direction: column;
      .head-name {
        display: flex;
        align-items: center;
        .head {
          width: 100%;
          display: flex;
          align-items: center;
          font-weight: bold;
          color: #000;
          img {
            width: 20%;
            margin: 0 10px;
          }
        }
      }
      .select-fork-footPrint-cart {
        display: flex;
        margin: 10px 0;
        .inner {
          flex: auto;
          display: flex;
          flex-direction: column;
          text-align: center;
          span {
            &:first-child {
              font-weight: 600;
            }
          }
        }
      }
    }
  }
</style>