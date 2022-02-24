import Vue from 'vue'
import Vuex from 'vuex'
import router from "./router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  
  },
  mutations: {
  
  },
  actions: {
    logout(notReload) {
      localStorage.removeItem('demo-token')
      if (location.href.indexOf('/login') < 0) {
        location.reload()
        router.push('/login')
      } else if (!notReload) {
        location.reload()
      }
    }
  },
  modules: {
  }
})
