<!-- created by rbb-->
<template>
  <div class="fault-wrapper">
    <r-tabs />
    <div class="view-wrapper">
      <router-view />
    </div>
  </div>
</template>
<script>
import tabs from './faultComp/tabs'
export default {
  components: {
    'r-tabs': tabs
  }
}
</script>
<style lang="stylus">
@import '~@/assets/styles/mixins.styl'
  .view-wrapper
    height calc(100vh - 169px)
    overflow-y auto
    background-color white
    scrollbar()
</style>
