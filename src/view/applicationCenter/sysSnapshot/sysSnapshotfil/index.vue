<template>
    <div class="main">
        <div class="layout">
            <Layout>
                <Header>
                    <Form :model="formItem" :label-width="80" >
                        <Row>
                            <Col span="8">
                                <FormItem label="应用名称:">
                                    <Select v-model="formItem.appId" style="width: 80%" placeholder="请选择应用名称">
                                        <Option v-for="item in nameList" :key="item.id" :value="item.id">{{item.name}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                             <Col span="8">
                                <FormItem label="排序:">
                                    <Select v-model="formItem.sort" style="width: 80%" placeholder="请选择应用名称">
                                        <Option v-for="item in appList" :key="item.id" :value="item.id">{{item.name}}</Option>
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
                <Content >
                    <Button type="primary" style="margin-right:10px;margin-bottom:10px" @click="addData" >新增</Button>
                    <Table border  :loading="loading" :columns="columns1" :data="formTabData"  class="demo-spin-article">
                        <template slot-scope="{ row, index }" slot="action">
                            <Dropdown :transfer="true">
                                <a href="javascript:void(0)">
                                    <Icon type="md-settings" style="font-size:20px"/>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-if="row.type =='dirs'" @click.native="settings(row,index)" style="color:#ff9900">重命名</DropdownItem>
                                    <DropdownItem @click.native="onDelete(row,index)" style="color:red">删除</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </template>
                    </Table>
                        <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
                </Content >
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
                width="600">
                    <div style="text-align:left">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" >
                            <FormItem label="目录名称：" prop="name">
                                <Input v-model="formValidate.name" placeholder="请输入目录名称"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="addInfo('formValidate')" >保存</Button>
                        <Button type="text" @click="cancel">取消</Button>
                    </div>
            </Modal>
        </div>
        <Modal 
            v-model="modal4"
            width="1200">
            <Table border  :loading="loading" :columns="columns2" :data="formTabDatass"  class="demo-spin-article">
                <template slot-scope="{ row, index }" slot="action">
                    <Dropdown :transfer="true">
                        <a href="javascript:void(0)">
                            <Icon type="md-settings" style="font-size:20px"/>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem @click.native="onDelete(row,index)" style="color:red">删除</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </template>
            </Table>
            <div slot="footer">
                <Button type="text" @click="back()">取消</Button>
            </div>
        </Modal>
        <Modal v-model="modal5"
            width="60%" >
            <TableDetailVue :snapshotId="snapshotId" :appId="appId" />
            <div slot="footer">
                <Button type="text" @click="close()">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {diffcompare} from '@/services/codeCoverageintApi'
import {listV2,savedirectoryV2,deletedirectory,doDelete} from '@/services/applicationCenter/sysSnapshot/sysSnapshotApi'
import { mapGetters } from 'vuex'
import TableDetailVue from '../components/tableDetail.vue'
export default {
    data () {
        return {
            loading:false,
            formItem:{
                appId:'',
                sort:''
            },
            modal3:false,
            modal4:false,
            modal5:false,
            nameList:[],
            title:'',
            directoryId:'',
            columns2:[
                {
                    title: '快照名称',
                    key: 'name',
                    align: 'left',
                    render:(h,params)=> {
                        if(params.row.type == 'dirs'){
                            return h('a',[
                                h('span', [
                                    h('Icon', { props: { type: 'ios-folder' } }),
                                    h('span', {
                                        props: {}, 
                                        on: {
                                            click: () => {
                                                this.modal4 = true
                                                listV2({
                                                    appId:this.formItem.appId,
                                                    projectId:window.localStorage.getItem('appId'),
                                                    directoryId:params.row.id
                                                }).then(res=>{
                                                    if(res.code == 10000){
                                                        if(res.data){
                                                            this.formTabDatass = res.data.list
                                                        }
                                                        this.loading = false
                                                    }
                                                })
                                            }
                                        }
                                    },params.row.name)
                                ]),
                            ])
                        }else{
                            return h('a',[
                                h('span', 
                                [
                                    h('Icon', { props: { type: 'ios-paper-outline' } }),
                                    h('span', 
                                    {
                                        props: {}, 
                                        on: {
                                            click: () => {
                                                this.modal5 = true
                                                this.snapshotId = params.row.id
                                                this.appId = this.formItem.appId
                                            }
                                        }
                                    },params.row.name)
                                ]),
                            ])
                        }
                    },
                },
                {
                    title: '更新时间',
                    key: 'updateTime',
                    align: 'left',
                    width:200
                },
                {
                    title: "操作",
                    slot: 'action',
                    align: 'left',
                    width:120,

                },
            ],
            formTabDatass:[],
            snapshotId:'',
            appId:'',
            columns1: [
                {
                    title: '快照名称',
                    key: 'name',
                    align: 'left',
                    render:(h,params)=> {
                        if(params.row.type == 'dirs'){
                            return h('a',[
                                h('span', [
                                    h('Icon', { props: { type: 'ios-folder' } }),
                                    h('span', {
                                        props: {}, 
                                        on: {
                                            click: () => {
                                                this.modal4 = true
                                                listV2({
                                                    appId:this.formItem.appId,
                                                    projectId:window.localStorage.getItem('appId'),
                                                    directoryId:params.row.id
                                                }).then(res=>{
                                                    if(res.code == 10000){
                                                        if(res.data){
                                                            this.formTabDatass = res.data.list
                                                        }
                                                        this.loading = false
                                                    }
                                                })
                                            }
                                        }
                                    },params.row.name)
                                ]),
                            ])
                        }else{
                            return h('a',[
                                h('span', 
                                [
                                    h('Icon', { props: { type: 'ios-paper-outline' } }),
                                    h('span', 
                                    {
                                        props: {}, 
                                        on: {
                                            click: () => {
                                                this.modal5 = true
                                                this.snapshotId = params.row.id
                                                this.appId = this.formItem.appId
                                            }
                                        }
                                    },params.row.name)
                                ]),
                            ])
                        }
                    },
                },
                {
                    title: '更新时间',
                    key: 'updateTime',
                    align: 'left',
                    width:200
                },
                {
                    title: "操作",
                    slot: 'action',
                    align: 'left',
                    width:120,
                },
            ],
            formTabData: [],
            formValidate: {
                name: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入快照名称', trigger: 'blur' }
                ],
            },
            appList:[
                {id:'updateTime',name:'更新时间'},
                {id:'name',name:'快照名称'},
            ],
            parentId:"",
            row:{}
        }
    },
    components:{
        TableDetailVue
    },
    computed:{
        ...mapGetters(['userInfo'])
    },
    created(){
        diffcompare({
            projectId:window.localStorage.getItem('appId'),
            envId:this.formItem.envId
        }).then(res=>{
            this.nameList = res.data
            this.formItem.appId = this.nameList[0].id
            this.getList()
        })
    },
    methods:{
        getList(){
            var projectId = window.localStorage.getItem('appId')
            this.loading = true
            var date = {
                appId:this.formItem.appId,
                projectId:projectId,
                sort:this.formItem.sort,
            }
            listV2(date).then(res=>{
                if(res.code == 10000){
                    if(res.data){
                        this.formTabData = res.data.list
                        this.parentId = res.data.currentDir
                    }
                    this.loading = false
                }
            })
        },
        reset(){
            this.formItem={
                appId:'',
                sort:''
            },
            this.formTabData = []
            this.formItem.appId = this.nameList[0].id
            this.getList()
        },
        addData(){
            this.title ="新建快照目录"
            this.modal3 = true
        },
        settings(row){
            this.title ="编辑快照目录"
            this.modal3 = true
            this.row = row
            this.formValidate.name = row.name
        },
        addInfo(formValidate) {
            this.$refs[formValidate].validate((valid) => {
                if (valid) {
                    if(this.title == '新建快照目录'){
                        var data = {
                            appId:this.formItem.appId,
                            projectId:window.localStorage.getItem('appId'),
                            dir:{
                               parentId:this.parentId,
                               name:this.formValidate.name
                            }
                        }
                    }else{
                        var data = {
                            appId:this.formItem.appId,
                            projectId:window.localStorage.getItem('appId'),
                            dir:{
                               parentId:this.parentId,
                               id:this.row.id,
                               name:this.formValidate.name
                            }
                        }
                    }
                    savedirectoryV2(data).then(res=>{
                        if(res.code == 10000){
                            this.modal3 = false
                            this.$Message.info('新增成功！');
                            this.cancel()
                        }
                    })
                } else {
                    this.$Message.error('失败!');
                }
            })
        },
        cancel () {
            this.modal3 = false
            this.formValidate.name = ''
            this.getList()
        },
        back(){
            this.modal4 = false
        },
        close(){
            this.modal5 = false
        },
        onDelete(row,index){
            this.$Modal.confirm({
                title: '删除',
                content: '确定删除吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    if(row.type == 'dirs'){
                        deletedirectory({
                            appId:this.formItem.appId,
                            projectId:window.localStorage.getItem('appId'),
                            directoryId:row.id
                        }).then(res=>{
                            this.$Message.info('删除成功！')
                        })
                    }else{
                        doDelete({
                            snapshotId:row.id
                        }).then(res => {
                            this.$Message.info('删除成功！')
                        })
                    }
                    this.getList()
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