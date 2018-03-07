<template>
  <el-row>
    <el-col :span="24">
      <div class="images" v-viewer="options">
        <img :height="window.imgHeight+'px'"
             class="image"
             v-for="p in photos"
             :key="p.id"
             :src="p.compress" :data-source="p.origin">
        <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
      </div>
    </el-col>
    <!--<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">-->
    <!--<div :style="{height:clientHeight+'px',width:clientWidth+'px'}" @keyup.esc="closePreview" class="image-background"-->
    <!--v-show="dialogVisible">-->
    <!--<img :src="dialogImageUrl" alt="">-->
    <!--</div>-->
    <!--</transition>-->
  </el-row>
</template>
<style scoped>

  @media screen and (min-width: 768px) {
    .image {
      cursor: pointer;
      margin: 5px;
      display: inline-block;
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    .image {
      cursor: pointer;
      margin: 10px;
      display: inline-block;
      text-align: center;
    }
  }

  .images {
    vertical-align: middle;
    text-align: center;
    z-index: 9999;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
  }

  img {
    vertical-align: middle;
  }

</style>
<script>
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    components: {
      'InfiniteLoading': InfiniteLoading
    },
    props: ['id'],
    data() {
      return {
        window: this.$store.state.window,
        options: {
          "inline": false,
          "button": false,
          "navbar": true,
          "title": false,
          "toolbar": {
            zoomIn: 0,
            zoomOut: 0,
            oneToOne: 0,
            reset: 0,
            prev: {
              show: 1,
              size: "large"
            },
            play: {
              show: 1,
              size: 'large',
            },
            next: {
              show: 1,
              size: "large"
            },
            rotateLeft: 0,
            rotateRight: 0,
            flipHorizontal: 0,
            flipVertical: 0,
          },
          "tooltip": false,
          "movable": false,
          "zoomable": true,
          "rotatable": false,
          "scalable": false,
          "transition": true,
          "fullscreen": true,
          "keyboard": true,
          "loop": true,
          "interval": 1000,
          "url": "data-source"
        },
        photos: [],
        pagination: {
          size: 10,
          page: 0,
          total: -1,
          order: "order by createdOn desc"
        },
        loading: false,
      }
    },
    mounted(){

    }
    ,
    methods: {
      infiniteHandler($state){
        if (this.loading)return
        this.loading = true
        this.$http.get("photos", {
          params: Object.assign({
            'albumId': this.id,
            'imgHeight': this.$store.state.window.imgHeight,
            'imgWidth': this.$store.state.window.imgWidth,
          }, this.pagination)
        }).then((response) => {
          this.loading = false
          this.pagination.page++
          this.photos = this.photos.concat(response.body.content)
          if (this.photos.length === response.body.totalElements) {
            $state.complete()
          } else {
            $state.loaded()
          }
        }, (response) => {
          this.loading = false
          $state.complete()
        })
      }
      ,
//      preview(photo){
//        this.dialogImageUrl = photo.preview;
//        this.dialogVisible = true
//      },
//      closePreview(code){
//        if (code.keyCode === 27) {
//          this.dialogVisible = false
//        }
//
//      }

    }
  }
</script>
