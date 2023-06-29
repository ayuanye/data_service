<template>
  <div class="route">
    <Table
      :columns="columns"
      :data="data"
      stripe
      border
      :row-class-name="rowClassName"
      style="margin-top: 25px;"
      ref="table"
      max-height="600"
      :loading="loading"
    >
    </Table>
  </div>
</template>

<script>
import { routeOverload } from '@/services/dataMaintenance'
export default {
  data () {
    return {
      loading: false,
      data: [],
      columns: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '变电站',
        key: 'bdz',
        align: 'center'
      }, {
        title: '线路名称',
        key: 'routeName',
        align: 'center'
      }, {
        title: '额定电流(A)',
        key: 'ratedElect',
        align: 'center'
      }, {
        title: '最大电流(A)',
        key: 'highestElect',
        align: 'center'
      }, {
        title: '最大电流时间',
        key: 'highestTime',
        align: 'center'
      }, {
        title: '负载率(%)',
        key: 'loadRate',
        align: 'center'
      }, {
        title: '持续时间(分)',
        key: 'duration',
        align: 'center'
      }, {
        title: '线路性质',
        key: 'routeNature',
        align: 'center'
      }, {
        title: '备注',
        key: 'remark',
        align: 'center'
      }]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      routeOverload().then(res => {
        this.data = res.data
        this.loading = false
      })
    },
    rowClassName (row, index) {
      if (index === 3) {
        return 'active'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.route/deep/.active
  .ivu-table-cell
    color red
.route
  width 100%
</style>
