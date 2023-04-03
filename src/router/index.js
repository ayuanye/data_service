import store from '@/store'
import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '../views/layout/layout.vue'
import Layout from '@/components/main'

Vue.use(Router)


export const constantRouterMap = [
  {
    name:'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    redirect: '/home',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]


export const asyncRouterMap = [
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },

    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]
// 防止连续点击多次路由报错

let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
export default new Router({
  // mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({y: 0}),
  routes:constantRouterMap
})



// // 如果用户在path，且没有登录，自动跳转至登录
// routerPush.beforeEach((to,form,next) =>{
//   const path = to.path
//   if(paths.indexof(path)!==-1 && !store.state.user.token){
//     next('/login')
//   }else{
//     next()
//   }
// })
