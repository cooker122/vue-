<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'Nav' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 输入框 -->
    <div
      style="margin-top: 15px; "
      class="user"
    >
      <el-input
        placeholder="请输入内容"
        v-model="selectKey"
        class="search-input"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchUser"
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        @click="addUser"
      >添加用户</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :data="userData"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="editStatu(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
             <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit( scope.row)"
                  icon="el-icon-edit"
                  plain
                >
                </el-button></el-tooltip>
                <el-tooltip content="删除" placement="bottom" effect="light">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
            plain
          ></el-button>
                </el-tooltip>
                 <el-tooltip content="编辑" placement="top">
          <el-button
            size="mini"
            type="info"
            @click="showShare( scope.$index,scope.row )"
            icon="el-icon-share"
            plain
          ></el-button>
                 </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模板 -->
      <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- 添加数据的表格 -->
  <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="addform" :rules="rules" ref="addform" label-width="100px">
        <el-form-item label="用户名:"  prop="username">
        <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="密码:" prop="password">
        <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮箱:" prop="email">
        <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="手机:" prop="mobile">
        <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmForm('addform')">确 定</el-button>
  </div>
</el-dialog>
 <!-- 编辑数据 -->
    <!-- 添加数据的表格 -->
  <el-dialog title="编辑用户" :visible.sync="editFormVisible">
  <el-form :model="editform" :rules="rules" ref="editform" label-width="100px">
        <el-form-item label="用户名:"  prop="username" >
        <el-input v-model="editform.username" autocomplete="off" :disabled="true" ></el-input>
        </el-form-item>
         <el-form-item label="邮箱:" prop="email">
        <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
            <el-form-item label="电话:" prop="mobile">
        <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editForm('editform')">确 定</el-button>
  </div>
</el-dialog>
  <!-- 授权 -->
  <el-dialog title="分配角色" :visible.sync="shouForm">
  <el-form  :model="showform" :rules="rules" ref="showform" label-width="100px">
    <el-form-item label="用户名：">
      <el-input v-model="showform.username" autocomplete="off" :disabled='true'></el-input>
    </el-form-item>
    <el-form-item label="活动区域" >
      <el-select v-model="showform.rid" placeholder="请选择的角色" >
           <el-option
      v-for="item in rolesListdata"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="shouForm = false">取 消</el-button>
    <el-button type="primary" @click="allotRole">确 定</el-button>
  </div>
  </el-dialog>
  </div>
</template>
<script>
import {users, addNsers, editNsers, deleteNsers, rolesList, editStatus, getId, allotRoles} from '@/api'
export default {
  data () {
    return {
      // 定义表单里面的变量
      addform: {username: '',
        password: '',
        email: '',
        mobile: ''},
      editform: {
        username: '',
        email: '',
        mobile: '',
        id: ''},
      showform: {
        username: '',
        id: '',
        rid: '0'},
      dialogFormVisible: false,
      editFormVisible: false,
      shouForm: false,
      //   Eid: '',
      input1: '',
      total: 1,
      selectKey: '',
      //   query: '',
      pagenum: 1,
      pagesize: 10,
      userData: [],
      value: '',
      rolesListdata: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      }

    }
  },
  // 编辑页面的渲染
  methods: {
    handleEdit (row) {
      console.log(row)

      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
      this.editFormVisible = true
    },
    // 删除按钮的数据
    handleDelete (index, row) {
      console.log(index, row)
      this.editform.id = row.id
      // 删除的提示框
      this.$confirm(`此操作将永久删除id号为${this.editform.id}的用户数据`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNsers(this.editform.id).then((res) => {
          if (res.meta.status === 200) {
            console.log(res)
            this.init()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 选择角色
    allotRole () {
      // console.log(1111)
      allotRoles(this.showform).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.showform.rid = res.data.rid
          this.shouForm = false
          this.$message({
            type: 'success',
            message: '分配角色成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '分配角色失败'
          })
        }
      })
    },
    // 分配角色
    showShare (index, row) {
      console.log(index, row)
      this.shouForm = true
      this.showform.username = row.username
      this.showform.id = row.id
      // 获取角色信息
      rolesList().then(res => {
        if (res.meta.status === 200) {
          this.rolesListdata = res.data
        }
      })
      // 通过id获取到rid
      getId(this.showform.id).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.showform.rid = res.data.rid
        }
      })
    },
    // 修改状态
    editStatu (row) {
      console.log(row)
      editStatus(row.id, row.mg_state).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.meta.msg
          })
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    },
    // 把初始化数据封装成函数
    init () {
      users({query: this.selectKey, pagenum: this.pagenum, pagesize: this.pagesize}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
        // console.log(111)
          this.currentPage = res.data.pagenum
          this.userData = res.data.users
          this.total = res.data.total
        }
      })
    },
    // 搜索框函数
    searchUser () {
      // 重新渲染数据
      this.init()
    },
    // 添加用户
    addUser () {
      this.dialogFormVisible = true
    },
    confirmForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addform)
          addNsers(this.addform).then(res => {
            if (res.meta.status === 201) {
              this.dialogFormVisible = false
              this.init()
              this.$refs[formName].resetFields()
              this.$message({ message: '添加用户成功', type: 'success'
              })
            } else {
              this.$message({ message: '添加失败', type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '数据输入不合法'
          })
        }
      })
    },
    // 编辑用户信息
    editForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   console.log(1111)
          // console.log(this.editform)
          editNsers(this.editform).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              // console.log(res)
              this.editFormVisible = false
              this.init()
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            } else {
              this.$message({ message: '编辑失败', type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '数据输入不合法'
          })
          // return false
        }
      })
    }

  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.box {
  // margin-top:20px;
  margin: 20px 20px 0;
}
/* 覆盖element导航菜单的样式 */
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
.user {
  margin-bottom: 10px;
  .search-input {
    width: 300px;
  }
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
