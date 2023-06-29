<template>
  <div class="home">
    <r-header/>
    <div class="content">
      <r-nav/>
      <div class="con-wrapper">
        <router-view />
        <div class="border left-top">

        </div>
        <div class="border right-top">

        </div>
        <div class="border left-bottom">

        </div>
        <div class="border right-bottom">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rHeader from './components/rHeader'
import rNav from './components/rNav'
export default {
  components: {
    'r-header': rHeader,
    'r-nav': rNav
  }
}
</script>

<style lang="stylus" scoped>
.home
  width 100%
  height 100%
  min-width 1280px
  background-image url('~@/assets/images/bg.png')
  background-size contain
  .content
    display flex
    justify-content flex-start
    align-items flex-start
    .con-wrapper
      min-width 1130px
      width calc(100vw - 170px)
      height calc(100vh - 85px)
      box-sizing border-box
      position relative
      border 6px solid #c4eaec
      padding 6px
      .border
        width 40px
        height 40px
        position absolute
        border 6px solid #00c5c7
      .left-top
        top -6px
        left -6px
        border-bottom none
        border-right none
      .right-top
        top -6px
        right -6px
        border-left none
        border-bottom none
      .left-bottom
        left -6px
        bottom -6px
        border-top none
        border-right none
      .right-bottom
        right -6px
        bottom -6px
        border-left none
        border-top none
</style>
<style>
@media screen and (max-width: 1919px) {
  .home .content .con-wrapper{
    padding-right: 2px !important;
  }
}
</style>
