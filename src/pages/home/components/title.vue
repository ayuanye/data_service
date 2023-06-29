<template>
  <h2 class="title" :style="{width: wid || '95px'}">{{text}}</h2>
</template>

<script>
export default {
  props: ['text', 'wid']
}
</script>

<style lang="stylus" scoped>
.title
  font-weight bold
  font-size 18px
  background-image url('~@/assets/images/title_bg.png')
  background-size 110% 110%
  text-indent 10px
  background-position -5px 0
  background-repeat no-repeat
</style>
