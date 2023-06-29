<!-- created by rbb-->
<template>
  <div class="search-wrapper">
    <Button type="warning" class="diy-btn" @click="query(1)">上个月</Button>
    <Button type="warning" class="diy-btn left-margin" @click="query(2)">下个月</Button>
    <div class="ver-line left-margin"></div>
    <diyDatePicker @valChange="startTimeChange" class="left-margin" ref="startTime" :time="defaultStartTime"/>
    <span class="left-margin">--</span>
    <diyDatePicker @valChange="endTimeChange" class="left-margin" ref="endTime" :time="defaultEndTime"/>
    <span style="margin-left: 20px;" v-show="showClassification">分类：</span>
    <Select v-model="classification" style="width:100px" v-show="showClassification">
      <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.value }}</Option>
    </Select>
    <Button type="success" class="left-margin" @click="query(3)">查询</Button>
  </div>
</template>

<script>
import diyDatePicker from './diyDatePicker'
import { Select, Option } from 'view-design'
import { getLastMonthDayOne, getNextMonthDayOne, dateFormat } from '@/utils/tools'
export default {
  props: {
    showClassification: {
      type: Boolean,
      require: false,
      default: false
    },
    selectList: {
      type: Array,
      default: () => {
        return []
      }
    },
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
    },
    defaultClassification: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  components: {
    diyDatePicker,
    Select,
    Option
  },
  data () {
    return {
      startTime: dateFormat('YYYY-mm-dd', this.defaultStartTime),
      endTime: dateFormat('YYYY-mm-dd', this.defaultEndTime),
      classification: this.selectList[0] ? this.selectList[0].value : ''
    }
  },
  watch: {
    defaultClassification: {
      immediate: true,
      handler (val) {
        if (val) {
          this.classification = val
        }
      }
    }
  },
  methods: {
    startTimeChange (val) {
      this.startTime = val
    },
    endTimeChange (val) {
      this.endTime = val
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
        let param = {
          startTime: this.startTime,
          endTime: this.endTime
        }
        if (this.showClassification) {
          param.classification = this.classification
        }
        this.$emit('doQuery', param)
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
