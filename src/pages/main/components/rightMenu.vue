<template>
    <div>
        <Select v-model="model1" style="width:200px;" placeholder="请选择项目" @on-change="changeVal" filterable>
            <Option v-for="item in listData" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default{
    inject:['reload'],
    data(){
        return{
            nameDTO:'',
            model1:'',
            listData:[] 
        }
    },
    computed:{
       ...mapGetters(['userInfo'])
    },
    created(){
        axios.get('/api/project/projectMenuV2',{}).then(res=>{
                if(res.data.code === 10000){
                    this.listData = res.data.data
                    if(window.localStorage.getItem('appId') == null){
                        window.localStorage.setItem('appId',this.listData[0].id)
                        this.model1 = this.listData[0].id
                    }
                }
            })
    },
    watch:{
        model1: {
            immediate: true,
            deep:true,
            handler (val) {
                this.model1 = window.localStorage.getItem('appId')
                this.setProjectId(val)
            }
        },
    },
    methods:{
        ...mapActions(['setProjectId']),
        changeVal(data){
            window.localStorage.setItem('appId',data);
            this.$nextTick(()=>{
                this.reload()
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder
        color: #515a6e !important
</style>