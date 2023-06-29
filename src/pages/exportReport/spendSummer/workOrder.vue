<template>
  <div class="load">
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
import { wload } from '@/services/dataMaintenance'
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
        title: '地区',
        key: 'area',
        align: 'center'
      }, {
        title: '受理工单数',
        key: 'orders',
        align: 'center'
      }, {
        title: '环比',
        key: 'percent',
        align: 'center'
      }, {
        title: '接派及时率',
        key: 'jajsl',
        align: 'center'
      }, {
        title: '抵达现场及时率',
        key: 'ddxcjsl',
        align: 'center'
      }, {
        title: '平均修复时间(小时)',
        key: 'time',
        align: 'center'
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
      wload().then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.load
  width 100%
</style>
