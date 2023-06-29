<template>
  <Modal
    v-model="show"
    title="编辑"
    width="800px"
    @on-ok="ok"
    @on-cancel="cancel"
    ok-text="确认"
    cancel-text="取消">
    <div class="data-wrapper">
      <span>停电时间</span>
      <Input v-model="data.closeElectTime"></Input>
    </div>
    <div class="data-wrapper">
      <span>停电范围</span>
      <Input v-model="data.closeElectRange"></Input>
    </div>
    <div class="data-wrapper">
      <span>停电编号</span>
      <Input v-model="data.number"></Input>
    </div>
    <div class="data-wrapper">
      <span>许可人</span>
      <Input v-model="data.permissionGuy"></Input>
    </div>
    <div class="data-wrapper">
      <span>危险源电分析</span>
      <Input v-model="data.riskAnalizy"></Input>
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
      min-width 100px
</style>
