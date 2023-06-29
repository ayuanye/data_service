<template>
  <div class="monthly">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 150px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">导出</Button>
      </div>
    </div>
    <div class="table-wrapper">
      <Table
        :columns="columns"
        :data="data"
        stripe
        border
        draggable
        ref="table"
        max-height="680"
        :loading="loading"
      >
      </Table>
      <div class="page">
        <Page
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          :total="total"
          show-elevator
          show-sizer
        />
      </div>
    </div>
    <div class="table-wrapper" style="margin-top: 10px;">
      <Table
        :columns="columnsT"
        :data="dataT"
        stripe
        border
        draggable
        >
      </Table>
    </div>
  </div>
</template>
<script>
import extend from './extend'
import page from '@/mixins/common/page'
export default {
  mixins: [page],
  data () {
    return {
      loading: false,
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(extend, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          width: 80,
          align: 'center',
          renderHeader: (h, params) => {
            return h('span', '序号')
          }
        },
        {
          title: '日期',
          key: 'date',
          align: 'center'
        },
        {
          title: '调度电量',
          key: 'dispatchElect',
          align: 'center'
        },
        {
          title: '调度最高负荷',
          key: 'dispatchTopConstract',
          align: 'center'
        },
        {
          title: '调度最低负荷',
          key: 'dispatchLowConstract',
          align: 'center'
        },
        {
          title: '峰谷差',
          key: 'peakValleyDiff',
          align: 'center'
        },
        {
          title: '负荷率',
          key: 'loadRate',
          align: 'center'
        }
      ],
      data: [],
      columnsT: [{
        title: '本月调度电量最大值',
        key: 'maxVal',
        align: 'center'
      }, {
        title: '本月调度最高负荷',
        key: 'maxConstract',
        align: 'center'
      }, {
        title: '本月调度最低负荷',
        key: 'minConstract',
        align: 'center'
      }, {
        title: '本月峰谷差最大值',
        key: 'maxPeakValley',
        align: 'center'
      }, {
        title: '本月负荷率平均值',
        key: 'avarLoad',
        align: 'center'
      }],
      dataT: [{
        maxVal: '100',
        maxConstract: '200',
        minConstract: '300',
        maxPeakValley: '400',
        avarLoad: '500'
      }]
    }
  },
  created () {
    this.data = this.createData()
  },
  methods: {
    getData () {
    },
    createData () {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          date: '2020-07-03',
          dispatchElect: 300,
          dispatchTopConstract: 400,
          dispatchLowConstract: 100,
          peakValleyDiff: 300,
          loadRate: '50%'
        })
      }
      return data
    }
  }
}
</script>
<style lang="stylus" scoped>
  .monthly
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
    .table-wrapper
      width 100%
      .page
        margin-top: 10px
        display: flex
        justify-content: flex-end
</style>
