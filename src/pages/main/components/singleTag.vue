<template>
  <div class="tag" @click="chooseTag($event)" ref="tag">
    <span :class="{'name': true, 'active': isActive}">
      <!-- {{tag.tagName}} -->
      {{$t('main.' + tag.tagName)}}
      </span>
    <Icon type="ios-close" :size="22" @click="closeTag"/>
  </div>
</template>
<script>
export default {
  props: ['tag', 'index'],
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler (to, from) {
        if (to.name === this.tag.name) {
          if (this.$refs.tag) {
            this.$emit('chooseTag', this.$refs.tag)
          }
          this.isActive = true
        } else {
          this.isActive = false
        }
      }
    }
  },
  methods: {
    chooseTag () {
      if (this.$route.name !== this.tag.name) {
        this.$router.push({
          name: this.tag.name
        })
      }
    },
    closeTag (ev) {
      ev.stopPropagation()
      this.$emit('closeTag', this.tag.name)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .tag
    display flex
    justify-content space-between
    align-items center
    border-radius 3px
    background-color white
    cursor pointer
    white-space nowrap
    &:last-child
      margin-right 0 !important
    .name
      padding 5px 15px
      color #808695
      &:hover
        color #666
    .name.active
      color #2d8cf0
    i
      padding 5px 15px 5px 0
</style>
