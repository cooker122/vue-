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
// 左侧菜单权限
export const menusList = () => {
  return axios.get('menus')
    .then((res) => {
      return res.data
    })
}
// 所以权限列表
export const rightsList = (type) => {
  return axios.get(`rights/${type}`)
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
export const editStatus = (uid, type) => {
  return axios.put(`users/${uid}/state/${type}`)
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
// 删除用户信息
export const deleteNsers = (id) => {
  return axios.delete(`users/${id}`)
    .then((res) => {
      return res.data
    })
}
// 添加角色
export const addRoles = (psa) => {
  return axios.post('roles', psa)
    .then((res) => {
      return res.data
    })
}
// 获取角色数据
export const rolesList = () => {
  return axios.get('roles')
    .then((res) => {
      return res.data
    })
}
// 分配角色数据
export const allotRoles = (psa) => {
  return axios.put(`users/${psa.id}/role`, psa)
    .then((res) => {
      return res.data
    })
}
// 删除角色信息
export const deleteRoles = (roleId) => {
  return axios.delete(`roles/${roleId}`)
    .then((res) => {
      return res.data
    })
}
// 编辑角色信息
export const editRoles = (psa) => {
  return axios.put(`roles/${psa.id}`, psa)
    .then((res) => {
      return res.data
    })
}
// 角色权限设置
export const setRights = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, {rids})
    .then((res) => {
      return res.data
    })
}
// 删除权限信息
export const deleteRights = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`)
    .then((res) => {
      return res.data
    })
}
// 根据id获取数据
export const getId = (id) => {
  return axios.get(`users/${id}`)
    .then((res) => {
      return res.data
    })
}

// 获取商品数据
export const goodsList = (psa) => {
  return axios.get('goods', {params: psa})
    .then((res) => {
      return res.data
    })
}
// 编辑商品数据
export const editGoods = (psa) => {
  return axios.put(`goods/${psa.id}`, psa)
    .then((res) => {
      return res.data
    })
}
// 删除商品信息
export const deleteGoods = (id) => {
  return axios.delete(`goods/${id}`)
    .then((res) => {
      return res.data
    })
}
// 根据id获取数据
export const getGoods = (id) => {
  return axios.get(`goods/${id}`)
    .then((res) => {
      return res.data
    })
}
// 获取商品分类列表
export const getGoodsList = (params) => {
  return axios.get('categories', {params: {'type': params}})
    .then((res) => {
      return res.data
    })
}
// 添加商品分类列表
export const addCategories = (psa) => {
  return axios.post('categories', psa)
    .then((res) => {
      return res.data
    })
}
// 添加商品列表
export const addCategoods = (psa) => {
  return axios.post('goods', psa)
    .then((res) => {
      return res.data
    })
}
// 删除商品信息
export const deleteCategories = (id) => {
  return axios.delete(`categories/${id}`)
    .then((res) => {
      return res.data
    })
}
