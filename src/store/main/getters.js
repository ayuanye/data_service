export default {
  menuRoutes (state) {
    return state.menuRoutes
  },
  role (state) {
    return state.userInfo.role
  },
  userInfo (state) {
    return state.userInfo
  },
  isZh (state) {
    return state.isZh
  },
  routeTagNames (state) {
    return state.routeTagNames
  },
  menuOpenNames (state) {
    return state.menuOpenNames
  },
  leftMenuTrigger (state) {
    return state.leftMenuTrigger
  },
  showLeftMenu (state) {
    return state.showLeftMenu
  },
  isLeftMenuHover (state) {
    return state.isLeftMenuHover
  }
}
