<template>
  <div class="summary">
    <div class="search">
      <div class="option-wrapper">
        <span>统计年度:</span>
        <DatePicker
          type="year"
          placeholder="Select date"
          style="width: 150px"
          v-model="countYear"
        ></DatePicker>
      </div>
      <div class="option-wrapper">
        <span>对比年度:</span>
        <DatePicker
          type="year"
          placeholder="Select date"
          style="width: 150px"
          v-model="compareYear"
        ></DatePicker>
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
export default {
  data () {
    return {
      loading: false,
      countYear: '2020',
      compareYear: '2019',
      columns: [{
        title: '内容',
        key: 'content',
        align: 'center'
      }, {
        title: '2019',
        key: 'byear',
        align: 'center'
      }, {
        title: '2020',
        key: 'ayear',
        align: 'center'
      }, {
        title: '增长率(%)',
        key: 'growthRate',
        align: 'center'
      }],
      data: [],
      titles: ['最高负荷', '出现时间', '最低负荷', '出现时间', '最大峰谷差', '出现时间', '最高日电量', '出现时间', '平均日用电量', '全年电量汇总']
    }
  },
  created () {
    this.setData()
  },
  methods: {
    getData () {},
    setData () {
      let data = []
      for (let i = 0; i < this.titles.length; i++) {
        data.push({
          content: this.titles[i],
          byear: '200',
          ayear: '12132',
          growthRate: '30%'
        })
      }
      this.data = data
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.summary/deep/.ivu-table-tip
  overflow-x hidden
.summary
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
</style>
