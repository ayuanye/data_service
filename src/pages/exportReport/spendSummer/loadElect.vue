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
        title: '最高负荷',
        key: 'highestLoad',
        align: 'center'
      }, {
        title: '最低负荷',
        key: 'lowestLoad',
        align: 'center'
      }, {
        title: '全天电量',
        key: 'dayElect',
        align: 'center'
      }, {
        title: '本月最高负荷',
        key: 'monthHighLoad',
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
