<template>
  <div class="left-wrapper">
    <table style="border-collapse: collapse;">
      <tr class="thead">
        <td style="height: 40px;font-weight: 600;" colspan="2" align="center" valign="middle">内容</td>
        <td style="height: 40px;font-weight: 600;" align="center" valign="middle">地区</td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          全月电量汇总
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">调度电量</span>
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
            <span class="color-red">1646.3</span>
          </div>
          <div class="td">
            <span class="color-green">-4.31%</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          高峰电量汇总
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">调度电量</span>
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
            <span class="color-blue">1646.3</span>
          </div>
          <div class="td">
            <span>-4.31%</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          低谷电量汇总
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">峰谷差</span>
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
            <span class="color-blue">1646.3</span>
          </div>
          <div class="td">
            <span>-4.31%</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          最高日用
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">调度电量</span>
          </div>
          <div class="td">
            <span class="color-blue">时间</span>
          </div>
          <div class="td not-end">
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
            <span class="color-red">3日15:53:00</span>
          </div>
          <div class="td not-end">
            <span class="color-blue">1646.3</span>
          </div>
          <div class="td">
            <span class="color-green">-4.31%</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title" align="center" valign="middle">
          至本月年累计
        </td>
        <td class="sec-title-td">
          <div class="td">
            <span class="color-red">调度电量</span>
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
            <span class="color-blue">1646.3</span>
          </div>
          <div class="td">
            <span class="color-green">-4.31%</span>
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
      &:nth-of-type(3)
        border-bottom none
      &:nth-of-type(4)
        border-bottom none
    .td.not-end
      border-bottom 1px solid #ccc
  .tbody-td
    width 150px
    .td
      display flex
      justify-content center
      align-items center
      height 40px
      border-bottom 1px solid #ccc
      &:nth-of-type(3)
        border-bottom none
      &:nth-of-type(4)
        border-bottom none
    .td.not-end
      border-bottom 1px solid #ccc
</style>
