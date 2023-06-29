<!-- created by rbb-->
<template>
  <div class="tabs-wrapper" :class="[backImage]">
    <div v-for="(item, index) in tabsList" :key="item.name" class="title" @click="tabsClick(index)">
      <span :class="{ active: activeIndex === index }">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: Number(localStorage.getItem('faultActiveIndex')) || 0,
      backImage: 'left-back',
      tabsList: [{
        value: 1,
        name: '故障明细'
      }, {
        value: 2,
        name: '故障统计'
      }
      // , {
      //   value: 3,
      //   name: '故障明细'
      // }
      ]
    }
  },
  watch: {
    activeIndex: {
      immediate: true,
      handler  (val) {
        let routeName = ''
        switch (val) {
          case 0: routeName = 'faultTrip'; break
          case 1: routeName = 'faultCount'; break
          case 2: routeName = 'faultDetail'; break
        }
        this.$router.push({
          name: routeName
        }).catch(err => err)
      }
    },
    '$route': {
      immediate: true,
      handler (to, from) {
        if (to.name.indexOf('faultTrip') !== -1) {
          this.backImage = 'left-back'
        } else if (to.name.indexOf('faultCount') !== -1) {
          this.backImage = 'center-back'
        } else if (to.name.indexOf('faultDetail') !== -1) {
          this.backImage = 'right-back'
        }
      }
    }
  },
  methods: {
    tabsClick (index) {
      this.activeIndex = index
      localStorage.setItem('faultActiveIndex', index)
    }
  }
}
</script>
<style lang='stylus' scoped>
.left-back
  background-image url("~@/assets/images/fault_left.png")
.center-back
  background-image url("~@/assets/images/fault_right.png")
.right-back
  background-image url("~@/assets/images/fault_trip.png")
.tabs-wrapper
  display flex
  justify-content center
  align-items center
  height 60px
  background-size 100% auto
  background-position center bottom
  background-repeat no-repeat
  .title
    width 8.5vw
    display flex
    justify-content center
    align-items center
    font-size 0.9vw
    font-weight bold
    color #444
    cursor pointer
    .active
      color #00a9ab
      font-size 1.1vw
</style>
