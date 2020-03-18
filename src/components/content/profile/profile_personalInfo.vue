<template>
  <div id="profile-personal-info" :style="{ 'font-size': defaultFontSize }">
    <div class="outer">
      <div class="head-name" :style="{ 'font-size': nameFontSize }">
        <span>
          <el-upload class="head"
            accept="image/*"
            action="javascript:;"
            :disabled="false">
            <img :style="{ 'width': photoWidth }" src="~assets/img/profile/head.svg" alt="">
          </el-upload>
          <div class="name" @click="setName()">{{userName}}</div>
        </span>
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
import { MessageBox } from 'mint-ui'
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
      defaultFontSize: window.innerWidth * .042 + 'px',
      photoWidth: window.innerWidth * .25 + 'px',
      userName: '设置昵称'
    }
  },
  mounted () {
    if (window.localStorage.name) this.userName = window.localStorage.name
  },
  methods: {
    setName () {
      MessageBox.prompt('请输入姓名').then(({ value }) => {
        window.localStorage.setItem('name', value)
        this.userName = window.localStorage.name
      })
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
        span {
          display: flex;
          align-items: center;
          font-weight: bold;
          color: #000;
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