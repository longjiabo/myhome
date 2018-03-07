<template>
  <el-container style="height: 100%">
    <el-main class="index" >
      <!--<el-row>-->
      <!--<el-col :span="24"><h1 style="font-size: 40px;color: #ffffff;">{{title}}</h1></el-col>-->
      <!--</el-row>-->
      <transition enter-active-class="animated zoomIn" >
        <router-view></router-view>
      </transition>
    </el-main>
    <el-footer>
      <el-row type="flex" align="bottom" justify="center" style="height: 100%">
        <el-col :xs="6" :span="6" v-for="item in items" :key="item.name">
          <router-link :to="item.url">
            <div class="item">
              <i class="icon" :class="item.icon"></i>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        title: '小小球',
        items: [
          {
            name: 'home',
            url: "/",
            icon: "el-icon-menu",
          },
          {
            name: '照片',
            url: "/albums",
            icon: 'el-icon-picture',
          },
          {
            name: "代码",
            url: "/code",
            icon: "el-icon-edit-outline",
          }, {
            name: "admin",
            url: "/admin",
            icon: "el-icon-share",
          }
        ]
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .border {
    box-shadow: 0px 0px 4px white;
  }
  .index{
    height: 100%;
  }


</style>
