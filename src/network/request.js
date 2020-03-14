import axios from 'axios'

export function request(config) {
  // 创建 axios 实例
  const instance = axios.create({
    baseURL: '...',
    timeout: 5000
  })
  // axios 拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  return instance(config)
}