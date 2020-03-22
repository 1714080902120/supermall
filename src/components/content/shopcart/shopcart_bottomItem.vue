<template>
  <div id="shopcart-bottom-item">
    <div v-if="ifDelete">
      <div class="outer" :style="defaultStyle()">
        <div class="inner">
          <div class="select-all">
            <img v-if="!ifActive" @click="toAcitve()" src="~assets/img/shopcart/all.svg" alt="">
            <img  v-if="ifActive" @click="toAcitve()" src="~assets/img/shopcart/all_active.svg" alt="">&nbsp;全选
          </div>
          <div class="clear-tocollect-delete">
            <span @click="clear()"><img src="~assets/img/shopcart/clear.svg" alt="">清理</span>
            <span @click="addToCollect()">移入收藏夹</span>
            <span @click="goDelete()">删除</span>
          </div>
        </div>
      </div>
    </div>
      <Toast word="确认要删除?" yes="删除" no="我再想想"/>
  </div>
</template>

<script>
import Toast from 'components/common/toast/Toast'
export default {
  name: 'ShopcartBottomItem',
  data () {
    return {
        height: window.innerHeight * .09 + 'px',
        width: window.innerWidth + 'px',
        Position: window.innerHeight / 13 + 'px',
        defaultFontSize: window.innerWidth * .05 + 'px',
        ifDelete: false,
        ifActive: false
    }
  },
  activated () {
  },
  mounted () {
    this.appear()
    this.disappear()
  },
  components: {
    Toast
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
    appear () {
      this.bus.$on('iAmGoingToDelete', () => {
        this.ifActive = false
        this.ifDelete = true
      })
    },
    disappear () {
      this.bus.$on('iAmFinishDelete', () => {
        this.ifDelete = false
      })
    },
    goDelete () {
      this.bus.$emit('toastAppear')
    },
    clear () {
    },
    addToCollect () {
      
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

<style lang="less" scoped>
  #shopcart-bottom-item {
    .outer {
      position: absolute;
      background-color: #fff;
      .inner {
        display: flex;
        position: relative;
        .select-all {
          flex: auto;
          img {
            width: 15%;
            margin-left: 8px;
            vertical-align: middle;
          }
        }
        .clear-tocollect-delete {
          position: relative;
          flex: auto;
          margin-left: -8px;
          span {
            flex: auto;
            padding: 4px;
            margin: 0 1.2px;
            border-radius: 10px;
            @media screen and (max-width: 320px) {
              padding: 2px;
              margin: 0;
              border-radius: 9px;
            }
            @media screen and (min-width: 700px) {
              padding: 8px;
              margin: 0 12px;
              border-radius: 25px;
            }
            &:first-child {
              img {
                width: 10%;
                vertical-align: middle;
              }
            }
            &:nth-child(2) {
              color: rgb(255, 196, 0);
              border: 2px solid rgb(255, 166, 0);
            }
            &:last-child {
              color: rgb(255, 60, 0);
              border: 2px solid rgb(255, 60, 0);
            }
          }
        }
      }
    }
  }
</style>