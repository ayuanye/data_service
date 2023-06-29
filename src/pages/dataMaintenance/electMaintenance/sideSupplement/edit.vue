<template>
  <Modal
    v-model="show"
    title="编辑"
    @on-ok="ok"
    @on-cancel="cancel"
    ok-text="确认"
    cancel-text="取消">
    <div class="data-wrapper">
      <span>日期</span>
      <Input v-model="data.date"></Input>
    </div>
    <div class="data-wrapper">
      <span>线路名称</span>
      <Input v-model="data.name"></Input>
    </div>
    <div class="data-wrapper">
      <span>应补电量</span>
      <Input v-model="data.elect"></Input>
    </div>
    <div class="data-wrapper">
      <span>开始时间</span>
      <Input v-model="data.startTime"></Input>
    </div>
    <div class="data-wrapper">
      <span>结束时间</span>
      <Input v-model="data.endTime"></Input>
    </div>
    <div class="data-wrapper">
      <span>原因</span>
      <Input v-model="data.reason"></Input>
    </div>
    <div class="data-wrapper">
      <span>调度员</span>
      <Input v-model="data.dispatcher"></Input>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ['showModal', 'row'],
  data () {
    return {
      show: false
    }
  },
  watch: {
    showModal (val) {
      if (val) {
        this.show = val
      }
    },
    show (val) {
      if (!val) {
        this.$emit('closeModal')
      }
    }
  },
  computed: {
    data () {
      return { ...this.row }
    }
  },
  methods: {
    ok (val) {
      console.log(val)
    },
    cancel (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .data-wrapper
    display flex
    justify-content flex-start
    align-items center
    margin-bottom 10px
    span
      min-width 80px
</style>
