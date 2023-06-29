<template>
    <div class="box">
        <div class="box-header">
            <span style="font-weight:bold;margin-right:20px">our Accurate Test</span>系统快照共享
        </div>
        <div class="box-title">
            <div class="box-title-lable">
                <span style="font-size:23px;font-weight:bold;margin-right:10px">{{snapshot?snapshot.name:''}}</span>
                <span style="background-color:#767676;padding:3px 8px;color:#fff;text-align:center;margin-right:10px;border-radius:3px"
                      v-for="item in lables" :key="item.name">
                    <span>{{item.name}}</span>
                </span>
                <p>{{snapshot?snapshot.name:''}}</p>
            </div>
            <div class="lable-time">
                <p>{{userName?userName:''}} 更新于 {{snapshot?snapshot.updateTime:''}}</p>
                <Divider />
            </div>
            <div style="border 1px solid #dcdee2;width:100%;">
                <RightContent :codeList='codeList' />
            </div>
            <div style="text-align:right">
                <Button @click="back">取消</Button>
            </div>
        </div>
        
    </div>
</template>
<script>
import RightContent from "../realTimeMonitoring/rightContent"
import {detailV2} from '@/services/imageviewApi'
export default {
    data(){
        return {
            codeList:[],
            userName:'',
            snapshot:{},
            lables:[]
        }
    },
    components:{
        RightContent
    },
    created(){
        this.codeList = this.$route.query.codeList;
        detailV2({
            projectId:window.localStorage.getItem('appId'),
            snapshotId:this.codeList[0].id
        }).then(res=>{
            this.lables = res.data.lables
            this.snapshot = res.data.snapshot
            this.userName= res.data.user.name 
        })
    },
    methods:{
        back(){
            this.$router.back()
        }
    }
    
}
</script>
<style lang="stylus">
.box
    .box-header
        height 40px
        width 100%
        line-height: 40px
    .box-title
        height: 900px
        width: 100%
        padding: 0 400px
        background-color: #f7f7f7;
        .box-title-lable
            padding: 8px 10px
            text-align: center
    .lable-time
        text-align: right 
                 
            
                
</style>