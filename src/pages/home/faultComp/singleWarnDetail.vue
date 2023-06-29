<!-- created by rbb-->
<template>
  <div class="wrapper">
    <aside class="left">
      <span>{{date}}</span>
    </aside>
    <aside :class="['right', isLast ? '' : 'notlast']" :style="{backgroundImage: 'linear-gradient(to right, ' + backChoose() + ', #fff)'}">
      <img :src="diamondChoose()" alt="" class="diamond">
      <p v-for="item in list" :key="item.id" style="margin-left: 40px;">
        <span>{{item.time}}</span>
        <span style="margin-left: 20px;">{{item.content1}}</span>
        <span style="margin-left: 15px;">{{item.content2}}</span>
      </p>
      <div class="fill-empty">

      </div>
    </aside>
  </div>
</template>

<script>
import diamond1 from '@/assets/images/diamond_1.png'
import diamond2 from '@/assets/images/diamond_2.png'
import diamond3 from '@/assets/images/diamond_3.png'
import diamond4 from '@/assets/images/diamond_4.png'
export default {
  props: ['date', 'list', 'isLast', 'index'],
  data () {
    return {
      diamond1,
      diamond2,
      diamond3,
      diamond4
    }
  },
  components: {},
  methods: {
    randomKey () {
      return Math.random()
    },
    diamondChoose () {
      return this['diamond' + (this.index % 4 + 1)]
    },
    backChoose () {
      let leftNum = this.index % 4
      let color = ''
      switch (leftNum) {
        case 0: color = '#edfaf8'; break
        case 1: color = '#eef9fe'; break
        case 2: color = '#f5f7fe'; break
        case 3: color = '#fef5ee'; break
      }
      return color
    }
  }
}
</script>
<style lang='stylus' scoped>
.wrapper
  display flex
  justify-content flex-start
  align-items flex-start
  margin-left 20px
  .left
    line-height 32px
    font-size 16px
    font-weight bold
    color #666
  .notlast
    border-left 1px dashed #e0e0e0
  .right
    position relative
    line-height 32px
    font-size 15px
    color #444
    margin-left 20px
    width 500px
    .diamond
      width 23px
      position absolute
      top 0
      left -10px
    .fill-empty
      width 100%
      height 20px
      background-color white
</style>
