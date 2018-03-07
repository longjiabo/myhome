/**
 * Created by longjiabo on 2017/12/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: null,
    window:{}
  },
  getters: {
    isLogin(state){
      return state.user
    },
    window(state){
      return state.window
    }
  },
  mutations: {
    setUser(state, response){
      state.user = response.body;
    },
    setWindow(state,obj){
      Object.assign(state.window,obj)
    }
  },
  actions: {
    setWindowInfo(context,obj){
      context.commit("setWindow",obj)
    },
    getUser(context){
      return new Promise((resolve, reject) => {
        Vue.http.get("users/current").then((response) => {
          context.commit("setUser", response)
          resolve()
        }, (response) => {
          reject()
        })
      })

    },
  }
})
