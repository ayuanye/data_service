import Vue from 'vue'
import Router from 'vue-router'
import { basicRouters, syncRouters, asyncRouters } from './index'
import { setMenuOpenNames } from '@/utils/tools'
import config from '@/utils/config'
import store from '@/store'

Vue.use(Router)

let routes = [...basicRouters, ...syncRouters, ...asyncRouters]
const router = new Router({
  routes,
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
let routesTagNames = JSON.parse(localStorage.getItem('routesTagNames'))
// 初始化左侧导航栏的openNames 方便获取叶子节点与父节点的联系
store.dispatch('setMenuOpenNames', setMenuOpenNames(syncRouters[0].children))
// 将路由地址转化成左侧菜单需要的格式
store.dispatch('setMenuRoutes', syncRouters)
// 独立于左侧导航栏之外的路由
store.dispatch('setOutSideLeftMenuRouters', config.outSideLeftMenuRouters)
if (userInfo) {
  store.dispatch('setUserInfo', userInfo)
}
if (routesTagNames) {
  store.dispatch('setRouteTagNames', routesTagNames)
}

router.beforeEach((to, from, next) => {
  if (store.state.main.outSideLeftMenuRouters.indexOf(to.name) !== -1) {
    store.dispatch('setShowLeftMenu', false)
  } else {
    store.dispatch('setShowLeftMenu', true)
  }
  // if (to.meta.permissions && to.meta.permissions.indexOf(store.state.main.userInfo.role) === -1) {
  //   next({
  //     name: 'nopermission'
  //   })
  // }
  next()
  // isPopState = false
})

router.afterEach(to => {
})

// 针对浏览器后退的事件处理
// window.addEventListener('popstate', function (ev) {
//   isPopState = true
// })
export default router
