<!-- created by rbb-->
<template>
  <div class="fault-count">
    <r-search
      @doQuery="doQuery"
      :showClassification="true"
      :selectList="classificationList"
      :defaultStartTime="defaultStartTime"
      :defaultEndTime="defaultEndTime"
      :defaultClassification="defaultClassification"
      ref="search"
    />
    <div class="content-wrapper">
      <div class="left">
        <count-bar :barData="barData" :startTime="startTime" :endTime="endTime" :classification="classification"/>
        <div class="table-wrapper">
          <Table border :columns="columns" :data="tableData" :loading="loading"> </Table>
        </div>
      </div>
      <div class="right">
        <count-pie :pieData="pieData" />
        <p>
          从{{ startTime }}至{{ endTime }}，宜兴主网线路故障共计<span
            class="number"
            >{{ total }}</span
          >条次
        </p>
        <div class="reason">
          <div class="list-wrapper">
            <p>
              <span class="reason-number blue">{{ tripFault }}</span
              >条次
            </p>
            <p class="name">跳闸故障</p>
          </div>
          <div class="list-wrapper">
            <p>
              <span class="reason-number green">{{ success }}</span
              >条次
            </p>
            <p class="name">重合成功</p>
          </div>
          <div class="list-wrapper">
            <p>
              <span class="reason-number purple">{{ touchGround }}</span
              >条次
            </p>
            <p class="name">接地故障</p>
          </div>
          <div class="list-wrapper">
            <p>
              <span class="reason-number">{{ increase }}</span
              >%
            </p>
            <p class="name">同比增长</p>
          </div>
        </div>
        <h3 class="title-third">故障原因统计</h3>
        <ul class="bottom-list">
          <li class="list" v-for="item in reasonCountList" :key="item.color">
            <aside>
              {{ item.reason }}引起<span :class="['num', item.color]">{{
                item.num
              }}</span
              >条次
            </aside>
            <aside>
              占比<span class="num">{{ item.percent }}</span>
            </aside>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import faultCountSearch from './faultCountSearch'
import countBar from './faultCountBar'
import countPie from './faultCountPie'
import { countColumns } from '../config/fault'
import { getFaultCountList } from '@/services/index'
export default {
  components: {
    'r-search': faultCountSearch,
    'count-bar': countBar,
    'count-pie': countPie
  },
  data () {
    return {
      columns: countColumns,
      defaultStartTime: this.$route.params.defaultStartTime || undefined,
      defaultEndTime: this.$route.params.defaultEndTime || undefined,
      defaultClassification: this.$route.params.classification || undefined,
      barData: [],
      pieData: {},
      total: '',
      tripFault: '',
      success: '',
      touchGround: '',
      increase: '',
      startTime: '',
      endTime: '',
      classification: '',
      loading: false,
      classificationList: [
        {
          value: '厂站'
        },
        {
          value: '线路'
        }
      ],
      reasonCountList: [
        {
          color: 'blue'
        },
        {
          color: 'green'
        },
        {
          color: 'yellow'
        }
      ],
      tableData: []
    }
  },
  mounted () {
    this.$refs.search.query()
  },
  methods: {
    doQuery (param) {
      this.loading = true
      this.getData(param)
      this.startTime = param.startTime
      this.endTime = param.endTime
      this.classification = param.classification
      // this.$router.push({
      //   name: 'faultCountInfo',
      //   params: {
      //     name: '',
      //     startTime: param.startTime,
      //     endTime: param.endTime,
      //     classification: param.classification
      //   }
      // })
    },
    getData (param) {
      getFaultCountList({
        startDate: param.startTime,
        endDate: param.endTime,
        category: param.classification
      }).then((res) => {
        this.loading = false
        let data = res.data
        this.barData = data.barChartData
        this.tableData = data.tableData
        this.pieData = data.circularGraphChartData
        this.total = data.gzzs
        this.tripFault = data.tzgz
        this.success = data.chcg
        this.touchGround = data.jdlt
        this.increase = data.tbzz
        this.setReasonList(data.circularGraphChartData)
      })
    },
    setReasonList (data) {
      let arr = []
      let totalNum = 0
      Object.keys(data).forEach((e) => {
        arr.push({
          reason: e,
          num: data[e]
        })
      })
      totalNum = arr.reduce((total, item) => {
        return total + item.num
      }, 0)
      arr = arr.map((v, index) => {
        v.percent = ((v.num / totalNum) * 100).toFixed(2) + '%'
        let mod = index % 3
        switch (mod) {
          case 0: v.color = 'blue'; break
          case 1: v.color = 'green'; break
          case 2: v.color = 'yellow'; break
        }
        return v
      })
      this.reasonCountList = arr
    }
  }
}
</script>
<style lang="stylus" scoped>
.blue
  color #2d9cd0
.green
  color #0bb8a6
.purple
  color #6e9ab5
.fault-count /deep/ .ivu-table
  .fault-number
    color #f38664
    border-right-color #acd7ec
  .fault-elect
    border-right-color #fbd7cb
  .fault-stop
    border-right-color #b3cfed
  .ivu-table-tip
    overflow-x hidden
  .ivu-table-header
    tr
      &:nth-of-type(1)
        th.ivu-table-column-center
          &:nth-of-type(1)
            border-right-color #fbd7cb
            background #f6f6f6
          &:nth-of-type(2)
            background #f7ede9
            border-right-color #acd7ec
          &:nth-of-type(3)
            background #d8f1fd
            border-right-color #b3cfed
          &:nth-of-type(4)
            background #d8eafd
      &:nth-of-type(2)
        th.ivu-table-column-center
          background #ecf9ff
          &:nth-of-type(n + 5)
            background #edf5fc
          &:nth-of-type(4)
            border-right-color #b3cfed
    .ivu-table-cell
      padding 0
.fault-count
  margin 0 10px
  background-color white
  padding 20px
  .content-wrapper
    margin-top 10px
    display flex
    justify-content flex-start
    align-items flex-start
    background-color #f1fafc
    border 1px solid #c4eaec
    .left
      width 75%
      border-right 1px dashed #c4eaec
      .table-wrapper
        padding 20px 15px 0
        border-top 1px dashed #c4eaec
        margin-bottom 20px
    .right
      width 25%
      padding 0 20px
      .number
        font-size 16px
        color #f5943d
        padding 0 4px
      .reason
        height 100px
        background-color white
        display flex
        justify-content space-around
        align-items center
        font-size 15px
        margin-top 10px
        .list-wrapper
          &:nth-child(3)
            padding-right 20px
            border-right 1px dashed #c4c4c4
          .reason-number
            font-weight bold
            font-size 16px
            padding 0 4px
          .name
            margin-top 5px
      .title-third
        margin-top 20px
        font-size 15px
        font-weight bold
        color #555
      .bottom-list
        background-color white
        padding 20px
        margin-top 15px
        .list
          display flex
          justify-content space-between
          align-items flex-start
          padding-bottom 10px
          &:last-child
            padding-bottom 0
          .num
            font-size 16px
            font-weight bold
            padding 0 4px
</style>
