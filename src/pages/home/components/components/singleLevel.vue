<!-- created by rbb-->
<template>
  <div class="level">
    <div class="text">
      <div style="line-height: 25px;">
        {{title}}
        <div class="signal" :style="{backgroundColor: levelBack}">
          <img :src="levelImg" alt="">
          <span style="margin-left: 4px;">{{levelNum}}</span>
        </div>
      </div>
    </div>
    <div class="predict">
      <p>
        <span class="color-gray">风险编号：</span>
        <span class="color-green">{{ident}}</span>
      </p>
      <p style="margin-left: 76px;">
        <span class="color-gray">工期：</span>
        <span class="color-green">{{startTime}} ~ {{endTime}}</span>
      </p>
    </div>
    <div class="circle" v-show="index">
      <span>{{index}}</span>
    </div>
    <div class="line-dashed" v-show="isLast">
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'levelBack', 'levelImg', 'levelNum', 'ident', 'startTime', 'endTime', 'index', 'isLast'],
  data () {
    return {
    }
  },
  components: {},
  methods: {}
}
</script>
<style lang='stylus' scoped>
.color-gray
  color #888
.color-green
  color #33b4a7
  font-weight bold
.level
  margin-left 29px
  padding 0 19px 17px 19px
  position relative
  .text
    display flex
    justify-content flex-start
    align-items center
    color #222
    font-size 15px
    .signal
      width 57px
      height 24px
      border-radius 12px
      display inline-block
      margin-left 9px
      font-size 14px
      color white
      vertical-align middle
      img
        width 24px
        margin-top -2px
  .predict
    margin-top 5px
    display flex
    justify-content flex-start
    align-items center
    font-size 16px
  .circle
    width 19px
    height 19px
    line-height 19px
    border-radius 50%
    background-color #00cbba
    display flex
    justify-content center
    align-items center
    color white
    font-size 14px
    font-weight bold
    position absolute
    left -9.5px
    top 4px
  .line-dashed
    width 1px
    height 90%
    position absolute
    left 0
    top 20px
    background-image url("~@/assets/images/dashed.png")
    background-size 100% 100%
</style>
