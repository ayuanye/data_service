<template>
  <div class="layout-header-bar">
    <div class="header-left">
      <div class="icon-wrapper menu-coll" @click="collapsedSider" v-show="showLeftMenu">
        <Icon :class="rotateIcon" type="md-menu" :size="iconSize"></Icon>
      </div>
      <div class="icon-wrapper menu-show" @click="showMenu">
        <Icon :class="rotateIcon" type="md-menu" :size="iconSize"></Icon>
      </div>
      <div class="icon-wrapper" @click="refresh">
        <Icon type="ios-refresh" :size="iconSize" class="refresh" />
      </div>
      <div class="header-center">{{$t('title')}}</div>
      <r-breadcrumb class="breadcrumb computer-show" style="margin-left: 40px;"/>
    </div>
    <div class="header-right">
<!--      <Tooltip :content="logExc" placement="bottom">-->
<!--        <div class="icon-wrapper computer-show" style="height: 64px;">-->
<!--          <Icon type="ios-information-circle-outline" :size="iconSize" />-->
<!--        </div>-->
<!--      </Tooltip>-->
      <r-rightMenu/>
      <div class="icon-wrapper computer-show" @click="changeScreen">
        <Icon type="md-qr-scanner" :size="iconSize" v-show="!isFullScreen" />
        <Icon :size="iconSize" type="md-contract" v-show="isFullScreen" />
      </div>
<!--      <div class="icon-wrapper computer-show">-->
<!--        <Badge :count="3" class="badge">-->
<!--        </Badge>-->
<!--        <Icon :size="iconSize" type="ios-notifications-outline" />-->
<!--      </div>-->
      <r-userInfo />
      <div @click="logout" class="logout">
        <Icon type="ios-log-in" :size="16" style="margin-right: 5px;"/>
        <span class="name">{{$t('nav.logout')}}</span>
       
      </div>
      <!-- <r-global :iconSize="iconSize"/> -->
<!--      <div class="icon-wrapper computer-show">-->
<!--        <Icon type="md-more" :size="iconSize" />-->
<!--      </div>-->
    </div>
  
  </div>
</template>
<script>
import userInfo from './userInfo'
import breadcrumb from './components/breadcrumb'
import rightMenu from './components/rightMenu.vue'
import { fullScreen, exitFullScreen } from '@/utils/tools'
import { Badge, Tooltip } from 'view-design'
import global from './components/global'
import { mapGetters, mapActions } from 'vuex'
import { logout } from '@/services/headNav'

export default {
  props: ['isCollapsed'],
  data () {
    return {
      iconSize: '24',
      isFullScreen: false,
      modal1:false
    }
  },
  components: {
    'r-global': global,
    Tooltip,
    Badge,
    'r-breadcrumb': breadcrumb,
    'r-userInfo': userInfo,
    'r-rightMenu':rightMenu
  },
  computed: {
    rotateIcon () {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    logExc () {
      return this.$t('nav.logInfo')
    },
    ...mapGetters(['showLeftMenu','userInfo'])
  },
  watch: {
    isFullScreen (val) {
      if (val) {
        fullScreen()
      } else {
        exitFullScreen()
      }
    }
  },
  methods: {
    ...mapActions(['setShowLeftMenu']),
    refresh () {
      window.location.reload()
    },
    collapsedSider () {
      this.$emit('sideRotate')
    },
    changeScreen () {
      this.isFullScreen = !this.isFullScreen
    },
    showMenu () {
      this.setShowLeftMenu(true)
    },

    logout() {
      this.$Modal.confirm({
          title: "确认退出登陆吗？",//标题
          onOk: () => {
            logout().then(
              res => {
                if(res.code == 10000){
                  	//点击确认的方法
                  this.$router.push({
                     name: 'login'
                  })
                  localStorage.removeItem('appId')
                  localStorage.removeItem('userInfo')
                  localStorage.removeItem('userTempId_key')
                  localStorage.removeItem('routesTagNames')
                  localStorage.removeItem('__DC_STAT_UUID')
                  localStorage.removeItem('loglevel:webpack-dev-server')
                  localStorage.removeItem('userTempId')
                  location.reload()
                }
              }
            )
          },
        });
      

      
    }
  }
}
</script>
<style lang="stylus" scoped>
@media screen and (max-width: 1180px) {
  .computer-show {
    display: none !important;
    background: none !important;
  }
}
@media screen and (max-width: 1000px) {
  .menu-show{
    display: flex !important;
  }
  .menu-coll{
    display: none !important;
  }
}
  .header-left
    height 100%
    display flex
    justify-content flex-start
    align-items center
    .menu-show
      display none
    i
      cursor pointer
    .breadcrumb
      margin-left 15px
    .refresh
      font-weight bold
  .header-center
    font-size 24px
    font-weight 900
    margin-left 15px
    color #2894FF
  .header-right
    height 100%
    margin-right 10px
    display flex
    justify-content flex-start
    align-items center
    .logout
      height 100%
      padding 0 10px
      cursor pointer
      display flex
      justify-content space-between
      align-items center
      &:hover
        background-color #eee
  .icon-wrapper
    position relative
    height 100%
    cursor pointer
    display flex
    justify-content flex-start
    align-items center
    padding 0 8px
    &:hover
      background-color #eee
    .badge
      position absolute
      right 0
      top 10px
  .layout-header-bar
    background white
    height 64px
    display flex
    justify-content space-between
    align-items center
    box-shadow 2px 2px 5px #ccc
  .menu-icon
    transition all .3s
  .rotate-icon
    transform rotate(-90deg)
</style>
