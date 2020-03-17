<template>
  <div id="profile-watch-detail" :style="{ 'font-size': defaultFontSize }">
    <div class="outer">
      <div class="inner-left">
        <div class="header">
          <div class="logo-name">
            <img src="~assets/img/profile/alipay.svg" alt="">
            <div>支付宝</div>
          </div>
          <div class="desc">生活好&nbsp;支付宝</div>
        </div>
        <div class="content">
          <span class="img"><img src="~assets/img/profile/alipay-red-pkg.svg" alt=""></span>
          <span class="word">你有一个红包待领取</span>
          <span class="recommend" :style="{ 'height': descHeight, 'line-height': descHeight, 'width': descWidth }">实体店付款享优惠</span>
        </div>
        <div class="footer">
          <div class="left">
            <span><img src="~assets/img/profile/Tokio.svg" alt=""></span>
            <span>查额度</span>
          </div>
          <span class="middle-line"></span>
          <div class="right">
            <span><img src="~assets/img/profile/integral-exchange.svg" alt=""></span>
            <span>积分兑换</span>
          </div>
        </div>
      </div>
      <div class="inner-right">
        <div class="header">
          <span>精选频道</span>
          <span>大家常逛的频道</span>
        </div>
        <div class="content">
          <div class="item" v-for="item in list" :key="item.name">
            <div class="logo-name">
              <span><img :src="item.logo" alt=""></span>
              <span>{{item.name}}</span>
            </div>
            <div class="desc">
              {{item.desc}}
            </div>
          </div>
        </div>
        <div class="footer">前往频道广场</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileWatchDetail',
  data () {
    return {
      list: [
        {
          logo: require('assets/img/profile/bank.svg'),
          name: '运动银行',
          desc: '最高50元红包待领取'
        },
        {
          logo: require('assets/img/profile/baby.svg'),
          name: '亲宝贝',
          desc: '陪宝宝每一天'
        },
        {
          logo: require('assets/img/profile/food.svg'),
          name: '汇吃',
          desc: '淘遍新奇有趣美味'
        },
        {
          logo: require('assets/img/profile/beauty-makeup.svg'),
          name: '美妆学院',
          desc: 'Pick适合你的美!'
        }
      ],
      defaultFontSize: window.innerWidth * .04 + 'px',
      descHeight: window.innerHeight * .04 + 'px',
      descWidth: window.innerWidth * .4 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  #profile-watch-detail {
    margin: 10px;
    img {
      width: 14%;
    }
    .outer {
      display: flex;
      justify-content: space-around;
      .inner-left {
        width: 40%;
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        flex: auto;
        display: flex;
        flex-direction: column;
        .header {
          display: flex;
          flex-direction: column;
          .logo-name {
            display: flex;
            align-items: center;
            font-weight: bold;
            margin: 5px;
            img {
              margin-right: 5px;
            }
          }
          .desc {

          }
        }
        .content {
          display: flex;
          flex-direction: column;
          text-align: center;
          align-items: center;
          span {
            margin: 5px 0;
            &:last-child {
              width: 100%;
              border-radius: 25px;
              color: rgb(229,139,105);
              background: linear-gradient(45deg, rgb(254,236,226), rgb(255,238,229))
            }
            img {
              width: 50%;
              height: 50%;
            }
          }
        }
        .footer {
          margin-top: 10px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .left, .right {
            flex: auto;
            display: flex;
            text-align: center;
            flex-direction: column;
            span {
              img {
                width: 50%;
                height: 50%;
              }
            }
          }
          .middle-line {
            height: 60px;
            width: 3px;
            opacity: .1;
            background-color: #000;
          }
        }
      }
      .inner-right {
        width: 40%;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
      }
    }
  }
</style>