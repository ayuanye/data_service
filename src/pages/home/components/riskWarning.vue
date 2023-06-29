<!-- created by rbb-->
<template>
  <div class="risk">
    <r-title wid="165px" text="正在执行风险预警"/>
    <div class="sec-title">
      <div class="name-wrapper">
        <img :src="refresh" alt="">
        <span style="margin-left: 9px;font-weight: bold;">正在执行风险预警</span>
      </div>
      <div class="number-wrapper">
        （<span v-for="(item, index) in summary" :key="item.name">
          {{item.name}}：
          <span class="number color-blue">{{item.value}}</span>个{{index !== summary.length - 1 ? '，' : ''}}
        </span>）
        <!-- 6级：
        <span class="number color-orange">2</span>个） -->
      </div>
    </div>
    <div class="level-wrapper">
      <single-level
      v-for="(item, index) in levelData"
      :key="index"
      :title="item.title"
      :levelBack="item.levelBack"
      :levelImg="item.levelImg"
      :levelNum="item.levelNum"
      :ident="item.ident"
      :startTime="item.startTime"
      :endTime="item.endTime"
      :index="index + 1"
      :isLast="!(index === levelData.length - 1)"/>
    </div>
    <r-corner />
  </div>
</template>

<script>
import corner from './components/corner'
import title from './title'
import refresh from '@/assets/images/refresh.png'
import singleLevel from './components/singleLevel'
import level5 from '@/assets/images/level_blue.png'
import level6 from '@/assets/images/level_orange.png'
import { getRisk } from '@/services/index'
import { dateFormat } from '@/utils/tools'
export default {
  components: {
    'r-corner': corner,
    'r-title': title,
    'single-level': singleLevel
  },
  data () {
    return {
      refresh,
      summary: [],
      levelData: [
        // 单纯是为了留住level6的颜色
        // {
        //   title: '关于220kv滆湖变只能化改造（第Ⅰ、Ⅱ阶段: 110kv、35kv改造）期间的调度运行风险通知书',
        //   levelBack: '#fd814f',
        //   levelImg: level6,
        //   levelNum: '6',
        //   ident: '无锡地调215151521',
        //   startTime: '2020-08-20',
        //   endTime: '2020-08-21'
        // }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getRisk({
        date: dateFormat('YYYY-mm-dd', new Date())
      }).then(res => {
        let data = res.data
        this.setData(data)
      })
    },
    setData (data) {
      this.setSummary(data.summary)
      this.setLevelList(data.data)
    },
    setSummary (data) {
      let arr = []
      Object.keys(data).forEach(e => {
        arr.push({
          name: e,
          value: data[e]
        })
      })
      this.summary = arr
    },
    setLevelList (data) {
      let arr = []
      data.forEach(e => {
        let color = ''
        let imgSrc = ''
        if (e.fxdj === '5级') {
          color = '#4fa8fd'
          imgSrc = level5
        } else if (e.fxdj === '6级') {
          color = '#fd814f'
          imgSrc = level6
        } else {
          color = '#4fa8fd'
          imgSrc = level5
        }
        arr.push({
          title: e.zt,
          levelBack: color,
          levelImg: imgSrc,
          levelNum: e.fxdj,
          ident: e.bh,
          startTime: e.kssj,
          endTime: e.jssj
        })
      })
      this.levelData = arr
    }
  }
}
</script>
<style lang='stylus' scoped>
.color-blue
  color #4fa8fd
.color-orange
  color #fd814f
.risk
  padding 15px 10px
  width 100%
  position relative
  box-sizing border-box
  background-color white
  .sec-title
    display flex
    justify-content flex-start
    align-items center
    margin-top 18px
    padding 0 19px
    .name-wrapper
      display flex
      justify-content flex-start
      align-items center
      color #00b5a2
      font-size 14px
      img
        width 19px
    .number-wrapper
      margin-left 9px
      font-size 14px
      .number
        font-size 16px
        font-weight bold
        padding-right 5px
  .level-wrapper
    margin-top 9px
    height 145px
    overflow-y auto
    &::-webkit-scrollbar
      width 4px
    &::-webkit-scrollbar-thumb
      background rgb(26, 200, 206)
      border-radius 4px
</style>
