<template>
  <div class="master">
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
// import { routeOverload } from '@/services/dataMaintenance'
import deviceCell from './components/deviceCell'
import frequency from './components/frequency'
export default {
  data () {
    return {
      loading: false,
      data: [{
        device: {
          name: '主设备',
          val: ['10kv', '10kv', '10kv']
        },
        coincidence: {
          val: [0, 0, 0]
        },
        frequency: {
          val: [0, 0, 0]
        },
        lightningStrike: {
          val: ['0', '0', '0']
        },
        foreignBody: {
          val: ['0', '0', '0']
        },
        deviceReason: {
          val: ['0', '0', '0']
        },
        userReason: {
          val: ['0', '0', '0']
        },
        efDest: {
          val: ['0', '0', '0']
        },
        others: {
          val: ['0', '0', '0']
        },
        cumulative: {
          val: ['0', '0', '0']
        }
      }, {
        device: {
          name: '线路',
          val: ['10kv', '10kv', '10kv']
        },
        coincidence: {
          val: [0, 0, 0]
        },
        frequency: {
          val: [0, 0, 0]
        },
        lightningStrike: {
          val: ['0', '0', '0']
        },
        foreignBody: {
          val: ['0', '0', '0']
        },
        deviceReason: {
          val: ['0', '0', '0']
        },
        userReason: {
          val: ['0', '0', '0']
        },
        efDest: {
          val: ['0', '0', '0']
        },
        others: {
          val: ['0', '0', '0']
        },
        cumulative: {
          val: ['0', '0', '0']
        }
      }],
      columns: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '跳闸设备',
        key: 'device',
        className: 'device',
        render: (h, params) =>
          h(deviceCell, {
            props: {
              row: params.row
            }
          }),
        align: 'center'
      }, {
        title: '跳闸次数',
        key: 'frequency',
        className: 'device',
        render: (h, params) =>
          h(frequency, {
            props: {
              row: params.row,
              keys: 'frequency'
            }
          }),
        align: 'center'
      }, {
        title: '重合成功',
        key: 'coincidence',
        className: 'device',
        render: (h, params) => {
          if (params.index === 0) {
            return h('span', {}, '-')
          } else {
            return h(frequency, {
              props: {
                row: params.row,
                keys: 'coincidence'
              }
            })
          }
        },
        align: 'center'
      }, {
        title: '原因分析',
        align: 'center',
        children: [{
          title: '雷击',
          key: 'lightningStrike',
          className: 'device',
          render: (h, params) =>
            h(frequency, {
              props: {
                row: params.row,
                keys: 'lightningStrike'
              }
            }),
          align: 'center'
        }, {
          title: '异物',
          key: 'foreignBody',
          className: 'device',
          render: (h, params) =>
            h(frequency, {
              props: {
                row: params.row,
                keys: 'foreignBody'
              }
            }),
          align: 'center'
        }, {
          title: '设备原因',
          key: 'deviceReason',
          className: 'device',
          render: (h, params) =>
            h(frequency, {
              props: {
                row: params.row,
                keys: 'deviceReason'
              }
            }),
          align: 'center'
        }, {
          title: '用户原因',
          key: 'userReason',
          className: 'device',
          render: (h, params) =>
            h(frequency, {
              props: {
                row: params.row,
                keys: 'userReason'
              }
            }),
          align: 'center'
        }, {
          title: '外力破坏',
          key: 'efDest',
          className: 'device',
          render: (h, params) =>
            h(frequency, {
              props: {
                row: params.row,
                keys: 'efDest'
              }
            }),
          align: 'center'
        }, {
          title: '其他',
          key: 'others',
          className: 'device',
          render: (h, params) =>
            h(frequency, {
              props: {
                row: params.row,
                keys: 'others'
              }
            }),
          align: 'center'
        }]
      }, {
        title: '本月累计',
        key: 'cumulative',
        className: 'device',
        render: (h, params) =>
          h(frequency, {
            props: {
              row: params.row,
              keys: 'cumulative'
            }
          }),
        align: 'center'
      }]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      // this.loading = true
      // routeOverload().then(res => {
      //   this.data = res.data
      //   this.loading = false
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
.master/deep/.device
  .ivu-table-cell
    padding 0
.master
  width 100%
</style>
