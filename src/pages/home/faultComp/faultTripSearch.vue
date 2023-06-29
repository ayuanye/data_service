<!-- created by rbb-->
<template>
  <div class="search-wrapper">
    <Button type="warning" class="diy-btn" @click="query(1)">上个月</Button>
    <Button type="warning" class="diy-btn left-margin" @click="query(2)">下个月</Button>
    <div class="ver-line left-margin"></div>
    <diyDatePicker @valChange="startTimeChange" class="left-margin" ref="startTime" :time="defaultStartTime"/>
    <span class="left-margin">--</span>
    <diyDatePicker @valChange="endTimeChange" class="left-margin" ref="endTime" :time="defaultEndTime"/>
    <Button type="success" class="left-margin" @click="query(3)">查询</Button>
    <Button type="info" class="left-margin" @click="exportCsv">导出</Button>
  </div>
</template>

<script>
import diyDatePicker from './diyDatePicker'
import { dateFormat, getLastMonthDayOne, getNextMonthDayOne } from '@/utils/tools'
export default {
  props: {
    defaultStartTime: {
      type: Date,
      default: () => {
        let today = new Date()
        return new Date(today.getFullYear(), today.getMonth(), 1)
      }
    },
    defaultEndTime: {
      type: Date,
      default: () => {
        let today = new Date()
        return new Date(today.getFullYear(), today.getMonth() + 1, 0)
      }
    }
  },
  components: {
    diyDatePicker
  },
  data () {
    return {
      startTime: dateFormat('YYYY-mm-dd', this.defaultStartTime),
      endTime: dateFormat('YYYY-mm-dd', this.defaultStartTime)
    }
  },
  methods: {
    startTimeChange (val) {
      this.startTime = val
    },
    endTimeChange (val) {
      this.endTime = val
    },
    exportCsv () {
      this.$emit('exportCsv')
    },
    query (sign) {
      switch (sign) {
        case 1: this.$refs.startTime.setPickerVal(new Date(getLastMonthDayOne(new Date(this.startTime), true)))
          this.$refs.endTime.setPickerVal(new Date(getLastMonthDayOne(new Date(this.startTime), false)))
          break
        case 2: this.$refs.startTime.setPickerVal(new Date(getNextMonthDayOne(new Date(this.startTime), true)))
          this.$refs.endTime.setPickerVal(new Date(getNextMonthDayOne(new Date(this.startTime), false)))
          break
      }
      this.$nextTick(() => {
        this.$emit('doQuery', {
          startTime: this.startTime,
          endTime: this.endTime
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.search-wrapper
  display flex
  justify-content flex-start
  align-items center
  .diy-btn
    background-image linear-gradient(to right, #f3ad6e, #f6cb7c)
    color white
    border none
  .ver-line
    width 1px
    height 32px
    background-image linear-gradient(#ffffff, #00c2b5, #ffffff)
  .left-margin
    margin-left 10px
</style>
