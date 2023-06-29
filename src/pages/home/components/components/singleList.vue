<template>
  <div class="list">
    <div class="desc-wrapper">
      <list-tag
        :fontClass="listTagFontClass[0]"
        :text="listTagText[0]"
        :number="listTagNumber[0]"
        :backColor="listTagBackColor[0]"
        :circleColor="listTagCircleColor[0]"
        :numberColor="ListTagNumberColor[0]"/>
      <list-tag
        :fontClass="listTagFontClass[1]"
        :text="listTagText[1]"
        :number="listTagNumber[1]"
        :backColor="listTagBackColor[1]"
        :circleColor="listTagCircleColor[1]"
        :numberColor="ListTagNumberColor[1]"
        class="tag-comp"/>
    </div>
    <div class="desc-wrapper">
      <list-tag
        :fontClass="listTagFontClass[2]"
        :text="listTagText[2]"
        :number="listTagNumber[2]"
        :backColor="listTagBackColor[2]"
        :circleColor="listTagCircleColor[2]"
        :numberColor="ListTagNumberColor[2]"/>
      <list-tag
        :fontClass="listTagFontClass[3]"
        :text="listTagText[3]"
        :number="listTagNumber[3]"
        :backColor="listTagBackColor[3]"
        :circleColor="listTagCircleColor[3]"
        :numberColor="ListTagNumberColor[3]"
        class="tag-comp"/>
    </div>
  </div>
</template>

<script>
import listTag from './listTag'
export default {
  props: ['data'],
  data () {
    return {
      listTagFontClass: ['icontongji', 'iconsixianghuibao', 'iconjungong', 'iconweixianyuan'],
      listTagText: ['总数', '未完工', '已竣工', '危险源点'],
      listTagNumber: this.initListTagNum(),
      listTagBackColor: ['#effaff', '#faf8ff', '#edfaf2', '#fef6f2'],
      listTagCircleColor: ['#6b9cf5', '#a899ee', '#5fc380', '#fa876b'],
      ListTagNumberColor: ['#2d74f8', '#6852bb', '#489a61', '#fc7650']
    }
  },
  watch: {
    data (val) {
      if (val.length === 0) {
        this.listTagNumber = this.initListTagNum()
      } else {
        this.listTagNumber = val
      }
    }
  },
  methods: {
    initListTagNum () {
      return ['', '', '', '']
    }
  },
  components: {
    'list-tag': listTag
  }
}
</script>

<style lang="stylus" scoped>
.list
  .desc-wrapper
    display flex
    &:nth-of-type(2)
      margin-top 15px
    .tag-comp
      margin-left 15px
</style>
