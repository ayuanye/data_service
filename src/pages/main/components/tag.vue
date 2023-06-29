<template>
  <div :class="{'tag-wrapper': true, 'active': isOverflow}">
    <div class="arrow arrow-left" @click="slideToLeft">
      <Icon type="ios-arrow-back" :size="16"/>
    </div>
    <div class="tag-container">
      <div class="tag-inner" ref="rtag">
        <r-singleTag
          ref="singleTag"
          class="interval"
          v-for="(item, index) in routeTagNames"
          :key="item.name"
          :index="index"
          :tag="item"
          @closeTag="closeTag"
          @chooseTag="chooseTag"
        />
      </div>
    </div>
    <div class="arrow arrow-right" @click="slideToRight">
      <Icon type="ios-arrow-forward" :size="16"/>
    </div>
    <div
      :class="{'tag-pull': true, 'active': isOverflow}"
      @mouseenter="handleDropDown(true)"
      @mouseleave="handleDropDown(false)">
      <Icon type="ios-arrow-down" :size="16"/>
      <div class="dropdown" ref="dropdown" v-show="showDropdown" :style="{ 'opacity': dropDownOpacity, 'transform': rotateX }">
        <ul>
          <li @click="closeSomeTag(1)">
            <Icon type="md-arrow-back" :size="16"/>
            <span>{{$t('nav.closeLeft')}}</span>
          </li>
          <li @click="closeSomeTag(2)">
            <Icon type="md-arrow-forward" :size="16"/>
            <span>{{$t('nav.closeRight')}}</span>
          </li>
          <li @click="closeSomeTag(3)">
            <Icon type="md-close" :size="16"/>
            <span>{{$t('nav.closeOthers')}}</span>
          </li>
          <li @click="closeSomeTag(4)">
            <Icon type="md-close-circle" :size="16"/>
            <span>{{$t('nav.closeAll')}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import singleTag from './singleTag'
import { mapGetters, mapActions } from 'vuex'
import { debounce } from '@/utils/tools'
export default {
  components: {
    'r-singleTag': singleTag
  },
  computed: {
    ...mapGetters(['routeTagNames'])
  },
  data () {
    return {
      rotateX: 'rotateX(90deg)',
      showDropdown: true,
      dropDownOpacity: 0,
      isOverflow: false
    }
  },
  watch: {
    isOverflow (val) {
      if (!val) {
        this.slideToLeft()
      }
    },
    routeTagNames: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          if (this.$refs.rtag.offsetWidth > this.$refs.rtag.parentNode.offsetWidth) {
            this.isOverflow = true
            this.$nextTick(() => {
              this.chooseTag(this.$refs.singleTag[this.routeTagNames.length - 1].$el)
            })
          } else {
            this.isOverflow = false
          }
        })
      }
    },
    '$route': {
      immediate: true,
      handler (to, from) {
        let isExist = this.routeTagNames.some(ele => {
          return ele.name === to.name
        })
        if (!isExist) {
          let arr = [...this.routeTagNames]
          arr.push({
            name: to.name,
            tagName: to.meta.globalName
          })
          this.setRouteTagNames(arr)
        }
      }
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
    ...mapActions(['setRouteTagNames']),
    slideToLeft () {
      this.$refs.rtag.style.left = '0'
    },
    slideToRight () {
      this.$refs.rtag.style.left = -(this.$refs.rtag.offsetWidth - this.$refs.rtag.parentNode.offsetWidth) + 'px'
    },
    chooseTag (dom) {
      this.tagMove(dom)
    },
    tagMove (dom) {
      let distance = this.$refs.rtag.parentNode.offsetWidth - dom.offsetWidth
      let tagLeft = parseFloat(this.$refs.rtag.style.left || 0)
      let domLeft = (dom.offsetLeft + tagLeft)
      if (domLeft <= 0) {
        this.$refs.rtag.style.left = -dom.offsetLeft + 'px'
      } else {
        if (domLeft > distance) {
          this.$refs.rtag.style.left = parseFloat(this.$refs.rtag.style.left || 0) - domLeft + distance + 'px'
        }
      }
    },
    closeSomeTag (sign) {
      switch (sign) {
        case 1: this.closeLeft()
          break
        case 2: this.closeRight()
          break
        case 3: this.closeOthers()
          break
        case 4: this.closeAll()
          break
      }
    },
    closeLeft () {
      let menuRoute = [...this.routeTagNames]
      for (let i = 0; i < menuRoute.length; i++) {
        if (menuRoute[i].name === this.$route.name) {
          menuRoute = menuRoute.slice(i, menuRoute.length)
        }
      }
      this.setRouteTagNames(menuRoute)
    },
    closeRight () {
      let menuRoute = [...this.routeTagNames]
      for (let i = 0; i < menuRoute.length; i++) {
        if (menuRoute[i].name === this.$route.name) {
          menuRoute = menuRoute.slice(0, i + 1)
        }
      }
      this.setRouteTagNames(menuRoute)
    },
    closeOthers () {
      this.setRouteTagNames([{
        name: this.$route.name,
        tagName: this.$route.meta.name
      }])
    },
    closeAll () {
      this.$router.push('/')
      this.setRouteTagNames([])
    },
    closeTag (name) {
      let arr = [...this.routeTagNames]
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].name === name) {
          arr.splice(i, 1)
        }
      }
      this.setRouteTagNames(arr)
      if (this.$route.name === name) {
        // this.$router.go(-1)
        this.$router.push({
          name: 'eleprijsecMan'
        })
        
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .tag-wrapper
    margin 6px 50px 6px 8px
    height 32px
    position relative
    width 100%
    height 36px
    .arrow
      width 32px
      height 32px
      position absolute
      top 0
      display flex
      justify-content center
      align-items center
      cursor pointer
    .arrow-left
      left -42px
    .arrow-right
      right -42px
    .tag-container
      position relative
      overflow hidden
      height 100%
      .tag-inner
        height 100%
        display flex
        flex-wrap nowrap
        justify-content flex-start
        align-items center
        position absolute
        transition .5s
        top 0
        left 0
      .interval
        margin-right 10px
    .tag-pull
      position absolute
      right -40px
      top 0
      display flex
      width 32px
      height 32px
      justify-content center
      align-items center
      background-color white
      cursor pointer
      .dropdown
        height 120px
        position absolute
        top 35px
        right 0
        background-color white
        border-radius 2px
        box-shadow 0 0 5px #ccc
        transition .5s
        transform-origin top center
        z-index 99
        li
          height 30px
          padding 10px 13px
          display flex
          white-space nowrap
          justify-content flex-start
          flex-wrap nowrap
          align-items center
          &:hover
            background-color #eee
          span
            margin-left 5px
    .tag-pull.active
      right -80px
  .tag-wrapper.active
    margin 6px 97px 6px 62px
  .ivu-layout-header
    line-height 25px
</style>
