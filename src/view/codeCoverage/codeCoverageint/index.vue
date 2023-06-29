<template>
    <div class="main">
        <div class="layout">
            <Layout>
                <Header>
                    <Form :model="formItem" :label-width="80" >
                        <Row>
                            <Col span="8">
                                <FormItem label="工作环境:">
                                    <Select v-model="formItem.envId" style="width: 80%" @on-change="changeEnvId">
                                        <Option v-for="item in evnId" :key="item.id" :value="item.id">{{item.name}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="应用名称:">
                                    <Select v-model="formItem.appId" style="width: 80%" placeholder="根据工作环境选值">
                                        <Option v-for="item in nameList" :key="item.id" :value="item.id">{{item.name}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <Button type="primary" style="margin-right:10px" @click="getList">查询</Button>
                                <Button @click="reset">重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Header>
                <Content>
                    <Button type="primary" style="margin-right:10px;margin-bottom:10px" @click="addData" >新增</Button>
                    <Table border  :loading="loading" :columns="columns1" :data="formTabData"  class="demo-spin-article">
                        <template slot-scope="{ row, index }" slot="action">
                            <Dropdown :transfer="true">
                                <a href="javascript:void(0)">
                                    <Icon type="md-settings" style="font-size:20px"/>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem @click.native="lookInfo(row,index)" style="color:#538fe9">查看</DropdownItem>
                                    <DropdownItem @click.native="settings(row,index)" style="color:#ff9900">编辑</DropdownItem>
                                    <DropdownItem @click.native="onDelete(row,index)" style="color:red">删除</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </template>
                    </Table>
                        <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->

                </Content>
                <Footer>
                    <Page show-elevator show-sizer show-total :page-size="formItem.pageSize" :total="total" :current.sync="formItem.pageNum" @on-change="getList"	@on-page-size-change="getList"/>
                </Footer>
            </Layout>
        </div>
        <!-- 新增/编辑-->
        <div>
            <Modal 
                v-model="modal3"
                :title="title"
                width="600">
                    <div style="text-align:left">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" :disabled="title=='查看信息'?true:false">
                            <FormItem label="appId" prop="appKey">
                                <Input v-model="formValidate.appKey" placeholder="请输入appId"></Input>
                            </FormItem>
                            <FormItem label="git地址" prop="gitlabUrl">
                                <Input v-model="formValidate.gitlabUrl" placeholder="请输入git地址"></Input>
                            </FormItem>
                            <FormItem label="项目名称" prop="projectName">
                                <Input v-model="formValidate.projectName" placeholder="请输入项目名称"></Input>
                            </FormItem>
                            <FormItem label="主分支名称" prop="sourceBranch">
                                <Input v-model="formValidate.sourceBranch" placeholder="请输入主分支名称"></Input>
                            </FormItem>
                            <FormItem label="主分支版本号" prop="sourceCommit">
                                <Input v-model="formValidate.sourceCommit" placeholder="请输入主分支版本号"></Input>
                            </FormItem>
                            <FormItem label="当前分支名称" prop="targetBranch">
                                <Input v-model="formValidate.targetBranch" placeholder="请输入当前分支名称"></Input>
                            </FormItem>
                            <FormItem label="当前分支版本号" prop="targetCommit">
                                <Input v-model="formValidate.targetCommit" placeholder="请输入当前分支版本号"></Input>
                            </FormItem>
                            <FormItem label="私人密钥" prop="privateToken">
                                <Input v-model="formValidate.privateToken" type="textarea" :autosize="{minRows: 2,maxRows: 8}" placeholder="请输入私人密钥"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="addInfo('formValidate')" v-if="title=='查看信息'?false:true">保存</Button>
                        <Button type="text" @click="cancel">取消</Button>
                    </div>
            </Modal>
        </div>

    </div>
    
</template>
<script>
import {searchAppTotalV2,diffcompare,doGitMsgV2,getGitMsg,deleteGitMsg,searchV2} from '@/services/codeCoverageintApi'
import {getAll} from "@/services/eleprijsecManApi/workEnvironmentApi"
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            loading:false,
            formItem:{
                appId:'',
                envId:'',
                pageSize:10,
                pageNum:1
            },
            total:0,
            title:'',
            modal3:false,
            nameList:[],
            columns1: [
                {
                    title: '应用名称',
                    key: 'appName',
                    align: 'center'
                },
                {
                    title: '请求时间',
                    key: 'time',
                    align: 'center'
                },
                {
                    title: '总体覆盖率',
                    key: 'total',
                    align: 'center'
                },
                {
                    title: '增量覆盖率',
                    key: 'add',
                    align: 'center'
                },
                {
                    title: '当前分支',
                    key: 'targetBranch',
                    align: 'center'
                },
                {
                    title: '目标分支',
                    key: 'sourceBranch',
                    align: 'center'
                },
                {
                    title: '请求url',
                    key: 'requestUrl',
                    align: 'center'
                },
                {
                    title: "操作",
                    slot: 'action',
                    align: 'center'
                },

            ],
            formTabData: [],
            formValidate: {
                appKey: '',
                gitlabUrl: '',
                projectName: '',
                sourceBranch: '',
                targetBranch: '',
                privateToken:'',
                sourceCommit:'',
                targetCommit:''
            },
            ruleValidate: {
                appKey: [
                    { required: true, message: '请输入appId', trigger: 'blur' }
                ],
                gitlabUrl: [
                    { required: true, message: '请输入gitUrl', trigger: 'blur' },
                ],
                projectName: [
                    { required: true, message: '请输入项目名称', trigger: 'change' }
                ],
                sourceBranch: [
                    { required: true, message: '请输入主分支名称', trigger: 'change' }
                ],
                targetBranch: [
                    { required: true, message: '请输入当前分支名称', trigger: 'change' },
                ],
                privateToken: [
                    { required: true, message: '请输入私人密钥', trigger: 'change' },
                ]
            },
            evnId:[]
        }
    },
    computed:{
        ...mapGetters(['userInfo'])
    },
    created(){
        getAll({
            projectId: window.localStorage.getItem('appId')
        }).then(res=>{
            this.evnId = res.data 
            this.evnId.push({id:'default',name:'default'})
        })
        this.getList()
    },
    methods:{
        changeEnvId(){
            this.formItem.appId = ''
            if(this.formItem.envId){
                diffcompare({
                    projectId:window.localStorage.getItem('appId'),
                    envId:this.formItem.envId
                }).then(res=>{
                    this.nameList = res.data
                })
            }
        },
        getList(){
            // if(this.formItem.appId==''||this.formItem.envId==''){
            //     this.$Message.error('请选择条件再查询！！！')
            // }else{
                var projectId = window.localStorage.getItem('appId')
                this.loading = true
                var data = {
                    appId:this.formItem.appId,
                    projectId:projectId,
                    pageNum:this.formItem.pageNum,
                    pageSize:this.formItem.pageSize
                }
                searchV2(data).then(res=>{
                    this.spinShow = false
                    if(res.code == 10000){
                        if(res.data){
                            this.formTabData = res.data.list
                            this.total = res.data.total
                        }
                        this.loading = false
                    }
                })
            // }
        },
        reset(){
            this.formItem={
                appId:'',
                envId:'',
            },
            this.formTabData = []
            this.getList()
        },
        addInfo (formValidate) {
            this.$refs[formValidate].validate((valid) => {
                if (valid) {
                    doGitMsgV2(this.formValidate).then(res=>{
                        if(res.code == 10000){
                            this.cancel()
                            this.$Message.info(res.message);
                        }
                    })
                } else {
                    this.$Message.error('失败!');
                }
            })
        },
        cancel () {
            this.modal3 = false
            this.formValidate= {
                appKey: '',
                gitlabUrl: '',
                projectName: '',
                sourceBranch: '',
                targetBranch: '',
                privateToken:'',
                sourceCommit:'',
                targetCommit:''
            }
        },
        addData(){
            this.title ="新增信息"
            this.modal3 = true
        },
        settings(row){
            this.title ="编辑信息"
            this.getgitmsg()
        },
        getgitmsg(){
            getGitMsg(
                {
                    appId:this.formItem.appId,
                    projectId:window.localStorage.getItem('appId')
                }
            ).then(res =>{
                if(res.code == 10000){
                    this.formValidate = res.data
                    this.modal3 = true
                }else{
                    this.modal3 = false
                    this.$Message.error('Git配置信息已经删除，请重新添加再进行查看！')
                }
            })
        },
        lookInfo(){
            this.title = "查看信息"
            this.getgitmsg()
        },
        onDelete(row,index){
            this.$Modal.confirm({
                title: '删除',
                content: '确定删除配置信息吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    var data = {
                        appId:this.formItem.appId,
                        projectId: window.localStorage.getItem('appId')
                    }
                    deleteGitMsg(data).then(res => {
                        if (res.code == 10000) {
                            this.$Message.info('快照删除成功！')
                        }
                    })
                },
            });
        },
    }
}
</script> 
<style lang="stylus" scoped>
.main
    width: 100%;
    height: 100%;
    background-color: white
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
    .ivu-layout-footer
        background-color: white
        margin-bottom: 10px
        padding 30px 20px 
        text-align: right
    .ivu-modal-body
        padding: 20px 50px
</style>