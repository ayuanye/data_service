<template>
  <div class="compquery">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <span>至:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 130px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">导出</Button>
      </div>
    </div>
    <div class="content">
      <Table
        :columns="columns"
        :data="data"
        stripe
        border
        style="margin-top: 25px;"
        ref="table"
        max-height="700"
        :loading="loading"
      >
      </Table>
    </div>
    <Modal
      v-model="showModal"
      class="modal"
      title="宜兴保护动作情况">
      <Table
        :columns="columnsM"
        :data="dataM"
        stripe
        border
        style="margin-top: 25px;"
        ref="table"
        max-height="700"
        :loading="loadingM"
      >
      </Table>
    </Modal>
  </div>
</template>

<script>
import { opening } from '@/services/dataMaintenance'
export default {
  data () {
    return {
      dataM: [],
      columnsM: [{
        title: '动作时间',
        key: 'actionTime',
        align: 'center'
      }, {
        title: '摇信',
        key: 'yx',
        align: 'center'
      }, {
        title: '动作情况',
        key: 'actionCond',
        align: 'center'
      }],
      loadingM: false,
      showModal: false,
      data: [],
      loading: false,
      columns: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '动作时间',
        key: 'actionTime',
        align: 'center'
      }, {
        title: '地区',
        key: 'area',
        align: 'center'
      }, {
        title: '厂站',
        key: 'factoryStation',
        align: 'center'
      }, {
        title: '电压等级',
        key: 'electLevel',
        align: 'center'
      }, {
        title: '设备名称',
        key: 'deviceName',
        align: 'center'
      }, {
        title: '开关名称',
        key: 'switchName',
        align: 'center'
      }, {
        title: '重合闸',
        key: 'reclosing',
        align: 'center'
      }, {
        title: '摇信',
        render: (h, params) =>
          h('span', {
            style: {
              textDecoration: 'underline',
              color: '#2db7f5',
              cursor: 'pointer'
            },
            on: {
              click: () => {
                this.yxClick(params.row)
              }
            }
          }, '查看详情'),
        align: 'center'
      }]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    yxClick (row) {
      this.showModal = true
      this.dataM = [row]
    },
    getData () {
      this.loading = true
      opening().then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .modal/deep/.ivu-table-tip
    overflow-x hidden
  .compquery/deep/.ivu-table-tip
    overflow-x hidden
  .compquery
    contentWrapper()
    padding-top 0
    .search
      width 100%
      box-sizing: border-box
      display flex
      justify-content flex-start
      align-items flex-start
      flex-wrap wrap
      border-bottom 1px solid #eee
      .option-wrapper
        display flex
        justify-content flex-start
        align-items center
        margin-right 10px
        margin-bottom 10px
        span
          margin-right: 10px
    .content
      width 100%
</style>
