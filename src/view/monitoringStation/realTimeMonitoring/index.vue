<template>
<div class="main">
    <div class="layout">
        <Layout>
            <!-- 头部搜索模块 -->
            <Header style="padding:0 20px">
                <Form :model="formItem" :label-width="80" >
                    <Row>
                        <Col span="20" >
                            <span class="iconfont" style="font-size:14px">&#xe61c; 条件过滤：</span>
                                <Select v-model="formItem.upToTime" style="width: auto" placeholder="时间过滤" clearable>
                                    <Option v-for="item in nameList" :key="item.id" :value="item.id">{{item.name}}</Option>
                                </Select>&nbsp;
                                <Select v-model="formItem.appIds" style="width: auto" placeholder="应用过滤" clearable multiple>
                                    <Option v-for="item in appList" :key="item.id" :value="item.id">{{item.name}}</Option>
                                </Select>&nbsp;
                                <Input v-model="formItem.clientIps" placeholder="ip过滤" style="width: 150px" clearable />&nbsp;
                                <Button type="primary" @click="getList">查询</Button>
                        </Col>
                        <Col span="4" style="text-align:right">
                            <Dropdown style="margin-left: 30px" @on-click="addSnapshot">
                                <Button type="primary">
                                    保存快照
                                </Button>
                                <DropdownMenu slot="list" >
                                    <DropdownItem :disabled='codeList.length == 1?false:true' name="我的快照" >我的快照</DropdownItem>
                                    <DropdownItem :disabled='codeList.length == 1?false:true' name="系统快照">系统快照</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Form>
            </Header>
            <Content>
                <div class="demo-split">
                    <Split v-model="split1" min=260px max=400px>
                        <!-- 左边菜单布局 -->
                        <div slot="left" class="demo-split-pane left">
                            <div class="left-header">
                                <span style="line-height:50px;margin-left:15px;font-weight: bold">实时监控</span>
                                <div class="left-header-but" style="text-align:right">
                                    <Tooltip content="获取最新数据" placement="top">
                                        <Button  shape="circle" icon="md-refresh" @click="getList"></Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div class="left-content" >
                                <Menu :theme="theme2" style="width:auto;padding:0;max-height:530px;overflow:auto;overflow-x:hidden;" @on-select="getimgInfo" >
                                    <MenuItem v-for="item in getListData" :key="item.index" :name="item.index" style="padding:0 10px">
                                            <p>
                                                <span>{{item?item.title:''}}</span><br/>
                                                <span>{{item?item.cacheTime:''}}</span>
                                            </p><Divider style="margin:5px 0"/>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <!-- 右边内容布局 -->
                        <div slot="right" class="demo-split-pane right">
                            <!-- 初始化没有数据 展示部分 -->
                            <div class="blankBox" v-if="blankBox">
                                <p style="font-weight:bold;font-size:25px;margin-top:300px">监控详情视图</p>
                                <p>从左边监控列表选择您要查看的请求</p>
                            </div>
                            <!-- 初始化有数据 展示部分 -->
                            <div v-if="!blankBox">
                                <!-- <div class="right-split" >
                                    <div class="right-split-header">
                                        <span style="font-weight:bold">详情：</span>
                                        <span>{{imgInfo.title}}</span>
                                    </div>
                                    <div class="right-split-content" >
                                        <div :class="showDetails?diannaofuben:diannao" @click="bottominfo(computed.id)" v-if="showImg">
                                            <img src="@/assets/images/diannao.jpg" style="width:50px;height:50px"/>
                                            <span>{{computed?computed.title:''}}</span>
                                            <p>{{computed?computed.subTitle:''}}</p>
                                        </div>&nbsp;
                                        <div class="youjiantou" v-if="showImg">
                                            <img src="@/assets/images/youjiantou.jpg" style="width:80px;height:40px;padding-top:10px"/>
                                            <p style="text-align:center">{{imgInfo.edges?(showOther?imgInfo.edges[1].label:imgInfo.edges[0].label):''}}</p>
                                        </div>
                                        <div :class="showFuwuqi?fuwuqifuben:fuwuqis" @click="bottominfoss(fuwuqi.id)" v-if="showImg">
                                            <img src="@/assets/images/fuwuqi.jpg" style="width:50px;height:50px"/>
                                            <span>{{fuwuqi?fuwuqi.title:''}}</span>
                                            <p>{{fuwuqi?fuwuqi.subTitle:''}}</p>
                                        </div>
                                        <div class="youjiantou" v-if="showOther">
                                            <img src="@/assets/images/youjiantou.jpg" style="width:80px;height:40px;padding-top:10px"/>
                                            <p style="text-align:center">{{imgInfo.edges?imgInfo.edges[0].label:''}}</p>
                                        </div>
                                        <div :class="otherBtn?othersfuben:other" @click="bottomOther(others.id)" v-if="showOther">
                                            <img src="@/assets/images/shujuku.jpg" style="width:50px;height:50px"/>
                                            <span>{{others?others.title:''}}</span>
                                            <p>{{others?others.subTitle:''}}</p>
                                        </div>
                                    </div>
                                </div> -->
                                 <!-- 右边内容 -》下面tab部分内容 -->
                                <!-- <div class="bottom-split" >
                                    <Tabs type="card" style="padding:15px;" v-show="showDetails" >
                                        <TabPane label="基本信息">
                                            <Collapse v-model="value1" simple>
                                                <Panel name="1" >
                                                    <span style="font-weight:bold">基本信息</span>
                                                        <p slot="content">路径： {{computedData?computedData.requestUrl:''}}</p>
                                                        <p slot="content">请求方法： {{computedData?computedData.requestMethod:''}}</p>
                                                        <p slot="content">状态码：  {{computedData?computedData.responseCode:''}}</p>
                                                       
                                                        <p style="padding-top:10px" slot="content">客户端IP: {{computedData?computedData.clientIp:''}}</p>
                                                        <p slot="content">Cookie: {{requestHeader?requestHeader.cookie:''}}</p>
                                                        <p slot="content">user-agent: {{requestHeader?requestHeader.userAgent:''}}</p>
                                                        <p slot="content">服务端IP：{{computedData?computedData.addressIp:''}}</p>
                                                        
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
                                </div> -->
                                 <RightContent :codeList='codeList'/>
                            </div>
                        </div>
                    </Split>
                </div>
            </Content> 
        </Layout>
        <!-- 我的快照 -->
        <Modal
            v-model="modal6"
            :title="title"
            @on-ok="asyncOK">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="快照名称:" prop="name" >
                        <Input v-model="formValidate.name" style="width: 80%" placeholder="请输入快照名称"></Input>
                    </FormItem>
                    <FormItem label="添加标签:" prop="labels">
                        <Select v-model="formValidate.labels" placeholder="选择标签" style="width: 80%" multiple clearable>
                            <Option v-for="item in addTab" :key="item.name" :value="item.name">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                     <FormItem label="快照描述:" prop="describe">
                        <Input v-model="formValidate.describe" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="请输入快照描述"></Input>
                    </FormItem>
                </Form>
        </Modal>
        <!-- 系统快照 -->
        <SystemModel
        :systeShow="systeShow"
        @showsysteF="showsysteF" 
        :addTab="addTab"
        :codeList="codeList"/>
    </div>
</div>
</template>
<script>
import {getNodeByTimeV2,getTraceGraphV2,detailV2,V2,saveV2} from '@/services/monitoringStationApi'
import SystemModel from './systemModel/index.vue'
import RightContent from './rightContent/index.vue'
    export default {
        data () {
            return {
                systeShow:false,
                theme2: 'light',
                showDetails:true,
                otherBtn:false,
                showFuwuqi:true,
                blankBox:true,
                diannaofuben:'diannaofuben',
                diannao:'diannao',
                fuwuqis:'fuwuqis',
                fuwuqifuben:'fuwuqifuben',
                other:'other',
                othersfuben:'othersfuben',
                split1: 0.25,
                split2:0.6,
                formItem:{
                    upToTime:'',
                    appIds:[],
                    clientIps:''
                },
                nameList:[
                    {id:60,name:'一分钟'},
                    {id:180,name:'三分钟'},
                    {id:300,name:'五分钟'},
                ],
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
                title:'',
                formValidate:{
                    name:'',
                    labels:'',
                    describe:'',
                },
                ruleValidate:{},
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
                codeList:[],
                fuwuqi:{},
                computed:{},
                others:{},
                name:'',
                traceIdOther:'',
                jdbcUrl:'',
                sqlNodes:Number,
                errorsOther:Number,
                sqlNodesData:[],
                dubboNodesInfo:[]
            }
        },
        components:{
            SystemModel,
            RightContent
        },
        created(){
            this.getList()
            this.others={}
            var data = {
                projectId:window.localStorage.getItem('appId')
            }
            V2(data).then(res=>{
                this.appList = res.data.appList
                this.addTab = res.data.labels
            })
            setInterval(() => {
                this.getList()
            }, 5000)
        },
        computed:{
            function(){
                var box1=document.getElementsByClassName("right-split-content");
                //绑定滚轮事件
                //onmousewheel鼠标滚轮事件会在滚轮滚动时触发但火狐不支持
                //火狐使用DOMMouseScroll来绑定滚轮事件但该事件需要addEventListener()
                box1.onmousewheel=function(event){
                    event=event||window.event;
                    //判断滚轮滚动方向
                    //wheelDelta获取到鼠标滚动方向，向上滚是正值，向下是负值，但火狐不支持
                    //event.detail火狐支持，向上为负值，向下为正值
                    if(event.wheelDelta>0 || event.detail<0){
                        box1.style.height=box1.clientHeight-10+"px";
                    }else{
                        box1.style.height=box1.clientHeight+10+"px";
                    }

                    //当滚轮滚动，如果浏览器有滚动条，滚动条会随之滚动，是默认行为
                    //addEventLinstener绑定响应函数时取消默认行为不能使用return false;
                    //需要使用event来取消，event.preventDefault;但IE8不支持，会报错
                    event.preventDefault && event.preventDefault();

                    return false;
                }
                bind(box1,"DOMMouseScroll",box1.onmousewheel);

                //事件的绑定
                function bind(obj,eventStr,callBack){
                //大部分浏览器兼容
                if(obj.addEventLinstener){
                    obj.addEventLinstener(eventStr,callBack,false)
                }else{
                    // this是由调用方式决定；callback.call（obj）
                    obj.attachEvent("on"+eventStr,function(){
                        //在匿名函数调用回调函数
                        callBack.call(obj);
                    });
                }

            }
            }
        },
        methods:{
            showsysteF(val){
                this.systeShow = val
            },
            getList(){
                var data = {
                    appIds:this.formItem.appIds,
                    clientIps:this.formItem.clientIps?[this.formItem.clientIps]:[],
                    upToTime:this.formItem.upToTime?this.formItem.upToTime:300,
                    maxSize:15,
                    projectId:window.localStorage.getItem('appId')
                }
                getNodeByTimeV2(data).then(res=>{
                    if(res.data.length>0){
                        this.getListData = res.data
                    }
                })
            },
            asyncOK(){
                var data = {
                    snapshot:{
                        name:this.formValidate.name,
                        projectId:window.localStorage.getItem('appId'),
                        labels:this.formValidate.labels,
                        describe:this.formValidate.describe,
                        share:"false",
                        traceId:this.codeList[0].traceId
                    }
                }
                saveV2(data).then(res=>{
                    if(res.code == 10000){
                        this.formValidate={
                            name:'',
                            labels:'',
                            describe:'',
                        },
                        this.$Message.info(res.message)
                    }
                })
            },
            addSnapshot(name){
                if(name=="我的快照"){
                    this.title = "保存快照"
                    this.modal6 =true
                }else{
                    this.systeShow = true;
                }
                
            },
            getimgInfo(name){
                this.others={}
                this.getListData.map(item=>{
                    this.needTraceId = item.traceId
                    if(item.index==name){
                        this.codeList = [item]
                        var data={
                            projectId:window.localStorage.getItem('appId'),
                            traceId:item.traceId 
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
                                        this.bottominfo(item.id)

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
                })
            },
            // 点击电脑请求
            bottominfo(id){
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
            // 点击服务器请求
            bottominfoss(id){
                this.showDetails = false
                this.showFuwuqi = true
                this.otherBtn = false
                var data ={
                    nodeId:id,
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
            bottomOther(id){
                this.otherBtn = true
                this.showDetails = false
                this.showFuwuqi = false
                var data ={
                    nodeId:id,
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
.main
    width: 100%
    height: 100%
    .layout
        width: 100%
        height: 100%
    .ivu-layout-header
        width: 100%;
        padding 0px 40px 
        background-color: white
        margin-bottom: 10px
        .ivu-form-item 
            padding-top: 15px
    .ivu-layout-content
        padding 20px 20px 
        width: 100%;
        background-color: white
        margin-bottom: 0px
        .demo-split
            height: 700px
            border: 1px solid #dcdee2
        .demo-split-pane 
            // padding: 10px
            .left-header
                width: 100%
                height: 50px
                background-color: #f5f7f9
                position relative
                .left-header-but  
                    position: absolute
                    top 10px
                    right: 10px
            .left-content 
                padding 8px 10px 0 10px 
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
            .blankBox
                background-color: #f5f7f9
                width: 100%
                height: 690px
                text-align: center
                overflow hidden
</style>
