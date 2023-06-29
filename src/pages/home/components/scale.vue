<!-- created by rbb-->
<template>
  <div class="scale">
    <r-title text="电网规模" />
    <div class="desc-wrapper">
      <single-scale
        v-for="(item, index) in scale"
        :key="index"
        :electName="item.electName"
        :electNumber="item.electNumber"
        :back="item.back"
        :linesNumber="item.linesNumber"
        :lineNnumColor="item.lineNnumColor"
        :unit="item.unit"
        class="scale-dist"
      />
    </div>
    <r-corner />
  </div>
</template>

<script>
import corner from './components/corner'
import title from './title'
import singleScale from './components/singleScale'
import sacle1 from '@/assets/images/scale_1.png'
import sacle2 from '@/assets/images/scale_2.png'
import sacle3 from '@/assets/images/scale_3.png'
import { getScale } from '@/services/index'
export default {
  components: {
    'r-corner': corner,
    'r-title': title,
    'single-scale': singleScale
  },
  data () {
    return {
      scale: [
        {
          electName: '变电站',
          electNumber: '',
          unit: '座',
          back: sacle1,
          linesNumber: ['', '', ''],
          lineNnumColor: '#00b3a1'
        }, {
          electName: '变压器',
          electNumber: '',
          unit: '台',
          back: sacle2,
          linesNumber: ['', '', ''],
          lineNnumColor: '#33b6c9'
        }, {
          electName: '线路',
          electNumber: '',
          unit: '条',
          back: sacle3,
          linesNumber: ['', '', ''],
          lineNnumColor: '#1cb34c'
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getScale().then(res => {
        let data = [...this.scale]
        data[0].electNumber = res.bdz['变电站']
        data[0].linesNumber = [res.bdz['220kV'], res.bdz['110kV'], res.bdz['35kV']]
        data[1].electNumber = res.byq['变压器']
        data[1].linesNumber = [res.byq['220kV'], res.byq['110kV'], res.byq['35kV']]
        data[2].electNumber = res.xl['线路']
        data[2].linesNumber = [res.xl['220kV'], res.xl['110kV'], res.xl['35kV']]
        this.scale = data
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.scale
  padding 15px 10px
  width 100%
  box-sizing border-box
  position relative
  background-color white
  .desc-wrapper
    padding 10px 15px
    margin-top 10px
    .scale-dist
      margin-bottom 9px
      &:last-child
        margin-bottom 0
</style>
