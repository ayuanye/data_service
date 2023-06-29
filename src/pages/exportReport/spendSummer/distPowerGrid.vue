<template>
  <div class="dist">
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
import deviceSingleCell from './components/deviceSingleCell'
import deviceDoubleCell from './components/deviceDoubleCell'
import doubleCell from './components/doubleCell'
import singleCell from './components/singleCell'
export default {
  data () {
    return {
      loading: false,
      data: [{
        device: {
          name: '市区',
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
          name: '新吴区',
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
          name: '宜兴',
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
          name: '江明',
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
        title: '跳闸线路',
        key: 'device',
        className: 'device',
        render: (h, params) => {
          if (params.index === 1) {
            return h(deviceSingleCell, {
              props: {
                row: params.row,
                keys: 'device'
              }
            })
          } else {
            return h(deviceDoubleCell, {
              props: {
                row: params.row,
                keys: 'device'
              }
            })
          }
        },
        align: 'center'
      }, {
        title: '跳闸次数',
        key: 'frequency',
        className: 'device',
        render: (h, params) => {
          if (params.index === 1) {
            return h(singleCell, {
              props: {
                row: params.row,
                keys: 'frequency'
              }
            })
          } else {
            return h(doubleCell, {
              props: {
                row: params.row,
                keys: 'frequency'
              }
            })
          }
        },
        align: 'center'
      }, {
        title: '重合成功',
        key: 'coincidence',
        className: 'device',
        render: (h, params) => {
          if (params.index === 1) {
            return h(singleCell, {
              props: {
                row: params.row,
                keys: 'coincidence'
              }
            })
          } else {
            return h(doubleCell, {
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
          render: (h, params) => {
            if (params.index === 1) {
              return h(singleCell, {
                props: {
                  row: params.row,
                  keys: 'lightningStrike'
                }
              })
            } else {
              return h(doubleCell, {
                props: {
                  row: params.row,
                  keys: 'lightningStrike'
                }
              })
            }
          },
          align: 'center'
        }, {
          title: '异物',
          key: 'foreignBody',
          className: 'device',
          render: (h, params) => {
            if (params.index === 1) {
              return h(singleCell, {
                props: {
                  row: params.row,
                  keys: 'foreignBody'
                }
              })
            } else {
              return h(doubleCell, {
                props: {
                  row: params.row,
                  keys: 'foreignBody'
                }
              })
            }
          },
          align: 'center'
        }, {
          title: '设备原因',
          key: 'deviceReason',
          className: 'device',
          render: (h, params) => {
            if (params.index === 1) {
              return h(singleCell, {
                props: {
                  row: params.row,
                  keys: 'deviceReason'
                }
              })
            } else {
              return h(doubleCell, {
                props: {
                  row: params.row,
                  keys: 'deviceReason'
                }
              })
            }
          },
          align: 'center'
        }, {
          title: '用户原因',
          key: 'userReason',
          className: 'device',
          render: (h, params) => {
            if (params.index === 1) {
              return h(singleCell, {
                props: {
                  row: params.row,
                  keys: 'userReason'
                }
              })
            } else {
              return h(doubleCell, {
                props: {
                  row: params.row,
                  keys: 'userReason'
                }
              })
            }
          },
          align: 'center'
        }, {
          title: '外力破坏',
          key: 'efDest',
          className: 'device',
          render: (h, params) => {
            if (params.index === 1) {
              return h(singleCell, {
                props: {
                  row: params.row,
                  keys: 'efDest'
                }
              })
            } else {
              return h(doubleCell, {
                props: {
                  row: params.row,
                  keys: 'efDest'
                }
              })
            }
          },
          align: 'center'
        }, {
          title: '其他',
          key: 'others',
          className: 'device',
          render: (h, params) => {
            if (params.index === 1) {
              return h(singleCell, {
                props: {
                  row: params.row,
                  keys: 'others'
                }
              })
            } else {
              return h(doubleCell, {
                props: {
                  row: params.row,
                  keys: 'others'
                }
              })
            }
          },
          align: 'center'
        }]
      }, {
        title: '本月累计',
        key: 'cumulative',
        className: 'device',
        render: (h, params) => {
          if (params.index === 1) {
            return h(singleCell, {
              props: {
                row: params.row,
                keys: 'cumulative'
              }
            })
          } else {
            return h(doubleCell, {
              props: {
                row: params.row,
                keys: 'cumulative'
              }
            })
          }
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
.dist/deep/.device
  .ivu-table-cell
    padding 0
.dist
  width 100%
</style>
