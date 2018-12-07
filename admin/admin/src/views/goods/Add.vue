<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-steps
        :active="active-0"
        finish-status="success"
        style="width: 80%;"
      >
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
        <el-step title="步骤 5"></el-step>
      </el-steps>
      <el-tabs
        :tab-position="tabPosition"
        style="height: 300px;"
        v-model="active"
      >
        <el-tab-pane
          label="基本信息"
          name='0'
        >
          <el-form
            :model="addForm"
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
            style="width:600px"
          >
            <el-form-item
              label="商品名称"
              prop="goods_name"
              controls-position="right"
            >
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              prop="goods_price"
            >
              <el-input
                v-model="addForm.goods_price"
                type='number'
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品重量"
              prop="goods_weight"
            >

              <el-input
                v-model="addForm.goods_weight"
                type='number'
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="goods_number"
            >
              <el-input
                v-model="addForm.goods_number"
                type='number'
              ></el-input>

            </el-form-item>
            <div class="block">

              <el-cascader
                :options="setectForm"
                v-model="selectedOptions"
                @change="handleChange"
                :props="props"
              >
              </el-cascader>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="商品参数"
          name='1'
        >配置管理</el-tab-pane>
        <el-tab-pane
          label="商品属性"
          name='2'
        >角色管理</el-tab-pane>
        <el-tab-pane
          label="商品图片"
          name='3'
        >
          <div class="pricturebox">
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload='handbeforeUpload'
              :on-success='handsuccess'
              :file-list="fileList2"
              :headers='setToken()'
              list-type="picture"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
                v-if="show"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="商品内容"
          name='4'
        >
          <div class="add-goods">
            <el-tabs
              tab-position="left"
              class="mt-20"
            >
              <el-tab-pane
                label="商品内容"
                name="fifth"
              >
                <quill-editor
                  v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                >
                </quill-editor>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="success"
        round
        class="btn"
        @click="success"
      >成功按钮</el-button>
    </el-card>
    <el-dialog
      title="图片预览"
      :visible.sync="fileTableVisible"
    >
      <img
        :src="imgUrl"
        alt=""
        class="pricture"
      >
    </el-dialog>
  </div>
</template>
<script>
import { getGoodsList, addCategoods } from '@/api'
export default {
  data () {
    return {
      content: null,
      editorOption: {
      },
      fileTableVisible: false,
      show: false,
      imgUrl: '',
      fileList2: [],
      selectedOptions: [],
      setectForm: [],
      props: {
        value: 'cat_id',
        children: 'children',
        label: 'cat_name'
      },
      tabPosition: 'left',
      active: '0',

      addForm: {
        goods_number: 0,
        goods_weight: 1,
        goods_name: '',
        goods_price: 1,
        goods_cat: '',
        pics: []
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名字', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    getGoodsList(3).then(res => {
      // console.log(res)
      if (res.meta.status === 200) {
        this.setectForm = res.data
      }
    })
  },
  methods: {
    // 下拉框的选择事件
    handleChange (value) {
      //   console.log(1111)
      // console.log(value)
      this.selectedOptions = value
      this.addForm.goods_cat = value.join(',')
    },
    setToken () {
      var token = localStorage.getItem('userToken')
      return { Authorization: token }
    },
    // 上传之前要先获取token。因为上传照片不是axios的，是组件的异步事件

    // 照片删除的函数
    handleRemove (file, fileList) {
      // console.log(file, fileList)
      var filePath = 'http://localhost:8888/' + file.response.data.tmp_path
      var index = this.addForm.pics.findIndex(val => {
        // console.log(val)
        return val.pic.indexOf(filePath) !== -1
      })
      console.log(index)
      this.addForm.pics.splice(index, 1)
      console.log(fileList)
    },
    // 照片预览的函数
    handlePreview (file) {
      // console.log(file)
      this.fileTableVisible = true
      this.imgUrl = 'http://localhost:8888/' + file.response.data.tmp_path
      // console.log(this.imgUrl)
    },
    // 上传之前判断图片的大小，要是超出就直接return的函数
    handbeforeUpload (file) {
      // console.log(file)
      if (file.size > 500 * 1024) {
        this.$message.warning('照片太大无法上传')
        this.show = true
        return false
      } else {
        this.show = false
      }
    },
    // 上传成功的函数
    handsuccess (response, file, fileList) {
      // console.log(response)
      // 照片上传成功的路径response。tep_path
      var fileUrl = response.data.tmp_path
      // console.log(fileUrl)

      this.addForm.pics.push({ pic: fileUrl })
      // console.log(this.addForm)
    },

    // 添加商品
    success () {
      addCategoods(this.addForm).then(res => {
        console.log(res)
        if (res.meta.status === 201) {
          this.$router.push({ name: 'List' })
          this.$message.success('添加商品成功')
        }
      })
    },
    // 富文本框的函数
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  margin: 20px 20px 0;
  .btn {
    float: right;
    margin-bottom: 10px;
  }
  .pricturebox {
    overflow: auto;
    height: 280px;
  }
  .pricture {
    width: 400px;
    display: block;
    margin: 5px auto;
  }
}
</style>
