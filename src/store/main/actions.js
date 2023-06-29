import { setMenuRoutes } from '@/utils/tools'
export default {
  setMenuRoutes (context, routes) {
    let menuRoutes = setMenuRoutes(routes)
    context.commit('setMenuRoutes', menuRoutes)
  },
  setUserInfo (context, info) {
    localStorage.setItem('userInfo', JSON.stringify(info))
    context.commit('setUserInfo', info)
  },
  setIsZh (context, isZh) {
    context.commit('setIsZh', isZh)
  },
  setRouteTagNames (context, tagNames) {
    localStorage.setItem('routesTagNames', JSON.stringify(tagNames))
    context.commit('setRouteTagNames', tagNames)
  },
  setMenuOpenNames (context, openNames) {
    context.commit('setMenuOpenNames', openNames)
  },
  setLeftMenuTrigger (context, bool) {
    context.commit('setLeftMenuTrigger', bool)
  },
  setShowLeftMenu (context, bool) {
    context.commit('setShowLeftMenu', bool)
  },
  setOutSideLeftMenuRouters (context, menus) {
    context.commit('setOutSideLeftMenuRouters', menus)
  },
  setIsLeftMenuHover (context, bool) {
    context.commit('setIsLeftMenuHover', bool)
  },
  setProjectId (context,info) {
    context.commit('setProjectId', info)
  }
   
}

