<template>
  <Layout style="height: 100%" class="main">
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
          <error-store :has-read="hasReadErrorPage" :count="errorCount" ></error-store>
          <header-menu :menulist="list"></header-menu>
          <language style="margin-right: 10px;" :lang="local"/>
          <header-left style="float:left;margin-right:800px;">
          </header-left>
        </header-bar>

      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <!-- <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/> -->
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <!-- <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop> -->
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import HeaderBar from './components/header-bar'
import HeaderMenu from './components/header-menu'
import HeaderLeft from './components/header-left'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
// import { mapMutations, mapActions, mapGetters } from 'vuex'
// import { getNewTagList, routeEqual } from '@/libs/util'
// import routers from '@/router/routers'
import minLogo from '@/assets/images/logo.png'
import maxLogo from '@/assets/images/logo.png'
import './main.css'
export default {
  name: 'Main',
  components: {
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    HeaderLeft,
    HeaderMenu,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      // list:[
      //   {'0':'质控系统'},
      //   {'1':'电商平台'},
      //   {'2':'动态代码覆盖率'}
      // ]
    }
  },
  computed: {
    // ...mapGetters([
    //   'errorCount'
    // ]),
    tagNavList () {
      // return this.$store.state.app.tagNavList
    },
    tagRouter () {
      // return this.$store.state.app.tagRouter
    },
    userAvatar () {
      // return this.$store.state.user.avatarImgPath
    },
    cacheList () {
    },
    menuList () {
      // return this.$store.getters.menuList
    },
    local () {
      // return this.$store.state.app.local
    },
    hasReadErrorPage () {
      // return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      // return this.$store.state.user.unreadCount
    }
  },
  methods: {
    // ...mapMutations([
    //   'setBreadCrumb',
    //   'setTagNavList',
    //   'addTag',
    //   'setLocal',
    //   'setHomeRoute',
    //   'closeTag'
    // ]),
    // ...mapActions([
    //   'handleLogin',
    //   'getUnreadMessageCount'
    // ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          // this.turnToPage(this.$config.homeName)
        } else {
          // if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          // }
        }
      }
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      // this.addTag({
      //   route: { name, query, params, meta },
      //   type: 'push'
      // })
      this.setBreadCrumb(newRoute)
      // this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    // this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    // this.addTag({
    //   route: { name, params, query, meta }
    // })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    // this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        // name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    this.getUnreadMessageCount()
  }
}
</script>
