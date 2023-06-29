<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <div class="date-outer">
        <span>日期:</span>
        <DatePicker v-model="date" type="date" placeholder="Select date" style="width: 150px;margin-left:10px;"></DatePicker>
      </div>
      <Button class="search" type="info">查询</Button>
    </div>
    <div class="content">
      <div class="title">
        电量数据维护
      </div>
      <div class="data">
        <div>
          <span style="margin-left: 10px;">日报日期:</span>
          <Input v-model="day" placeholder="请输入数据" class="inpWid"></Input>
        </div>
        <div style="margin-left: 20px;">
          <span style="margin-left: 10px;"> 调度电量:</span>
          <Input v-model="elect" placeholder="请输入数据" class="inpWid"></Input>
        </div>
        <div style="margin-left: 20px;">
          <span style="margin-left: 10px;"> 峰电量:</span>
          <Input v-model="elect" placeholder="请输入数据" class="inpWid"></Input>
        </div>
        <div style="margin-left: 20px;">
          <span style="margin-left: 10px;"> 谷电量:</span>
          <Input v-model="elect" placeholder="请输入数据" class="inpWid"></Input>
        </div>
      </div>
      <div class="btn">
        <Button type="primary" @click="save">保存</Button>
      </div>
      <Spin fix v-if="spinShow"></Spin>
    </div>
  </div>
</template>
<script>
import { Spin } from 'view-design'
import { dateFormat } from '@/utils/tools'
export default {
  components: {
    Spin
  },
  data () {
    return {
      date: new Date(),
      elect: '200',
      spinShow: false
    }
  },
  computed: {
    day () {
      return dateFormat('YYYY-mm-dd', this.date)
    }
  },
  methods: {
    save () {
      this.spinShow = true
      setTimeout(() => {
        this.$Message.success('保存成功')
        this.spinShow = false
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper
    width 100%
    height 100%
    background-color white
    padding 10px
    padding-top 0
    position relative
    .search-wrapper
      padding 10px
      padding-top 0
      width 100%
      border-bottom 1px solid #eee
      display flex
      justify-content flex-start
      align-items center
      .search
        margin-left 10px
    .content
      border 1px solid #ccc
      width 800px
      margin-top 20px
      .title
        padding 15px
        border-bottom 1px solid #ccc
      .data
        padding 15px
        display flex
        justify-content flex-start
        .inpWid
          width 150px
          margin-left 10px
      .btn
        padding-bottom 15px
        padding-left 15px
</style>
