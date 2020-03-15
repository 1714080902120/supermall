<template>
  <div id="toast" v-if="toastAppear" :style="{ width, height }">
    <div class="content">
      <div class="word" :style="{ 'font-size': contentFontSize }">{{word}}</div>
      <div class="selection" :style="{ 'font-size': fontSize }">
        <span class="no" @click="cancel()">{{no}}</span>
        <span class="yes" @click="sure()">{{yes}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    word: {
      type: String,
      default: '真的要删除吗?'
    },
    yes: {
      type: String,
      default: '删除'
    },
    no: {
      type: String,
      default: '我再想想'
    }
  },
  data () {
    return {
      width: window.innerWidth + 'px',
      height: window.innerHeight + 'px',
      fontSize: window.innerWidth / 18.75 + 'px',
      contentFontSize: window.innerWidth * .048 + 'px',
      toastAppear: false
    }
  },
  activated () {
    this.toastAppear = false
  },
  mounted () {
    this.readyToDelete()
  },
  methods: {
    readyToDelete () {
      this.bus.$on('toastAppear', () => {
        this.toastAppear = true
        
      })
    },
    cancel () {
      this.toastAppear = false
      return false
    },
    sure () {
      this.bus.$emit('iAmReadyDelete')
      this.toastAppear = false
    }
  }
}
</script>

<style lang="less" scoped>
  #toast {
    position: absolute;
    top: 0;
    background-color: rgba(10, 10, 10, .6);
    z-index: 996;
    overflow: hidden;
    .content {
      position: relative;
      width: 60%;
      height: 12%;
      top: 50%;
      left: 50%;
      padding: 5px;
      background-color: rgb(255,255,255);
      display: flex;
      flex-direction: column;
      text-align: center;
      animation: toastUp .1s linear forwards;
      .word {
        position: relative;
        height: 50%;
        vertical-align: middle;
        color: #000;
        font-size: 18px;
        line-height: 150%;
      }
      .selection {
        position: relative;
        height: 50%;
        display: flex;
        justify-content: center;
        color: #fff;
        line-height: 150%;
        .no {
          margin: 0 5px 5px 5px;
          width: 50%;
          flex: auto;
          background-color: rgb(161,161,161);
        }
        .yes {
          margin: 0 5px 5px 5px;
          width: 50%;
          flex: auto;
          background-color: rgb(255,77,2);
        }
      }
    } 
    @keyframes toastUp {
      from { transform: scale(.5, .5) translate(-50%, -50%);}
      to { transform: scale(1, 1) translate(-50%, -50%); }
    }
  }
</style>