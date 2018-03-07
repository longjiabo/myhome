// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue2-animate/dist/vue2-animate.min.css';
import store from './store'
import 'animate.css'
import VueImg from 'v-img';
Vue.use(VueImg)
//Vue.use(Message)
//Vue.use(MessageBox)
Vue.use(ElementUI)
Vue.use(VueResource);

Vue.http.options.crossOrigin = true
Vue.http.options.root = '/myhome/';
//Vue.http.options.root = 'http://localhost:8081/';
Vue.http.interceptors.push(function (request, next) {

  // continue to next interceptor
  next(function (response) {
    if (response.status === 401) {
      router.push("/login")
    }
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  store,
  created(){
    if (router.currentRoute.path.startsWith("/admin")) {
      store.dispatch("getUser").then(() => {
      }, () => {
        router.push("/login")
      })
    }
    const info = {
      clientHeight: document.documentElement.clientHeight,
      clientWidth: document.documentElement.clientWidth
    }
    //小屏幕
    if (info.clientWidth < 768) {
      info.imgHeight = 100
      info.imgWidth = 100
      info.isPhone = true
    } else {
      info.imgWidth = 200
      info.imgHeight = 200
      info.isPhone = false
    }
    store.dispatch("setWindowInfo", info)
  }


})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith("/admin")) {
    if (store.state.isLogin) {
      next()
    } else {
      store.dispatch("getUser").then(() => {
        next()
      }, () => {
        router.push("/login")
      })
    }
  }
  next()

})
