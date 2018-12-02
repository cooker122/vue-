import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Users from '@/views/User/Users'
import Nav from '@/views/User/Nav'
import Roles from '@/views/rights/Roles'
import Rights from '@/views/rights/Rights'
import List from '@/views/goods/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/Nav',
      children: [{
        path: '/nav',
        name: 'Nav',
        component: Nav
      },
      {
        path: '/users',
        name: 'Users',
        component: Users

      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: '/rignt',
        name: 'Rights',
        component: Rights

      },
      {
        path: '/list',
        name: 'List',
        component: List
      }
      ]
    }
  ]
})
