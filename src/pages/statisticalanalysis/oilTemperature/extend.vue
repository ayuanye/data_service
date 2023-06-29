<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">日期: </span>
        <span class="expand-value">{{ row.date }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">变电站: </span>
        <span class="expand-value">{{ row.bdz }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">主变: </span>
        <span class="expand-value">{{ row.zb }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">油温: </span>
        <span class="expand-value">{{ row.yw }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">负荷: </span>
        <span class="expand-value">{{ row.fh }}</span>
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
