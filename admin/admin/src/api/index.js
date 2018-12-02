// 引入这个axiso文件
import axios from 'axios'
// 配置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置基准路径：因为请求的 路径是相对于这个基准路径而言的。
// 所以我们就需要让所以的路由都以这个路径作为参照
axios.defaults.baseURL = baseURL
// 为axios添加拦截器：因为所以请求都是通过axios来发送的，所以为
// 它添加拦截器就相当于为所有请求添加了拦截器

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 获取到登录存在本地储存的token
  // console.log(config)
  var token = localStorage.getItem('userToken')
  // 判断token值是否存在
  if (token) {
    // 存在的话把token值存在请求头
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 登录验证接口方法
export const login = (param) => {
  return axios.post('login', param)
    .then((res) => {
      return res.data
    })
}
// 登录验证接口方法
export const users = (psa) => {
  return axios.get('users', {params: psa})
    .then((res) => {
      return res.data
    })
}
export const menusList = () => {
  return axios.get('menus')
    .then((res) => {
      return res.data
    })
}
// 添加用户

export const addNsers = (psa) => {
  return axios.post('users', psa)
    .then((res) => {
      return res.data
    })
}
// 修改用户状态
export const editStatus = (psa) => {
  return axios.post(`users/${psa.id}/state/${psa.type}`, psa)
    .then((res) => {
      return res.data
    })
}

// 编辑用户信息
export const editNsers = (psa) => {
  return axios.put(`users/${psa.id}`, psa)
    .then((res) => {
      return res.data
    })
}
// 编辑用户信息
export const deleteNsers = (id) => {
  return axios.delete(`users/${id}`, id)
    .then((res) => {
      return res.data
    })
}
// 获取商品数据
export const goodsList = (type) => {
  return axios.get('categories', type)
    .then((res) => {
      return res.data
    })
}
