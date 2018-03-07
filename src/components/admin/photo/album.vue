<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button type="primary" @click="handleCreate">新建相册</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="albums"
          style="width: 100%">
          <el-table-column
            prop="id"
            label=""
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column width="160px"
                           prop="createdOn"
                           label="创建时间">
          </el-table-column>
          <el-table-column
            prop="createdBy"
            label="创建人">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      :title="form.name"
      :visible.sync="form.visible"
      :width="form.width">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="相册名称" prop="name">
          <el-input :rules="{required: true, message: '相册名称不能为空', trigger: 'blur'}" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="相册描述" prop="description">
          <el-input :rules="{required: true, message: '相册描述不能为空', trigger: 'blur'}"
                    v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="安全等级" prop="description">
          <el-select :rules="{required: true, message: '安全等级', trigger: 'blur'}"
                    v-model="formData.security">
            <el-option label="所有人可见" value="0"></el-option>
            <el-option label="登录可见" value="1"></el-option>
            <el-option label="管理员可见" value="2"></el-option>
            <el-option label="级别3可见" value="3"></el-option>
            <el-option label="级别4可见" value="4"></el-option>
            <el-option label="级别5可见" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        albums: [],
        form: {
          visible: false,
          name: "新建/编辑",
          width: this.$store.state.window.isPhone ? "100%" : "50%"
        },
        formData: {
          name: null,
          description: null,
          security: null,
        }
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$http.get("albums").then((response) => {
          this.albums = response.body
        })
      },
      onCancel(){
        this.form.visible = false
      },
      onSubmit(){
        this.$refs["form"].validate((valid) => {
          if (valid) {
            debugger
            if (this.formData.id) {
              this.$http.put("albums", {
                id: this.formData.id,
                name: this.formData.name,
                description: this.formData.description,
                security: this.formData.security
              }).then((response) => {
                this.form.visible = false
                this.$message.success("更新成功")
                this.fetchData()
              }, (response) => {
                this.$message.error("更新失败")
              })
            } else {
              this.$http.post("albums", this.formData).then((response) => {
                this.form.visible = false
                this.$message.success("新建成功")
                this.fetchData()
              }, (response) => {
                this.$message.error("新建失败")
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleCreate(){
        this.formData = {
          name: null,
          description: null
        }
        this.form.visible = true
      },
      handleEdit(index, row){
        this.$http.get("albums/" + row.id).then((response) => {
          this.formData = response.body
          this.form.visible = true
        }, (response) => {
          this.$message.error("无法获取相册信息")
        })
      },
      handleDelete(index, row){
        this.$confirm('此操作将永久删除该相册及其照片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("albums/" + row.id).then((response) => {
            this.fetchData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        })
      }

    }
  }
</script>
