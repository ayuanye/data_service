<template>
    <div>
        <Table row-key="nodeId" ref="currentRowTable" highlight-row :loading="loading" :columns="columns16" :data="tableData" border @on-row-click="selectRowData"></Table>
        <Drawer title="节点详情" :closable="true" v-model="showRightDrawer" width="450" :mask-closable="true">
            <div v-if="type=='http'">
                <p style="font-size:18px;font-weight: bold">基本信息</p>
                <span>请求方法：{{nodePoint?nodePoint.requestMethod:''}}</span><br/>
                <span>请求URL：{{nodePoint?nodePoint.requestUrl:''}}</span><br/>
                <span>请求状态：{{nodePoint?nodePoint.responseCode:''}}</span><br/>
                <span>IP地址：{{nodePoint?nodePoint.clientIp:''}}</span>
                <p style="font-size:18px;font-weight: bold">请求参数</p>
                <p v-for="(item,index) in nodePoint.requestParamNames" :key="index">{{item}} : 
                    <span>{{nodePoint.requestParamValues[index]}}</span>
                </p>
            </div>
            <div v-if="type=='dubbo'">
                <p style="font-size:18px;font-weight: bold">基本信息</p>
                <span>请求接口#方法：{{nodePoint?nodePoint.serviceInterface:''}}#{{nodePoint?nodePoint.serviceMethodName:''}}</span><br/>
                <span>请求状态：{{nodePoint?nodePoint.error:''}}</span><br/>
                <span>远程IP地址：{{nodePoint?nodePoint.remoteIp:''}}</span><br/>
                <span>请求返回参数：<CodeEdit v-model="content" /></span><br/>
                <span>远程IP地址：{{nodePoint?nodePoint.outParam:'无任何返回'}}</span>
            </div>
            <div v-if="type=='sql'">
                <p style="font-size:18px;font-weight: bold">URL:</p>
                <span>{{nodePoint?nodePoint.jdbcUrl:''}}</span><br/>
                <p style="font-size:18px;font-weight: bold">SQL语句:</p>
                <CodeEdit v-model="contentss" />
            </div>
        </Drawer>
        <Modal v-model="modal7" fullscreen >
            <RelationshipImgVue 
            :relationshipImg="relationshipImg"
            :modal7="modal7"/>
            <div slot="footer">
                <Button  @click="del">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import RelationshipImgVue from './relationshipImg.vue'
import CodeEdit from "@/components/codeEdit/index.vue"
import {stackV2,nodeV2,dataV2} from '@/services/imageviewApi'
export default {
    components:{
        RelationshipImgVue,
        CodeEdit,
    },
    props:['needTraceId'],
    data(){
        return {
            loading:false,
            columns16: [
                {
                    title: '应用名',
                    key: 'appName',
                    tree: true,
                    width:150,
                    align:"center"
                },
                {
                    title: '类型',
                    key: 'type',
                    width:100,
                    align:"center"
                },
                {
                    title: '服务/方法',
                    key: 'serverName',
                    align:"center",
                    render:(h,params)=>{
                        if(params.row.parentId == null){
                            return h('div',[
                                h('span', {
                                    props:{ }
                                },params.row.serverName),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        position: 'relative',
                                        fontWeight: "bold"
                                    },
                                    on: {
                                        click: e => {
                                            e.stopPropagation() // 阻止冒泡事件
                                            this.modal7 = true
                                            dataV2({
                                                projectId:window.localStorage.getItem('appId'),
                                                traceId:params.row.traceId
                                            }).then(res=>{
                                                this.relationshipImg = res.data
                                            })
                                        }
                                    }
                                },"</>")
                            ])
                        }else{
                            return h('span', {
                                props:{ }
                            },params.row.serverName)
                        }
                    }
                },
                {
                    title: '用时',
                    key: 'useTime',
                    width:120,
                    render:(h,params)=>{
                        return h('span', {
                            props:{ }
                        },params.row.useTime+'毫秒')
                    }
                }
            ],
            tableData: [],
            showRightDrawer:false,
            nodePoint:{},
            content:'',
            contentss:'',
            modal7:false,
            relationshipImg:'',
            type:'',
        }
    },
    watch:{
        needTraceId:{
            handler(val) {
                if (val) {
                    this.loading = true
                    var data={
                        projectId:window.localStorage.getItem('appId'),
                        traceId:val
                    }
                    stackV2(data).then(res=>{
                        if(res.data.length>0){
                            let topTree = this.getTop(res.data)
                            this.tableData = this.getChild(topTree, res.data)
                            this.loading = false
                        }
                    })
                }
            },
            deep: true,
            immediate: true,
        }
    },
    methods:{
        selectRowData(index){
            this.showRightDrawer = true
            this.type = index.type
            var data ={
                nodeId:index.nodeId,
                traceId:index.traceId
            }
            nodeV2(data).then(res=>{
                if(res.data.node){
                    this.nodePoint = res.data.node
                    this.nodePoint['remoteIp'] = res.data.remoteIp
                    this.content = this.nodePoint.inParam
                    this.contentss = res.data.sql
                }
            })
        },
        del(){
            this.modal7 = false
        },
    }
}
</script>
<style>
    .ivu-drawer-content{
        z-index: 99999;
    }
</style>