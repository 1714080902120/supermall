<template>
  <div id="detail-navbar">
    <Navbar>
        <div class="left" slot="left"><div class="go-back" @click="goBack()">返回</div></div>
        <div class="center" slot="center">
          <span v-for="(item, index) in navbarList" :key="item" @click="active(index)" :class="{ red: ifRed === index }">
            {{item}}
          </span>
        </div>
        <div class="right" slot="right"></div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
export default {
  name: 'DetailNavbar',
  data () {
    return {
      navbarList: [
        '商品',
        '参数',
        '评论',
        '推荐'
      ],
      ifRed: 0
    }
  },
  created () {
  },
  mounted () {
    
  },
  activated () {
    this.ifRed = 0
    this.acceptTheChangeIndex()
  },
  deactivated() {
    
  },
  components: {
    Navbar
  },
  methods: {
    goBack () {
      this.$store.state.moduleDetail.active = true
      history.go(-1)
    },
    active (index) {
      this.ifRed = index
      this.bus.$emit('toWhere', index)
    },
    acceptTheChangeIndex () {
      this.bus.$on('changeDetailNavbarIndex', (res) => {
        this.ifRed = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #detail-navbar {
    z-index: 100;
    .left, .right, .center {
      display: flex;
      background-color: #fff;
      border: 0;
      padding: 0;
      margin: 0;
      color: #000;
      span {
        flex: auto;
      }
    }
    .left {
      .go-back {
        &::before {
          content: '〈';
        }
      }
    }
  }
  .red {
    color: #f00;
    font-weight: bold;
  }
</style>