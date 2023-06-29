<template>
  <div class="menu-wrapper">
    <Menu
      width="auto"
      :active-name="activeName"
      class="menu-hei"
      :open-names="openName"
      ref="menu"
      theme="dark"
      :accordion="isAccordion"
      @on-select="menuSelect"
      @on-open-change="onOpenChange"
    >
      <div class="logo">
        <!-- <img v-show="isCollapsed" class="logo-shrink" :src="stretchImg" alt="" /> -->
        <!-- <img v-show="isCollapsed" class="logo-stretch" :src="stretchImg" alt="" /> -->
        <img v-show="isCollapsed" class="logo-stretch" src="../../assets/images/log.png" alt="" />
        <div style="color:aliceblue;font-weight:bold;font-size:30px;" v-show="!isCollapsed">
          <span >质控系统</span>
        </div>
        <!-- <img v-show="isCollapsed" class="" :src="stretchImg" alt="" /> -->
      </div>
      <div class="icon-wrapper menu-coll" @click="collapsedSider">
        <Icon class="menu-icon" type="md-menu" :size="18"></Icon>
      </div>
      <div class="icon-wrapper menu-show" @click="showMenu">
        <Icon class="menu-icon" type="md-menu" :size="18"></Icon>
      </div>
      <template v-for="item in menuRoutes">
        <r-singleMenu :key="item.name" :menu="item" :isCollapsed="isCollapsed">
        </r-singleMenu>
      </template>
    </Menu>
  </div>
</template>
<script>
import { Menu } from 'view-design'
import singleMenu from './components/singleMenu'
import { mapGetters, mapActions } from 'vuex'
import config from '@/utils/config'
export default {
  props: ['isCollapsed'],
  components: {
    Menu,
    'r-singleMenu': singleMenu
  },
  computed: {
    ...mapGetters(['menuRoutes', 'routeTagNames', 'menuOpenNames'])
  },
  watch: {
    '$route': {
      immediate: true,
      handler (to, from) {
        this.activeName = to.name
        let menus = []
        if (this.isAccordion) {
          menus = this.menuOpenNames[to.name]
        } else {
          menus = Array.from(new Set([...(this.menuOpenNames[to.name] || []), ...this.openNames]))
          this.openNames = menus
        }
        this.openName = menus
        if (this.isCollapsed) {
          this.name = this.activeName
          this.openNames = this.openName
          return 
        }
        this.$nextTick(() => {
          this.$refs.menu.updateOpened()
          this.$refs.menu.updateActiveName()
        })
      }
    },
    isCollapsed (val) {
      if (val) {
        this.openName = []
        // this.activeName = ''
      } else {
        this.activeName = this.name
        this.openName = this.openNames
      }
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
        this.$refs.menu.updateActiveName()
      })
    }
  },
  data () {
    return {
      stretchImg: config.stretchLogoUrl,
      shrinkImg: config.shrinkLogoUrl,
      miniMenuTop: '0',
      openName: [],
      activeName: '',
      name: '',
      openNames: [],
      isAccordion: false
    }
  },
  methods: {
    ...mapActions(['setRouteTagNames', 'setShowLeftMenu']),
    collapsedSider () {
      this.$emit('sideRotate')
    },
    showMenu () {
      this.setShowLeftMenu(false)
    },
    menuSelect (name) {
      this.name = name
      if (this.$route.name !== name) {
        this.$router.push({
          name: name
        })
      }
    },
    showMiniMenu (ev) {
      if (this.isCollapsed) {
        console.log(ev,'+++++++++++++')
      }
    },
    onOpenChange (val) {
      this.openNames = val
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './styl/mixins.styl'
@media screen and (max-width: 1000px) {
  .menu-show{
    display: flex !important;
  }
  .menu-coll{
    display: none !important;
  }
}
.menu-wrapper
  height 100%
  overflow-y auto
  &::-webkit-scrollbar
    display none
// .menu-wrapper /deep/ .ivu-menu-light
//   background #1d1e23
.menu-hei
  min-height 100%
  .icon-wrapper
    width 100%
    height 40px
    display flex
    justify-content center
    align-items center
    border-top 1px solid #3a3b44
    border-bottom 1px solid #3a3b44
    cursor pointer
    color white
    &:hover
      background-color #2d8cf0
  .menu-show
    display none
.logo
  height 64px
  display flex
  justify-content center
  align-items center
  .logo-stretch
    width 60%
  .logo-shrink
    height 60%

</style>
