import request from 'network/axios'

export function getHomeMultaData () {
  return request({
    url: '/home/multidata'
  });
}
