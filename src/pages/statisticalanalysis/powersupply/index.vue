<template>
  <div class="main">
    <Tabs value="dailyLoadElectricity">
      <TabPane label="每日调度负荷电量" name="dailyLoadElectricity">
        <dailyLoadElectricity />
      </TabPane>
      <TabPane label="调度负荷电量月报" name="monthlyreportform">
        <monthlyreportform />
      </TabPane>
      <TabPane label="负荷电量季报" name="quarterreportform">
        <quarterreportform />
      </TabPane>
      <TabPane label="负荷电量月度分析" name="monthlyanalysis">
        <monthlyanalysis />
      </TabPane>
      <TabPane label="年度调度供用电情况汇总" name="yearlysummary">
        <yearlysummary />
      </TabPane>
      <TabPane label="旁补代电量" name="pangbudaielect">
        <pangbudaielect />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import dailyLoadElectricity from './dailyLoadElectricity/index'
import monthlyreportform from './monthlyReportform/index'
import quarterreportform from './quarterReportform/index'
import monthlyanalysis from './monthlyAnalysis/index'
import yearlysummary from './yearlySummary/index'
import pangbudaielect from './pangBuDaiElect/index'
import { Tabs, TabPane } from 'view-design'
export default {
  components: {
    dailyLoadElectricity,
    monthlyreportform,
    quarterreportform,
    monthlyanalysis,
    yearlysummary,
    pangbudaielect,
    Tabs,
    TabPane
  }
}
</script>

<style lang="stylus" scoped>
.main
  width: 100%;
  height: 100%;
  background-color: white;
</style>
