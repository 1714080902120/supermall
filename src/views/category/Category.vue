<template>
  <div id="category">
    <Navbar/>
    <div class="inner">
      <Sidebar :sidebarData="dataToSidebar"/>
      <Scroll
        ref="scroll"
        :probeType="1"
        :pullUpLoad="{}">
        <GoodsList :goodsList="dataToGoodsList"/>
      </Scroll>
    </div>
  </div>
</template>

<script>
import {
  Navbar,
  Scroll,
  Sidebar,
  GoodsList
} from './index'
import { getCategory, getSubcategory } from 'network/category'
import { debounce } from 'common/utils'
export default {
  name: 'Category',
  data () {
    return {
      dataToSidebar: [],
      dataToGoodsList: []
    }
  },
  activated () {
    this.$store.state.moduleDetail.active = false
  },
  created () {
    this.toGetSubCategory()
  },
  mounted () {
    this.toGetCategory()
    this.$nextTick(() => {
      this.imgFinishLoading()
    })
  },
  components: {
    Navbar,
    Scroll,
    Sidebar,
    GoodsList
  },
  methods: {
    // 获取侧边栏数据
    toGetCategory () {
      getCategory().then(res => {
        this.dataToSidebar = res.data.category.list
      }).catch(err => { console.log(err) })
    },
    // 获取商品列表
    toGetSubCategory () {
      this.bus.$on('toGetSubData', res => {
        getSubcategory(res).then(res => {
          this.dataToGoodsList = res.data.list
          this.$nextTick(() => {
            this.$refs.scroll.BS.finishPullUp()
            this.$refs.scroll.refresh()
          })
        }).catch(err => { console.log(err) }) 
      })
    },
    imgFinishLoading () {
      let refresh = debounce(this.$refs.scroll.refresh, 500)
      this.bus.$on('IAmFinishLoading', () => {
        refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #category {
    overflow: hidden;
    .inner {
      display: flex;
      align-items: center;
    }
  }
</style>