<template>
  <div class="quarter">
    <div class="search">
      <div class="option-wrapper">
        <span>年份:</span>
        <DatePicker
          type="year"
          placeholder="Select date"
          style="width: 150px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <span>季度:</span>
        <Select v-model="quarterVal" style="width:200px">
          <Option v-for="item in quarterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">导出</Button>
      </div>
    </div>
    <div class="content">
      <li style="font-weight: bold;font-size: 18px;">2020年1季度</li>
      <p>调度最高负荷为157.53万千瓦（2020年 1月 3日10:07:53），同比增长-4.31%；
        最低调度低谷负荷为27.37万千瓦（2020年 2月 5日13:40:08），同比增长-5.62%；
        最大峰谷差为55.91万千瓦（2020年 1月 2日16:23:45），同比增长-10.06%；
        最大日调度电量达2987.00万千瓦时（2020年 1月 3日10:07:53），同比增长-6.30%；
        平均负荷率为73.54%，同比增长-5.18%；
        平均用电谷峰差为392.12MW，同比增长-0.79%。
      </p>
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'view-design'
export default {
  components: {
    Select,
    Option
  },
  data () {
    return {
      quarterVal: 1,
      quarterList: [{
        value: 1,
        label: '一季度'
      }, {
        value: 2,
        label: '二季度'
      }, {
        value: 3,
        label: '三季度'
      }, {
        value: 4,
        label: '四季度'
      }]
    }
  },
  methods: {
    getData () {}
  }
}
</script>
<style lang="stylus" scoped>
  .quarter
    width: 100%
    min-height: 100%
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    background-color: #fff
    padding: 15px
    padding-top 0
    border-radius: 5px
    .search
      width: 100%
      box-sizing: border-box
      display: flex
      justify-content flex-start
      align-items flex-start
      flex-wrap wrap
      padding-bottom 20px
      border-bottom 1px solid #eee
      .option-wrapper
        display flex
        justify-content flex-start
        align-items center
        margin-right: 10px
        span
          margin-right: 10px
    .content
      width 100%
      margin-top 20px
      p
        width 100%
        font-size 16px
        white-space pre-line
        color #111
        line-height 30px
</style>
