<template>
  <div class="main">
    <Tabs value="countanalyse">
      <TabPane label="统计分析" name="countanalyse">
        <countanalyse />
      </TabPane>
      <TabPane label="综合查询" name="compquery">
        <compquery />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import countanalyse from './countAnalyse/index'
import compquery from './compQuery/index'
import { Tabs, TabPane } from 'view-design'
export default {
  components: {
    countanalyse,
    compquery,
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
