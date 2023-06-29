<template>
  <div class="limitcount">
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
      <div class="option-wrapper" style="margin-left: 20px;">
        <span>变电站:</span>
        <Select v-model="electS" style="width:150px">
          <Option
            v-for="item in esList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="option-wrapper" style="margin-left: 20px;">
        <span>电压等级:</span>
        <Select v-model="electS" style="width:150px">
          <Option
            v-for="item in esList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="option-wrapper" style="margin-left: 20px;">
        <span>分类:</span>
        <Select v-model="electS" style="width:150px">
          <Option
            v-for="item in esList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="option-wrapper" style="margin-left: 20px;">
        <span>上下线:</span>
        <Select v-model="electS" style="width:150px">
          <Option
            v-for="item in esList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">查询</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info" @click="getData">导出</Button>
      </div>
    </div>
    <div class="content">
      <Table
        :columns="columnsTop"
        :data="dataTop"
        stripe
        border
        ref="table"
        max-height="350"
        :loading="loadingTop"
      >
      </Table>
      <Table
        :columns="columns"
        :data="data"
        stripe
        border
        style="margin-top: 25px;"
        ref="table"
        max-height="350"
        :loading="loading"
      >
      </Table>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'view-design'
import { limitCount } from '@/services/dataMaintenance'
export default {
  components: {
    Select,
    Option
  },
  data () {
    return {
      loading: false,
      columns: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          renderHeader: (h, params) => {
            return h('span', '序号')
          }
        },
        {
          title: '地区',
          key: 'area',
          align: 'center'
        },
        {
          title: '电压等级',
          key: 'electLevel',
          align: 'center'
        },
        {
          title: '变电站',
          key: 'bdz',
          align: 'center'
        },
        {
          title: '信号',
          key: 'signal',
          align: 'center'
        },
        {
          title: '越限时间',
          key: 'limitTime',
          align: 'center'
        }
      ],
      data: [],
      loadingTop: false,
      columnsTop: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          renderHeader: (h, params) => {
            return h('span', '序号')
          }
        },
        {
          title: '地区',
          key: 'area',
          align: 'center'
        },
        {
          title: '电压等级',
          key: 'electLevel',
          align: 'center'
        },
        {
          title: '变电站',
          key: 'bdz',
          align: 'center'
        },
        {
          title: '频次',
          render: (h, param) => h('span', {
            style: {
              color: '#00B0F0',
              cursor: 'pointer',
              textDecoration: 'underline'
            },
            on: {
              click: () => {
                this.showBottom()
              }
            }
          }, param.row.signal),
          align: 'center'
        },
        {
          title: '最新越限时间',
          key: 'limitTime',
          align: 'center'
        }
      ],
      dataTop: [],
      electS: 1,
      esList: [
        {
          value: 1,
          label: '全部'
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    showBottom () {
      this.loading = true
      limitCount().then((res) => {
        this.data = res.data
        this.loading = false
      })
    },
    getData () {
      this.loadingTop = true
      limitCount().then((res) => {
        this.dataTop = res.data
        this.loadingTop = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .limitcount/deep/.ivu-table-tip
    overflow-x hidden
  .limitcount
    contentWrapper()
    .search
      width: 100%
      box-sizing: border-box
      display: flex
      justify-content flex-start
      align-items flex-start
      flex-wrap wrap
      padding-bottom 20px
      border-bottom 1px solid #eee
      .option-wrapper
        display flex
        justify-content flex-start
        align-items center
        margin-right: 10px
        span
          margin-right: 10px
    .content
      width 100%
</style>
