<template>
  <div class="risk-wrapper">
    <Row class="content">
      <Col span="12">
        <div class="chart-block">
          <div class="title">
            <aside class="left">
              <i class="iconfont iconfenleiliebiao sky-blue" style="margin-right: 5px;"></i>
              <b>风险预警统计</b>
            </aside>
            <aside class="right">
              <Button :type="btnType[0]" size="small" class="year-btn">2020</Button>
              <Button :type="btnType[1]" size="small" class="year-btn">2019</Button>
              <Button :type="btnType[2]" size="small" class="year-btn">2018</Button>
            </aside>
          </div>
          <div class="desc">
            <div>
              <div class="risk-top-wrapper">
                <div class="line">
                  <i class="line-straight"></i>
                </div>
                <div class="day">
                  <span class="day-num">50</span>天
                </div>
              </div>
              <div class='risk-bottom-wrapper'>
                <div class="name">累计风险预警数:</div>
                <div class='count'>
                  <span class="sky-blue">0</span>
                  个
                </div>
              </div>
            </div>
            <div>
              <div class="risk-top-wrapper">
                <div class="line">
                  <i class="line-straight" style="background: #F58E79;"></i>
                </div>
                <div class="day">
                  <span class="day-num">20</span>天
                </div>
              </div>
              <div class='risk-bottom-wrapper'>
                <div class="name">累计风险预警数:</div>
                <div class='count'>
                  <span class="color-self-orange">2</span>
                  个
                </div>
              </div>
            </div>
            <div>
              <div class="risk-top-wrapper">
                <div class="line">
                  <i class="line-straight" style="background: #1BD7D9;"></i>
                </div>
                <div class="day">
                  <span class="day-num color-cyan">14</span>天
                </div>
              </div>
              <div class='risk-bottom-wrapper'>
                <div class="name">累计风险预警数:</div>
                <div class='count'>
                  <span class="sky-blue">1</span>
                  个
                </div>
              </div>
            </div>
            <div>
              <div class="risk-top-wrapper">
                <div class="line">
                  <i class="line-straight" style="background: #7D4FEF;"></i>
                </div>
                <div class="day">
                  <span class="day-num color-purple">31</span>天
                </div>
              </div>
              <div class='risk-bottom-wrapper'>
                <div class="name">累计风险预警数:</div>
                <div class='count'>
                  <span class="sky-blue">0</span>
                  个
                </div>
              </div>
            </div>
          </div>
          <div class="progress">
            <div class="progress-left">
              <p>风险预警总数：<span class="sky-blue">59</span>个</p>
            </div>
            <div class="progress-center progress-inner-wrapper">
              <div class="center-wrapper">
                <span style="white-space: nowrap;">时长>5天</span>
                <Progress stroke-color="#1BD7D9" :stroke-width="8" style="width: 50%;" :percent="45" status="active" hide-info/>
                <span class="number">45</span>
              </div>
              <div class="center-wrapper" style="margin-top: 10px;">
                <span style="white-space: nowrap;">时长>10天</span>
                <Progress stroke-color="#1BD7D9" :stroke-width="8" style="width: 50%;" :percent="10" status="active" hide-info/>
                <span class="number">10</span>
              </div>
            </div>
            <div class="progress-inner-wrapper progress-center">
              <div class="center-wrapper">
                <span style="white-space: nowrap;">时长>5天</span>
                <Progress stroke-color="#1BD7D9" :stroke-width="8" style="width: 50%;" :percent="45" status="active" hide-info/>
                <span class="number">45</span>
              </div>
              <div class="center-wrapper" style="margin-top: 10px;">
                <span style="white-space: nowrap;">时长>10天</span>
                <Progress stroke-color="#1BD7D9" :stroke-width="8" style="width: 50%;" :percent="10" status="active" hide-info/>
                <span class="number">10</span>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block" style="margin-top: 10px;">
          <div class="title">
            <aside class="left">
              <i class="iconfont iconfenleiliebiao sky-blue" style="margin-right: 5px;"></i>
              <b>未来七天风险预警执行计划</b>
            </aside>
          </div>
          <div class="charts-wrapper">
            <riskPlan></riskPlan>
          </div>
        </div>
        <div class="chart-block" style="margin-top: 10px;">
          <div class="title">
            <aside class="left">
              <i class="iconfont iconfenleiliebiao sky-blue" style="margin-right: 5px;"></i>
              <b>风险预警对比</b>
            </aside>
          </div>
          <div class="charts-wrapper">
            <warningComp></warningComp>
          </div>
        </div>
      </Col>
      <Col span="11" offset="1">
        <div class="chart-block">
          <div class="title">
            <aside class="left">
              <i class="iconfont iconfenleiliebiao sky-blue" style="margin-right: 5px;"></i>
              <b>正在执行风险预警(连续)</b>
            </aside>
            <aside class="right">
              <span class="color-self-orange" style="margin-right: 10px;">5级1</span>
              <span class="color-self-orange" style="margin-right: 10px;">5级2</span>
              <span class="color-self-orange" style="margin-right: 10px;">7级1</span>
              <i class="iconfont iconquanping sky-blue" style="font-size: 20px;cursor: pointer;"></i>
            </aside>
          </div>
        </div>
        <div class="Collapse-wrapper">
          <warnList></warnList>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { Row, Col, Progress } from 'view-design'
import riskPlan from './riskPlan'
import warningComp from './warningComp'
import warnList from './warnList'
export default {
  components: {
    Row, Col, Progress, riskPlan, warningComp, warnList
  },
  data () {
    return {
      btnType: ['info', 'default', 'default']
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.risk-wrapper
  width 100%
  height 100%
  background white
  padding 10px
  .title
    padding 10px 15px
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid #eee
    .left
      display flex
      justify-content space-between
      align-items center
      font-size 14px
    .right
      display flex
      justify-content flex-start
      align-items center
      .year-btn
        margin-left 5px
  .desc
    width 100%
    display flex
    justify-content space-between
    align-items center
    margin-top 15px
    .risk-top-wrapper
      width 180px
      display flex
      justify-content space-between
      align-items center
      .line
        width 70%
        display flex
        justify-content center
        align-items center
        .line-straight
          width 100px
          display inline-block
          height 2px
          background-color #389FFF
      .day
        width 30%
        .day-num
          font-size 16px
          font-weight bold
    .risk-bottom-wrapper
      width 180px
      display flex
      justify-content space-between
      align-items center
      .name
        width 70%
        text-align center
      .count
        width 30%
  .progress
    margin-top 10px
    width 100%
    height 100px
    padding 10px
    background-color #f9f9f9
    display flex
    justify-content space-between
    align-items center
    .progress-left
      width 25%
      text-align center
      border-right 1px solid #ccc
    .progress-inner-wrapper
      width 32%
      .center-wrapper
        display flex
        justify-content space-between
        align-items center
        .number
          padding 1px 10px
          font-size 12px
          border-radius 10px
          background-color #A5BBD3
          color white
  .Collapse-wrapper
    width 100%
</style>
