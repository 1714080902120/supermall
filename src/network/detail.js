import axios from './axios'
export function getDetailData (iid) {
  return axios({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommendData () {
  return axios({
    url: '/recommend'
  })
}