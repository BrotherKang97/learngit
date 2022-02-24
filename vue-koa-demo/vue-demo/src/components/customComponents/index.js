//import Vue from 'vue'
import akTable from "./akTable"

/*直接使用的组件（注册为全局Vue组件）*/
const components = {
  akTable
}


const install = function (Vue, opts = {}) {
  if (install.installed) {
    return
  }
  
  if (!Vue) {
    console.error('库安装失败，未获取到Vue对象')
    return
  }
  
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install: install, ...components
}
