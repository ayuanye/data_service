<template>
  <div class="limitcount">
    <div class="search">
      <div class="option-wrapper">
        <Button type="info">上一天</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">下一天</Button>
      </div>
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          v-model="date"
          format="yyyy-MM-dd"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">导出word</Button>
      </div>
    </div>
    <div class="content">
      <h2 class="title">公司晨会调控汇报材料（{{day}}）</h2>
      <div class="article">
        <h3 class="sec-title">一、昨日电网运行情况</h3>
        <p class="text">
          {{day}}生产情况：网供最高负荷<span class="sky-blue">128.38</span>千瓦，
          地区最高负电荷<span class="sky-blue">145.89</span>万千瓦时，
          网供电量<span class="sky-blue">2718</span>万千瓦时，同比增长
          <span class="sky-blue">0.68%</span>；地区电量<span class="sky-blue">2808</span>万千瓦时，
          同比增长<span class="sky-blue">0.83%</span>；今年累计网供电量<span class="sky-blue">169643.02</span>万千瓦时，
          同比增长<span class="sky-blue">-21.9%</span>；今年累计地区电量<span class="sky-blue">180535.30</span>万千瓦时，
          同比增长<span class="sky-blue">-21.8%</span>；
          跳闸情况：今日10kv成功1条；单相接地0条。
        </p>
        <h3 class="sec-title" style="margin-top: 10px;">二、昨日电网故障及异常</h3>
        <Table
          :columns="columns"
          :data="data"
          stripe
          border
          style="margin-top: 25px;"
          ref="table"
          max-height="400"
          :loading="loading"
        >
        </Table>
        <h3 class="sec-title" style="margin-top: 20px;">三、今日电网危险源点</h3>
        <Table
            :columns="columnsR"
            :data="dataR"
            stripe
            border
            style="margin-top: 25px;"
            ref="table"
            max-height="600"
            :loading="loadingR"
          >
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/tools'
import { dailyFault, dailyRisk } from '@/services/dataMaintenance'
export default {
  data () {
    return {
      columnsR: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '停电时间',
        key: 'closeTime',
        align: 'center'
      }, {
        title: '停电范围',
        key: 'closeRange',
        align: 'center'
      }, {
        title: '停电单编号',
        key: 'closeNumber',
        align: 'center'
      }, {
        title: '许可人',
        key: 'permissioner',
        align: 'center'
      }, {
        title: '危险源点分析',
        key: 'riskAna',
        align: 'center'
      }],
      dataR: [],
      loadingR: false,
      data: [],
      loading: false,
      columns: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '出现时间',
        key: 'startTime',
        align: 'center'
      }, {
        title: '场所',
        key: 'place',
        align: 'center'
      }, {
        title: '事故情况',
        key: 'condition',
        align: 'center'
      }],
      date: new Date()
    }
  },
  computed: {
    day () {
      return dateFormat('YYYY年mm月dd日', this.date)
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.loadingR = true
      dailyFault().then(res => {
        this.data = res.data
        this.loading = false
      })
      dailyRisk().then(res => {
        this.dataR = res.data
        this.loadingR = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .limitcount/deep/.ivu-table-tip
    overflow-x hidden
  .limitcount
    contentWrapper()
    .search
      width: 100%
      box-sizing: border-box
      display: flex
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
      margin-top 10px
      padding 10px
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      .title
        font-weight bold
        font-size 18px
        text-align center
      .article
        width 1000px
        margin-top 20px
        line-height 30px
        .sec-title
          font-size 16px
          font-weight bold
        .text
          font-size 14px
          text-indent 30px
</style>
