<template>
  <div class="nav">
    <div :class="{'nav-item': true, 'active': index === activeNav }" v-for="(item, index) in navList" :key="item.iconName" @click="setActive(index)">
      <p class="icon-wrapper"><i :class="['iconfont', item.iconName]"></i></p>
      <span class="text">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNav: 0,
      currentIndex: '',
      navList: [{
        text: '首页',
        iconName: 'iconhome',
        routerName: 'home'
      }, {
        text: '负荷电量',
        iconName: 'iconfuhe'
      }, {
        text: '电网事故',
        iconName: 'icondianwangguzhang',
        routerName: 'homeFault'
      }, {
        text: '电网检修',
        iconName: 'iconjianxiu'
      }, {
        text: '风险预警',
        iconName: 'iconfengxianyujing'
      }, {
        text: '超重载',
        iconName: 'iconzhongzai'
      }, {
        text: '主变油温',
        iconName: 'iconshouye-youwenguogao'
      }]
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.navList.forEach((e, index) => {
          if (to.fullPath.indexOf(e.routerName) !== -1) {
            this.activeNav = index
          }
        })
      }
    }
  },
  methods: {
    setActive (index) {
      if (index !== this.currentIndex) {
        let name = this.navList[index].routerName
        if (name) {
          this.$router.push({
            name
          }).catch(err => err)
        }
        this.currentIndex = index
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  width 150px
  height calc(100vh - 75px)
  .nav-item
    &:nth-of-type(1)
      margin-top 60px
    cursor pointer
    width 150px
    height 52px
    display flex
    justify-content flex-start
    align-items center
    .icon-wrapper
      margin-left 25px
      width 18px
      text-align center
      .iconfont
        color #09b4d1
        font-size 18px
    .text
      margin-left 21px
      font-weight bold
      font-size 15px
      color #444
  .active
    background-color #0db9bb
    .icon-wrapper
      .iconfont
        color white
    .text
      color white
</style>
