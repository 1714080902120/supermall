import axios from 'network/axios'

export function getHomeMultaData () {
  return axios({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type, page) {
  return axios({
    url: '/home/data',
    // 请求连接的参数，必须为纯对象
    params: {
      type,
      page
    }
  })
}
