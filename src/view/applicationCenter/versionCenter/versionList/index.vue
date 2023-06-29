<template>
<!-- 版本中心  版本列表 -->
    <div class="main">
        <div class="layout">
            <Layout>
                <Header>
                    <Form :model="formItem" :label-width="80" >
                        <Row>
                            <Col span="8">
                                <FormItem label="应用名称:">
                                    <Select v-model="formItem.appId" style="width: 80%" placeholder="请选择条件查询">
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
                    <Table border  :loading="loading" :columns="columns1" :data="formTabData"  class="demo-spin-article"></Table>
                </Content>
                <Footer>
                    <!-- <Page show-elevator show-sizer show-total :page-size="formItem.pageSize" :total="total" :current.sync="formItem.pageNum" @on-change="getList"	@on-page-size-change="getList"/> -->
                </Footer>
            </Layout>
        </div>
        <!-- 新增 -->
        <div>
            <Modal 
                v-model="modal3"
                :title="title"
                width="800">
                    <div style="text-align:left">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                            <Row>
                                <Col :span="22">
                                    <FormItem label="版本号：" prop="versionNumber">
                                        <Input v-model="formValidate.versionNumber" style="width: 300px" placeholder="请输入appId"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="22">
                                    <FormItem label="版本描述：" prop="describe">
                                        <Input v-model="formValidate.describe" type="textarea" :autosize="{minRows: 2,maxRows: 8}" placeholder="请输入私人密钥"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="15">
                                    <FormItem label="程序文件：" prop="fileName">
                                        <Input v-model="formValidate.fileName" style="width: 100%" disabled placeholder="请上传文件"></Input>
                                    </FormItem>
                                </Col>
                                <Col >
                                    <Upload action="/api/resource/upload" 
                                        style="padding-left:5px"
                                        ref="upload"
                                        :data="dataForm"
                                        :show-upload-list="false"
                                        :on-success="handleSuccess"
                                        :max-size="3072000"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload"
                                        multiple>
                                        <Button type="primary">选择文件</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="addInfo('formValidate')">保存</Button>
                        <Button type="text" @click="cancel">取消</Button>
                    </div>
            </Modal>
        </div>
    </div>
    
</template>
<script>
import {listV2,newV2,doAddV2,deleteV2} from '@/services/applicationCenter/versionCenter/versionListApi'
import {getAll} from "@/services/eleprijsecManApi/workEnvironmentApi"
import {diffcompare} from '@/services/codeCoverageintApi'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            loading:false,
            formItem:{
                appId:'',
                envId:''
            },
            dataForm:{},
            modal3:false,
            nameList:[],
            title:'',
            columns1: [
                {
                    title: '版本号',
                    key: 'versionNumber',
                    align: 'center'
                },
                {
                    title: '描述说明',
                    key: 'describe',
                    align: 'center'
                },
                {
                    title: '程序文件',
                    key: 'programName',
                    align: 'center',
                    render: (h, params) => {
                        return h('a', [
                            h('span', { 
                                props: {},
                                on: {
                                    click: () => {
                                        window.location.href = "/api/resource/doload?programFile="+params.row.programFile
                                    }
                                }
                            },params.row.programName)
                        ])
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    render:(h, params) => {
                        return h('span',{},this.setTimePlus(params.row.createTime))
                    }
                },
                {
                    title: "操作",
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', [
                            h('Icon', { 
                                props: { type: 'md-close' },
                                style: {
                                    // width:"50px",
                                    // height:"50px"
                                }, 
                                on: {
                                    click: () => {
                                        this.onDelete(params.row)
                                    }
                                }
                            })
                        ])
                    }
                },
            ],
            formTabData: [],
            formValidate: {
                fileName: '',
                describe: '',
                versionNumber: ''
            },
            ruleValidate: {
                versionNumber: [
                    { required: true, message: '请输入版本号', trigger: 'blur' }
                ],
                privateToken: [
                    { required: true, message: '请输入描述', trigger: 'change' },
                ],
                fileName: [
                    { required: true, message: '请上传文件', trigger: 'change' },
                ]
            },
            evnId:[],
            upImageData:''
            
        }
    },
    computed:{
        ...mapGetters(['userInfo'])
    },
    created(){
        this.changeEnvId()
    },
    methods:{
        changeEnvId(){
            diffcompare({
                projectId:window.localStorage.getItem('appId')
            }).then(res=>{
                this.nameList = res.data
                this.formItem.appId = this.nameList[0].id
                this.getList()
            })
        },
        getList(){
            if(this.formItem.appId==''){
                this.$Message.error('请选择条件再查询！！！')
            }else{
                var projectId = window.localStorage.getItem('appId')
                this.loading = true
                var date = {
                    appId:this.formItem.appId,
                    projectId:projectId,
                }
                listV2(date).then(res=>{
                    if(res.code == 10000){
                        if(res.data){
                            this.formTabData = res.data.list
                        }
                        this.loading = false
                    }
                })
            }
        },
        reset(){
            this.formItem={
                appId:this.nameList[0].id,
            },
            this.getList()
            this.formTabData = []
        },
        addData(){
            if(this.formItem.appId == ''){
                this.$Message.info('请选择应用名称再新增！')
            }else{
                this.title ="新增信息"
                this.modal3 = true
            }
            
        },
        addInfo (formValidate) {
            this.$refs[formValidate].validate((valid) => {
                if (valid) {
                    doAddV2({
                        projectId:window.localStorage.getItem('appId'),
                        appId:this.formItem.appId,
                        programFile:this.upImageData,
                        versionNumber:this.formValidate.versionNumber,
                        describe:this.formValidate.describe
                    }).then(res=>{
                        if(res.code == 10000){
                            this.modal3 = false
                            this.$Message.info('新增成功！');
                            this.resetss()
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
            this.resetss()
        },
        resetss(){
            this.formValidate= {
                fileName: '',
                describe: '',
                versionNumber: ''
            }
        },
        onDelete(row){
            this.$Modal.confirm({
                title: '删除',
                content: '确定删除版本号：' + row.versionNumber + ' 吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    var data = {
                        versionId:row.id,
                    }
                    deleteV2(data).then(res => {
                        if (res.code == 10000) {
                            this.$Message.info('删除成功！')
                            this.getList()
                        }
                    })
                },
            });
        },
        handleSuccess (res, file) {
            this.upImageData = res.data
            this.formValidate.fileName = file.name
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式错误',
                desc: '文件 ' + file.name + ' 格式错误, 请上传 jpg 或者 png格式！'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '文件内存错误',
                desc: '文件  ' + file.name + ' 内存过大，请重新上传！'
            });
        },
        handleBeforeUpload (file) {
            this.formValidate.fileName = file.name

        }
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