<template>
  <div class="device">
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
import { deviceOverhaul } from '@/services/dataMaintenance'
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
        title: '对电网影响',
        key: 'influence',
        align: 'center',
        tooltip: true
      }, {
        title: '工作完成情况',
        key: 'complete',
        align: 'center'
      }, {
        title: '原因说明',
        key: 'explain',
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
      deviceOverhaul().then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .device
    width 100%
</style>
