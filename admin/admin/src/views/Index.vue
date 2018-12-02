<template>
  <el-container class="home ">
    <el-aside width="auto">
      <div>
        <div
          alt=""
          class="logo"
        ></div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
         :collapse= "isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router='true'
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="Rignt"><i class="el-icon-menu"></i>
              <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="roles">
                <i class="el-icon-menu"></i>
                <span>权限列表</span></el-menu-item>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="list"><i class="el-icon-menu"></i>
              <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                <span>分类参数</span></el-menu-item>
                 <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                <span>商品分类</span></el-menu-item>
          </el-submenu>
           <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="4-1"><i class="el-icon-menu"></i>
              <span>订单列表</span>
              </el-menu-item>

          </el-submenu>
           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>

            <el-menu-item index="5-1"><i class="el-icon-menu"></i>
              <span>数据报表</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <a href="javascript:;" class="myicon myicon-menu toggle-btn" @click='isCollapse=!isCollapse'></a>
        <div class="system-title">欢迎来到管理系统 </div>
        <div class="welcome">欢迎你***<span>退出</span></div>
      </el-header>
      <router-view></router-view>

    </el-container>
  </el-container>

</template>

<script>
// import { users } from '@/api/index.js'
// import { users } from '@/api/index.js'

export default {
  data () {
    return {
      isCollapse: false
    }
  },
  mounted () {

  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(keyPath)
    },
    handleClose (key, keyPath) {
      console.log(keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    // width: 200px;

    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
    overflow: hidden;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
