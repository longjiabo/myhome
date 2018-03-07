<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          上传照片
        </div>
        <el-row>
          <el-col :span="24">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="选择相册">
                <el-select v-model="form.albumId" placeholder="请选择">
                  <el-option
                    v-for="item in albums"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择照片">
                <el-upload
                  :multiple="true"
                  :auto-upload="false"
                  :action="uploadUrl"
                  ref="upload"
                  :data="form"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                </el-button>
              </el-form-item>

              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        uploadUrl: "myhome/photos",
        //uploadUrl: "http://localhost:8081/photos",
        albums: [],
        dialogImageUrl: '',
        dialogVisible: false,
        form: {
          albumId: null,
        },

      };
    },
    mounted(){
      this.$http.get("albums").then((response) => {
        this.albums = response.body
      })
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
