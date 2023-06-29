<template>
  <div class="overload">
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
import { overload } from '@/services/dataMaintenance'
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
        title: '主变名称',
        key: 'zbmc',
        align: 'center'
      }, {
        title: '额定容量(MW)',
        key: 'ratedCapacity',
        align: 'center'
      }, {
        title: '额定电流(A)',
        key: 'ratedElect',
        align: 'center'
      }, {
        title: '最高电流(A)',
        key: 'highestElect',
        align: 'center'
      }, {
        title: '最高电流时刻表',
        key: 'highestTime',
        align: 'center'
      }, {
        title: '负载率(%)',
        key: 'loadRate',
        align: 'center'
      }, {
        title: '去年同期负载率(%)',
        key: 'lastYLRate',
        align: 'center'
      }, {
        title: '油温',
        key: 'oilTemp',
        align: 'center'
      }, {
        title: '重载时间',
        key: 'reloadTime',
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
      overload().then(res => {
        this.data = res.data
        this.loading = false
      })
    },
    rowClassName (row, index) {
      if (index > 3) {
        return 'active'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.overload/deep/.active
  .ivu-table-cell
    color red
.overload
  width 100%
</style>
