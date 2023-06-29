<!-- created by rbb-->
<template>
  <div class="timeline">
    <div class="left">
      <p class="date">{{data.cxsj ? data.cxsj.substring(5, 10) : ''}}</p>
      <p class="time">{{data.cxsj ? data.cxsj.substring(11, data.cxsj.length) : ''}}</p>
    </div>
    <div :class="['right', backColor]">
      <p class="desc-wrapper">
        <span class="title">出现地区</span>
        <span class="text">{{data.ssdw}}</span>
        <span class="title" style="margin-left: 80px;">场所</span>
        <span class="text">{{data.placeName}}</span>
      </p>
      <p class="desc-wrapper" style="margin-top: 10px;">
        <span class="title">事故情况</span>
        <span class="text">{{data.clqk}}</span>
        <i class="interval" v-show="!isLast"></i>
      </p>
      <div :class="['serial', serialBack]">
        <span>{{index + 1}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['index', 'isLast', 'data'],
  data () {
    return {
      serialBack: '',
      backColor: ''
    }
  },
  watch: {
    index: {
      immediate: true,
      handler (val) {
        let mod = (val || 0) % 4
        let imgBack = ''
        let backColor = ''
        switch (mod) {
          case 0: imgBack = 'serial-green'
            backColor = 'back-green'; break
          case 1: imgBack = 'serial-blue'
            backColor = 'back-blue'; break
          case 2: imgBack = 'serial-purple'
            backColor = 'back-purple'; break
          case 3: imgBack = 'serial-orange'
            backColor = 'back-orange'; break
        }
        this.backColor = backColor
        this.serialBack = imgBack
      }
    }
  },
  components: {},
  methods: {}
}
</script>
<style lang='stylus' scoped>
.timeline
  display flex
  justify-content center
  align-items flex-start
  .left
    text-align center
    .date
      margin-top 20px
      font-size 16px
      font-weight bold
  .back-green
    background-image linear-gradient(to right, #e8f9f8, white)
  .back-blue
    background-image linear-gradient(to right, #e9f7fd, white)
  .back-purple
    background-image linear-gradient(to right, #f0f5fd, white)
  .back-orange
    background-image linear-gradient(to right, #fdf8ef, white)
  .right
    width 80%
    margin-left 40px
    padding 20px
    padding-left 40px
    position relative
    .serial
      position absolute
      width 50px
      height 40px
      display flex
      justify-content center
      align-items center
      color white
      font-weight bold
      font-size 15px
      background-size 100% 100%
      left -35px
      top 10px
      span
        margin-right 8px
        margin-top 2px
    .serial-blue
      background-image url("~@/assets/images/serial_bg_blue.png")
    .serial-green
      background-image url("~@/assets/images/serial_bg_green.png")
    .serial-purple
      background-image url("~@/assets/images/serial_bg_purple.png")
    .serial-orange
      background-image url("~@/assets/images/serial_bg_orange.png")
    .desc-wrapper
      display flex
      justify-content flex-start
      align-items flex-start
      line-height 25px
      position relative
      .interval
        display inline-block
        position absolute
        left -54px
        width 1px
        border-right 1px dashed #b8b8b8
        height calc(100% + 46px)
        top 0
        z-index 9
      .title
        color #22b1a7
        font-weight bold
        white-space nowrap
      .text
        margin-left 20px
        display inline-block
        color #3f4040
</style>
