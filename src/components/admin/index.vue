<template>
  <el-container style="height: 100%">
    <el-main class="index">
      <!--<el-row>-->
      <!--<el-col :span="24"><h1 style="font-size: 40px;color: #ffffff;">{{title}}</h1></el-col>-->
      <!--</el-row>-->
      <transition enter-active-class="animated zoomIn">
        <router-view></router-view>
      </transition>
    </el-main>
    <el-footer>
      <el-row type="flex" align="bottom" justify="center" style="height: 100%">
        <el-col :xs="6" :span="6">
          <router-link to="/">
            <div class="item">
              <i class="icon el-icon-menu"></i>
            </div>
          </router-link>
        </el-col>
        <el-col class="item" :xs="6" :span="6">
          <el-dropdown @command="view" trigger="click" placement="top" type="primary">
            <div >
              <i class="icon el-icon-mobile-phone"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/admin/album">相册管理</el-dropdown-item>
              <el-dropdown-item command="/admin/photo">照片上传</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        isCollapsed: this.$store.state.window.isPhone,
        newAlbum: false,
        albums: [],
        dialogImageUrl: '',
        dialogVisible: false,
        form: {
          albumId: null,
        }
      };
    },
    mounted(){
    },
    methods: {
      view(url){
          this.$router.push(url);
      }
    }
  }
</script>
<style scoped>

</style>
