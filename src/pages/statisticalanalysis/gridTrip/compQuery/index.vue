<template>
  <div class="compquery">
    <div class="search">
      <div class="option-wrapper">
        <Button type="info">上一月</Button>
      </div>
      <div class="option-wrapper">
        <Button type="info">下一月</Button>
      </div>
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
        <span>地区:</span>
        <Select v-model="area" style="width:150px">
          <Option
            v-for="item in areaList"
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
  </div>
</template>

<script>
import { Select, Option } from 'view-design'
import { gtCompQuery } from '@/services/dataMaintenance'
export default {
  components: {
    Select,
    Option
  },
  data () {
    return {
      data: [],
      area: 1,
      areaList: [{
        value: 1,
        label: '市区网线'
      }, {
        value: 2,
        label: '县城网线'
      }],
      columns: [{
        type: 'index',
        width: 80,
        align: 'center',
        renderHeader: (h, params) => {
          return h('span', '序号')
        }
      }, {
        title: '出现时间',
        key: 'apearTime',
        align: 'center'
      }, {
        title: '电压等级',
        key: 'electLevel',
        align: 'center'
      }, {
        title: '故障类型',
        key: 'faultType',
        align: 'center'
      }, {
        title: '场所',
        key: 'place',
        align: 'center'
      }, {
        title: '间隔名称',
        key: 'intervalName',
        align: 'center'
      }, {
        title: '故障原因',
        key: 'reason',
        align: 'center'
      }, {
        title: '重合情况',
        key: 'condition',
        align: 'center'
      }, {
        title: '接地故障',
        key: 'groundFault',
        align: 'center'
      }, {
        title: '处理情况',
        key: 'dealCond',
        align: 'center'
      }],
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      gtCompQuery().then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
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
