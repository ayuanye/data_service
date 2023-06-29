<!-- created by rbb-->
<template>
  <Modal
    v-model="showModal"
    title=""
    @on-visible-change="visibleChange"
    width="50"
    footer-hide
    :styles="{ opacity: 0.9 }"
  >
    <div class="timeline-wrapper">
      <diy-timeline
        v-for="(item, index) in data"
        :key="index"
        :data="item"
        :style="{ marginTop: index === 0 ? '' : '20px' }"
        :index="index"
        :isLast="index + 1 === data.length"
      />
    </div>
  </Modal>
</template>

<script>
import diyTimeLine from './diyTimeLine'
export default {
  props: ['isShowModal', 'data'],
  components: {
    'diy-timeline': diyTimeLine
  },
  data () {
    return {
      showModal: false
    }
  },
  watch: {
    isShowModal: {
      immediate: true,
      handler (val) {
        if (val) {
          this.showModal = val
        }
      }
    }
  },
  methods: {
    visibleChange (val) {
      if (!val) {
        this.$emit('closeModal', false)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.timeline-wrapper
  margin-top 20px
  max-height 750px
  overflow-y auto
  scrollbar()
</style>
