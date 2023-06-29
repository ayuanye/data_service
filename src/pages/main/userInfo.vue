<template>
  <!-- <div class="info" @mouseenter="handleDropDown(true)" @mouseleave="handleDropDown(false)"> -->
  <div class="info">
    <img src="../../assets/images/avatar.jpg" alt="">
    <!-- <img :src="userInfo.avatar" alt=""> -->
    <span>{{userInfo.name}}</span>
    <div class="dropdown" ref="dropdown" v-show="showDropdown" :style="{ 'opacity': dropDownOpacity, 'transform': rotateX }">
      <ul>
        <li @click="goUserInfo">
          <Icon type="ios-contact-outline" :size="16"/>
          <span class="name">{{$t('nav.PersonalCenter')}}</span>
        </li>
        <li @click="setOptions">
          <Icon type="ios-cog-outline" :size="16"/>
          <span class="name">{{$t('nav.setUp')}}</span>
        </li>
        <li @click="logout" class="logout">
          <Icon type="ios-log-in" :size="16"/>
          <span class="name">{{$t('nav.logout')}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/tools'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    userInfo: {
      immediate: true,
      handler (val) {
      }
    }
  },
  data () {
    return {
      showDropdown: true,
      dropDownOpacity: 0,
      rotateX: 'rotateX(90deg)'
    }
  },
  mounted () {
    this.$refs.dropdown.addEventListener('transitionend', () => {
      if (!this.showDropdown) {
        this.showDropdown = !this.showDropdown
      }
    })
  },
  methods: {
    handleDropDown: debounce(function (val) {
      if (val) {
        this.showDropdown = val
        this.dropDownOpacity = 1
        this.rotateX = 'rotateX(0)'
      } else {
        this.dropDownOpacity = 0
        this.rotateX = 'rotateX(90deg)'
      }
    }, 300),
    goUserInfo () {},
    setOptions () {},
    logout () {}
  }
}
</script>
<style lang="stylus" scoped>
  .info
    position relative
    cursor pointer
    height 100%
    display flex
    justify-content flex-start
    align-items center
    padding 0 10px
    &:hover
      background-color #eee
    .dropdown
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
        white-space nowrap
        &:hover
          background-color #eee
        .name
          margin-left 10px
      .logout
        border-top 1px solid #eee
    img
      width 24px
      height 24px
      border-radius 50%
      margin-right 10px
</style>
