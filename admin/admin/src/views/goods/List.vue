<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
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
        @blur="searchContent"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchGoods"
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        @click="$router.push('add')"
      >添加商品</el-button>
    </div>
    <!-- 表格内容 -->
    <el-table
      :data="ListData"
      border
      style="width: 100% "
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="400"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="upd_time"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
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
            @click="handleDelete( scope.row)"
            icon="el-icon-delete"
            plain
          ></el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模板 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 编辑数据 -->
    <!-- 添加数据的表格 -->

    <el-dialog
      title="编辑商品"
      :visible.sync="editFormVisible"
    >
      <el-form
        :model="editform"
        :rules="rules"
        ref="editform"
        label-width="100px"
      >
        <el-form-item
          label="商品名:"
          prop="goods_name"
        >
          <el-input
            v-model="editform.goods_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="商品价格:"
          prop="goods_price"
        >
          <el-input
            v-model="editform.goods_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品重量:"
          prop="goods_weight"
        >
          <el-input
            v-model="editform.goods_weight"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品分类"
          prop="goods_cat"
        >

          <div class="block">
            <el-cascader
              :options="catform"
              v-model="selectedOptions"
              @change="handleChange"
              :props='props'
            >
            </el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editForm('editform')"
        >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  goodsList,
  editGoods,
  deleteGoods,
  getGoods,
  getGoodsList
} from '@/api'
export default {
  data () {
    return {
      total: 1,
      selectKey: '',
      selectedOptions: [],

      pagenum: 1,
      pagesize: 10,
      ListData: [],
      editFormVisible: false,
      editform: {
        id: 0,
        goods_name: '',
        goods_price: 1,
        goods_number: '',
        goods_weight: '',
        goods_cat: ''

      },
      catform: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleChange (value) {
      console.log(111)
      console.log(value)

      this.editform.goods_cat = value.join(',')
      // console.log(a)
      // this.editform.goods_cat = a
      // this.editform.goods_cat = value.split(',')
      console.log(this.editform.goods_cat)
    },
    // 搜索框失去焦点重新渲染页面
    searchContent () {
      if (this.selectKey.length === 0) {
        this.init()
      }
    },
    // 编辑
    handleEdit (row) {
      // console.log(row)
      this.editFormVisible = true
      this.editform.id = row.goods_id
      this.editform.goods_name = row.goods_name
      this.editform.goods_price = row.goods_price
      // console.log(this.editform.id)
      this.editform.goods_number = row.goods_number
      this.editform.goods_weight = row.goods_weight
      this.selectedOptions.length = 0
      getGoods(this.editform.id).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.editform.goods_cat = res.data.goods_cat
          this.selectedOptions.push(res.data.cat_one_id)
          this.selectedOptions.push(res.data.cat_two_id)
          this.selectedOptions.push(res.data.cat_three_id)

          // this.editform.cat_id = res.data.cat_id
          console.log(this.selectedOptions)
        }
      })
      getGoodsList(this.editform.goods_cat).then(res => {
        console.log(res)
        this.catform = res.data
      })
    },

    // 编辑用户信息
    editForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editGoods(this.editform).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.editFormVisible = false
              this.init()
              this.$message({
                type: 'success',
                message: '数据修改成功'
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
    },

    // 删除
    handleDelete (row) {
      console.log(row)
      this.$confirm(`此操作将永久删除id为${row.goods_id}该文件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods(row.goods_id).then(res => {
          console.log(res)
          if (res.meta.status === 200) {
            this.init()
            this.$message({
              type: 'success',
              message: '删除成功!'
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
    // 条数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    // 页数
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    },

    // 搜索
    searchGoods () {
      this.init()
    },
    init () {
      goodsList({
        query: this.selectKey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.ListData = res.data.goods
          this.total = res.data.total
        }
      })
    }
  },

  mounted () {
    this.init()
  }
}
</script>
<style lang='scss' scoped>
.box {
  margin: 20px 20px 0;
  // height:480px;

  .user {
    margin-bottom: 10px;
    .search-input {
      width: 300px;
    }
  }
}
</style>
