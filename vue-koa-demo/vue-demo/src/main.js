import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from 'axios'
import ViewUI from 'view-design'
import "view-design/dist/styles/iview.css"
import * as echarts from 'echarts'
import install from './components/customComponents/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ViewUI)

Vue.use(install)
Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
