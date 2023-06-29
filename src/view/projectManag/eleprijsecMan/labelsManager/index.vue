<template>
    <div>
        <Card :bordered="false">
			<div class="handleAddList">
				<p slot="title" style="margin-left:20px;font-size: 16px;">快照标签</p>
			</div>
			<br/>
            <Tag closable @on-close="handleClose(item.name)" v-for="item in snapshotLables" :key="item.name" style="margin:0 0 10px 10px">{{item.name}}</Tag>
            <Form :model="formItem" :label-width="80">
                <Row>
                    <Col span="10">
                        <FormItem label="标签管理:">
                            <Input v-model="formItem.name" multiple filterable placeholder="请输入标签"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6" style="margin-left:20px">
                        <Button type="primary" style="margin-right: 10px" @click="addHandle">
                            添加
                        </Button>
                    </Col>
                </Row>
            </Form>
		</Card>
    </div>
</template>
<script>
import {labelV2,listV2,deleteV2} from "@/services/eleprijsecManApi/labelsManagerApi"
export default {
    data(){
        return {
            formItem:{
                name:'',
            },
            snapshotLables:[],
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            labelV2({
                projectId: window.localStorage.getItem('appId'),
            }).then(res=>{
                this.snapshotLables = res.data.snapshotLables
            })
        },
        addHandle(){
            listV2({
                projectId: window.localStorage.getItem('appId'),
                type:'snapshot',
                name:this.formItem.name
            }).then(res=>{
                this.formItem.name = ''
                this.getList()
            })
        },
        handleClose(name){
            deleteV2({
                projectId: window.localStorage.getItem('appId'),
                type:'snapshot',
                name:name
            }).then(res=>{
                this.getList()
            })
        }
    }
}
</script>
<style>
    .handleAddList {
		height: 50px;
		display: flex;
		justify-content: space-between;
		background: rgb(251, 249, 249);
		text-align: center;
		align-items: center;
	}
</style>