<template>
  <div class="plan">
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
import { closePlan } from '@/services/dataMaintenance'
export default {
  data () {
    return {
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
        align: 'center',
        tooltip: true
      }, {
        title: '施工及分包单位',
        key: 'construction',
        align: 'center',
        tooltip: true
      }, {
        title: '停电场所',
        key: 'place',
        align: 'center',
        tooltip: true
      }, {
        title: '电压等级',
        key: 'level',
        align: 'center',
        tooltip: true
      }, {
        title: '停电间隔或线路',
        key: 'interval',
        align: 'center',
        tooltip: true
      }, {
        title: '工作内容',
        key: 'content',
        align: 'center',
        tooltip: true
      }, {
        title: '工作开始',
        key: 'start',
        align: 'center',
        tooltip: true
      }, {
        title: '工作结束',
        key: 'end',
        align: 'center',
        tooltip: true
      }, {
        title: '停、送电时间',
        key: 'time',
        align: 'center',
        tooltip: true
      }, {
        title: '对外停电',
        key: 'isClose',
        align: 'center',
        tooltip: true
      }, {
        title: '转供方式',
        key: 'methods',
        align: 'center',
        tooltip: true
      }, {
        title: '预控措施',
        key: 'preControl',
        align: 'center',
        tooltip: true
      }],
      data: [],
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      closePlan().then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.plan
  width 100%
</style>
