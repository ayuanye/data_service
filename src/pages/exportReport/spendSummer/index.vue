<template>
  <div class="spend-summer">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          format="yyyy-MM-dd"
          v-model="date"
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
      <h2 class="title color-red">迎峰度夏电网运行日报</h2>
      <div class="title aside">
        <aside>
          无锡供电公司电力调度中心
        </aside>
        <aside>
          {{day}}
        </aside>
      </div>
      <h3 class="sec-title">一、天气情况</h3>
      <div class="article">无锡地区天气<span class="color-red">暴雨</span>,最高气温<span class="color-red">27℃</span>,最低气温<span class="color-red">24℃</span></div>
      <h3 class="sec-title">二、电网运行情况</h3>
      <h4 class="third-title">1、主网:</h4>
      <h4 class="third-title" style="text-indent: 30px;">事故跳闸<span class="color-self-orange">0</span>条次</h4>
      <div class="table-wrapper">
        <masterPG></masterPG>
      </div>
      <h4 class="third-title">2、配网:</h4>
      <h4 class="third-title" style="text-indent: 30px;">事故跳闸<span class="color-self-orange">13</span>条次</h4>
      <div class="table-wrapper">
        <distPG></distPG>
      </div>
      <h3 class="sec-title">三、负荷电量情况</h3>
      <h4 class="third-title" style="text-indent: 30px;">全省最高调度负荷<span class="color-self-orange">95096</span>MW</h4>
      <h4 class="third-title" style="text-indent: 30px;">调度口径负荷情况:(单位:兆瓦、万千瓦时)</h4>
      <div class="table-wrapper">
        <loadElect></loadElect>
      </div>
      <h3 class="sec-title">四、抢修工单情况</h3>
      <div class="table-wrapper">
        <workOrder></workOrder>
      </div>
      <h3 class="sec-title">五、设备超重载</h3>
      <h4 class="third-title">1、线路情况:(≥70%限额)</h4>
      <div class="table-wrapper">
        <overload></overload>
      </div>
      <h4 class="third-title">2、主变情况:(≥70%限额)</h4>
      <div class="table-wrapper">
        <masCond></masCond>
      </div>
      <h4 class="third-title" style="text-indent: 30px;">注:不统计代供方式</h4>
      <h3 class="sec-title">六、今日电网危险源点</h3>
      <div class="table-wrapper">
        <risk></risk>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/tools'
import masterPG from './masterPowerGrid'
import distPG from './distPowerGrid'
import loadElect from './loadElect'
import workOrder from './workOrder'
import overload from './overLoad'
import masCond from './masCond'
import risk from './risk'
export default {
  components: {
    masterPG,
    distPG,
    loadElect,
    workOrder,
    overload,
    masCond,
    risk
  },
  data () {
    return {
      date: new Date()
    }
  },
  computed: {
    day () {
      return dateFormat('YYYY年mm月dd日', this.date)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.spend-summer/deep/.ivu-table-tip
  overflow-x hidden
.spend-summer
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
      width 90%
      font-weight bold
      font-size 18px
      text-align center
    .aside
      display flex
      justify-content space-between
      align-items flex-start
      margin-top 10px
      border-bottom 2px solid #f00
    .sec-title
      width 90%
      margin-top 20px
      font-size 16px
      font-weight bold
    .article
      width 90%
      margin-top 20px
      font-size 15px
      text-indent 30px
    .third-title
      width 90%
      margin-top 20px
      font-size 15px
      font-weight bold
    .table-wrapper
      width 90%
</style>
