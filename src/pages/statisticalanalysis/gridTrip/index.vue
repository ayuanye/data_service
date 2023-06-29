<template>
  <div class="main">
    <Tabs value="gtcountanalyse">
      <TabPane label="统计分析" name="gtcountanalyse">
        <gtcountanalyse />
      </TabPane>
      <TabPane label="综合查询" name="gtcompquery">
        <gtcompquery />
      </TabPane>
      <TabPane label="事故分闸" name="opening">
        <opening />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import gtcountanalyse from './countAnalyse/index'
import gtcompquery from './compQuery/index'
import opening from './opening/index'
import { Tabs, TabPane } from 'view-design'
export default {
  components: {
    gtcountanalyse,
    gtcompquery,
    opening,
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
