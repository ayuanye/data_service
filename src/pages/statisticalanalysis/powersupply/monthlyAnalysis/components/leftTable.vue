<template>
  <div class="left-wrapper">
    <table style="border-collapse: collapse;">
      <tr>
        <td class="title" align="center" valign="middle">
          最高负荷
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">调度负荷</span>
          </div>
          <div class="td">
            <span>出现时间</span>
          </div>
          <div class="td">
            <span class="color-blue">去年同期</span>
          </div>
          <div class="td">
            <span>增长率%</span>
          </div>
        </td>
        <td class="tbody-td">
          <div class="td">
            <span class="color-red">1575.28</span>
          </div>
          <div class="td">
            <span>3日15:00:00</span>
          </div>
          <div class="td">
            <span class="color-red">1646.3</span>
          </div>
          <div class="td">
            <span>-4.31%</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          最低负荷
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">调度负荷</span>
          </div>
          <div class="td">
            <span>出现时间</span>
          </div>
          <div class="td">
            <span class="color-blue">去年同期</span>
          </div>
          <div class="td">
            <span>增长率%</span>
          </div>
        </td>
        <td class="tbody-td">
          <div class="td">
            <span class="color-red">1575.28</span>
          </div>
          <div class="td">
            <span>3日15:00:00</span>
          </div>
          <div class="td">
            <span class="color-blue">1646.3</span>
          </div>
          <div class="td">
            <span>-4.31%</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          最大峰谷差
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">峰谷差</span>
          </div>
          <div class="td">
            <span>出现时间</span>
          </div>
          <div class="td">
            <span class="color-blue">去年同期</span>
          </div>
          <div class="td">
            <span>增长率%</span>
          </div>
        </td>
        <td class="tbody-td">
          <div class="td">
            <span class="color-red">1575.28</span>
          </div>
          <div class="td">
            <span>3日15:00:00</span>
          </div>
          <div class="td">
            <span class="color-blue">1646.3</span>
          </div>
          <div class="td">
            <span>-4.31%</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          平均负荷率
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">负荷率</span>
          </div>
          <div class="td">
            <span class="color-blue">去年同期</span>
          </div>
          <div class="td end-td">
            <span>增长率%</span>
          </div>
        </td>
        <td class="tbody-td">
          <div class="td">
            <span class="color-red">1575.28</span>
          </div>
          <div class="td">
            <span class="color-blue">1646.3</span>
          </div>
          <div class="td end-td">
            <span>-4.31%</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.left-wrapper
  width 100%
  td
    border 1px solid #ccc
  .title
    width 150px
  .sec-title-td
    width 150px
    .td
      display flex
      justify-content center
      align-items center
      height 40px
      border-bottom 1px solid #ccc
      &:nth-of-type(4)
        border-bottom none
    .td.end-td
      border-bottom none
  .tbody-td
    width 150px
    .td
      display flex
      justify-content center
      align-items center
      height 40px
      border-bottom 1px solid #ccc
      &:nth-of-type(4)
        border-bottom none
    .td.end-td
      border-bottom none
</style>
