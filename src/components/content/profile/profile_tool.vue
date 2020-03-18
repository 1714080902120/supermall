<template>
  <div id="profile-tool">
    <div class="outer">
      <div class="inner">
        <div class="title" :style="{ 'font-size': titleSize }">
          <span>必备工具</span>
          <span>查看全部工具</span>
        </div>
        <hr>
        <div class="content" :style="{ 'font-size': fontSize }">
          <div class="item" v-for="item in list" :key="item.title">
            <span><img :src="item.src" alt=""></span>
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileTool',
  data () {
    return {
            list: [
        {
          src: require('assets/img/profile/cash-back.svg'),
          title: '每日返现'
        },
        {
          src: require('assets/img/profile/save-money.svg'),
          title: '省钱消消消'
        },
        {
          src: require('assets/img/profile/exchange.svg'),
          title: '闲置换钱'
        },
        {
          src: require('assets/img/profile/server.svg'),
          title: '客服小蜜'
        },
        {
          src: require('assets/img/profile/Tokio.svg'),
          title: '花呗'
        },
        {
          src: require('assets/img/profile/rookie-post.svg'),
          title: '菜鸟驿站'
        },
        {
          src: require('assets/img/profile/farm.svg'),
          title: '天猫农场'
        },
        {
          src: require('assets/img/profile/skin.svg'),
          title: '主题皮肤'
        }
      ],
      fontSize: window.innerWidth * .04 + 'px',
      titleSize: window.innerWidth * .05 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  #profile-tool {
    margin: 10px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .outer {
      .inner {
        display: flex;
        flex-direction: column;
        .title {
          display: flex;
          margin: 10px;
          justify-content: space-between;
          span {
            &:last-child {
              opacity: .6;
              &::after {
                content: '›';
                opacity: .6;
              }
            }
          }
        }
        hr {
          opacity: .2;
        }
        .content {
          display: flex;
          margin: 10px;
          justify-content: space-around;
          flex-wrap: wrap;
          .item {
            width: 25%;
            flex: auto;
            display: flex;
            flex-direction: column;
            text-align: center;
            margin: 15px 0;
            img {
              width: 50%;
            }
          }
        }
      }
    }
  }
</style>