<!-- created by rbb-->
<template>
  <DatePicker
    type="date"
    placeholder="Select date"
    :open="open"
    @on-change="handleChange"
    @on-clear="handleClear"
    @on-clickoutside="clickOutside"
    v-model="val"
  >
    <Input
      prefix="md-calendar"
      placeholder="时间选择"
      class="time"
      ref="time"
      clearable
      v-model="copyVal"
      @on-blur="blur"
      @on-focus="click"
    >
      <i class="iconfont iconrili icon" slot="prefix"></i>
    </Input>
  </DatePicker>
</template>

<script>
import { dateFormat } from '@/utils/tools'
export default {
  props: {
    time: {
      default: () => {
        return new Date()
      }
    }
  },
  data () {
    return {
      open: false,
      val: this.time
    }
  },
  computed: {
    copyVal: {
      get () {
        return dateFormat('YYYY-mm-dd', this.val)
      },
      set (val) {
        let reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
        if (reg.test(val)) {
          this.val = new Date(val)
        }
      }
    }
  },
  watch: {
    copyVal: {
      immediate: true,
      handler (val) {
        this.$emit('valChange', val)
      }
    }
  },
  methods: {
    click () {
      this.open = true
    },
    handleChange () {
      this.open = false
      this.$nextTick(() => {
        this.$refs.time.blur()
      })
    },
    clickOutside () {
      this.open = false
      this.$refs.time.blur()
    },
    blur () {
      this.open = false
    },
    handleClear () {
      this.open = false
      this.$refs.time.blur()
    },
    setPickerVal (val) {
      this.val = val
    }
  }
}
</script>
<style lang='stylus' scoped>
.time
  width 7vw
  .icon
    color #3ed1c7
    font-size 0.9vw
</style>
