<template>
  <div class="app_home">
    <Steps :current="1">
        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>
  </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>
.app_home{
  height: 800px;
  width: 800px;
  background-color: aqua;
}
</style>
