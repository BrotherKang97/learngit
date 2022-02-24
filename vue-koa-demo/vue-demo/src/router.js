import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//防止路由指向仍是当前页面而报错的问题
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routesMap = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "*",
    redirect: "/blank",
  },
  {
    path: "/blank",
    name: 'blank',
    component: () => import("./views/blank.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./views/main.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('./views/levelOne/index'),
      },
      {
        path: '/door',
        name: 'door',
        component: () => import('./views/levelOne/door'),
      },
      {
        path: '/waiting',
        name: 'waiting',
        component: () => import('./views/levelOne/waiting'),
      },
      {
        path: '/shop',
        name: 'shop',
        component: () => import('./views/levelOne/shop'),
      },
      {
        path: '/dataStatistics',
        name: 'dataStatistics',
        component: () => import('./views/levelOne/dataStatistics'),
      },
    ]
  },
]

const router = new VueRouter({
  routes: routesMap
})

//导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('demo-token')
  if (to.path === '/login') { // 如果是跳转到登录页的
    if (token !== 'null' && token !== null) {
      next('/index') // 如果有token就转向主页,不返回登录页
    }
    next() // 否则跳转回登录页
  } else {
    if (token !== 'null' && token !== null) {
      //当请求除了有关登录的接口之外，后端必须要验证前端发送的请求头里是否带了正确的token，才能予以返回请求结果
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token // 注意Bearer后有个空格
      next() // 如果有token就正常转向
    } else {
      next('/login') // 否则跳转回登录页
    }
  }
})

export default router
