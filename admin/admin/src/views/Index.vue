<template>
  <el-container class="home">
    <el-aside width="auto">
      <div>
        <div
          alt=""
          class="logo"
        ></div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router='true'
        >
          <div
            v-for="val in listform"
            :key='val.id'
          >
            <el-submenu :index="val.id+''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{val.authName}}</span>
              </template>
              <div
                v-for="item in val.children"
                :key="item.id"
              >
                <el-menu-item :index="'/'+item.path">
                  <i class="el-icon-menu"></i>
                  <span>{{item.authName}}</span>
                </el-menu-item>
              </div>
            </el-submenu>
          </div>
        </el-menu>

      </div>
    </el-aside>
    <el-container>
      <el-header>
        <a
          href="javascript:;"
          class="myicon myicon-menu toggle-btn"
          @click='isCollapse=!isCollapse'
        ></a>
        <div class="system-title">欢迎来到管理系统 </div>
        <div class="welcome">欢迎你: <img
            src="../assets/bunny_cc1e937.gif"
            alt=""
          ><span clas='name'>chen</span>
<el-button type="text" @click='logout'>退出</el-button>
                    </div>
      </el-header>
       <el-main><router-view></router-view></el-main>

    </el-container>
  </el-container>

</template>

<script>
// import { users } from '@/api/index.js'
import { menusList } from '@/api/index.js'

export default {
  data () {
    return {
      isCollapse: false,
      listform: {}
    }
  },
  mounted () {
    // 获取左侧列表
    menusList().then(res => {
      // console.log(res)
      // 把左侧列表的数据传给list
      this.listform = res.data
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(keyPath)
    },
    logout () {
      // redirect: '/login'
      // console.log(this.$store.state)
      // 清除token值
      localStorage.removeItem('userToken')
      // 实现跳转到登录页面
      this.$router.push('/login')
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
    // top: 0;
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
    color: #ccc;
    img {
      width: 40px;
    }
    .name {
      color: white !important;
    }
  }
}
</style>
