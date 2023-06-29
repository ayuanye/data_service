<template>
    <div>
        <Modal 
            v-model="modal3"
            width="900"
            :closable="false"
            :mask-closable="false">
                <div>
                    <div>
                        <p style="font-size:25px;font-weight:bold;text-align:center">{{report?report.jobName:''}}</p>
                        <p style="text-align:right">{{report?this.setTimePlus(report.createTime):''}}</p>
                        <Divider />
                    </div>
                    <p style="font-size:20px;font-weight:bold;text-align:left">变更项</p>
                    <Divider />
                    <div v-for="(item,index) in different" :key="index">
                        <p>
                            <span style="font-weight:bold;">
                                <span class="iconfont">
                                    {{item.model=='add'?'&#xe601;':item.model=='delete'?'&#xea71;':'&#xe631;'}}</span>
                                {{item.className}}
                            </span><br/>
                            <span v-for="(value,index) in item.methods" :key="index">
                                <span class="iconfont" :style="value.model=='add'?'color:#21ba45':value.model=='delete'?'color:red':'color:#999'">
                                    {{value.model=='add'?'&#xe601;':value.model=='delete'?'&#xea71;':'&#xe631;'}}</span>
                                <span style="color:#999">{{value?value.name:''}}</span>&nbsp;&nbsp;
                            </span>
                        </p>
                        <Divider />
                    </div>
                    <!-- <p style="font-size:20px;font-weight:bold;text-align:left">影响用例</p> -->
                </div>
                <div slot="footer">
                    <Button type="text" @click="cancel">取消</Button>
                </div>
        </Modal>
    </div>
</template>
<script>
import {reportV2} from '@/services/applicationCenter/versionCenter/reportListApi'
export default {
    data(){
        return {
            modal3:false,
            report:{},
            different:[],
        }
    },
    props:['modal3Fa',"reportId"],
    watch:{
        modal3Fa:{
            handler(val) {
                if (val) {
                    this.modal3 = val
                }
            },
        },
        reportId:{
            handler(val) {
                if (val) {
                    reportV2(
                        {reportId:val}
                    ).then(res=>{
                        this.report = res.data.report
                        this.different = res.data.different
                    })
                }
            },
        },
    },
    methods:{
        cancel(){
            this.modal3 = false
            this.$emit("retModal3",false)
        }
    }
    
}
</script>