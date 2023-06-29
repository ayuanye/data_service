<template>
	<!-- 组件   工作环境 -->
	<div class="main">
		<Card :bordered="false">
      <div class="handleAddList">
				<p slot="title" style="margin-left:20px;font-size: 16px;">工作环境</p>
			</div><br/>
      <Form :model="formItem" :label-width="80">
			<Row>
				<Col span="10">
					<FormItem label="环境名称:">
						<Input v-model="formItem.name" multiple filterable></Input>
					</FormItem>
				</Col>
				<Col span="6" style="margin-left:20px">
					<Button type="primary" style="margin-right: 10px" @click="addHandle">
            添加环境
					</Button>
				</Col>
			</Row>
		</Form>
			<Table :columns="columns3" :loading="loading" :data="tableData" border highlight-row>
				<template slot-scope="{ row, index }" slot="action">
					<Button type="error" size="small" style="margin-right: 5px" @click="remove(row,index)">移除</Button>
          <Button type="warning" size="small" @click="edit(row)">编辑</Button>
				</template>
			</Table>
			<br/>
			<div style="text-align:right">
				<Page show-elevator show-sizer show-total :page-size="formItem.pageSize" :total="total"
				      :current.sync="formItem.pageNum" @on-change="getList" @on-page-size-change="getList"/>
			</div>
		</Card>
    <Modal v-model="modal1"
        title="修改工作环境"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="editformItem" :label-width="80">
				  <FormItem label="环境名称:">
						<Input v-model="editformItem.name" multiple filterable width="50%"></Input>
					</FormItem>
        </Form>
    </Modal>
	</div>
</template>

<script>
  import {list, create, deletes, update} from "@/services/eleprijsecManApi/workEnvironmentApi"

  export default {
    name: "memberManager",
    data() {
      return {
        modal1:false,
        loading:false,
        formItem: {
          name: "",
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        roleVal: '',
        columns3: [
          {
            title: "环境ID",
            key: "id",
            align: 'center'
          },
          {
            title: "工作环境名称",
            key: "name",
            align: 'center'
          },
          {
            title: "操作",
            slot: 'action',
            align: 'center'
          },
        ],
        tableData: [],
        editformItem:{
          name:''
        },
        evnId:{}
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        list({
          epageNum: this.formItem.pageNum,
          pageSize: this.formItem.pageSize,
          projectId: window.localStorage.getItem('appId')
        }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.total
          this.loading = false
        })
      },
      addHandle() {
        create({
          projectId: window.localStorage.getItem('appId'),
          name: this.formItem.name
        }).then(res => {
          if (res.code == 10000) {
            this.$Message.info(res.message)
            this.getList()
            this.formItem.name = ''
          }
        })
      },
      remove(row, index) {
        this.$Modal.confirm({
          title: '删除',
          content: '确定移除成员: ' + row.name + ' 吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            deletes({
              envId: row.id
            }).then(res => {
              if (res.code == 10000) {
                this.$Message.info(res.message)
                this.getList()
              }
            })
          },
        });
      },
      edit(row){
        this.modal1 = true
        this.editformItem.name = row.name
        this.evnId = row
      },
      ok(){
        update(this.evnId).then(res=>{
          if (res.code == 10000) {
            this.$Message.info('工作环境修改成功！')
            this.cancel()
          }
        })
      },
      cancel(){
        this.editformItem={
          name:''
        }
        this.getList()
      }
    },
  };
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