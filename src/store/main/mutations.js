export default {
  setMenuRoutes (state, routes) {
    state.menuRoutes = routes
  },
  setUserInfo (state, info) {
    state.userInfo = info
  },
  setIsZh (state, isZh) {
    state.isZh = isZh
  },
  setRouteTagNames (state, tagNames) {
    state.routeTagNames = tagNames
  },
  setMenuOpenNames (state, openNames) {
    state.menuOpenNames = openNames
  },
  setLeftMenuTrigger (state, bool) {
    state.leftMenuTrigger = bool
  },
  setShowLeftMenu (state, bool) {
    state.showLeftMenu = bool
  },
  setOutSideLeftMenuRouters (state, menus) {
    state.outSideLeftMenuRouters = menus
  },
  setIsLeftMenuHover (state, bool) {
    state.isLeftMenuHover = bool
  },
  setProjectId (state,info) {
    state.setProjectId = info
  }
}
