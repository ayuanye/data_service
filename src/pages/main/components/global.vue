<template>
  <div class="icon-wrapper" @mouseenter="handleDropDown(true)" @mouseleave="handleDropDown(false)">
    <Icon type="ios-globe-outline" :size="iconSize" />
    <div class="dropdown" ref="dropdown" v-show="showDropdown" :style="{ 'opacity': dropDownOpacity, 'transform': rotateX }">
      <ul>
        <li @click="selectLanguage(1)">
          <span :class="{'name': true, active: isZh}">简体中文</span>
        </li>
        <li @click="selectLanguage(2)">
          <span :class="{'name': true, active: !isZh}">English</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { debounce } from '@/utils/tools'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['iconSize'],
  data () {
    return {
      showDropdown: true,
      dropDownOpacity: 0,
      rotateX: 'rotateX(90deg)'
    }
  },
  computed: {
    ...mapGetters(['isZh'])
  },
  mounted () {
    this.$refs.dropdown.addEventListener('transitionend', () => {
      if (!this.showDropdown) {
        this.showDropdown = !this.showDropdown
      }
    })
  },
  methods: {
    ...mapActions(['setIsZh']),
    selectLanguage (sign) {
      if (sign === 1) {
        this.setIsZh(true)
        this.$i18n.locale = 'zh'
      } else if (sign === 2) {
        this.setIsZh(false)
        this.$i18n.locale = 'en'
      }
    },
    handleDropDown: debounce(function (val) {
      if (val) {
        this.showDropdown = val
        this.dropDownOpacity = 1
        this.rotateX = 'rotateX(0)'
      } else {
        this.dropDownOpacity = 0
        this.rotateX = 'rotateX(90deg)'
      }
    }, 300)
  }
}
</script>
<style lang="stylus" scoped>
  .icon-wrapper
    position relative
    height 100%
    cursor pointer
    display flex
    justify-content flex-start
    align-items center
    padding 0 10px
    &:hover
      background-color #eee
    .dropdown
      width 110px
      position absolute
      top 70px
      right 0
      background-color white
      border-radius 2px
      box-shadow 0 0 5px #ccc
      transition .5s
      z-index 99
      transform-origin top center
      li
        height 30px
        padding 20px 10px
        display flex
        justify-content flex-start
        align-items center
        cursor pointer
        &:hover
          background-color #eee
        .name
          margin-left 10px
        .name.active
          color #2d8cf0
</style>
