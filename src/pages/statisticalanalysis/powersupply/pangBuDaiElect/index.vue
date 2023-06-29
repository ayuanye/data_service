<template>
  <div class="summary">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 150px"
          v-model="countYear"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <span>至:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 150px"
          v-model="compareYear"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">导出</Button>
      </div>
    </div>
    <div class="content">
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
  </div>
</template>
<script>
import page from '@/mixins/common/page'
import extend from './extend'
import { pangdaibuelect } from '@/services/dataMaintenance'
export default {
  mixins: [page],
  data () {
    return {
      loading: false,
      countYear: '2020',
      compareYear: '2019',
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
        }, {
          title: '日期',
          key: 'date',
          align: 'center'
        }, {
          title: '线路名称',
          key: 'name',
          align: 'center'
        }, {
          title: '应补电量',
          key: 'supplyElect',
          align: 'center'
        }, {
          title: '开始时间',
          key: 'startTime',
          align: 'center'
        }, {
          title: '结束时间',
          key: 'endTime',
          align: 'center'
        }, {
          title: '原因',
          key: 'reason',
          align: 'center'
        }, {
          title: '调度员',
          key: 'dispatcher',
          align: 'center'
        }],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      pangdaibuelect().then(res => {
        this.setData(res.data)
      })
    },
    setData (data) {
      this.data = data
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.summary/deep/.ivu-table-tip
  overflow-x hidden
.summary
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
    .page
      margin-top: 10px
      display: flex
      justify-content: flex-end
</style>
