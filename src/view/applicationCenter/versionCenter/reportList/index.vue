<template>
<!-- 版本中心  报告列表 -->
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
                    <VersionTable :formAppId="formAppId" @messageInfo="messageInfo($event)"/>
                </Content>
                <Footer>
                    <!-- <Page show-elevator show-sizer show-total :page-size="formItem.pageSize" :total="total" :current.sync="formItem.pageNum" @on-change="getList"	@on-page-size-change="getList"/> -->
                </Footer>
            </Layout>
        </div>
    </div>
</template>
<script>
import {diffcompare} from '@/services/codeCoverageintApi'
import { mapGetters } from 'vuex'
import VersionTable from '../components/versionTable/index.vue'
export default {
    data () {
        return {
            loading:false,
            formItem:{
                appId:'',
            },
            nameList:[],
            formAppId:'',
        }
    },
    components:{VersionTable},
    computed:{
        ...mapGetters(['userInfo'])
        
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
        messageInfo(event){
            this.$Message.error(event)
        },
        getList(){
            this.formAppId = this.formItem.appId
        },
        reset(){
            this.formItem={
                appId:this.nameList[0].id,
            },
            this.getList()
            this.formTabData = []
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