<template>
  <div class="head_menu">
    <Dropdown placement="bottom-start">
        <a href="javascript:void(0)">
            <span>质控系统</span>
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list" v-for="(item, index) in  list" :name="item" :key="index">
            <DropdownItem v-model="context">{{item}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'HeaderMenu',
  data(){
    return {
      context:'',
      list:[
        '质控系统',
        '电商平台',
        '动态代码覆盖率'
      ]
    }
  },
  props: {
    // list:{
    //   type: Array,
    //   default () {
    //     return []
    //   }
    // },
  },
  watch:{
    list(val){
      return val
    }
  },
  computed: {

  },
  methods: {
    openErrorLoggerPage () {
      this.$router.push({
        name: 'error_logger_page'
      })
    }
  }
}
</script>

<style lang="less">
.head_menu{
  margin-right: 15px;
  .ivu-badge-dot{
    top: 10px;
  }
  .ivu-btn.ivu-btn-text{
    padding: 5px 1px 6px;
  }
  .ivu-badge-count{
    top:5px;
  }
}
</style>
