<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">申请单编号: </span>
        <span class="expand-value">{{ row.number }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">停电场所: </span>
        <span class="expand-value">{{ row.place }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">停电范围: </span>
        <span class="expand-value">{{ row.range }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">申请单位: </span>
        <span class="expand-value">{{ row.applyComp }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">工作内容: </span>
        <span class="expand-value">{{ row.content }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">开始停电时间: </span>
        <span class="expand-value">{{ row.startTime }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <span class="expand-key">停电结束时间: </span>
        <span class="expand-value">{{ row.endTime }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">危险源点分析: </span>
        <span class="expand-value">{{ row.riskAna }}</span>
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
