<template>
  <div id="detail-rate" v-show="list" :style="{ 'font-size': defaultFontSize }">
    <div class="title" :style="{ 'font-size': fontSize }">
      <p>用户评价</p>
      <p><a href="javascript:;">更多</a></p>
    </div>
    <div class="user-outer" v-for="(item, index) in list.list" :key="index">
      <div class="userInfo">
        <img :src="item.user.avatar" alt="">
        <p class="name" :style="{ 'font-size': fontSize }">{{item.user.uname}}</p>
      </div>
      <div class="rate">
        <p>{{item.content}}</p>
      </div>
      <div class="time-style" :style="{ 'font-size': sFontSize }">
        <span class="time">时间：{{time(item.created)}}</span>
        <span class="style">款式：{{item.style}}</span>
      </div>
      <div class="img" v-for="src in item.images" :key="src">
        <img :src="src" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
export default {
  name: 'DetailRate',
  props: {
    list: {
      type: Object
    }
  },
  data () {
    return {
      fontSize: window.innerWidth * 0.06 + 'px',
      defaultFontSize: window.innerWidth * 0.05 + 'px',
      sFontSize: window.innerWidth * 0.04 + 'px'
    }
  },
  computed: {
    time () {
      return (created) => {
        return formatDate(created, 'yyyy-MM-dd')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@color: rgba(100, 100, 100, .2);
  #detail-rate {
    margin: 20px 0;
    border-top: 3px solid @color;
    border-bottom: 3px solid @color;
    .title {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid @color;
      border-bottom: 1px solid @color;
      p {
        margin: 26px 0;
        font-weight: bold;
      }
    }
    .user-outer {
      margin: 10px;
      .userInfo {
        position: relative;
        display: flex;
        img {
          border-radius: 50%;
          width: 20%;
          height: 20%;
        }
        p {
          position: absolute;
          top: 50%;
          left: 60%;
          transform: translate(-50%, -50%);
        }
      }
      .rate {
        margin: 6px 0;
      }
      .time-style {
        display: flex;
        margin: 10px 0;
        span {
          flex: auto;
        }
      }
      .img {
        display: inline;
        img {
          flex: auto;
          width: 25%;
        }
      }
    }
  }
</style>