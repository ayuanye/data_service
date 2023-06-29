<template>
    <div style="margin-bottom:0px;padding:0 0 0 120px">
        <p><span style="font-weight: bold;font-size:15px">远程地址：</span>{{row.remoteIp}}</p>
        <Divider />
        <p><span style="font-weight: bold;font-size:15px">输入参数：</span>{{row.inParam}}</p>
        <Divider />
        <p><span style="font-weight: bold;font-size:15px">返回结果：</span>{{row.outParam}}</p>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
<style>

</style>
