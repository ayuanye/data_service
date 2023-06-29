<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">日期: </span>
        <span class="expand-value">{{ row.date }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">线路名称: </span>
        <span class="expand-value">{{ row.name }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">应补电量: </span>
        <span class="expand-value">{{ row.supplyElect }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">开始时间: </span>
        <span class="expand-value">{{ row.startTime }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">结束时间: </span>
        <span class="expand-value">{{ row.endTime }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">原因: </span>
        <span class="expand-value">{{ row.reason }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <span class="expand-key">调度员: </span>
        <span class="expand-value">{{ row.dispatcher }}</span>
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
