<!-- created by rbb-->
<template>
  <div class="detail-wrapper">
    <detail-search style="margin-left: 10px;" ref="search" @doQuery="doQuery" @exportCsv="exportCsv"/>
    <Table
      border
      :row-class-name="diyStripe"
      :columns="columns"
      :data="tableData"
      :height="autoTableHei"
      style="margin-top: 10px;"
      :loading="loading"
      ref="table"
    />
  </div>
</template>

<script>
import detailSearch from './faultTripSearch'
import { detailColumns } from '../config/fault'
import { getDetailList } from '@/services/index'
// import { json2excel } from '@/utils/tools'
// import XLSX from 'xlsx'
export default {
  components: {
    'detail-search': detailSearch
  },
  data () {
    return {
      columns: detailColumns,
      loading: false,
      tableData: [],
      autoTableHei: 720
    }
  },
  mounted () {
    this.$refs.search.query()
    this.autoTableHei = this.$refs.table.$parent.$parent.$el.offsetHeight - 150
  },
  methods: {
    doQuery (param) {
      this.getData(param)
    },
    exportCsv () {
      this.$refs.table.exportCsv({
        fileName: 'table.csv'
      })
      // let copyData = this.tableData.map(v => {
      //   let data = {}
      //   this.columns.forEach(e => {
      //     if (e.key) {
      //       data[e.title] = v[e.key]
      //     }
      //   })
      //   return data
      // })
      // json2excel(XLSX, copyData)
    },
    getData (param) {
      this.loading = true
      getDetailList({
        startDate: param.startTime,
        endDate: param.endTime
      }).then(res => {
        this.loading = false
        this.tableData = res.data.map(v => {
          v.cxsj = v.cxsj.replace(' ', '\n')
          return v
        })
      })
    },
    diyStripe (row, index) {
      if (index & (1 !== 0)) {
        return 'stripe-back'
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
.detail-wrapper /deep/ .ivu-table-wrapper-with-border
  border-color #a2e2e8
  border-bottom 1px solid #a2e2e8
  .ivu-table-border
    &::after
      background-color #a2e2e8
  .ivu-table
    .ivu-table-tip
      overflow-x hidden
    .stripe-back
      td
        background #f5fafe
    th.header-green
      background-color #e1f4f5
      color #01a49e
      font-weight bold
      border-bottom-color #a2e2e8
      border-right none
    th.header-center
      text-align center
    &::before
      background-color transparent
    .ivu-table-body
      overflow-x hidden
    .ivu-table-cell
      span
        white-space pre-line
      // &::-webkit-scrollbar
      //   background transparent
      //   position absolute
      // &::-webkit-scrollbar-track
      //   background transparent
      // &::-webkit-scrollbar-thumb
      //   background #5dcbcf
      //   border-radius 10px
.detail-wrapper
  background-color white
  padding 20px
  margin 0 10px
</style>
