<!-- created by rbb-->
<template>
    <div class="fault-trip">
      <r-title text="电网故障统计" wid="130px" />
      <div class="loss-total">
        损失电总量：{{lossTotal}}(万千瓦时)
      </div>
      <r-search
      ref="search"
      @doQuery="doQuery"
      @exportCsv="exportCsv"
      style="margin: 9px 0 0 9px" />
      <!-- :row-class-name="diyStripe" -->
      <Table
        border
        stripe
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :row-class-name="rowClassName"
        @on-current-change="currentChange"
        height="450"
        highlight-row
        ref="curTable"
        style="margin-top: 10px;"
      />
      <div class="bottom" v-show="showBottom">
        <div class="warn-detail">
          <div class="select">
            <Select v-model="sValue" style="width:100px" @on-change="warnChange">
              <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <r-title text="变电站警告详情" wid="150px" style="margin-bottom: 20px;"/>
          <single-warn-detail
            class="first"
            v-for="(item, index) in warnDetailList"
            :key="item.id"
            :list="item.list"
            :date="item.date"
            :isLast="index === warnDetailList.length - 1"
            :index="index"
          />
        </div>
        <div class="loss-count">
          <r-title text="损失电量统计" wid="130px" />
          <div class="loss-charts-wrapper">
            <div class="pie-charts" ref="pieCharts">

            </div>
            <div class="count-progress">
              <div>
                <div class="desc">
                  <span>损失电量</span>
                  <p>
                    <span class="number">{{currentRow.ssdl || 0}}</span>
                    <span>万千瓦时</span>
                  </p>
                </div>
                <Progress :percent="ssdlPer" :stroke-width="18" :stroke-color="['#f0a991', '#f7845b']" hide-info/>
              </div>
              <div style="margin-top: 60px;">
                <div class="desc">
                  <span>实际电量</span>
                  <p>
                    <span class="number">{{currentRow.sjdl || 0}}</span>
                    <span>万千瓦时</span>
                  </p>
                </div>
                <Progress :percent="sjdlPer" :stroke-width="18" :stroke-color="['#c0e7ed', '#24ccd2']" hide-info/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import title from '../components/title'
import search from './faultTripSearch'
import singleWarnDetail from './singleWarnDetail'
import { tripColumns } from '../config/fault'
import Echarts from 'echarts/lib/echarts'
import { pieOptions } from '@/utils/chartsOptions'
import { Progress, Select, Option } from 'view-design'
import { getFaultTripList, getFaultTripDetail } from '@/services/index'
import { json2excel } from '@/utils/tools'
import XLSX from 'xlsx'
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  components: {
    'r-title': title,
    'r-search': search,
    singleWarnDetail,
    Select,
    Option,
    Progress
  },
  data () {
    return {
      pieCharts: null,
      columns: tripColumns,
      showBottom: false,
      loading: false,
      currentRow: {},
      ssdlPer: 0,
      sjdlPer: 0,
      lossTotal: '',
      selectList: [{
        label: '10分钟',
        value: 10
      }, {
        label: '30分钟',
        value: 30
      }, {
        label: '1小时',
        value: 60
      }, {
        label: '6小时',
        value: 360
      }, {
        label: '1天',
        value: 1440
      }],
      sValue: 1440,
      warnDetailList: [],
      tableData: []
    }
  },
  mounted () {
    // this.initCharts()
    this.pieCharts = Echarts.init(this.$refs.pieCharts)
    this.$refs.search.query(3)
  },
  methods: {
    exportCsv () {
      let columns = JSON.parse(JSON.stringify(tripColumns))
      columns.shift()
      columns[0].key = 'cxsj'
      // this.$refs.curTable.exportCsv({
      //   fileName: 'table.csv',
      //   columns: columns,
      //   data: this.tableData
      // })
      let copyData = this.tableData.map(v => {
        let data = {}
        columns.forEach(e => {
          if (e.key) {
            data[e.title] = v[e.key]
          }
        })
        return data
      })
      json2excel(XLSX, copyData)
    },
    diyStripe (row, index) {
      if (index & (1 !== 0)) {
        return 'stripe-back'
      }
    },
    warnChange (val) {
      this.currentChange(this.currentRow)
    },
    rowClassName () {
      return 'mouse-hand'
    },
    currentChange (currentRow) {
      this.showBottom = true
      this.getBottomData(currentRow)
      this.currentRow = currentRow
    },
    getBottomData (param) {
      getFaultTripDetail({
        cxsj: param.cxsj || '',
        jgmc: param.jgmc || '',
        sc: this.sValue || '',
        jdgz: param.jdgz || '',
        gzqk: param.gzqk || ''
      }).then(res => {
        this.setBottomData(res.data)
      })
      this.initCharts(param)
      this.ssdlPer = (Math.abs(param.ssdl) / (Math.abs(param.ssdl) + Math.abs(param.sjdl))).toFixed(2) * 100
      this.sjdlPer = (Math.abs(param.sjdl) / (Math.abs(param.ssdl) + Math.abs(param.sjdl))).toFixed(2) * 100
    },
    setBottomData (list) {
      let len = list.length
      if (len === 0) {
        this.warnDetailList = []
      } else {
        let arr = []
        let date = list[0].date
        let obj = {
          date: date,
          list: []
        }
        for (let i = 0; i < len; i++) {
          list[i].id = i + 100
          obj.id = i + 10000
          if (date === list[i].date) {
            obj.list.push(list[i])
          } else {
            arr.push(JSON.parse(JSON.stringify(obj)))
            date = list[i].date
            obj = {
              date,
              list: [list[i]]
            }
          }
        }
        arr.push(JSON.parse(JSON.stringify(obj)))
        this.warnDetailList = arr
      }
    },
    doQuery (param) {
      this.getTableData(param)
    },
    getTableData (param) {
      this.loading = true
      getFaultTripList({
        startDate: param.startTime,
        endDate: param.endTime
      }).then(res => {
        this.loading = false
        let data = res.data.map(v => {
          // v.startTime = v.cxsj.slice(0, 10)
          v.cxsj = v.cxsj.length <= 16 ? (v.cxsj + ':00') : v.cxsj
          v.startTime = v.cxsj.replace(' ', '\n')
          return v
        })
        if (data.length !== 0) {
          let arr = data.map(v => {
            if (!v.ssdl) {
              return 0
            }
            return v.ssdl
          })
          this.lossTotal = arr.reduce((pre, cur) => {
            return pre + cur || 0
          }).toFixed(2)
        }
        this.tableData = data
        if (data.length !== 0) {
          this.showBottom = true
          this.currentRow = data[0]
          this.getBottomData(data[0])
        }
      })
    },
    initCharts (param) {
      this.pieCharts.setOption(pieOptions(
        (Number(param.ssdl) + Number(param.sjdl)).toFixed(2) + '万千瓦时\n设备损失电量统计',
        [{
          name: '损失电量',
          value: param.ssdl
        }, {
          name: '实际电量',
          value: param.sjdl
        }],
        ['60%', '80%'],
        ['30%', '50%'],
        {
          show: false
        },
        false,
        ['#f78259', '#13c9cf'],
        {
          x: 30,
          y: 80
        }
      ))
    }
  }
}
</script>
<style lang="stylus" scoped>
.fault-trip /deep/ .ivu-table-wrapper-with-border
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
    .preline
      span
        white-space break-spaces
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
        .mouse-hand
          cursor pointer
.fault-trip
  margin 0 10px
  background-color white
  padding 10px 19px
  position relative
  .loss-total
    position absolute
    right 20px
    top 52px
    font-size 18px
  .bottom
    margin-top 19px
    border-top 1px dashed #c4eaec
    display flex
    justify-content flex-start
    align-items flex-start
    padding-top 10px
    .warn-detail
      width 47%
      border-right 1px dashed
      position relative
      border-image linear-gradient(white, #c4eaec, white) 1 1
      .first
        &:nth-of-type(1)
          margin-top 20px
      .select
        position absolute
        top 0
        left 180px
    .loss-count
      margin-left 3%
      .loss-charts-wrapper
        width 600px
        height 200px
        margin-left 40px
        display flex
        justify-content flex-start
        align-items center
        .pie-charts
          width 300px
          height 200px
        .count-progress
          width 300px
          height 100%
          .desc
            display flex
            justify-content space-between
            align-items flex-start
            padding 2px 5px
          .number
            padding 0 4px
            font-size 18px
            font-weight bold
</style>
