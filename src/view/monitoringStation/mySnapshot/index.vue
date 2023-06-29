<template>
<div class="main">
    <div class="layout">
        <Layout>
            <!-- 头部搜索模块 -->
            <Header style="padding:0 20px">
                <Form :model="formItem" :label-width="80" >
                    <Row>
                        <Col span="20" >
                                <span class="iconfont" style="font-size:14px">&#xe606; ：</span>
                                <Select v-model="formItem.labels" style="width: auto" placeholder="标签过滤" clearable>
                                    <Option v-for="item in nameList" :key="item.name" :value="item.name">{{item.name}}</Option>
                                </Select>&nbsp;
                                <span class="iconfont" style="font-size:14px">&#xe7e9; ：</span>
                                <Select v-model="formItem.sort" style="width: auto" placeholder="排序" clearable >
                                    <Option v-for="item in appList" :key="item.id" :value="item.id">{{item.name}}</Option>
                                </Select>&nbsp; 
                                <Button type="text" @click="searchReport">
                                    <span class="iconfont" style="font-size:14px">&#xe647; ：</span><span type="text">报告</span>
                                </Button>
                        </Col>
                        <Col span="4" style="text-align:right">
                            <Button type="primary" @click="addSnapshot" :disabled='codeList.length == 1?false:true'>系统快照</Button>
                        </Col>
                    </Row>
                </Form>
            </Header>
            <Content>
                <div class="demo-split-btn">
                    <Split v-model="split1" min=350px max=400px>
                        <!-- 左边菜单布局 -->
                        <div slot="left" class="demo-split-pane left">
                            <div class="left-header">
                                <span style="line-height:50px;margin-left:15px;font-weight: bold">我的快照</span>
                                <div class="left-header-but" style="text-align:right">
                                    <Tooltip content="获取最新数据" placement="top">
                                        <Button  shape="circle" icon="md-refresh" @click="getList"></Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div class="left-content">
                                <Menu :theme="theme2" style="width:auto;padding:0;max-height:600px;overflow:auto;overflow-x:hidden;" @on-select="getimgInfo">
                                    <MenuItem :name="item.id" style="padding:0 10px"  v-for="item in getListData" :key="item.id">
                                        <p style="display:flex;margin-right:10px">
                                            <span style="text-align:left;margin-right:20px">{{item?item.name:''}}</span> 
                                            <span style="margin-right:15px">{{item.difTime?item.difTime:''}}</span>
                                            <span>
                                                <Dropdown>
                                                    <a href="javascript:void(0)">
                                                        <Icon type="md-settings" style="font-size:20px"/>
                                                    </a>
                                                    <DropdownMenu slot="list">
                                                        <!-- <DropdownItem @click.native="onload()" style="color:green" :disabled='codeList.length == 1?false:true'>
                                                            <Icon type="md-share" /> 共享设置
                                                        </DropdownItem> -->
                                                        <Dropdown placement="right-start">
                                                            <DropdownItem style="color:green">
                                                                <Icon type="md-share" />共享设置
                                                                <Icon type="ios-arrow-forward"></Icon>
                                                            </DropdownItem>
                                                            <DropdownMenu slot="list">
                                                                <!-- <DropdownItem>
                                                                    <Switch v-model="switchs">
                                                                        <span slot="open">开</span>
                                                                        <span slot="close">关</span>
                                                                    </Switch>
                                                                </DropdownItem> -->
                                                                <DropdownItem :disabled='codeList.length == 1?false:true' @click.native="onload()"><Icon type="md-git-branch" /> 访问共享页</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                        <DropdownItem @click.native="settings()" style="color:#ff9900" :disabled='codeList.length == 1?false:true'>
                                                            <Icon type="ios-create-outline" /> 编辑
                                                        </DropdownItem>
                                                        <DropdownItem @click.native="onDelete()" style="color:red" :disabled='codeList.length == 1?false:true'>
                                                            <Icon type="md-close-circle" /> 删除
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </span>
                                        </p><Divider style="margin:5px 0"/>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <!-- 右边内容布局 -->
                        <div slot="right" class="demo-split-pane right">
                            <!-- 初始化没有数据 展示部分 -->
                            <div class="blankBox-btn" v-if="blankBox">
                                <p style="font-weight:bold;font-size:25px;margin-top:300px">监控详情视图</p>
                                <p>从左边监控列表选择您要查看的请求</p>
                            </div>
                            <!-- 初始化有数据 展示部分 -->
                            <div v-if="blankBoxss">
                                <div class="right-split" >
                                    <div class="right-split-header">
                                        <div :class="headerTab?liuchengtufuben:liuchengtu" @click="searchImage()">
                                            <span>流程图 </span>
                                        </div>&nbsp;&nbsp;
                                        <div :class="headerTab?duizhanliebiao:duizhanliebiaofuben" @click="tableList">
                                            <span >堆栈列表 </span>
                                        </div>&nbsp;&nbsp;
                                        <span>{{headerTitle}}</span>
                                    </div>
                                    <div class="right-split-content-bto" v-if="headerTab">
                                        <!-- <div :class="showDetails?diannaofuben:diannao" style="float: right;" @click="bottominfo(computed.id)" v-if="showImg">
                                            <Tooltip :content="imgInfo.title" placement="right-start">
                                                <img src="@/assets/images/diannao.jpg" style="width:50px;height:50px"/>
                                                <span>{{computed?computed.title:''}}</span>
                                                <p>{{computed?computed.subTitle:''}}</p>
                                            </Tooltip>
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
                                        </div> -->
                                        <ImageView :needTraceId="needTraceId" />
                                    </div>
                                    <div v-if="!headerTab">
                                        <HeapListVue :needTraceId="needTraceId"/>
                                    </div>
                                </div>
                            </div>
                            <!-- 点击报告 展示部分 -->
                            <div v-if="lookReport">
                                <div class="right-split" >
                                    <div class="right-split-header">
                                        <span style="font-size:15px;font-weight: bold">接口/地址总数：{{codeRelatSize?codeRelatSize:0}}</span>
                                    </div>
                                    <div  style="max-height:590px;overflow:auto;overflow-x:hidden;">
                                        <Collapse accordion>
                                            <Panel :name="item.childNodes.id" v-for="(item,index) in reportData" :key="index">
                                                地址/接口：{{item.requestUrl?item.requestUrl:''}}
                                                <p slot="content"><Table :columns="columnss" :data="item.childNodes"></Table></p>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Split>
                </div>
            </Content> 
        </Layout>
        <!-- 系统快照 -->
        <SystemModel
        :systeShow="systeShow"
        @showsysteF="showsysteF" 
        :addTab="addTab"
        :codeList="codeList"/>
        <!-- 编辑 -->
        <Modal
            v-model="modal6"
            >
                <div slot="header">
                    <span>{{title}}</span>
                </div>
                <div>
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
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
                </div>
                <div slot="footer">
                    <Button @click="back">取消</Button>
                    <Button type="primary"  @click="asyncOK('formValidate')">保存</Button>
                </div>
        </Modal>
    </div>
</div>
</template>
<script>
import {V2} from '@/services/monitoringStationApi'
import {myV2,stackV2,nodeV2,mySnapshotsCodeReportV2,doUpdateV2,editV2,doDeleteV2,dataV2} from '@/services/imageviewApi'
import ImageView from '../imageview/index.vue'
import SystemModel from '../realTimeMonitoring/systemModel/index.vue'
import CodeEdit from "@/components/codeEdit/index.vue"
import RightContent from "../realTimeMonitoring/rightContent/index.vue"
import HeapListVue from './heapList.vue'
    export default {
        data () {
            return {
                switchs:false,
                loading:false,
                headerTab:true,
                systeShow:false,
                theme2: 'light',
                showDetails:true,
                otherBtn:false,
                showFuwuqi:true,
                blankBox:true,
                blankBoxss:false,
                lookReport:false,
                diannaofuben:'diannaofuben',
                diannao:'diannao',
                fuwuqis:'fuwuqis',
                fuwuqifuben:'fuwuqifuben',
                other:'other',
                othersfuben:'othersfuben',
                liuchengtu:'liuchengtu',
                liuchengtufuben:'liuchengtufuben',
                duizhanliebiao:'duizhanliebiao',
                duizhanliebiaofuben:'duizhanliebiaofuben',
                split1: 0.3,
                split2:0.6,
                formItem:{
                    sort:'',
                    labels:[],
                },
                nameList:[
                    {id:60,name:'一分钟'},
                    {id:180,name:'三分钟'},
                    {id:300,name:'五分钟'},
                ],
                getListData:[],
                imgInfo:{},
                showImg:false,
                showOther:false,
                needTraceId:'',
                needTraceIdss:'',
                appList:[
                    {id:'updateTime',name:'更新时间'},
                    {id:'name',name:'快照名称'},
                ],
                traceId:'',
                addTab:[],
                codeList:[],
                fuwuqi:{},
                computed:{},
                others:{},
                headerTitle:'',
                columnss: [
                    {
                        title:'序号',
                        type: 'index',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '类名',
                        key: 'className',
                        align:"center"
                    },
                    {
                        title: '方法名',
                        key: 'methodName',
                        align:"center"
                    },
                    {
                        title: '执行代码行数',
                        key: 'doLines',
                        align:"center"
                    },
                    {
                        title: '方法行数',
                        key: 'lines',
                        align:"center"
                    },
                    {
                        title: '覆盖率',
                        key: 'coverageRate',
                        align:"center"
                    },
                    {
                        title: '圈复杂度V(G)',
                        key: 'cyclo',
                        align:"center"
                    }
                ],
                datatable: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                reportData:[],
                codeRelatSize:Number,
                modal6:false,
                title:'',
                formValidate:{
                    name:'',
                    labels:'',
                    describe:'',
                },
                ruleValidate:{
                    name: [
                        { required: true, message: '请输入快照名称', trigger: 'blur' }
                    ],
                },
                needData:[]
            }
        },
        components:{
           ImageView,
           CodeEdit,
           SystemModel,
           RightContent,
           HeapListVue
        },
        created(){
            this.getList()
            this.others={}
            var data = {
                projectId:window.localStorage.getItem('appId')
            }
            V2(data).then(res=>{
                this.addTab = res.data.labels
            })
        },
        methods:{
            showsysteF(val){
                this.systeShow = val
            },
            getList(){
                var data = {
                    sort:this.formItem.sort,
                    labels:this.formItem.labels,
                    projectId:window.localStorage.getItem('appId')
                }
                myV2(data).then(res=>{
                    if(res.data.snapshots.length>0){
                        this.getListData = res.data.snapshots
                        this.getListData.map(item =>{
                           let createTime = item.createTime
                           createTime = createTime.match(/(\S*)T/)[1];
                           let newTime = new Date()
                           newTime = this.setTime(newTime).slice(0,10)
                           let difTime = this.dateDiff(newTime,createTime) + '天前'
                           item['difTime'] = difTime
                        })
                        this.nameList = res.data.snapshotLabels
                    }
                })
            },
            addSnapshot(name){
                this.systeShow = true;
            },
            getimgInfo(name){
                this.getListData.map(item=>{
                    if(item.id==name){
                        this.codeList = [item]
                        this.needTraceId = item.traceId
                        this.needTraceIdss = item.traceId
                        this.blankBox = false
                        this.blankBoxss = true
                        this.lookReport = false
                        this.headerTab = true
                        this.headerTitle = item.title
                    }
                })
            },
            searchImage(){
                this.headerTab = true
                this.$refs.currentRowTable.clearCurrentRow();
            },
            tableList(){
                this.headerTab = false
            },
            searchReport(){
                this.lookReport = true
                this.blankBoxss = false
                this.blankBox = false
                // this.$refs.currentRowTable.clearCurrentRow();
                var data ={
                    projectId:window.localStorage.getItem('appId'),
                    sort:this.formItem.sort
                }
                mySnapshotsCodeReportV2(data).then(res=>{
                    if(res.data.codeRelatSize>0){
                        this.reportData = res.data.codeRelationships
                        this.codeRelatSize = res.data.codeRelatSize
                    }
                })
            },
            settings(){
                if(this.codeList.length>0){
                    this.modal6 = true
                    this.title = "保存快照"
                    var data ={
                        projectId:window.localStorage.getItem('appId'),
                        snapshotId:this.codeList[0].id
                    }
                    editV2(data).then(res=>{
                        this.formValidate.name = res.data.snapshot.name
                        this.formValidate.labels = res.data.snapshot.labels
                        this.formValidate.describe = res.data.snapshot.describe
                    })
                }else{
                    this.$Message.info('请先选择菜单再点击编辑！')
                }
                
            },
            back(){
                this.modal6 = false
                this.formValidate={
                    name:'',
                    labels:'',
                    describe:'',
                },
                this.getList()
            },
            asyncOK(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var data={
                            name:this.formValidate.name,
                            projectId:window.localStorage.getItem('appId'),
                            labels:this.formValidate.labels,
                            describe:this.formValidate.describe,
                            snapshotId:this.codeList[0].id
                        }
                        doUpdateV2(data).then(res=>{
                            if(res.code == 10000){
                                this.back()
                                this.$Message.info(res.message)
                            }
                        })
                    }
                })
            },
            onDelete(){
                if(this.codeList.length>0){
                    this.$Modal.confirm({
                    title: '删除',
                    content: '确定删除快照: ' + this.codeList[0].name + ' 吗？',
                    okText: '确定',
                    cancelText: '取消',
                        onOk: () => {
                            var data = {
                                snapshotId: this.codeList[0].id,
                                projectId: window.localStorage.getItem('appId')
                            }
                            doDeleteV2(data).then(res => {
                                if (res.code == 10000) {
                                    this.$Message.info('快照删除成功！')
                                    this.getList()
                                }
                            })
                        },
                    });
                }else{
                    this.$Message.info('请先选择菜单再点击编辑！')
                }
            },
            onload(){
                // this.modal8 = true
                this.needData = this.codeList
                this.$router.push({
                    path:'/shareSnapshot',
                    query: {
                        codeList:this.codeList
                    }
                })

            },
            close(){
                this.modal8 = false
            }
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
        .demo-split-btn
            height: 650px
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
                    padding 10px
                    height: 50px
                    width: 100%
                    line-height: 30px
                    background-color: #f5f7f9
                    text-align: center
                    display: flex
                    >span
                        margin-right: 15px
                    .liuchengtu
                        width: 60px
                        height: 30px
                    .liuchengtu:hover
                        width: 60px
                        height: 30px
                        border-radius: 3px
                        background-color:rgb(234, 234, 234)
                    .liuchengtufuben
                        width: 60px
                        height: 30px
                        border-radius: 3px
                        background-color:rgb(234, 234, 234)
                    .duizhanliebiao
                        width: 75px
                        height: 30px
                    .duizhanliebiao:hover
                        width: 75px
                        height: 30px
                        border-radius: 3px
                        background-color:rgb(234, 234, 234)
                    .duizhanliebiaofuben
                        width: 75px
                        height: 30px
                        border-radius: 3px
                        background-color:rgb(234, 234, 234)
                .bottom-split
                    // padding: 30px
                    margin-left: 30px
                    .ivu-tabs .ivu-tabs-tabpane
                        padding: 15px !important
                        &>>>.ivu-collapse-content
                            padding: 30px !important
                .right-split-content-bto
                    margin-left: 200px
                    margin-top: 130px
                    padding: 10px
                    width: 700px
                    height: 450px
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
            .blankBox-btn
                background-color: #f5f7f9
                width: 100%
                height: 640px
                text-align: center
                overflow hidden
</style>
