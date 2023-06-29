<template>
  <div
    class="cover"
    v-show="isCollapsed"
    @mouseenter="iconHover($event, true)"
    @mouseleave="iconHover($event, false)"
    @click="stopProp($event)"
  >
    <r-miniMenu
    ref="miniref"
    :left="miniLeft"
    :dropDownOpacity="dropDownOpacity"
    :rotateX="rotateX"
    :menu="menu"/>
  </div>
</template>
<script>
import miniMenu from './miniMenu'
import { debounce } from '@/utils/tools'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    'r-miniMenu': miniMenu
  },
  data () {
    return {
      name: false,
      miniLeft: '80px',
      dropDownOpacity: '0',
      rotateX: 'rotateX(90deg)'
    }
  },
  computed: {
    ...mapGetters(['leftMenuTrigger', 'isLeftMenuHover'])
  },
  watch: {
    leftMenuTrigger (val) {
      this.closeMiniMenu()
    }
  },
  props: ['isCollapsed', 'menu'],
  methods: {
    ...mapActions(['setLeftMenuTrigger', 'setIsLeftMenuHover']),
    iconHover: debounce(function (ev, val) {
      this.setLeftMenuTrigger(!this.leftMenuTrigger)
      if (val) {
        this.setIsLeftMenuHover(!this.isLeftMenuHover)
        this.$nextTick(() => {
          this.dropDownOpacity = 1
          this.rotateX = 'rotateX(0)'
          this.miniLeft = ev.target.offsetWidth + 2 + 'px'
        })
      } else {
        this.$refs.miniref.handleMiniHover(-1)
        this.closeMiniMenu()
      }
    }, 300),
    closeMiniMenu () {
      this.dropDownOpacity = 0
      this.rotateX = 'rotateX(90deg)'
    },
    stopProp (ev) {
      if (this.menu.children) {
        ev.stopPropagation()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .cover
    z-index 9
    cursor pointer
    position absolute
    left 0
    top 0
    bottom 0
    right 0
</style>
