<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">日期: </span>
        <span class="expand-value">{{ row.date }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">调度电量: </span>
        <span class="expand-value">{{ row.dispatchElect }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">最高调度负荷: </span>
        <span class="expand-value">{{ row.dispatchTopConstract }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">最低调度负荷: </span>
        <span class="expand-value">{{ row.dispatchLowConstract }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">峰谷差: </span>
        <span class="expand-value">{{ row.peakValleyDiff }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">负荷率: </span>
        <span class="expand-value">{{ row.loadRate }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
import { Row, Col } from 'view-design'
export default {
  components: {
    Row,
    Col
  },
  props: ['row']
}
</script>
<style lang="stylus" scoped>
  .expand-row
    margin-bottom 20px
    .expand-value
      margin-left 10px
</style>
