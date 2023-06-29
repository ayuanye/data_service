<template>
  <div class="cell">
    <table style="width: 100%;">
      <tr>
        <td style="border-bottom: 1px solid #eee;">{{row[keys] ? row[keys].val[0] : ''}}</td>
      </tr>
      <tr>
        <td style="border-bottom: 1px solid #eee;">{{row[keys] ? row[keys].val[1] : ''}}</td>
      </tr>
      <tr>
        <td>{{row[keys] ? row[keys].val[2] : ''}}</td>
      </tr>
    </table>
    <!-- <div style="border-right: 1px solid #ccc;">

    </div>
    <div>
      <p style="border-bottom: 1px solid #ccc;">{{row.device.val[0]}}</p>
      <p style="border-bottom: 1px solid #ccc;">{{row.device.val[1]}}</p>
      <p style="border-bottom: 1px solid #ccc;">{{row.device.val[2]}}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['row', 'keys']
}
</script>

<style lang="stylus" scoped>
.cell
  width 100%
  tr
    background none
    td
      border none
      background-color transparent !important
      text-align center
</style>
