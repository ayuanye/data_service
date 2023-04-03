<template>
  <div class="header-left">
    <list :collapsed="collapsed" @on-coll-change="handleCollapsedChange"/>
    <list style="margin-right:10px;" :collapsed="collapsed" @on-coll-change="handleCollapsedChange"/>
  </div>
</template>
<script>
import List from '../list'
export default {
  name:'HeaderLeft',
  components:{
    List,
  }
}
</script>
<style scoped>
.header-left{
  width: 200px;
}
</style>
