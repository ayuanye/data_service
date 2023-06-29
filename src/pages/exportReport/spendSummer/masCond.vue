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
        title: '变电站',
        key: 'bdz',
        align: 'center'
      }, {
        title: '主变名称',
        key: 'name',
        align: 'center'
      }, {
        title: '额定容量(MW)',
        key: 'edrl',
        align: 'center'
      }, {
        title: '额定电流(A)',
        key: 'eddl',
        align: 'center'
      }, {
        title: '最大电流(A)',
        key: 'zddl',
        align: 'center'
      }, {
        title: '最高电流时刻',
        key: 'zgdlsk',
        align: 'center'
      }, {
        title: '负载率',
        key: 'rate',
        align: 'center'
      }, {
        title: '油温',
        key: 'oilTemp',
        align: 'center'
      }, {
        title: '持续时间(分)',
        key: 'cxsj',
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
