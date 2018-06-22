import Vue from "vue"
import axios from 'axios'
const testUrl = "http://localhost:3000"
const onlineUrl = "http://acs.m.taobao.com"
//axios请求超时之后会做一个重新请求
let httpInstance = axios.create({
  // timeout: 3000,
  baseURL:testUrl 
  //baseURL:process.env.NODE_ENV==="development"? testUrl:onlineUrl
})
//然后加一个拦截器
//添加请求拦截器
httpInstance.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})
// 添加响应拦截器
httpInstance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    return promise.reject(response)
  }
},(err)=> {
  return 'ERR'
})

export { httpInstance }
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: httpInstance
    })
  }
}
