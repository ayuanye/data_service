<template>
    <div class="main">
        <div class="layout">
            <Layout>
                <Header>
                    <Form :model="formItem" :label-width="80" >
                        <Row>
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
        <!-- 新增 -->
        <div>
            <Modal 
                v-model="modal3"
                :title="title"
                width="700">
                    <div style="text-align:left">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" :disabled="title=='查看信息'?true:false">
                            <Row>
                                <Col :span="20">
                                    <FormItem label="应用ID:" prop="id">
                                        <Input
                                                v-model="formValidate.id"
                                                disabled
                                                style="width: 100%"
                                        ></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="20">
                                    <FormItem label="应用名称:" prop="name">
                                        <Input
                                                v-model="formValidate.name"
                                                placeholder="请输入应用名称"
                                                style="width: 100%"
                                        ></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="20">
                                    <FormItem label="工程名称:" prop="name">
                                        <Select
                                                v-model="formValidate.namess"
                                                placeholder="请输入工程名称"
                                                style="width: 100%"
                                        >
                                            <Option
                                                v-for="item in nameList"
                                                :key="item.id"
                                                :value="item.id"
                                            >{{ item.name }}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="20">
                                    <FormItem label="作用范围:">
                                        <RadioGroup v-model="formValidate.range">
                                            <Radio v-for="item in rangeList"
                                                :label="item.code"
                                                :value="item.code"
                                                :key="item.code">{{item.name}}
                                            </Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="20">
                                    <FormItem label="应用描述:" prop="describe">
                                        <Input
                                                v-model="formValidate.describe"
                                                type="textarea"
                                                placeholder="请输入应用描述"
                                                style="width: 100%"
                                                :autosize="{minRows: 2,maxRows: 5}"
                                        ></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="20">
                                    <FormItem label="应用参数:" prop="properties">
                                        <!--双向绑定代码块即可-->
                                        <CodeEdit v-model="content" />
                                    </FormItem>
                                </Col>
                            </Row>
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
import {searchAppTotalV2,diffcompare,doGitMsgV2,getGitMsg,deleteGitMsg} from '@/services/codeCoverageintApi'
import {getAll} from "@/services/eleprijsecManApi/workEnvironmentApi"
import { mapGetters } from 'vuex'
import CodeEdit from "@/components/codeEdit/index.vue"
export default {
    components:{CodeEdit},
    data () {
        return {
            content: '#代码追踪范围包括 code\ncodeStack.include=com.ysqc.coverageDemo.newtest.*', // 代码块
            loading:false,
            formItem:{
                appId:'',
                envId:'',
                pageSize:10,
                pageNum:1
            },
            total:0,
            modal3:false,
            nameList:[],
            title:'',
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
                    title: "操作",
                    slot: 'action',
                    align: 'center'
                },
            ],
            formTabData: [],
            formValidate: {
                id: '',
                name: '',
                namess: '',
                sourceBranch: '',
                targetBranch: '',
                privateToken:''
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
            evnId:[],
            rangeList: [{name: "仅当前项目", code: 'only'}, {name: "所有项目", code: 'all'}],
            
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
                var date = {
                    appId:this.formItem.appId,
                    projectId:projectId,
                    pageSize:this.formItem.pageSize,
                    pageNum:this.formItem.pageNum
                }
                searchAppTotalV2(date).then(res=>{
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
        addData(){
            this.title ="新增信息"
            this.modal3 = true
        },
        lookInfo(){
            this.title = "查看信息"
            this.getgitmsg()
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
        addInfo (formValidate) {
            this.$refs[formValidate].validate((valid) => {
                if (valid) {
                    doGitMsgV2(this.formValidate).then(res=>{
                        if(res.code == 10000){
                            this.modal3 = false
                            this.$Message.info('新增成功！');
                        }
                    })
                } else {
                    this.$Message.error('失败!');
                }
            })
        },
        cancel () {
            this.modal3 = false
            this.$Message.info('取消');
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