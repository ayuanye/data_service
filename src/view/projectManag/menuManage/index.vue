<template>
	<!-- 项目维护页面 -->
	<div class="main">
		<div class="layout">
			<Layout>
				<Header>
					<Form :model="formItem" :label-width="80">
						<Row>
							<Col span="8">
								<FormItem label="项目名称:">
									<Input v-model="formItem.name" placeholder="请输入项目名称" style="width: 80%"></Input>
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
					<Button type="primary" style="margin-right:10px;margin-bottom:10px" @click="adds">新增</Button>
					<Button type="success" style="margin-right:10px;margin-bottom:10px" @click="editInfo"
					        :disabled='codeList.length!==1'>修改
					</Button>
					<Button type="error" style="margin-right:10px;margin-bottom:10px" @click="delectVal"
					        :disabled='codeList.length!==1'>删除
					</Button>
					<Table border ref="selection" :loading="loading" :columns="columns1" :data="formTabData"
					       @on-selection-change="seleChange">
						<template slot-scope="{ row, index }" slot="action">
							<Button type="info" size="small" style="margin-right: 5px" @click="show(row,index)">查看</Button>
						</template>
					</Table>
				</Content>
				<Footer>
					<Page show-elevator show-sizer show-total :page-size="pageSize" :total="total" :current.sync="pageNum"
					      @on-change="getList" @on-page-size-change="getList"/>
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
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80"
					      :disabled="title=='查看信息详情'">
						<FormItem label="项目名称" prop="name">
							<Input v-model="formValidate.name" placeholder="请输入项目名称"></Input>
						</FormItem>
						<FormItem label="项目描述" prop="describe">
							<Input v-model="formValidate.describe" type="textarea" :autosize="{minRows: 2,maxRows: 8}"
							       placeholder="请输入项目描述"></Input>
						</FormItem>

					</Form>
				</div>
				<div slot="footer" v-show="title !=='查看信息详情'">
					<Button type="primary" @click="addInfo('formValidate')">保存</Button>
					<Button type="text" @click="cancel">取消</Button>
				</div>

			</Modal>
		</div>
		<Modal v-model="delectMode" width="500">
			<p slot="header" style="color:red;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除项目</span>
			</p>
			<div style="text-align:center">
				<p style="color:red;font-weight:bold;font-size:15px">删除操作会永久清除您的账户信息，并且不可恢复！</p><br/>
				<div>
					<Form ref="delectForm" :model="delectForm" :rules="ruleValidate" inline>
						<FormItem prop="password">
							<Input v-model="delectForm.password" type="password" placeholder="请输入登录密码" style="width: 300px"/>
						</FormItem>
					</Form>
				</div>

			</div>
			<div slot="footer">
				<Button type="text" @click="cancellation">取消</Button>
				<Button type="error" @click="delProject('delectForm')">删除</Button>
			</div>
		</Modal>
	</div>

</template>
<script>
  import {doCreateV2, myProjectsV2, doDeleteV2, doEditV2} from '@/services/menuManageApi'

  export default {
    data() {
      return {
        loading: false,
        formItem: {
          name: '',
        },
        pageSize: 10,
        pageNum: 1,
        total: 0,
        modal3: false,
        modal4: false,
        delectMode: false,
        title: '',
        nameList: [],
        delectForm: {
          password: '',
        },
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '项目ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '项目名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '项目简介',
            key: 'describe',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            key: '',
            align: 'center'
          }
        ],
        formTabData: [],
        formValidate: {
          describe: '',
          name: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ],
          describe: [
            {required: true, message: '请输入项目描述', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'}
          ]
        },
        codeList: []

      }
    },
    created() {
      this.getList()
    },
    methods: {
      seleChange(selection) {
        this.codeList = selection
      },
      getList() {
        this.loading = true
        var data = {
          name: this.formItem.name,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        myProjectsV2(data).then(res => {
          if (res.code === 10000) {
            this.formTabData = res.data.list
            this.total = res.data.total
            this.loading = false
          }
        })
      },
      adds() {
        this.modal3 = true
        this.title = "新增项目"
        this.formValidate = {
          describe: '',
          name: ''
        }
      },
      addInfo(formValidate) {
        this.$refs[formValidate].validate((valid) => {
          if (valid) {
            let time = new Date()
            if (this.title == '新增项目') {
              var data = {
                describe: this.formValidate.describe,
                name: this.formValidate.name
              }
              doCreateV2(data).then(res => {
                if (res.code == 10000) {
                  this.modal3 = false
                  this.$Message.info('新增成功！');
                  this.getList()
                }
              })
            } else if (this.title == '修改项目信息') {
              var data = {
                describe: this.formValidate.describe,
                name: this.formValidate.name,
                id: this.codeList[0].id,
                updateTime: this.setTime(time)
              }
              doEditV2(data).then(res => {
                if (res.code == 10000) {
                  this.modal3 = false
                  this.$Message.info('项目信息修改成功！');
                  this.getList()
                }
              })
            }

          } else {
            this.$Message.error('失败!');
          }
        })
      },
      reset() {
        this.formItem = {
          name: ''
        }
        this.getList()
        this.$refs.selection.selectAll(false);
      },
      cancel() {
        this.modal3 = false
        this.formValidate = {
          describe: '',
          name: ''
        }
      },
      show(row) {
        this.modal3 = true
        this.title = '查看信息详情'
        this.formValidate = row
      },
      delectVal() {
        this.delectMode = true
      },
      delProject(delectForm) {
        this.$refs[delectForm].validate((valid) => {
          if (valid) {
            var data = {
              appId: '',
              password: this.delectForm.password,
              projectId: this.codeList[0].id
            }
            doDeleteV2(data).then(res => {
              if (res.code == 10000) {
                this.$Message.info('删除成功！')
                this.cancellation()
              }
            })
          }
        })
      },
      cancellation() {
        this.delectForm = {
          password: ''
        }
        this.delectMode = false
      },
      editInfo() {
        this.modal3 = true
        this.title = "修改项目信息"
        this.formValidate = this.codeList[0]
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