<template>
    <div>
        <div class="right-split" >
            <div class="right-split-header">
                <span style="font-weight:bold">详情：</span>
                <span>{{imgInfo.title}}</span>
            </div>
            <div class="right-split-content" >
                <ImageView :needTraceId="needTraceId" :tellTitle="tellTitle" @id="ids" @clickType="clickType"/>
            </div>
        </div>
        <!-- 右边内容 -》下面tab部分内容 -->
        <div class="bottom-split" >
            <Tabs type="card" style="padding:15px;" v-show="showDetails" >
                <TabPane label="基本信息">
                    <Collapse v-model="value1" simple>
                        <Panel name="1" >
                            <span style="font-weight:bold">基本信息</span>
                                <p slot="content">路径： {{computedData?computedData.requestUrl:''}}</p>
                                <p slot="content">请求方法： {{computedData?computedData.requestMethod:''}}</p>
                                <p slot="content">状态码：  {{computedData?computedData.responseCode:''}}</p>
                                <!-- <Divider/> -->
                                <p style="padding-top:10px" slot="content">客户端IP: {{computedData?computedData.clientIp:''}}</p>
                                <p slot="content">Cookie: {{requestHeader?requestHeader.cookie:''}}</p>
                                <p slot="content">user-agent: {{requestHeader?requestHeader.userAgent:''}}</p>
                                <p slot="content">服务端IP：{{computedData?computedData.addressIp:''}}</p>
                                <!-- <Divider/> -->
                                <p style="padding-top:10px" slot="content">日期时间：{{computedData?computedData.beginTime:''}}</p>
                                <p slot="content">总耗时ms： {{computedData?computedData.useTime:''}}</p>
                        </Panel>
                    </Collapse>
                </TabPane>
                <TabPane label="参数信息">
                    <Collapse v-model="value1" simple>
                        <Panel name="1">
                            <span style="font-weight:bold">参数信息</span>
                                <span slot="content" v-for="(item,index) in requestParamNames" :key="index" :value="item">{{item}}:</span>
                                <span slot="content" v-for="(val,index) in requestParamValues" :key="index">{{val}}</span>
                        </Panel>
                    </Collapse>
                </TabPane>
            </Tabs>
            <Tabs type="card" style="padding:15px;" v-show="showFuwuqi" >
                <TabPane label="基本信息">
                    <Collapse v-model="value1" simple>
                        <Panel name="1" >
                            <span style="font-weight:bold">基本信息</span>
                            <p slot="content">应用名称： {{appName?appName:''}}</p>
                            <p slot="content">部署路径： {{clientInfo?clientInfo.systemDir:''}}</p>
                            <p slot="content">应用IP：  {{clientInfo?clientInfo.addressIp:''}}</p>

                            <p style="padding-top:10px" slot="content">SQL数: {{sqlGroups?sqlGroups:0}}</p>
                            <p slot="content">远程调用数: {{dubboNodes?dubboNodes:0}}</p>
                            <p slot="content">异常数: {{errors?errors:0}}</p>
                        </Panel>    
                        <Panel name="2" >
                            <span style="font-weight:bold">跟踪信息</span>
                            <p slot="content">跟踪id： {{traceId?traceId:''}}</p>
                        </Panel>     
                    </Collapse>
                </TabPane>
                <TabPane label="SQL访问" style="max-height:430px;overflow:auto;overflow-x:hidden;">
                    <Collapse v-model="value1" simple>
                        <Table :columns="columns1" :data="data1" ></Table>
                        <Divider> <Icon type="md-pie" /> sql统计</Divider>
                        <Table :columns="columns2" :data="sqlCount"></Table>
                    </Collapse>
                </TabPane>
                <TabPane label="远程调用" style="max-height:430px;overflow:auto;overflow-x:hidden;">
                    <Collapse v-model="value1" simple>
                        <Table :columns="columns3" :data="dubboNodesInfo"></Table>
                    </Collapse>
                </TabPane>
                <TabPane label="系统日志" style="max-height:430px;overflow:auto;overflow-x:hidden;" >
                    <Collapse v-model="value1" simple>
                            <span style="font-weight:bold;white-space: pre-wrap">{{log}}</span>
                    </Collapse>
                </TabPane>
            </Tabs>
            <Tabs type="card" style="padding:15px;" v-show="otherBtn" >
                <TabPane label="基本信息">
                    <Collapse v-model="value1" simple>
                        <Panel name="1" >
                            <span style="font-weight:bold">基本信息</span>
                                <p slot="content">数据库名称： {{name?name:''}}</p>
                                <p slot="content">URL路径： {{jdbcUrl?jdbcUrl:''}}</p>
                                <!-- <Divider/> --> 
                                <p style="padding-top:10px" slot="content">SQL数： {{sqlNodes?sqlNodes:''}}</p>
                                <p slot="content">异常数： {{errorsOther?errorsOther:''}}</p>
                        </Panel>
                            <Panel name="2" >
                            <span style="font-weight:bold">跟踪信息</span>
                            <p slot="content">跟踪id： {{traceIdOther?traceIdOther:''}}</p>
                        </Panel>     
                    </Collapse>
                </TabPane>
                <TabPane label="SQL访问" style="max-height:430px;overflow:auto;overflow-x:hidden;">
                    <Collapse v-model="value1" simple>
                        <Collapse v-model="value1" simple>
                            <Table :columns="columnsOther" :data="sqlNodesData"></Table>
                            <Divider> <Icon type="md-pie" /> sql统计</Divider>
                            <Table :columns="columns2" :data="data1"></Table>
                        </Collapse>
                    </Collapse>
                </TabPane>
                <TabPane label="异常堆栈" style="max-height:430px;overflow:auto;overflow-x:hidden;">
                    <Collapse v-model="value1" simple>
                            <span style="font-weight:bold;white-space: pre-wrap">{{log}}</span>
                    </Collapse>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import {getNodeByTimeV2,getTraceGraphV2,detailV2,V2,saveV2} from '@/services/monitoringStationApi'
import ImageView from '../../imageview/index.vue'
import expandRow from '../tableDetail/index.vue'
import expandRow3 from '../removeTable/index.vue'
export default {
    data(){
        return{
            systeShow:false,
            theme2: 'light',
            showDetails:true,
            otherBtn:false,
            showFuwuqi:false,
            blankBox:true,
            tellTitle:'实时监控',
            diannaofuben:'diannaofuben',
            diannao:'diannao',
            fuwuqis:'fuwuqis',
            fuwuqifuben:'fuwuqifuben',
            other:'other',
            othersfuben:'othersfuben',
            value1:'1',
            data1:[],
            sqlCount:[],
            columns1:[
                {
                    type: 'expand',
                    width: 50,
                    align:'right',
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '序号',
                    type: 'index',
                    width: 100,
                    align: 'center'
                },
                {
                    title: 'SQL语句',
                    key: 'sql',
                    render:(h,params)=>{
                        if(params.row.executes == 'insert'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'增'+params.row.sql)
                        }else if(params.row.executes == 'delete'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'删'+params.row.sql)
                        } else if(params.row.executes == 'update'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'改'+params.row.sql)
                        } else if(params.row.executes == 'select'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'查'+params.row.sql)
                        }
                        
                    }
                },
                {
                    title: '执行次数',
                    key: 'count',
                    width:100
                }
            ],
            columns2:[
                {
                    title: '类别',
                    key: 'model',
                    width:100,
                    render:(h,params)=>{
                        if(params.row.model == 'adds'){
                            return h('div', {
                                props:{
                                    width:'50px',
                                    height:"50px",
                                    color:'#e8e8e8'
                                }
                            },'增')
                        }else if(params.row.model == 'deletes'){
                            return h('div', {
                                props:{
                                    width:'50px',
                                    height:"50px",
                                    color:'#e8e8e8'
                                }
                            },'删')
                        } else if(params.row.model == 'updates'){
                            return h('div', {
                                props:{
                                    width:'50px',
                                    height:"50px",
                                    color:'#e8e8e8'
                                }
                            },'改')
                        } else if(params.row.model == 'select'){
                            return h('div', {
                                props:{
                                    width:'50px',
                                    height:"50px",
                                    color:'#e8e8e8'
                                }
                            },'查')
                        }
                        
                    }
                },
                {
                    title: '表名',
                    key: 'tableName',
                    width:150
                },
                {
                    title: '涉及字段',
                    key: 'sql',
                    render:(h,params)=>{
                        return h('span',params.row.columns?params.row.columns.toString():'')
                    }
                }
            ],
            columns3:[
                {
                    type: 'expand',
                    width: 50,
                    align:'right',
                    render: (h, params) => {
                        return h(expandRow3, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '序号',
                    type: 'index',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '协议',
                    key: 'sql',
                    width: 100,
                    render:(h,params)=>{
                        return h('span', {
                                props:{
                                    
                                }
                            },'dubbo')
                    }
                },
                {
                    title: '服务路径',
                    key: 'remoteUrl',
                    align: 'left'
                },
                {
                    title: '用时',
                    key: 'useTime',
                    width:100
                }
            ],
            columnsOther:[
                {
                    type: 'expand',
                    width: 50,
                    align:'right',
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '序号',
                    type: 'index',
                    width: 100,
                    align: 'center'
                },
                {
                    title: 'SQL语句',
                    key: 'sql',
                    render:(h,params)=>{
                        if(params.row.executes == 'insert'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'增'+params.row.sql)
                        }else if(params.row.executes == 'delete'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'删'+params.row.sql)
                        } else if(params.row.executes == 'update'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'改'+params.row.sql)
                        } else if(params.row.executes == 'select'){
                            return h('div', {
                                props:{
                                    
                                }
                            },'查'+params.row.sql)
                        }
                        
                    }
                },
                {
                    title: '执行次数',
                    key: 'count',
                    width:100
                }
            ],
            modal6:false,
            getListData:[],
            imgInfo:{},
            showImg:false,
            showOther:false,
            needTraceId:'',
            computedData:{},
            requestHeader:{},
            requestParamNames:[],
            requestParamValues:[],
            appList:[],
            clientInfo:{},
            appName:'',
            traceId:'',
            sqlGroups:Number,
            dubboNodes:Number,
            errors:Number,
            log:"",
            addTab:[],
            fuwuqi:{},
            computed:{},
            others:{},
            name:'',
            traceIdOther:'',
            jdbcUrl:'',
            sqlNodes:Number,
            errorsOther:Number,
            sqlNodesData:[],
            dubboNodesInfo:[],
            needTraceId:'',
            FatherId:''
        }
    },
    components:{
        ImageView,
        expandRow,
        expandRow3,
    },
    props:['codeList'],
    
    watch:{
        codeList: {
            handler(val) {
                if(val.length>0){
                    this.needTraceId = val[0].traceId
                    var data={
                        projectId:window.localStorage.getItem('appId'),
                        traceId:val[0].traceId
                    }
                    getTraceGraphV2(data).then(res=>{
                        if(res.data.graphView){
                            this.showImg = true
                            this.blankBox = false
                            if(res.data.graphView.nodes.length==3){
                                this.showOther = true
                            }else{
                                this.showOther = false
                            }
                            this.imgInfo = res.data.graphView
                            this.imgInfo.nodes.map(item=>{
                                if(item.icon == "server") {
                                    this.fuwuqi = item
                                }else if (item.icon == 'desktop'){
                                    this.computed = item
                                    this.showBottominfo(item.id)

                                }else {
                                    if(item){
                                        this.others = item
                                        this.otherBtn = true
                                    }
                                    
                                }
                            })

                        }
                    })
            
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods:{
        ids(event){
            this.FatherId = event
        },
        clickType(event){
            if(event == 'server'){
                this.bottominfoss()
            }else if(event == 'desktop'){
                this.bottominfo()
            }else {
                this.bottomOther()
            }
        },
        showBottominfo(id){
            this.showDetails = true
            this.showFuwuqi = false
            this.otherBtn = false
            var data ={
                nodeId:id,
                traceId:this.needTraceId,
                projectId:window.localStorage.getItem('appId')
            }
            detailV2(data).then(res=>{
                this.computedData = res.data.node.traceNode
                if(res.data.node.traceNode.requestHeader.length>0){
                    this.requestHeader = res.data.node.traceNode.requestHeader
                }
                if(res.data.node.traceNode.requestParamNames.length>0){
                    this.requestParamNames = res.data.node.traceNode.requestParamNames
                }
                if(res.data.node.traceNode.requestParamValues.length>0){
                    this.requestParamValues = res.data.node.traceNode.requestParamValues
                }
            })
        
        },
        // 点击电脑请求
        bottominfo(){
            this.showDetails = true
            this.showFuwuqi = false
            this.otherBtn = false
            var data ={
                nodeId:this.FatherId,
                traceId:this.needTraceId,
                projectId:window.localStorage.getItem('appId')
            }
            detailV2(data).then(res=>{
                this.computedData = res.data.node.traceNode
                if(res.data.node.traceNode.requestHeader.length>0){
                    this.requestHeader = res.data.node.traceNode.requestHeader
                }
                if(res.data.node.traceNode.requestParamNames.length>0){
                    this.requestParamNames = res.data.node.traceNode.requestParamNames
                }
                if(res.data.node.traceNode.requestParamValues.length>0){
                    this.requestParamValues = res.data.node.traceNode.requestParamValues
                }
            })
        },
        // 点击服务器请求
        bottominfoss(){
            this.showDetails = false
            this.showFuwuqi = true
            this.otherBtn = false
            var data ={
                nodeId:this.FatherId,
                traceId:this.needTraceId,
                projectId:window.localStorage.getItem('appId')
            }
            detailV2(data).then(res=>{
                this.clientInfo = res.data.appSession.clientInfo
                this.appName = res.data.appSession.application.appName
                this.traceId = res.data.traceId
                if(res.data.node){
                    this.sqlGroups = res.data.node.sqlGroups.length
                    this.dubboNodes = res.data.node.dubboNodes.length
                    this.errors = res.data.node.errors.length
                    this.log = res.data.node.log
                    this.data1 = res.data.node.sqlGroups
                    this.sqlCount = res.data.node.selects
                    this.dubboNodesInfo = res.data.node.dubboNodes
                }
                
            })
        },
        // 点击其他
        bottomOther(){
            this.otherBtn = true
            this.showDetails = false
            this.showFuwuqi = false
            var data ={
                nodeId:this.FatherId,
                traceId:this.needTraceId,
                projectId:window.localStorage.getItem('appId')
            }
            detailV2(data).then(res=>{
                this.name = res.data.database.name
                this.traceIdOther = res.data.traceId
                this.jdbcUrl = res.data.node.jdbcUrl
                if(res.data.node.jdbcUrl.length!==0||res.data.node.errors.length!==0){
                    this.sqlNodes = res.data.node.sqlNodes.length
                    this.errorsOther = res.data.node.errors.length
                    this.sqlNodesData = res.data.node.sqlNodes
                }
                
                
            })
        },
    }
}
</script>
<style lang="stylus">
.right-split
    width: 100%
    height: 200px
    .right-split-header
        padding 15px
        height: 50px
        width: 100%
        line-height: 30px
        background-color: #f5f7f9
    .bottom-split
        // padding: 30px
        margin-left: 30px
        .ivu-tabs .ivu-tabs-tabpane
            padding: 15px !important
            &>>>.ivu-collapse-content
                padding: 30px !important
    .right-split-content
        margin-left: 200px
        margin-top: 30px
        padding: 10px
        width: 700px
        height: 200px
        display: flex
        flex-wrap:nowrap
        .diannao
            padding: 5px
            border: 1px solid #999
            border-radius: 8px
            width: 170px
            height 80px
        .diannao:hover
            border: 2px solid dodgerblue
        .diannaofuben
            padding: 5px
            border: 2px solid dodgerblue
            border-radius: 8px
            width: 170px
            height 80px
            box-shadow: 0 0 5px dodgerblue
        .fuwuqis
            padding: 5px
            border: 1px solid #999
            border-radius: 8px
            width: 200px
            height: 80px
        .fuwuqis:hover
            border: 2px solid dodgerblue
        .fuwuqifuben
            padding: 5px
            border: 2px solid dodgerblue
            border-radius: 8px
            width: 200px
            height: 80px
            box-shadow: 0 0 5px dodgerblue
        .other
            padding: 5px
            border: 1px solid #999
            border-radius: 8px
            width: 180px
            height: 80px
        .other:hover
            border: 2px solid dodgerblue
        .othersfuben
            padding: 5px
            border: 2px solid dodgerblue
            border-radius: 8px
            width: 180px
            height: 80px
            box-shadow: 0 0 5px dodgerblue
</style>