<!-- created by rbb-->
<template>
  <div class="weather-wrapper" :style="{ backgroundImage: 'url(' + backUrl + ')' }">
    <div class="day">
      <span :style="{ color: textColor }">{{day}}</span>
    </div>
    <div class="desc">
      <p>{{weather || ''}}&nbsp;</p>
      <p class="temper">{{temper}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['backUrl', 'textColor', 'day', 'weather', 'temper'],
  data () {
    return {
    }
  },
  components: {},
  methods: {}
}
</script>
<style lang='stylus' scoped>
.weather-wrapper
  width 192px
  height 77px
  background-image url("~@/assets/images/weather_1.png")
  background-size 100% 100%
  display flex
  justify-content flex-start
  align-items center
  .day
    display flex
    justify-content center
    align-items center
    width 54px
    height 48px
    background-color white
    font-size 15px
    color #7f7f7f
    font-weight bold
    border-radius 10px
    margin-left 19px
  .desc
    margin-left 17px
    color white
    font-size 14px
    .temper
      margin-top 5px
</style>
