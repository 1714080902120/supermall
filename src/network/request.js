import axios from 'axios'

export function request (_config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: '5000',
    timeoutErrorMessage: '超出连接时长'
  })

  //拦截器
  instance.interceptors.request.use(
  res => {
    console.log(res.data)
    return res
  },
  err => {
    throw err
  })

  instance.interceptors.response.use(res => {
    return res
  },
  err => {
    throw err
  })

  return instance(_config)
}