<template>
    <div>
        <Row class="expand-row">
            <Col span="18">
                <span >部署路径：</span>
                <span >{{exList.systemDir }}</span>
            </Col>
            <Col span="6">
                <span >进程ID：</span>
                <span >{{exList.pid }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span >JVM版本：</span>
                <span >{{exList.jvmVersion }}</span>
            </Col>
            <Col span="16">
                <span >JVM启动参数：</span>
                <span >{{exList.jvmOption }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    props:{
        exList: Object
    },
    data(){
        return {
            
        }
    }
}
</script>
<style lang="stylus" scoped>
    .expand-row
        margin-bottom: 16px;
    
</style>