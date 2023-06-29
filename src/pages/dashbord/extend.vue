<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key">Name: </span>
        <span class="expand-value">{{ row.name }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">Age: </span>
        <span class="expand-value">{{ row.age }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <span class="expand-key">address: </span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">Date: </span>
        <span class="expand-value">{{ row.date }}</span>
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
</style>
