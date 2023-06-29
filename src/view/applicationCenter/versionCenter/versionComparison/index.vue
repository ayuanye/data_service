<template>
<!-- 版本中心  版本对比 -->
    <div class="main">
        <div class="layout">
            <Layout>
                <Header>
                    <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="100" >
                        <Row>
                            <Col span="22">
                                <FormItem label="应用名称:">
                                    <Select v-model="formItem.appId" style="width: 35%" placeholder="请选择条件查询" @on-change="changeOption()">
                                        <Option v-for="item in nameList" :key="item.id" :value="item.id">{{item.name}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <div style="width:100%;height:20px;background:#f5f7f9;margin-bottom:20px" ></div>
                        <Row>
                            <Col span="22">
                                <List border style="margin-left:100px">
                                    <ListItem>
                                        <ListItemMeta title="开始比对版本" description="基于JAR或WAR包比对其内部class文件程序指令差异，并根据差异分析出对系统的功能影响范围"></ListItemMeta> 
                                    </ListItem>
                                </List>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <FormItem label="" prop="fileName">
                                    <span>原版本(旧): </span>
                                    <Input
                                        v-model="formItem.fileName"
                                        style="width: 90%"
                                        disabled
                                        placeholder="未上传文件"
                                        >
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="2">
                                <Upload action="/api/resource/upload" 
                                        style="padding-top:32px"
                                        ref="upload"
                                        :show-upload-list="false"
                                        :on-success="handleSuccess"
                                        :max-size="330720"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload"
                                        multiple>
                                    <Button type="primary">选择文件</Button>
                                </Upload>
                            </Col>
                            <Col span="2" class="iconfontData">
                                <span><span class="iconfont">&#xe6a9;</span></span>
                            </Col>
                            <Col span="8">
                               <FormItem label="" prop="fileNameNew">
                                    <span>目标版本(新): </span>
                                    <Input
                                        v-model="formItem.fileNameNew"
                                        style="width: 90%"
                                        disabled
                                        placeholder="未上传文件"
                                        >
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="2">
                                <Upload action="/api/resource/upload" 
                                        style="padding-top:32px"
                                        ref="upload"
                                        :show-upload-list="false"
                                        :on-success="handleSuccessss"
                                        :max-size="330720"
                                        :on-format-error="handleFormatErrorss"
                                        :on-exceeded-size="handleMaxSizess"
                                        :before-upload="handleBeforeUploadss"
                                        multiple>
                                    <Button type="primary">选择文件</Button>
                                </Upload>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="22">
                                <FormItem label="" prop="packageName">
                                    <span>比较范围（应用包含）：</span>
                                    <Input
                                        v-model="formItem.packageName"
                                        style="width: 100%"
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 5 }"
                                        >
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span="22" style="margin-left:100px">
                                <Button type="error" @click="starComparison('formItem')">开始比对</Button>
                            </Col>
                        </Row>
                    </Form>
                </Header>
                <Content>
                    <VersionTable :formAppId="formAppId" @messageInfo="messageInfo($event)"/>
                </Content>
                <!-- <Footer>
                    <Page show-elevator show-sizer show-total :page-size="formItem.pageSize" :total="total" :current.sync="formItem.pageNum" @on-change="getList"	@on-page-size-change="getList"/>
                </Footer> -->
            </Layout>
        </div>
        <Modal 
            v-model="modal3"
            width="900">
                <div>
                    <div  style="background:#f3f4f5;height:50px;line-height:50px;padding-left:20px;margin-bottom:20px">
                        <p style="font-size:20px;font-weight:bold;text-align:left;">{{webData?webData.name:''}}</p>
                    </div>
                    <Progress :percent="webData.progress" :stroke-width="20" text-inside />
                    <p style="font-size:15px;font-weight:bold;text-align:center">版本比对完成</p>
                    &nbsp;&nbsp;&nbsp;<Button type="primary" @click="lookInfo">查看报告</Button>
                    <div style="margin:20px 0">
                        <Table :columns="columns1" :data="tatleData"></Table>
                    </div>
                    <p style="font-size:15px;font-weight:bold;text-align:left">日志输出</p>
                    <div style="padding:5px 10px">
                        {{webData?webData.log:''}}
                    </div>
                </div>
                <div slot="footer">
                    <Button type="text" @click="cancel">取消</Button>
                </div>
        </Modal>
        <lookReportListVue :modal3Fa='modal3Fa' :reportId="reportId" @retModal3="retModal3($event)"/>
    </div>
    
</template>
<script>
import {startV2,} from '@/services/applicationCenter/versionCenter/versionComparisonApi'
import {diffcompare} from '@/services/codeCoverageintApi'
import VersionTable from '../components/versionTable/index.vue'
import lookReportListVue from '../components/versionTable/lookReportList.vue'
export default {
    data () {
        return {
            loading:false,
            modal3:false,
            nameList:[],
            formItem:{
                appId:'',
                fileName:'',
                fileNameNew:'',
                packageName:''
            },
            columns1: [
                {
                    title: '变更项',
                    key: 'type',
                    align: 'center',
                    fixed: 'left'
                },
                {
                    title: '新增',
                    key: 'addCount',
                    align: 'center',
                },
                {
                    title: '修改',
                    key: 'updateCount',
                    align: 'center',
                },
                {
                    title: "删除",
                    align: 'center',
                    key: 'deleteCount',
                },
            ],
            formTabData: [],
            ruleValidate: {
                fileName: [
                    { required: true, message: '请上传文件', trigger: 'blur' }
                ],
                fileNameNew: [
                    { required: true, message: '请上传文件', trigger: 'change' },
                ],
                packageName: [
                    { required: true, message: '请输入比对内容', trigger: 'change' },
                ]
            },
            upImageDatass:'',
            upImageData:'',
            formAppId:'',
            webData:{},
            tatleData:[],
            modal3Fa:false,
            reportId:'',
        }
    },
    components:{VersionTable,lookReportListVue},
    computed:{
    },
    created(){
        diffcompare({
            projectId:window.localStorage.getItem('appId')
        }).then(res=>{
            this.nameList = res.data
            this.formItem.appId = this.nameList[0].id
            this.formAppId = this.formItem.appId
        })
    },
    methods:{
        retModal3(event){
            this.modal3Fa = event
        },
        messageInfo(event){
            this.$Message.error(event)
        },
        changeOption(){
            this.formAppId = this.formItem.appId
        },
        starComparison(formItem){
            if(this.formItem.appId == ''){
                this.$Message.info('请选择应用名称！')
            }else{
                this.$refs[formItem].validate((valid) => {
                    if (valid) {
                        startV2({
                            appId:this.formItem.appId,
                            packageName:this.formItem.packageName,
                            projectId:window.localStorage.getItem('appId'),
                            sourceFile:this.upImageData?this.upImageData:'e7/fc744eae7ca69d/coverageDemo-0.0.1-SNAPSHOT.jar',
                            targetFile:this.upImageDatass?this.upImageDatass:'c7/2d9f275c4273b0/coverageDemo-0.0.1-SNAPSHOT1.jar'
                        }).then(res=>{
                            this.initWebSocket(res.data.jobId)
                        })
                        this.modal3 = true
                    }
                })
            }
        },
        initWebSocket(jobId) {
            const _this = this
            var websocket = null;
            if('WebSocket' in window) {
                websocket = new WebSocket("ws://10.162.3.91:8080/websocket?jobId="+jobId);
            } else {
                alert("该浏览器不支持websocket！");
            }
            websocket.onopen = function(event) {
                websocket.send('Hello WebSockets!');
            }
            websocket.onclose = function(event) {
                 _this.reconnect()//尝试重连websocket
            }
            websocket.onmessage = function(event) {
                _this.webData = JSON.parse(event.data);
                _this.tatleData.push(_this.webData.classCount)
                _this.tatleData.push(_this.webData.methodCount)
                if(_this.webData.finish == true){
                    websocket.close();
                }
            }
            window.onbeforeunload = function() {
                websocket.close();
            }
        },
        reconnect() {
            let _this = this
            // 进行重连
            setTimeout(function () {
                _this.initWebSocket();
            }, 1000);
        },
        lookInfo(){
            this.reportId = this.webData.id
            this.modal3Fa = true
        },
        cancel () {
            this.modal3 = false
        },
        handleSuccess (res, file) {
            this.upImageData = res.data
            this.formItem.fileName = file.name
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
            this.formItem.fileName = file.name
        },
        handleSuccessss (res, file) {
            this.upImageDatass = res.data
            this.formItem.fileNameNew = file.name
        },
        handleFormatErrorss (file) {
            this.$Notice.warning({
                title: '文件格式错误',
                desc: '文件 ' + file.name + ' 格式错误, 请上传 jpg 或者 png格式！'
            });
        },
        handleMaxSizess (file) {
            this.$Notice.warning({
                title: '文件内存错误',
                desc: '文件  ' + file.name + ' 内存过大，请重新上传！'
            });
        },
        handleBeforeUploadss (file) {
            this.formItem.fileNameNew = file.name
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
        padding 20px 40px 
        background-color: white
        margin-bottom: 10px
        height: 500px
        .ivu-form-item 
            padding-top: 15px
        .ivu-col-span-4
            text-align: right
            padding-top: 30px
        >>>.ivu-list-item-meta-title
            font-size: 17px !important
            font-weight: bold !important
        .iconfontData
            text-align: right
            // margin-left: 10px
            padding-top: 30px
        .iconfont 
            font-family: "iconfont" !important;
            font-size: 35px;
            font-style: bold;
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