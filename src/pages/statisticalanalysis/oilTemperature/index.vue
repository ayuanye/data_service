<template>
  <div class="temperature">
    <div class="search">
      <div class="option-wrapper">
        <span>日期:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 150px"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <span>至:</span>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 150px"
        ></DatePicker>
      </div>
      <div class="option-wrapper" style="margin-left: 20px;">
        <span>变电站:</span>
        <Select v-model="electS" style="width:200px">
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
        :columns="columns"
        :data="data"
        stripe
        border
        draggable
        ref="table"
        max-height="680"
        :loading="loading"
      >
      </Table>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'view-design'
import extend from './extend'
import { oiltemperature } from '@/services/dataMaintenance'
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
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(extend, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          width: 80,
          align: 'center',
          renderHeader: (h, params) => {
            return h('span', '序号')
          }
        },
        {
          title: '日期',
          key: 'date',
          align: 'center'
        },
        {
          title: '变电站',
          key: 'bdz',
          align: 'center'
        }, {
          title: '主变',
          key: 'zb',
          align: 'center'
        }, {
          title: '油温',
          key: 'yw',
          align: 'center'
        }, {
          title: '负荷',
          key: 'fh',
          align: 'center'
        }
      ],
      data: [],
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
    getData () {
      oiltemperature().then(res => {
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .temperature
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
