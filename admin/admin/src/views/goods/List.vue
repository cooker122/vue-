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
      >添加商品</el-button>
    </div>
    <!-- 表格内容 -->
    <el-table
    :data="ListData"
    border
    style="width: 100%">
    <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
    <el-table-column
      prop="cat_name"
      label="商品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cat_pid"
      label="商品价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop=""
      label="商品重量">
    </el-table-column>
    <el-table-column
      prop=""
      label="创建时间">
    </el-table-column>
     <el-table-column label="操作" width="150">
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
            @click="handleDelete(scope.$index, scope.row)"
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
      :current-page="10"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    </div>
</template>
<script>
import {goodsList} from '@/api'
export default {
  data () {
    return { total: 1,
      selectKey: '',
      type: [1, 2, 3],
      pagenum: 1,
      pagesize: 10,
      ListData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
    }
  },
  mounted () {
    goodsList(this.type).then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.ListData = res.data
      }
    })
  }

}</script>
<style lang='scss' scoped>
.box{
    margin:20px 20px 0;
    .user {
  margin-bottom: 10px;
  .search-input {
    width: 300px;
  }
}
}
</style>
