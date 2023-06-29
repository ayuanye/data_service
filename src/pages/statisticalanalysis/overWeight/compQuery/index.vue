<template>
  <div class="analysis">
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
      <div class="option-wrapper">
        <span>电压等级:</span>
        <Select v-model="electLevel" style="width:200px">
          <Option v-for="item in electLevelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="option-wrapper">
        <span>分类:</span>
        <Select v-model="classification" style="width:200px">
          <Option v-for="item in classificationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="option-wrapper">
        <span>百分比:</span>
        <Select v-model="percent" style="width:200px">
          <Option v-for="item in percentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        v-show="classification === 1"
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
      <Table
        v-show="classification === 2"
        :columns="columnsMain"
        :data="dataMain"
        stripe
        border
        draggable
        ref="table"
        max-height="680"
        :loading="loadingMain"
      >
      </Table>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'view-design'
import { compQuery } from '@/services/dataMaintenance'
export default {
  components: {
    Select,
    Option
  },
  data () {
    return {
      loadingMain: false,
      columnsMain: [{
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
        title: '电压等级',
        key: 'electLevel',
        align: 'center'
      }, {
        title: '主变名称',
        key: 'name',
        align: 'center'
      }, {
        title: '额定容量',
        key: 'rateElect',
        align: 'center'
      }, {
        title: '有功值',
        key: 'ygz',
        align: 'center'
      }, {
        title: '无功值',
        key: 'wgz',
        align: 'center'
      }, {
        title: '视在功率',
        key: 'szgl',
        align: 'center'
      }, {
        title: '负载率',
        key: 'loadRate',
        align: 'center'
      }, {
        title: '重载时间',
        key: 'reloadTime',
        align: 'center'
      }],
      dataMain: [],
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
        title: '电压等级',
        key: 'electLevel',
        align: 'center'
      }, {
        title: '线路名称',
        key: 'name',
        align: 'center'
      }, {
        title: '额定电流',
        key: 'rateElect',
        align: 'center'
      }, {
        title: '实测电流',
        key: 'realElect',
        align: 'center'
      }, {
        title: '负载率',
        key: 'loadRate',
        align: 'center'
      }, {
        title: '重载时间',
        key: 'reloadTime',
        align: 'center'
      }],
      data: [],
      loading: false,
      electLevel: 1,
      electLevelList: [{
        value: 1,
        label: '全部'
      }],
      classification: 1,
      classificationList: [{
        value: 1,
        label: '线路'
      }, {
        value: 2,
        label: '主变'
      }],
      percent: 1,
      percentList: [
        {
          value: 1,
          label: '50%'
        }, {
          value: 2,
          label: '60%'
        }, {
          value: 3,
          label: '70%'
        }, {
          value: 4,
          label: '80%'
        }]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.loadingMain = true
      compQuery().then(res => {
        this.data = res.data
        this.loading = false
      })
      compQuery().then(res => {
        this.dataMain = res.data
        this.loadingMain = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
  .analysis/deep/.ivu-table-tip
    overflow-x hidden
  .analysis
    contentWrapper()
    padding-top 0
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
      margin-top 20px
</style>
