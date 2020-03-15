<template>
  <div id="shopcart-count-bar">
    <div v-if="ifDelete">
      <div class="outer" :style="defaultStyle()">
        <div class="inner">
          <div class="select-all">
            <img v-if="!ifActive" @click="toAcitve()" src="~assets/img/shopcart/all.svg" alt="">
            <img v-if="ifActive" @click="toAcitve()" src="~assets/img/shopcart/all_active.svg" alt="">&nbsp;全选
          </div>
          <div class="calc-count" :style="{ 'line-height': height }">
            <span>合计:￥{{total}}元</span>
            <span @click="count()" :style="{ 'width': countWidth, 'height': countHeight, 'line-height': countHeight }">结算({{(totalNum)}})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopcartCountBar',
  data () {
    return {
        height: window.innerHeight * .09 + 'px',
        width: window.innerWidth + 'px',
        Position: window.innerHeight / 13 + 'px',
        defaultFontSize: window.innerWidth * .05 + 'px',
        countHeight: window.innerHeight * .07 + 'px',
        countWidth: window.innerWidth * .3 + 'px',
        ifDelete: true,
        ifActive: false,
        total: 0,
        totalNum: 0
    }
  },
  activated () {
  },
  mounted () {
    this.appear()
    this.disappear()
    this.toCalc()
    this.num()
    this.cancelTheSelection()
  },
  methods: {
    toAcitve () {
      this.ifActive = !this.ifActive
      if (this.ifActive) {
        this.bus.$emit('selectAll')
      } else {
        this.bus.$emit('cancel')
      }
    },
    toCalc () {
      this.bus.$on('theMoney', (res) => {
        this.total = res
      })
    },
    appear () {
      this.bus.$on('iAmGoingToDelete', () => {
        this.ifActive = false
        this.ifDelete = false
      })
    },
    disappear () {
      this.bus.$on('iAmFinishDelete', () => {
        this.ifDelete = true
        this.ifActive = false
      })
    },
    count () {
      console.log(1)
    },
    num () {
      this.bus.$on('totalNum', res => {
        this.totalNum = res
      })
      this.bus.$on('allIsBeingSelected', () => {
        this.ifActive = true
      })
    },
    cancelTheSelection () {
      this.bus.$on('cancelTheSelection', () => {
        this.ifActive = false
      })
    }
  },
  computed: {
    defaultStyle () {
      return () => {
        return { 'width': this.width, 'height': this.height, 'line-height': this.height, 'bottom': this.Position, 'font-size': this.defaultFontSize }
      }
    }
  }
}
</script>

<style lang="less" scroped>
  #shopcart-count-bar {
    position: relative;
    .outer {
      position: fixed;
      background-color: #fff;
      .inner {
        display: flex;
        justify-content: space-around;
        .select-all {
          margin-right: -150px;
          flex: auto;
          img {
            width: 7.5%;
            margin-left: 10px;
            vertical-align: middle;
          }
        }
        .calc-count {
          position: relative;
          flex: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            border-radius: 25px;
            text-align: center;
            &:last-child {
              border: 0;
              background: radial-gradient(at 50% 50%, rgb(254,119,2) 5%, rgb(255,102,14) 100%);
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>