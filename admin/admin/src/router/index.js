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
import Add from '@/views/goods/Add'
import Categories from '@/views/goods/Categories'
import Params from '@/views/goods/Params'
import Goods from '@/views/goods/goods'
import Orders from '@/views/orders/Orders'
import Reports from '@/views/reports/reports'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
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
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'home',
      children: [{
        path: 'home',
        name: 'Nav',
        component: Nav
      },
      {
        path: 'users',
        name: 'Users',
        component: Users

      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: 'rights',
        name: 'Rights',
        component: Rights

      },
      {
        path: 'goods',
        name: 'Goods',
        component: Goods,
        redirect: {
          name: 'List'
        },
        children: [
          {
            path: 'list',
            name: 'List',
            component: List
          },
          {
            path: 'add',
            name: 'Add',
            component: Add
          }
        ]
      },

      {
        path: 'categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: 'params',
        name: 'Params',
        component: Params
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports
      }
      ]
    }
  ]
})
