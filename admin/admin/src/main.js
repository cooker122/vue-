// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import '@/styles/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
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
