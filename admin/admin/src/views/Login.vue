<template>
  <div class="login">
    <div class="container">
      <img
        src="../assets/avatar.jpg"
        alt=""
        class="avatar"
      >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="用户名"
            prefix-icon="myicon myicon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="密码 "
            prefix-icon="myicon myicon-key"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button
          type="primary"
          class="login-btn"
          @click="submitForm('ruleForm')"
        >登录</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/index.js'
// import { users } from '@/api/index.js'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入正确用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 实现用户输入的验证，如果用户输入不合法，则取消当前的请求
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用接口，发送请求
          login(this.ruleForm).then(res => {
            if (res.meta.status === 200) {
              // console.log(res),
              // 登录的时候把token存到本地储存里面
              localStorage.setItem('userToken', res.data.token)
              //   实现跳转
              this.$router.push('/index')
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        } else {
          this.$message.error('登录失败，输入数据不完整')
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
