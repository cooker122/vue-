<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'Nav' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
    >添加用户</el-button>
    <!-- 表格内容 -->
    <el-table
      :data="rightData"
      style="width: 100%"
      border
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-row :gutter="24">
              <el-col :span="4">
                <el-tag
                  v-for="tag in  props.row.children"
                  :key="tag.authName"
                  closable
                  type=""
                  class="grid-content bg-purple"
                >
                  {{tag.authName}}
                </el-tag>
              </el-col>
            </el-row>
          </el-form>
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
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleShare( scope.$index,scope.row )"
            icon="el-icon-share"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import { rolesList } from '@/api'
export default {
  data () {
    return {
      rightData: [],
      rightData1: []
    }
  },
  mounted () {
    rolesList().then(res => {
      if (res.meta.status === 200) {
        console.log(res)
        this.rightData = res.data
        // this.rightData1=res.data
      }
    })
  },
  methods: {}
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
}
</style>
