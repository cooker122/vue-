<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
      @click="addRole"
    >添加分类</el-button>
    <!-- 自定义树状图 -->
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
   <!-- 添加模板 -->
    <el-dialog title="添加分类" :visible.sync="addFormVisible" label-width="100px" >
  <el-form :model="addform">
    <el-form-item label="分类名称" width="150">
      <el-input v-model="addform.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    <div class="block">
     <el-cascader
    :options="options"
    v-model="selectedOptions"
    @change="handleChange"
    :props='props'>
  </el-cascader>
    </div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCategories(addform)">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import {getGoodsList, addCategories, deleteCategories} from '@/api'
export default {

  data () {
    return {
      addFormVisible: false,
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }
      ],
      dataSource: [],
      addform: {
        cat_name: '',
        cat_pid: '',
        cat_level: ''
      },
      options: [],
      selectedOptions: [],
      props:
        {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        }

    }
  },
  components: {
    TreeGrid
  },
  methods: {
    // 下拉框的选择事件
    handleChange (val) {
      console.log(val)
      if (val.length === 0) {
        this.addform.cat_level = 0
      } else if (val.length === 1) {
        this.addform.cat_level = 1
      } else if (val.length === 2) {
        this.addform.cat_level = 2
      }
      this.addform.cat_pid = val[0]
      console.log(this.addform.cat_pid)
    },
    // 确定添加的函数
    addCategories () {
      // console.log(this.addform)
      addCategories(this.addform).then(res => {
        // console.log(res)
        if (res.meta.status === 201) {
          this.addFormVisible = false
          this.init(3)
        }
      })
    },
    // 封装函数
    init (type) {
      getGoodsList(type).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.dataSource = res.data
        }
      })
    },
    addRole () {
      getGoodsList(2).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.options = res.data
          this.addFormVisible = true
        }
      })
    },
    // 节点关闭时的触发函数
    deleteCategory (cid) {
      console.log(cid)
      this.$confirm(`此操作将永久删除id为${cid}该文件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategories(cid).then(res => {
          console.log(res)
          this.init(3)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editCategory (cid) {
      console.log(cid)
    }
  },
  mounted () {
    this.init(3)
  }
}
</script>
<style lang="scss" scpoed>
.box {
  margin: 20px 20px 0;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
