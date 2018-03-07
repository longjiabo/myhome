<template>
  <el-row >
    <el-col v-for="item in items" :key="item.id" :xs="24" :sm="24" :md="8" :lg="6">
      <router-link :to="'albums/'+item.id">
        <el-card style="margin:5px 5px">
          <img :src="item.image" class="image">
          <div style="padding: 14px;">
            <span>{{item.description}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.createdOn }}</time>
            </div>
          </div>
        </el-card>
      </router-link>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        items: []
      };
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData: function () {
        var _this = this
        this.$http.get("albums").then((response) => {
          _this.items = response.body
        }, (response) => {
          this.$message.error('无法获取相册，请稍后再试');
        })
      }
    }
  }
</script>
<style scoped>
  .image {
    width: 100%;
    display: block;
  }

  .album {
    cursor: pointer;
    transition: background-color 0.5s;
    border: 1px solid white;
    height: 200px;
    font-size: 40px;
    text-align: center;
    line-height: 200px;
    display: block;
  }

  .album:hover {
    background-color: #5daf34;
    color: white;
  }

</style>
