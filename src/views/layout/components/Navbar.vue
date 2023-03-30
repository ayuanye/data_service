<template>
  <div class="top_title">
    <Breadcrumb>
        <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> 首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">
            <Icon type="logo-buffer"></Icon> Components
        </BreadcrumbItem>
        <BreadcrumbItem>
            <Icon type="ios-cafe"></Icon> Breadcrumb
        </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>

export default {

}
</script>
<style scoped>
.ivu-breadcrumb{
  font-size: 15px;
}
.top_title{
  line-height: 50px;
}
</style>



