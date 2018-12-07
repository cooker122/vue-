// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import '@/styles/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入vue-amap
import VueAMap from 'vue-amap'
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '6a204f2b675f32f8849ec4b6b7c21e5c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})
// 引入富文本
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  // console.log(to)
  var token = localStorage.getItem('userToken')
  if (token || to.path === '/login') {
    next()
  } else {
    next({ path: '/login' })
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
