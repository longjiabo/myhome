<template>
  <div class="app">
    <transition enter-active-class="animated zoomIn" >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {}
    },
  }
</script>

<style>
  @media screen and (min-width: 768px) {
    .app {
      overflow-y: hidden;
      height: 100%;
      background: url("https://www.longjiabo.com/image/bw6sA_EYF3Hl4qOHMISjVY1PYhs=/e96f3cf91c124db29bc8a43e2009605d") no-repeat center;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
    }
    .icon {
      color: white;
      font-size: 40px;
    }

  }

  @media screen and (max-width: 768px) {
    .app {
      height: 100%;
      background: url("https://www.longjiabo.com/image/6Ul-MxATXc_f6wfZdjuQtDMg_Do=/cbfda53dde154d5bb9a1ed057f0ce012") no-repeat center;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
    }
    .icon {
      color: white;
      font-size: 30px;
    }

  }
  .item {
    color: white;
    font-weight: 400;
    display: flex; /*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items: center; /*指定垂直居中*/
    justify-content: center;
    margin: 5px 5px;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    transition: background 0.5s;
  }

  .item:hover {
    background: none;
    /*background: linear-gradient(to right, #ff0000, #2c3e50);*/
    background-color: #5daf34;
  }

</style>
