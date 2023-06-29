<template>
  <div class="limitcount">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          v-model="frontDate"
          format="yyyy-MM-dd"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <span>至:</span>
        <DatePicker
          type="date"
          v-model="afterDate"
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
      <h2 class="title">2020年周报第七期（{{frontDay}}~{{afterDay}}）</h2>
      <div class="page-head">
        <aside>
          宜兴市供电公司电力调度控制分中心编制
        </aside>
        <aside>
          {{day}}
        </aside>
      </div>
      <div class="article">
        <h3 class="sec-title">一、电网负荷，电量情况</h3>
        <electLoad></electLoad>
        <h3 class="sec-title">二、本周电网异常，故障情况</h3>
        <electFault></electFault>
        <h3 class="sec-title title-aside">
          <aside>三、本周主网设备检修情况（{{frontDay}}~{{afterDay}}）</aside>
          <aside>
            本周停电计划执行率: <span class="sky-blue">100%</span>
          </aside>
        </h3>
        <deviceOverhaul></deviceOverhaul>
        <h3 class="sec-title">四、下周宜兴主网风险预警、危险源点分析及预控措施（{{frontDay}}~{{afterDay}}）</h3>
        <riskWarning></riskWarning>
        <h3 class="sec-title">五、下周宜兴配网停电计划及预控措施（{{frontDay}}~{{afterDay}}）</h3>
        <closePlan></closePlan>
        <h3 class="sec-title">六、本周110kv及以下变电站主变压器过70%负荷统计表（{{frontDay}}~{{afterDay}}）</h3>
        <overload></overload>
        <h3 class="sec-title">七、本周35kv及以下路线过70%负荷统计（{{frontDay}}~{{afterDay}}）</h3>
        <routeOverload></routeOverload>
        <h3 class="sec-title" style="color: red;">注:红色为新增</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/tools'
import electLoad from './electLoad'
import electFault from './electFault'
import deviceOverhaul from './deviceOverhaul'
import riskWarning from './riskWarning'
import closePlan from './closePlan'
import overload from './overload'
import routeOverload from './routeOverload'
export default {
  components: {
    electLoad,
    electFault,
    deviceOverhaul,
    riskWarning,
    closePlan,
    overload,
    routeOverload
  },
  data () {
    return {
      frontDate: new Date(),
      afterDate: new Date()
    }
  },
  computed: {
    frontDay () {
      return dateFormat('m.dd', this.frontDate)
    },
    afterDay () {
      return dateFormat('m.dd', this.afterDate)
    },
    day () {
      return dateFormat('YYYY年mm月dd日', this.frontDate)
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
      .page-head
        width 1400px
        margin-top 10px
        padding-bottom 5px
        border-bottom 2px solid #ccc
        display flex
        justify-content space-between
        align-items flex-start
        font-weight bold
        font-size 18px
      .article
        width 1400px
        .sec-title
          margin-top 20px
          font-size 16px
          font-weight bold
        .title-aside
          display flex
          justify-content space-between
          align-items flex-start
</style>
