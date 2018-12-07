<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
      @click="addRole()"
    >添加用户</el-button>
    <!-- 表格内容 -->
    <el-table
 @expand-change="expandSelect"
 :row-key='getRowKeys'
          :expand-row-keys="expands"
      :data="rightData"
      style="width: 100%"
      border
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row
            v-for="tag in props.row.children"
            :key="tag.id"

          >
            <el-col :span="4">
              <div class="grid-content bg-purple-dark">
                <el-tag
                  closable
                  type=""
                  @close="deleteRight(props.row,tag.id)"
                >
                  {{tag.authName}}
                </el-tag>
                <span class="el-icon-arrow-right"></span>
              </div>

            </el-col>
            <el-col :span="20">

              <el-row
                v-for="tag1 in tag.children"
                :key="tag1.id"
              >
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-tag
                      closable
                      type="success"
                      @close="deleteRight(props.row,tag1.id)"
                    >
                      {{tag1.authName}}
                    </el-tag>
                    <span class="el-icon-arrow-right"></span>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="grid-content bg-purple">
                    <el-tag
                      class="tag2"
                      v-for="tag2 in tag1.children"
                      :key="tag2.id"
                      closable
                      type="info"
                      @close="deleteRight(props.row,tag2.id)"
                    >
                      {{tag2.authName}}
                    </el-tag>
                  </div>

                </el-col>

              </el-row>
            </el-col>

          </el-row>
          <div v-show='props.row.children.length=== 0'>没有权限，请请设置权限</div>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
      >
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit( scope.row)"
            icon="el-icon-edit"
            plain
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleShare( scope.row )"
            icon="el-icon-share"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 树型图 -->

    <el-dialog
      title="提示"
      :visible.sync="showFormVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="tree">
        <el-tree
          ref="tree"
          :data="rightsLists"
          show-checkbox

          node-key="id"
          :default-expand-all='true'
          :default-checked-keys="rightId"
          :props="defaultProps"

        >
        </el-tree>

      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sureSebmit"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addFormVisible"
    >
      <el-form
        ref="addform"
        :model="addform"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="addform.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="roleDesc"
        >
          <el-input
            v-model="addform.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addSureRole('addform')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->

    <el-dialog
      title="编辑角色"
      :visible.sync="editFormVisible"
    >
      <el-form
        ref="editform"
        :model="editform"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="editform.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="roleDesc"
        >
          <el-input
            v-model="editform.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="aditSureRole('editform')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import {
  rolesList,
  rightsList,
  setRights,
  deleteRights,
  addRoles,
  deleteRoles,
  editRoles
} from '@/api'
export default {
  data () {
    return {
      addFormVisible: false,
      addform: { roleName: '', roleDesc: '' },
      editform: { roleName: '', roleDesc: '', id: '' },
      rightData: [],
      rightData1: [],
      showFormVisible: false,
      editFormVisible: false,
      rightsLists: [],
      rightId: [],
      roleId: '',
      expands: [],
      getRowKeys (row) {
        return row.id
      },
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    expandSelect (row, expandedRows) {
      // console.log(row, expandedRows)
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.id)
        }
      } else {
        that.expands = []
      }
    },

    // 把页面数据渲染封装成函数
    init () {
      rolesList().then(res => {
        if (res.meta.status === 200) {
          console.log(res)
          this.rightData = res.data
          // this.rightData1=res.data
        }
      })
    },
    // 点开分配角色
    handleShare (row) {
      console.log(row)
      this.roleId = row.id
      this.showFormVisible = true
      rightsList('tree').then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.rightsLists = res.data
          // 获取最里层的id
          row.children.forEach((val, key) => {
            if (val.children && val.children.length > 0) {
              val.children.forEach((val1, key) => {
                if (val1.children && val1.children.length > 0) {
                  val1.children.forEach(val2 => {
                    this.rightId.push(val2.id)
                  })
                }
              })
            }
          })
        }
      })
    },
    // 删除角色
    handleDelete (row) {
      var rolesId = row.id
      this.$confirm(`此操作将永久删除id为${rolesId}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRoles(rolesId).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.init()
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 编辑页面
    handleEdit (row) {
      console.log(row)
      this.editFormVisible = true
      this.editform.id = row.id
      this.editform.roleDesc = row.roleDesc
      this.editform.roleName = row.roleName
      // console.log(this.editform.id, this.editform.roleDesc, this.editform.roleName)
    },

    // 确定修改

    aditSureRole () {
      // console.log(this.editform)
      editRoles(this.editform).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.editform = res.data
          this.init()
          this.editFormVisible = false
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '更新失败'
          })
        }
      })
    },
    // 确定角色分配函数
    sureSebmit () {
      // 使用node方法获取到id跟父级id
      var selectNode = this.$refs['tree'].getCheckedNodes()
      // console.log(selectNode)
      var nodeStr = selectNode.map(val => {
        return val.id + ',' + val.pid
      })
      // console.log(selectNode)
      // 把数组用join方法合并成一起
      var joinStr = nodeStr.join(',')
      // console.log(joinStr)
      var Str = joinStr.split(',')
      // console.log(Str)
      // 去掉重复，使用es6方法Set去掉重复，返回是对象，我们所要的数据在里面的对象里面，使用Array form方法获取到
      var setStr = new Set(Str)
      // console.log(setStr)
      var ridsarr = Array.from(setStr)
      // 把获取到的id值转化成数组以‘,’号分隔开
      var ridStr = ridsarr.join(',')

      // console.log(ridStr)
      // 设置角色
      setRights(this.roleId, ridStr).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.init()
          this.showFormVisible = false
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 删除角色权限
    deleteRight (row, rightId) {
      // console.log(111)
      // console.log(row)
      deleteRights(row.id, rightId).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          row.children = res.data
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
    // 添加角色
    addRole () {
      // console.log(111)
      this.addFormVisible = true
    },
    // 确定添加角色
    addSureRole (formName) {
      addRoles(this.addform).then(res => {
        console.log(res)
        if (res.meta.status === 201) {
          this.addFormVisible = false
          console.log(1111)
          this.init()
          this.$refs[formName].resetFields()
          // this.$refs[formName].resetFields();
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
    }
  }
}
</script>
<style lang='scss' scoped>
.box {
  width: 100%;
  margin: 20px 20px 0;
  overflow: scroll;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple {
    // background: #d3dce6;
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .tag2 {
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .tree {
    height: 300px;

  }
}
</style>
