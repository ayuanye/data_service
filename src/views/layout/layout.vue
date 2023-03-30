<template>
  <div class="big_content">
      <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
      </div>
      <div class="main-container">
        <div class="top">
          <navbar></navbar>
        </div>
        <div class="button">

        </div>
      </div>
  </div>

</template>

<script>
import { Sidebar,Navbar } from './components'
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  data(){
    return {

    }
  },
  components: {
    Sidebar,
    Navbar,
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar() {
      // return this.$store.state.app.sidebar
    },
    device() {
      // return this.$store.state.app.device
    },
    // classObj() {
    //   return {
    //     hideSidebar: !this.sidebar.opened,
    //     withoutAnimation: this.sidebar.withoutAnimation,
    //     mobile: this.device === 'mobile'
    //   }
    // }
  }
}
</script>
<style scoped>
.big_content{
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction:row;
  justify-content:space-between;
}
  .app-wrapper{
    height: 100%;
    width: 240px;
  }
  .main-container{
    width: 95%;
  }
  .top{
    height: 50px;
    border-bottom: 1px solid #d4d2d2;
  }
</style>

