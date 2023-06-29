<template>
    <div>
        <Table border  :loading="loading" :columns="columns1" :data="formTabData"  class="demo-spin-article"></Table><br/>
        <div style="text-align:right"><br/>
            <Page show-elevator show-sizer show-total :page-size="pageSize" :total="total" :current.sync="pageNum" @on-change="getList"	@on-page-size-change="getList"/>
        </div>
        <lookReportListVue :modal3Fa='modal3Fa' :reportId="reportId" @retModal3="retModal3($event)"/>
    </div>
</template>
<script>
import {listV2,reportV2,deleteV2} from '@/services/applicationCenter/versionCenter/reportListApi'
import lookReportListVue from './lookReportList.vue'
export default {
    data(){
        return {
            modal3Fa:false,
            loading:false,
            formTabData: [],
            total:0,
            pageSize:10,
            pageNum:1,
            report:{},
            different:[],
            reportId:'',
            columns1: [
                {
                    align: 'left',
                    children:[
                        {
                            title: '报告名称',
                            key: 'name',
                            align: 'center',
                            render: (h, params) => {
                                return h('a', [
                                    h('span', { 
                                        props: {}, 
                                        on: {
                                            click: () => {
                                                this.modal3Fa = true
                                                this.reportId = params.row.id
                                            }
                                        }
                                    },params.row.name)
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
                            width:120,
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
                    renderHeader: (h, params) => {
                        return h('div', {}, 
                            [
                            h('span', [
                            h('Icon', { props: { type: 'md-refresh' } }),
                            h('span', ' 对比记录')
                            ]),
                        ]
                        )
                    }
                }
            ],
        }
    },
    components:{lookReportListVue},
    props:["formAppId"],
    watch:{
        formAppId:{
            handler(val) {
                if (val) {
                    var projectId = window.localStorage.getItem('appId')
                    this.loading = true
                    var date = {
                        appId:val,
                        projectId:projectId,
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }
                    listV2(date).then(res=>{
                        if(res.code == 10000){
                            if(res.data){
                                this.formTabData = res.data.reports
                                this.total = res.data.total
                            }
                            this.loading = false
                        }
                    })
                }else{
                    this.$emit('messageInfo','请选择条件再查询！！！')
                }
            },
        }
    },
    methods:{
        retModal3(event){
            this.modal3Fa = event
        },
        getList(){
            var projectId = window.localStorage.getItem('appId')
            this.loading = true
            var date = {
                appId:this.formAppId,
                projectId:projectId,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listV2(date).then(res=>{
                if(res.code == 10000){
                    if(res.data){
                        this.formTabData = res.data.reports
                        this.total = res.data.total
                    }
                    this.loading = false
                }
            })
        },
        onDelete(row){
            this.$Modal.confirm({
                title: '删除',
                content: '确定删除报告：'+row.name+'吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    var data = {
                        appId:this.formAppId,
                        projectId: window.localStorage.getItem('appId'),
                        reportId:row.id
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
    }
}
</script>