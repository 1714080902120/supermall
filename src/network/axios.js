import Axios from 'axios';
import store from 'store/index'
export default function (options) {
  return new Promise((resolve, reject) => {
    const instance = Axios.create({
      baseURL: 'http://106.54.54.237:8000/api/hy',
      // baseURL: 'http://123.207.32.32:8000/api/hy',
			timeout: 5000
    })

    instance.interceptors.request.use(config => {
      // 在这里对请求进行拦截 处理
      // console.log('request请求成功！')
      store.state.loading = true
      return config
    }, err => {
      console.log('request请求失败!')
      return err
    })
    instance.interceptors.response.use(res => {
      // console.log('response请求成功！')
      // 请求成功发送，请求得到要求则返回成功
      store.state.loading = false
      return res.data
    }, err => {
      console.log('response返回失败!')
      store.state.loading = false
      store.state.errState = true
      console.log(err)
      if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
    })

    // 根据网络请求返回数据
    instance(options).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })

}