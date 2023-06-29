<template>
  <div class="main">
    <Tabs value="dispatchdaymaintence">
      <TabPane label="调度日电量维护" name="dispatchdaymaintence">
        <dispatchdaymaintence />
      </TabPane>
      <TabPane label="旁代补电量维护" name="sidesupplement">
        <sidesupplement />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import dispatchdaymaintence from './dispatchDayMaintenance/index'
import sidesupplement from './sideSupplement/index'
import { Tabs, TabPane } from 'view-design'
export default {
  components: {
    dispatchdaymaintence,
    sidesupplement,
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
