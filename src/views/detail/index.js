import Swiper from 'components/content/detail/DetailSwiper'
import DetailNavbar from 'components/content/detail/DetailNavbar'
import DetailInfo from 'components/content/detail/DetailInfo'
import Scroll from 'components/common/better_scroll/BetterScroll'
import ShopInfo from 'components/content/detail/DetailShopInfo'
import GoodsInfo from 'components/content/detail/DetailGoodsInfo' 
import ParamsInfo from 'components/content/detail/DetailParamsInfo'
import DetailRate from 'components/content/detail/DetailRate'
import RecommendGoodsList from 'components/content/good_list/GoodList'
import TabBar from 'components/content/detail/DetailTabBar'
export class GoodsDetail {
  defaultInfo
  react
  constructor (defaultInfo, react) {
    this.defaultInfo = defaultInfo
    this.react = react
  }
}

export class DefaultInfo {
  title
  currentPrice
  originPrice
  discount
  constructor (title, currentPrice, originPrice, discount) {
    this.title = title
    this.currentPrice = currentPrice
    this.originPrice = originPrice
    this.discount = discount
  }
}

export class React {
  salesVolume
  collect
  deliver
  constructor (salesVolume, collect, deliver) {
    this.salesVolume = salesVolume
    this.collect = collect
    this.deliver = deliver
  }
}

export class GoodList {
  show = {
    img: ''
  }
  title
  iid
  orgPrice
  cfav
  constructor (img, title, iid, orgPrice, cfav) {
    this.show.img = img
    this.title = title
    this.iid = iid
    this.orgPrice = orgPrice
    this.cfav = cfav
  }
}

export {
  DetailNavbar,
  Swiper,
  DetailInfo,
  Scroll,
  ShopInfo,
  GoodsInfo,
  ParamsInfo,
  DetailRate,
  RecommendGoodsList,
  TabBar
}