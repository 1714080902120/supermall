<template>
  <div id="profile-order">
    <div class="outer">
      <div class="inner">
        <div class="title" :style="{ 'font-size': titleSize }">
          <span>我的订单</span>
          <span>查看全部订单</span>
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
  name: 'ProfileOrder',
  data () {
    return {
      list: [
        {
          src: require('assets/img/profile/purchasing.svg'),
          title: '待付款'
        },
        {
          src: require('assets/img/profile/to-be-shipped.svg'),
          title: '待发货'
        },
        {
          src: require('assets/img/profile/to-be-received.svg'),
          title: '待收货'
        },
        {
          src: require('assets/img/profile/assess.svg'),
          title: '评价'
        },
        {
          src: require('assets/img/profile/service.svg'),
          title: '退款/售后'
        }
      ],
      fontSize: window.innerWidth * .04 + 'px',
      titleSize: window.innerWidth * .05 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  #profile-order {
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
          .item {
            flex: auto;
            display: flex;
            flex-direction: column;
            text-align: center;
            img {
              width: 50%;
            }
          }
        }
      }
    }
  }
</style>