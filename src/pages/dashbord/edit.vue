<template>
  <Modal
    v-model="show"
    title="Modal Title"
    @on-ok="ok"
    @on-cancel="cancel"
    ok-text="OK"
    cancel-text="Cancel">
    <div class="data-wrapper">
      <span>Name</span>
      <Input v-model="data.name"></Input>
    </div>
    <div class="data-wrapper">
      <span>Age</span>
      <Input v-model="data.age"></Input>
    </div>
    <div class="data-wrapper">
      <span>Address</span>
      <Input v-model="data.address"></Input>
    </div>
    <div class="data-wrapper">
      <span>Date</span>
      <Input v-model="data.date"></Input>
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
    },
    cancel (val) {
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
