<template>
  <div class="overload">
    <r-title wid="105px" text="当月超重载"/>
    <div class="lines">
      <r-lines
      :fontClass = "lineFontClass[0]"
      :backColor = "lineBackColor[0]"
      :circleColor = "lineCircleColor[0]"
      :numberColor = "lineNumberColor[0]"
      :text = "lineText[0]"
      :num = "lineNum[0]"
      :unit = "lineUnit[0]"/>
      <r-lines
      :fontClass = "lineFontClass[1]"
      :backColor = "lineBackColor[1]"
      :circleColor = "lineCircleColor[1]"
      :numberColor = "lineNumberColor[1]"
      :text = "lineText[1]"
      :num = "lineNum[1]"
      :unit = "lineUnit[1]"/>
    </div>
    <r-corner/>
  </div>
</template>

<script>
import corner from './components/corner'
import title from './title'
import lines from './components/lines'
import { getOverload } from '@/services/index'
export default {
  components: {
    'r-title': title,
    'r-lines': lines,
    'r-corner': corner
  },
  data () {
    return {
      lineFontClass: ['iconbianyaqi', 'iconxianlu1'],
      lineBackColor: ['#e5f6f8', '#fdeede'],
      lineCircleColor: ['#1ac8ce', '#fea546'],
      lineNumberColor: ['#1ac8ce', '#fea546'],
      lineText: ['主变', '线路'],
      lineUnit: ['台', '条'],
      lineNum: ['', '']
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getOverload().then(res => {
        this.lineNum = [res.transformer.num, res.line.num]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.overload
  position relative
  padding 15px 10px
  width 100%
  background-color white
  box-sizing border-box
  .lines
    height 58px
    margin-top 10px
    display flex
    justify-content space-around
    align-items center
</style>
