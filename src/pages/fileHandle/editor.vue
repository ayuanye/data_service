<template>
  <div class="editor-wrapper">
    <div class="btn">
      <Button type="primary" @click="confirm" size="large" long>提交</Button>
    </div>
    <div id="editor" ref="editor">

    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new E('#editor')
    this.editor.create()
  },
  methods: {
    confirm () {
      console.log(this.editor.txt.html())
    }
  }
}
</script>
<style lang="stylus" scoped>
  .editor-wrapper
    width 100%
    height 100%
    padding 15px
    box-sizing border-box
    background-color white
    .btn
      width 150px
      margin-bottom 20px
</style>
