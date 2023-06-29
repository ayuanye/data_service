<template>
  <ul class="warn-list">
    <li class="list" v-for="(item, index) in list" :key="item.id">
      <div class="top">
        <aside class="title-wrapper">
          <span class="title">{{index + 1}}.关于滆湖变只能化改造(第III阶段:220kv改造)的调度运行风险预警通知书</span>
          <span class="level">5级</span>
        </aside>
        <aside class="close" @click="coll(index)">
          <Icon class="color-self-orange" style="font-size: 20px;margin-right: 5px;" type="ios-eye" />
          <span v-show="isClose[index]">展开</span>
          <span v-show="!isClose[index]">收起</span>
        </aside>
      </div>
      <div class="top" style="margin-top: 10px;padding-left: 20px;">
        <aside>
          <span>风险编号：<span class="sky-blue">常州地调2020033501</span></span>
        </aside>
        <aside>
          <span>工期:2020-03-19至2020-05-01</span>
        </aside>
      </div>
      <div class="cover" :ref="refs(index)">
        <div class="article" :ref="articles(index)">
          <p class="department content">
            <span class="title">[落实部门]</span>
            <Icon class="sky-blue" type="ios-home-outline" />
            <span class="interval">输电运检室</span>
            <Icon class="sky-blue" type="ios-home-outline" />
            <span class="interval">电力调度控制中心</span>
            <Icon class="sky-blue" type="ios-home-outline" />
            <span class="interval">营销部</span>
            <Icon class="sky-blue" type="ios-home-outline" />
            <span class="interval">变电运维室</span>
            <Icon class="sky-blue" type="ios-home-outline" />
            <span>电缆运检</span>
          </p>
          <p class="content">
            <span class="title">[事由]</span>
            <span>3月19日至5月10日实施滆湖变化智慧改造(第三阶段:220kv部分)改造;3月20日至5月7日,滆湖变220kv设备将推出运行。</span>
          </p>
          <p class="content">
            <span class="title">[工期]</span>
            <span>2020-03-09至2020-05-10</span>
          </p>
          <p class="content">
            <span class="title">[风险分析]</span>
            <span>1.在停运过程中,会涉及和平变单电源,滆湖变单主变供电方式,可靠性下降;2.串供方式可靠性下降,具体有:110kv高湖线(西太湖变T1供电)
              经滆湖变110kv副母线串供滆阳线,滆铁线;110kv东滆I线(白荡变T1供电)经滆湖变110kv正母线串供滆兴线。
            </span>
          </p>
          <p class="content">
            <span class="title">[管控措施]</span>
            <span>对220kv延和4Y69线(3月19-24日,5月6日-27日):110kv高湖线、滆阳线、滆铁线、杭阳线;东滆I线、滆鸣线、滆兴线;
              滆塘线、滆顺线(3月19日-5月8日);35kv新湖线(3月19日-5月10日)特巡。
            </span>
          </p>
          <p class="detail">展开详情>>></p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }, {
        id: 4
      }],
      isClose: [true, true, true, true]
    }
  },
  mounted () {
    this.coll(0)
  },
  methods: {
    coll (index) {
      if (this.isClose[index]) {
        this.$refs['cover' + index][0].style.height = this.$refs['articles' + index][0].offsetHeight + 'px'
      } else {
        this.$refs['cover' + index][0].style.height = '0'
      }
      this.$set(this.isClose, index, !this.isClose[index])
    },
    refs (index) {
      return 'cover' + index
    },
    articles (index) {
      return 'articles' + index
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.warn-list
  &::-webkit-scrollbar
    width 5px
    height 1px
  &::-webkit-scrollbar-thumb
    border-radius 10px
    background-color #1BD7D9
.warn-list
  overflow-y auto
  width 100%
  max-height 800px
  .list
    width 100%
    margin-top 10px
    padding 0 10px
    .top
      display flex
      justify-content space-between
      align-items center
      margin-bottom 20px
      .level
        padding 2px 5px
        border 1px solid #00C5B4
        color #00C5B4
        margin-left 10px
        border-radius 3px
      .close
        display flex
        justify-content center
        align-items center
        cursor pointer
      .title
        font-weight bold
    .cover
      height 0
      overflow hidden
      transition .2s
      .article
        padding-left 20px
        .title
          margin-right 10px
          font-weight bold
        .content
          line-height 28px
        .department
          .interval
            margin-right 10px
        .detail
          text-align center
          color green
          font-weight bold
          cursor pointer
          margin-top 10px
</style>
