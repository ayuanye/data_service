<template>
  <div class="wrapper" @click="jump">
    <img :src="corner" alt="">
  </div>
</template>

<script>
import corner from '@/assets/images/more.png'
export default {
  props: ['pathName'],
  data () {
    return {
      corner: corner
    }
  },
  methods: {
    jump () {
      if (this.pathName) {
        this.$router.push({
          name: this.pathName
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 40px
  height 40px
  position absolute
  right 0
  top 0
  cursor pointer
  img
    width 100%
    height 100%
</style>
