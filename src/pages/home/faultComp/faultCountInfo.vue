<!-- created by rbb-->
<template>
  <div class="info">
    <info-search
      :showClassification="true"
      :selectList="classificationList"
      :defaultStartTime="defaultStartTime"
      :defaultEndTime="defaultEndTime"
      :defaultClassification="defaultClassification"
      @doQuery="doQuery"
      ref="search"
    />
    <div class="info-content">
      <div class="bar-charts" ref="barCharts"></div>
      <div class="table-wrapper">
        <Table
          border
          :row-class-name="diyStripe"
          :columns="columns"
          :data="tableData"
          height="400"
          style="margin-top: 10px;"
          :loading="loading"
        />
      </div>
    </div>
    <diy-modal
      :isShowModal="isShowModal"
      @closeModal="closeModal"
      :data="modalData"
    />
  </div>
</template>

<script>
import infoSearch from './faultCountSearch'
import Echarts from 'echarts/lib/echarts'
import { faultCountInfo } from '../config/chartsOptions'
import { infoColumns } from '../config/fault'
import diyModal from './diyModal'
import {
  getFaultCountInfoData,
  getFaultCountInfoModalData
} from '@/services/index'
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  name: 'faultCountInfo',
  components: {
    'info-search': infoSearch,
    'diy-modal': diyModal
  },
  data () {
    return {
      barCharts: null,
      columns: infoColumns,
      tableData: [],
      isShowModal: false,
      loading: false,
      queryParam: {},
      modalData: [],
      isFirst: true,
      defaultStartTime: new Date(this.$route.params.startTime),
      defaultEndTime: new Date(this.$route.params.endTime),
      defaultClassification: this.$route.params.classification,
      classificationList: [
        {
          value: '厂站'
        },
        {
          value: '线路'
        }
      ]
    }
  },
  mounted () {
    this.$refs.search.query()
  },
  methods: {
    doQuery (param) {
      if (this.isFirst) {
        this.loading = true
        this.getData({
          startDate: param.startTime,
          endDate: param.endTime,
          dydj: this.$route.params.name,
          category: param.classification
        })
        this.queryParam = param
        this.isFirst = false
      } else {
        this.$router.push({
          name: 'faultCount',
          params: {
            defaultStartTime: new Date(param.startTime),
            defaultEndTime: new Date(param.endTime),
            classification: param.classification
          }
        })
      }
    },
    getData (param) {
      getFaultCountInfoData(param).then((res) => {
        this.loading = false
        this.handlerBarChartData(res.data.barChartData)
        this.tableData = res.data.tableData
      })
    },
    handlerBarChartData (data) {
      let namesArr = Object.keys(data)
      let successArr = []
      let failedArr = []
      let touchGroundArr = []
      namesArr.forEach((v) => {
        successArr.push(data[v]['重合成功'])
        failedArr.push(data[v]['重合不成'])
        touchGroundArr.push(data[v]['接地拉停'])
      })
      this.initCharts(namesArr, successArr, failedArr, touchGroundArr)
    },
    initCharts (names, success, failed, touchGround) {
      this.barCharts = Echarts.init(this.$refs.barCharts)
      this.barCharts.setOption(faultCountInfo(...arguments))
      this.barCharts.off('click')
      this.barCharts.on('click', (param) => {
        this.getModalData(param.name)
      })
    },
    getModalData (lines) {
      getFaultCountInfoModalData({
        startDate: this.queryParam.startTime,
        endDate: this.queryParam.endTime,
        dydj: this.$route.params.name,
        category: this.queryParam.classification,
        gzqy: lines
      }).then((res) => {
        this.modalData = res.data.map((v) => {
          v.placeName = lines
          return v
        })
        this.isShowModal = true
      })
    },
    closeModal (val) {
      this.isShowModal = val
    },
    diyStripe (row, index) {
      if (index & (1 !== 0)) {
        return 'stripe-back'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.info /deep/ .ivu-table-wrapper-with-border
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
        background #f4f8ff
    th.header-purple
      background-color #e3effc
      color #4a81b8
      font-weight bold
      border-bottom-color #a2e2e8
      border-right none
    th.header-center
      text-align center
    &::before
      background-color transparent
    .ivu-table-body
      overflow-x hidden
      // &::-webkit-scrollbar
      //   background transparent
      //   position absolute
      // &::-webkit-scrollbar-track
      //   background transparent
      // &::-webkit-scrollbar-thumb
      //   background #5dcbcf
      //   border-radius 10px
      table
        width 100% !important
.info
  margin 0 10px
  padding 20px
  background-color white
  .info-content
    background-color #f1fafc
    border 1px solid #c4eaec
    margin-top 10px
    .bar-charts
      height 280px
    .table-wrapper
      border-top 1px dashed #c4eaec
      padding 0 10px 10px 10px
</style>
