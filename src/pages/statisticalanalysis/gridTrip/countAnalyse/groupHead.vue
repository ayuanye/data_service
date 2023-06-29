<template>
  <div class="group-head">
    <tr class="title">
      <td colspan="4">{{name}}</td>
    </tr>
    <tr class="sec-title">
      <td>
        重合成功
      </td>
      <td>
        重合不成
      </td>
      <td>
        分级保护
      </td>
      <td>
        接地
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  props: ['row']
}
</script>

<style lang="stylus" scoped>
.group-head
  width 100%
</style>
