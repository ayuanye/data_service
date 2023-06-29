<template>
  <div :class="[menuitemClasses, 'menu-con']" v-show="isPermission">
    <template v-if="menu.children && menu.children.length">
      <Submenu :name="menu.name" :key="menu.name">
        <template slot="title" v-if="menu.meta.icon">
          <r-cover :isCollapsed="isCollapsed" :menu="menu" :key="menu.name"/>
          <!-- <Icon :type="menu.meta.icon"/> -->
          <i :class="['iconfont', menu.meta.icon]"></i>
          <span>
            <!-- {{menu.meta.name}} -->
            {{$t('main.' + menu.meta.globalName)}}
            </span>
        </template>
        <template slot="title" v-else>
          <!-- {{menu.meta.name}} -->
          {{$t('main.' + menu.meta.globalName)}}
        </template>
        <template v-for="item in menu.children">
          <singleMenu :menu="item" :isCollapsed="isCollapsed" :key="item.name"/>
        </template>
      </Submenu>
    </template>
    <template v-else>
      <MenuItem :name="menu.name">
        <r-cover :isCollapsed="isCollapsed" :menu="menu" :key="menu.name"/>
        <!-- <Icon :type="menu.meta.icon" v-if="menu.meta.icon"/> -->
        <i :class="['iconfont', menu.meta.icon]" v-if="menu.meta.icon"></i>
        <span>
          <!-- {{menu.meta.name}} -->
          {{$t('main.' + menu.meta.globalName)}}
          </span>
      </MenuItem>
    </template>
  </div>
</template>
<script>
import { MenuItem, Submenu } from 'view-design'
import { mapGetters } from 'vuex'
import cover from './cover'
export default {
  components: {
    Submenu,
    MenuItem,
    'r-cover': cover
  },
  name: 'singleMenu',
  props: ['menu', 'isCollapsed'],
  computed: {
    isPermission () {
      return this.menu.meta.permissions.indexOf(this.role) !== -1
    },
    menuitemClasses () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    ...mapGetters(['role'])
  }
}
</script>
<style lang="stylus" scoped>
.menu-icon
  transition all .3s
.rotate-icon
  transform rotate(-90deg)
.menu-item span
  display inline-block
  overflow hidden
  width 150px
  text-overflow ellipsis
  white-space nowrap
  vertical-align bottom
  transition width .2s ease .2s
.menu-item i
  transform translateX(0px)
  transition font-size .2s ease, transform .2s ease
  vertical-align middle
  font-size 16px
.collapsed-menu span
  width 0px
  transition width .2s ease
.collapsed-menu i
  transform translateX(5px)
  transition font-size .2s ease .2s, transform .2s ease .2s
  vertical-align middle
  font-size 22px
.collapsed-menu
  /deep/ .ivu-menu-submenu-title-icon
    opacity 0
.menu-con
  position relative
</style>
