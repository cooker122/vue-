<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格内容 -->
    <el-table
      :data="rolesList"
      border
      style="width: 100%"
    >
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="authName"
        label="权限"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>

      <el-table-column
        prop= "level"
        label="层级"
        width="80"
      >
      <template
      slot-scope="slotProps"
      >
        <span>{{slotProps.row.level | levels}}</span>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {rightsList} from '@/api'
export default {
  data () {
    return {

      rolesList: []
    }
  },

  mounted () {
    rightsList('list').then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.rolesList = res.data
      }
    })
  },
  filters: {
    levels: function (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    } },
  methods: {
    // init () {

    // }
  }

}

</script>
<style>
.box{
    margin: 20px 20px 0;

}
</style>
