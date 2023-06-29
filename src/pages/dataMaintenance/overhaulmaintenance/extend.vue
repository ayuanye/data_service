<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">停电时间: </span>
        <span class="expand-value">{{ row.closeElectTime }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">停电范围: </span>
        <span class="expand-value">{{ row.closeElectRange }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">停电编号: </span>
        <span class="expand-value">{{ row.number }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">许可人: </span>
        <span class="expand-value">{{ row.permissionGuy }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">危险源电分析: </span>
        <span class="expand-value">{{ row.riskAnalizy }}</span>
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
