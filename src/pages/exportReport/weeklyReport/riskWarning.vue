<template>
  <div class="warning">
    <Table
      :columns="columns"
      :data="data"
      stripe
      border
      style="margin-top: 25px;"
      ref="table"
      max-height="600"
      :loading="loading"
    >
    </Table>
  </div>
</template>

<script>
import { riskWarning } from '@/services/dataMaintenance'
export default {
  data () {
    return {
      data: [],
      columns: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '责任单位',
        key: 'company',
        align: 'center'
      }, {
        title: '停电时间',
        key: 'closeTime',
        align: 'center'
      }, {
        title: '停电范围',
        key: 'closeRange',
        align: 'center'
      }, {
        title: '危险源点分析',
        key: 'riskAna',
        align: 'center',
        tooltip: true
      }, {
        title: '预控责任单位',
        key: 'preControl',
        align: 'center',
        tooltip: true
      }, {
        title: '预控措施',
        key: 'preMeasures',
        align: 'center',
        tooltip: true
      }],
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      riskWarning().then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.warning
  width 100%
</style>
