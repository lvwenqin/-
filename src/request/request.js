import axios from 'axios'

const request = axios.create ({
  baseURL: 'http://520it.com:8001',
  timeout: 5000
})

request.interceptors.request.use (config => {
  // 请求之前执行 可以判断用户有没有登录，如果没有登录 直接return出去 请求不会执行
  // console.log (config) // 本次请求的一些信息
  // console.log(config)
  let token = localStorage.getItem ('token')
  if (token) {
    config.headers['X-Nideshop-Token'] = token
  }
  return config
}, err => {
  return Promise.reject (err)
})

request.interceptors.response.use (res => {
  // 接收响应之前执行 
  // console.log (res) // 本次响应的一些信息
  return res  
}, err => {
  return Promise.reject (err)
})

export default request