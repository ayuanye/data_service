<template>
	<!-- 组件   成员管理 -->
	<div class="main">
		<Card :bordered="false">
      <div class="handleAddList">
				<p slot="title" style="margin-left:20px;font-size: 16px;">成员管理</p>
			</div><br/>
      <Form :model="formItem" :label-width="80">
			<Row>
				<Col span="10">
					<FormItem label="成员名称:">
						<Select v-model="formItem.appId" multiple filterable>
							<Option
									v-for="item in nameList"
									:key="item.id"
									:value="item.id"
							>{{ item.name }}
							</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="6" style="margin-left:20px">
					<Button type="primary" style="margin-right: 10px" @click="addHandle">
            添加成员
					</Button>
				</Col>
			</Row>
		</Form>
			<Table :columns="columns3" :loading="loading" :data="tableData" border highlight-row>
				<template slot="role" slot-scope="{ row}">
					<Select style="width:200px" v-model="row.role" :disabled="row.role=='owner'" :transfer="true"
					        @on-change="changeVal(row)">
						<Option v-for="item in roleList" :value="item.code" :key="item.code">{{ item.name }}</Option>
					</Select>
				</template>
				<template slot-scope="{ row, index }" slot="action">
					<Button type="error" size="small" style="margin-right: 5px" @click="remove(row,index)">
						移除
					</Button>
				</template>
			</Table>
			<br/>
			<div style="text-align:right">
				<Page show-elevator show-sizer show-total :page-size="formItem.pageSize" :total="total"
				      :current.sync="formItem.pageNum" @on-change="getList" @on-page-size-change="getList"/>
			</div>
		</Card>
	</div>
</template>

<script>
  import {listV2, addV2, deleteV2, updateRoleV2} from "@/services/eleprijsecManApi/memberManagerApi"

  export default {
    name: "memberManager",
    data() {
      return {
        loading:false,
        formItem: {
          appId: "",
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        roleVal: '',
        columns3: [
          {
            title: "成员姓名",
            key: "memberName",
            align: 'center'
          },
          {
            title: "角色",
            slot: "role",
            key: "role",
            align: 'center',
            // render: (h, params) => {
            //   return h('Select', {
            //     on: {
            //         'onChange':(event) => {
            //             this.tableData[params.index].role = event;
            //         }
            //     },
            //   },
            //   this.roleList.map((obj)=>{
            //       return h('Option', {
            //           props: {value: obj.code}
            //       },obj.name);
            //   })
            //   )
            // },
          },
          {
            title: "操作",
            slot: 'action',
            width: 120,
            align: 'center'
          },
        ],
        tableData: [
          // {
          //   name: "John Brown",
          //   address: "01",
          //   date: "2016-10-03",
          // },
          // {
          //   name: "Jim Green",
          //   address: "02",
          //   date: "2016-10-01",
          // },
        ],
        nameList: [],
        roleList: [
          {name: "普通成员", code: 'normal'},
          {name: "创建人", code: 'owner'},
          {name: "访客", code: 'visitor'},
          {name: "管理员", code: 'admin'},
        ]
      };
    },
    created() {
      this.getList()

    },
    methods: {
      getList() {
        this.loading = true
        var data = {
          pageNum: this.formItem.pageNum,
          pageSize: this.formItem.pageSize,
          projectId: window.localStorage.getItem('appId')
        }
        listV2(data).then(res => {
          this.tableData = res.data.members
          this.nameList = res.data.users
          this.total = res.data.total
          this.loading = false
        })
      },
      changeVal(row) {
        var data = {
          projectId: window.localStorage.getItem('appId'),
          projectMemberId: row.id,
          role: row.role,
        }
        updateRoleV2(data).then(res => {
          if (res.code == 10000) {
            this.$Message.info('角色修改成功！')
          }
        })
      },
      addHandle() {
        var data = {
          projectId: window.localStorage.getItem('appId'),
          ids: this.formItem.appId
        }
        addV2(data).then(res => {
          if (res.code == 10000) {
            this.$Message.info(res.message)
            this.getList()
            this.formItem.appId = ''
          }
        })
      },
      remove(row, index) {
        this.$Modal.confirm({
          title: '删除',
          content: '确定移除成员: ' + row.memberName + ' 吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            var data = {
              projectId: window.localStorage.getItem('appId'),
              projectMemberId: row.id
            }
            deleteV2(data).then(res => {
              if (res.code == 10000) {
                this.$Message.info(res.message)
                this.getList()
              }
            })
          },
        });
      },
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