<template>
  <div class="sidebar-content">
    <Menu active-name="1-2" :open-names="['1']" :theme="theme3" style="height:950px;">
      <MenuItem name="1">
              <Icon type="md-home" />
              首页
      </MenuItem>
      <Submenu name="2">
          <template slot="title">
              <Icon type="ios-analytics" />
              内容管理
          </template>
          <MenuGroup title="Item 1">
              <MenuItem name="2-1">文章管理</MenuItem>
              <MenuItem name="2-2">评论管理</MenuItem>
          </MenuGroup>
          <MenuGroup title="Item 2">
              <MenuItem name="2-3">Option 3</MenuItem>
              <MenuItem name="2-4">Option 4</MenuItem>
          </MenuGroup>
      </Submenu>
      <Submenu name="3">
          <template slot="title">
              <Icon type="ios-filing" />
              统计分析
          </template>
          <MenuItem name="3-1">用户留存</MenuItem>
          <MenuItem name="3-2">流失用户</MenuItem>
          <Submenu name="4">
              <template slot="title">Submenu</template>
              <MenuItem name="4-1">Option 7</MenuItem>
              <MenuItem name="4-2">Option 8</MenuItem>
          </Submenu>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data(){
    return {
      theme3: 'dark'
    }
  },
}
</script>
<style scoped>
  .sidebar-content{
    height: 100%;
    width: 100%;
    background-color: aquamarine;
  }
  .ivu-menu{
    font-size: 16px;
  }

</style>
