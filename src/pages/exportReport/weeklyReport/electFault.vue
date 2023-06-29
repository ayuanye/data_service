<template>
  <div class="fault">
    <div class="title">
      （一）宜兴主网异常及事故情况统计
    </div>
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
    <div class="title">
      具体情况如下
    </div>
    <Table
      :columns="columnsS"
      :data="dataS"
      stripe
      border
      style="margin-top: 25px;"
      ref="table"
      max-height="600"
      :loading="loadingS"
    >
    </Table>
    <div class="title">
      （二）县域35kv电网异常及事故情况统计
    </div>
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
    <div class="title">
      具体情况如下
    </div>
    <Table
      :columns="columnsS"
      :data="dataS"
      stripe
      border
      style="margin-top: 25px;"
      ref="table"
      max-height="600"
      :loading="loadingS"
    >
    </Table>
    <div class="title">
      （三）10kv/20kv电网异常及事故情况统计
    </div>
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
    <div class="title">
      具体情况如下
    </div>
    <Table
      :columns="columnsS"
      :data="dataS"
      stripe
      border
      style="margin-top: 25px;"
      ref="table"
      max-height="600"
      :loading="loadingS"
    >
    </Table>
  </div>
</template>

<script>
import { electFault } from '@/services/dataMaintenance'
export default {
  data () {
    return {
      columnsS: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '发现时间',
        key: 'exploreTime',
        align: 'center'
      }, {
        title: '恢复时间',
        key: 'cureTime',
        align: 'center'
      }, {
        title: '变电所',
        key: 'bds',
        align: 'center'
      }, {
        title: '跳闸、异常、临检情况',
        key: 'allCondition',
        align: 'center'
      }, {
        title: '保护及自动装置动作',
        key: 'protect',
        align: 'center'
      }, {
        title: '重合情况',
        key: 'coincidence',
        align: 'center'
      }, {
        title: '强送情况',
        key: 'forceTrans',
        align: 'center'
      }, {
        title: '事故或异常原因分析',
        key: 'ana',
        align: 'center'
      }],
      loadingS: false,
      dataS: [],
      loading: false,
      data: [{
        area: '宜兴',
        fault: 2,
        foreignObjects: {
          faultCount: 1,
          tripOpCount: 2
        },
        totalCount: 1,
        cannotComb: 0,
        singleTouch: 1,
        externalForce: {
          faultCount: 1,
          tripOpCount: 2
        },
        deviceConc: {
          faultCount: 0,
          tripOpCount: 0
        },
        constructionQua: {
          faultCount: 0,
          tripOpCount: 0
        },
        userConc: {
          faultCount: 0,
          tripOpCount: 0
        },
        otherObj: {
          faultCount: 0,
          tripOpCount: 0
        },
        adverseWeather: {
          faultCount: 0,
          tripOpCount: 0
        },
        unknown: {
          faultCount: 0,
          tripOpCount: 0
        },
        others: {
          faultCount: 0,
          tripOpCount: 0
        },
        remark: {
          faultCount: '异常及接地原因统计',
          tripOpCount: '跳闸原因统计'
        }
      }],
      columns: [{
        title: '地区',
        key: 'area',
        align: 'center'
      }, {
        title: '异常',
        key: 'fault',
        align: 'center'
      }, {
        title: '跳闸总次数',
        key: 'totalCount',
        align: 'center'
      }, {
        title: '重合不成',
        key: 'cannotComb',
        align: 'center'
      }, {
        title: '单相接地',
        key: 'singleTouch',
        align: 'center'
      }, {
        title: '鸟害松鼠等小动物',
        key: 'foreignObjects',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'foreignObjects')
        },
        align: 'center'
      }, {
        title: '外力破坏',
        key: 'externalForce',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'externalForce')
        },
        align: 'center'
      }, {
        title: '设备原因',
        key: 'deviceConc',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'deviceConc')
        },
        align: 'center'
      }, {
        title: '施工质量',
        key: 'constructionQua',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'constructionQua')
        },
        align: 'center'
      }, {
        title: '用户原因',
        key: 'userConc',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'userConc')
        },
        align: 'center'
      }, {
        title: '异物碰线',
        key: 'otherObj',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'otherObj')
        },
        align: 'center'
      }, {
        title: '恶劣天气',
        key: 'adverseWeather',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'adverseWeather')
        },
        align: 'center'
      }, {
        title: '原因不明',
        key: 'unknown',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'unknown')
        },
        align: 'center'
      }, {
        title: '其他',
        key: 'others',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'others')
        },
        align: 'center'
      }, {
        title: '备注',
        key: 'mark',
        className: 'foreign-objects',
        render: (h, param) => {
          return this.tableRender(h, param.row, 'remark')
        },
        align: 'center'
      }]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loadingS = true
      electFault().then(res => {
        this.loadingS = false
        this.dataS = res.data
      })
    },
    tableRender (h, row, keys) {
      let faultCount = row[keys] ? row[keys].faultCount : ''
      let tripOpCount = row[keys] ? row[keys].tripOpCount : ''
      return h('div', {}, [h('div', {
        style: {
          height: '50px',
          borderBottom: '1px solid #ccc',
          padding: '5px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, [h('span', {}, faultCount)]), h('div', {
        style: {
          padding: '5px 0'
        }
      }, [h('span', {}, tripOpCount)])])
    }
  }
}
</script>

<style lang="stylus" scoped>
.fault/deep/.foreign-objects
  .ivu-table-cell
    padding 0 !important
.fault
  width 100%
  margin-top 10px
  .title
    font-size 16px
    font-weight bold
    margin-top 20px
</style>
