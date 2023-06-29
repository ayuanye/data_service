<template>
  <div class="compquery">
    <div class="search">
      <div class="option-wrapper">
        <Button type="info">上一月</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">下一月</Button>
      </div>
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">导出word</Button>
      </div>
    </div>
    <div class="content">
      <Table
        :columns="columns"
        :data="data"
        stripe
        border
        style="margin-top: 25px;"
        ref="table"
        max-height="700"
        :loading="loading"
      >
      </Table>
    </div>
  </div>
</template>

<script>
import { powerGrid } from '@/services/dataMaintenance'
import expand from './extend'
export default {
  data () {
    return {
      data: [],
      columns: [{
        type: 'expand',
        width: 50,
        render: (h, params) => {
          return h(expand, {
            props: {
              row: params.row
            }
          })
        }
      }, {
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '申请单编号',
        key: 'number',
        align: 'center'
      }, {
        title: '停电场所',
        key: 'place',
        align: 'center'
      }, {
        title: '停电范围',
        key: 'range',
        tooltip: true,
        align: 'center'
      }, {
        title: '申请单位',
        key: 'applyComp',
        align: 'center'
      }, {
        title: '工作内容',
        key: 'content',
        tooltip: true,
        align: 'center'
      }, {
        title: '停电开始时间',
        key: 'startTime',
        align: 'center'
      }, {
        title: '停电结束时间',
        key: 'endTime',
        align: 'center'
      }, {
        title: '危险源点分析',
        key: 'riskAna',
        tooltip: true,
        align: 'center'
      }],
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      powerGrid().then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .compquery/deep/.ivu-table-tip
    overflow-x hidden
  .compquery
    contentWrapper()
    .search
      width 100%
      box-sizing: border-box
      display flex
      justify-content flex-start
      align-items flex-start
      flex-wrap wrap
      border-bottom 1px solid #eee
      .option-wrapper
        display flex
        justify-content flex-start
        align-items center
        margin-right 10px
        margin-bottom 10px
        span
          margin-right: 10px
    .content
      width 100%
</style>
