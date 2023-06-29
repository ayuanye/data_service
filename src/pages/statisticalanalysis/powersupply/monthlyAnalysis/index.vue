<template>
  <div class="analysis">
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
        <span>月度:</span>
        <Select v-model="quarterVal" style="width:200px">
          <Option v-for="item in quarterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">导出</Button>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <p class="title">2020年1月地区负荷情况表</p>
        <p class="unit">单位:兆瓦</p>
        <div class="table-wrapper">
          <LeftTable />
        </div>
      </div>
      <div class="right">
        <p class="title">2020年1月网供、地区电量汇总表</p>
        <p class="unit">单位:万千瓦时</p>
        <div class="table-wrapper">
          <RightTable />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'view-design'
import leftTable from './components/leftTable'
import rightTable from './components/rightTable'
export default {
  components: {
    Select,
    Option,
    'LeftTable': leftTable,
    'RightTable': rightTable
  },
  data () {
    return {
      quarterVal: 1,
      quarterList: [{
        value: 1,
        label: '一月份'
      }, {
        value: 2,
        label: '二月份'
      }, {
        value: 3,
        label: '三月份'
      }, {
        value: 4,
        label: '四月份'
      }, {
        value: 5,
        label: '五月份'
      }, {
        value: 6,
        label: '六月份'
      }, {
        value: 7,
        label: '七月份'
      }, {
        value: 8,
        label: '八月份'
      }, {
        value: 9,
        label: '九月份'
      }, {
        value: 10,
        label: '十月份'
      }, {
        value: 11,
        label: '十一月份'
      }, {
        value: 12,
        label: '十二月份'
      }]
    }
  },
  methods: {
    getData () {}
  }
}
</script>
<style lang="stylus" scoped>
  @import '~@/assets/styles/mixins.styl'
  .analysis
    contentWrapper()
    padding-top 0
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
    display flex
    justify-content center
    align-items flex-start
    .left,.right
      width 50%
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      .table-wrapper
        margin-top 5px
      .title
        font-size 20px
        font-weight 600
        width 100%
        text-align center
      .unit
        width 50%
        text-align right
</style>
