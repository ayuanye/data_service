<template>
	<!-- 组件   应用列表 -->
	<div>
		<Card :bordered="false">
			<div class="handleAddList">
				<p slot="title" style="margin-left:20px;font-size: 16px;">应用列表</p>
				<p style="margin-right:20px">
					<Button type="primary" target="_blank" @click="handleAdd">新增</Button>
				</p>
			</div>
			<br/>
			<Table :columns="columns1" :loading="loading" :data="tableData" border highlight-row class="vms-form-left-table">
				<template slot-scope="{ row, index }" slot="example">
					<Button type="dashed" i-class="mmmmm" size="small" style="margin-right: 5px;color:#5cadff"
					        @click="example(row,index)">
						{{row.onlineCount}}
					</Button>
				</template>
				<template slot-scope="{ row, index }" slot="action">
					<Dropdown :transfer="true">
						<a href="javascript:void(0)">
							<Icon type="md-settings" style="font-size:20px"/>
						</a>
						<DropdownMenu slot="list">
							<DropdownItem @click.native="settings(row,index)" style="color:#ff9900">编辑</DropdownItem>
							<DropdownItem @click.native="onload(row,index)" style="color:green">下载注册文件</DropdownItem>
							<DropdownItem @click.native="onDelete(row,index)" style="color:red">删除</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</template>
			</Table>
			<!-- 弹框 -->
			<Modal
					v-model="open"
					:title="title"
					@on-cancel="cancel"
					width="55%"
					footer-hide
			>
				<Form
						ref="formValidate"
						:model="formValidate"
						:rules="ruleValidate"
						:label-width="180"
				>
					<Row v-if="title == '编辑应用'">
						<Col :span="16">
							<FormItem label="应用ID:" prop="id">
								<Input
										v-model="formValidate.id"
										disabled
										style="width: 100%"
								></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col :span="16">
							<FormItem label="应用名称:" prop="name">
								<Input
										v-model="formValidate.name"
										placeholder="请输入应用名称"
										style="width: 100%"
								></Input>
							</FormItem>
						</Col>
					</Row>
          <Row>
						<Col :span="16">
							<FormItem label="工作环境:" prop="name">
								<Select
										v-model="formValidate.namess"
										placeholder="请输入工作环境"
										style="width: 100%"
								>
                  <Option
                      v-for="item in nameList"
                      :key="item.id"
                      :value="item.id"
                  >{{ item.name }}
                  </Option>
                </Select>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col :span="16">
							<FormItem label="mysql驱动:">
								<RadioGroup v-model="formValidate.sqlDrive">
									<Radio v-for="item in sqlDriveList"
									       :label="item.code"
									       :value="item.code"
									       :key="item.code">{{item.name}}
									</Radio>
								</RadioGroup>
							</FormItem>
						</Col>
					</Row>
          <Row>
						<Col :span="16">
							<FormItem label="作用范围:">
								<RadioGroup v-model="formValidate.range">
									<Radio v-for="item in rangeList"
									       :label="item.code"
									       :value="item.code"
									       :key="item.code">{{item.name}}
									</Radio>
								</RadioGroup>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col :span="16">
							<FormItem label="工程名称:" prop="srcName">
								<Input
										v-model="formValidate.srcName"
										placeholder="请输入工程名称"
										style="width: 100%"
								></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col :span="16">
							<FormItem label="应用描述:" prop="describe">
								<Input
										v-model="formValidate.describe"
										type="textarea"
										placeholder="请输入应用描述"
										style="width: 100%"
										:autosize="{minRows: 2,maxRows: 5}"
								></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col :span="16">
							<FormItem label="属性配置:" prop="properties">
                <!--双向绑定代码块即可-->
                <CodeEdit v-model="content" />
							</FormItem>
						</Col>
					</Row>
				</Form>
				<div class="footer">
					<Row :gutter="10">
						<Col :span="1.5">
							<Button type="success" @click="submit('formValidate',row)">{{ title=='编辑应用'?'保存':'创建新的应用'}}</Button>
						</Col>
						<Col :span="1.5">
							<Button @click="cancel">取消</Button>
						</Col>
					</Row>
				</div>
			</Modal>
		</Card>
	</div>
</template>

<script> 
  import {listV2, doCreateV2, bobcfc, doEditV2, doDeleteV2} from "@/services/eleprijsecManApi/useListApi"
  import {getAll} from "@/services/eleprijsecManApi/workEnvironmentApi"
  import CodeEdit from "@/components/codeEdit/index.vue"
  export default {
    name: "useList",
    components:{CodeEdit},
    data() {
      return {
        loading:false,
        content: '#代码追踪范围包括 codeStack.include= ', // 代码块
        open: false,
        title: "",
        nameList:[],
        columns1: [
          {
            title: "类型",
            key: "properties",
            align: 'center',
            render(h, params) {
              const projectId = window.localStorage.getItem('appId')
              if (projectId == params.row.properties) {
                return h('span', {}, '主导应用')
              } else {
                return h('span', {}, '参与应用')
              }
            }
          },
          {
            title: "应用名称",
            key: "name",
            align: 'center'
          },
          {
            title: "工作环境",
            key: "envId",
            align: 'center',
            render:(h, params) =>h('span',this.translation(params.row.envId))
          },
          {
            title: "应用工程",
            key: "srcName",
            align: 'center'
          },
          {
            title: "在线实例",
            key: "onlineCount",
            align: 'center',
            slot: 'example',
          },
          {
            title: "操作",
            slot: 'action',
            width: 120,
            align: 'center'
          },
        ],
        tableData: [],
        formValidate: {
          id: "",
          name: "",
          srcName: "",
          namess:'default',
          range: 'only',
          describe: "",
          sqlDrive:null
        },
        onlineCount: '',
        ruleValidate: {
          name: [{required: true, message: "应用名称必填", trigger: "blur"}],
          mail: [{required: true, message: "工程名称必填", trigger: "blur"}]
        },
        rangeList: [{name: "仅当前项目", code: 'only'}, {name: "所有项目", code: 'all'}],
        sqlDriveList:[
          {name:'com.mysql.jdbc.NonRegisteringDriver',code:'com.mysql.jdbc.NonRegisteringDriver'},
          {name:'com.mysql.cj.jdbc.NonRegisteringDriver',code:'com.mysql.cj.jdbc.NonRegisteringDriver'},
          {name:'未使用mysql',code:null},
        ]
      };
    },
    created() {
      getAll({
        projectId: window.localStorage.getItem('appId')
      }).then(res=>{
         this.nameList = res.data 
         this.nameList.push({id:'default',name:'default'})
      })
      this.getList()
    },
    methods: {
      translation(envId){
          for (let j = 0; j < this.nameList.length; j++) {
            if (envId == this.nameList[j].id) {
              return this.nameList[j].name
            }
          }
      },
      getList() {
        this.loading = true
        var data = {
          projectId: window.localStorage.getItem('appId')
        }
        listV2(data).then(res => {
          if (res.code == 10000) {
            this.tableData = res.data
            this.loading = false
          }
        })
      },
      example() {
        this.$emit('exampleOn', '1-2');
      },
      // 编辑
      settings(row, index) {
        this.formValidate = row
        this.formValidate.namess = row.envId
        this.onlineCount = row.onlineCount
        this.content = row.properties
        this.open = true;
        this.title = "编辑应用"
      },
      // 新增
      handleAdd() {
        this.open = true;
        this.title = "新增应用"
      },
      // 下载
      onload(row, index) {
        window.location.href = '/api/p/app/.bobcfc.key?appId= ' + row.id + ' &projectId= ' + window.localStorage.getItem('appId')
      },
      // 删除
      onDelete(row, index) {
        this.$Modal.confirm({
          title: '删除',
          content: '确定删除应用: ' + row.name + ' 吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            var data = {
              appId: row.id,
              projectId: window.localStorage.getItem('appId')
            }
            doDeleteV2(data).then(res => {
              if (res.code == 10000) {
                this.$Message.info('应用删除成功！')
                this.getList()
              }
            })
            this.$Message.info('Clicked ok');
          },
        });
      },
      submit(formValidate) {
        this.$refs[formValidate].validate((valid) => {
          if (valid) {
            if (this.title == '新增应用') {
              var data = {
                srcName: this.formValidate.srcName,
                name: this.formValidate.name,
                range: this.formValidate.range,
                describe: this.formValidate.describe,
                properties: this.content,
                sqlDrive:this.formValidate.sqlDrive,
                envId:this.formValidate.namess,
                createUserId: '',
                createProjectId: window.localStorage.getItem('appId')
              }
              doCreateV2(data).then(res => {
                if (res.code == 10000) {
                  this.$Message.info('应用新增成功！')
                  this.cancel()
                }
              })
            } else if (this.title == '编辑应用') {
              const data = {
                srcName: this.formValidate.srcName,
                name: this.formValidate.name,
                range: this.formValidate.range,
                describe: this.formValidate.describe,
                properties: this.content,
                projectId: window.localStorage.getItem('appId'),
                id: this.formValidate.id,
                envId:this.formValidate.namess,
                sqlDrive:this.formValidate.sqlDrive,
                onlineCount: this.onlineCount,
                updateTime: this.setTime(new Date())
              }
              doEditV2(data).then(res => {
                if (res.code == 10000) {
                  this.$Message.info('应用编辑成功！')
                  this.cancel()
                }
              })
            }

          }
        })

      },
      cancel() {
        this.open = false
        this.formValidate = {
          id: "",
          name: "",
          namess:'default',
          srcName: "",
          range: 'only',
          describe: "",
        },
        this.getList()
        this.content='#代码追踪范围包括 codeStack.include= '
      },
    },
  };
</script>

<style scoped>
	.handleAddList {
		height: 50px;
		display: flex;
		justify-content: space-between;
		background: rgb(251, 249, 249);
		text-align: center;
		align-items: center;
	}

	.footer {
		margin-top: 20px;
		margin-left: 75%;
	}

	;
	/* .vms-form-left-table ::v-deep .ivu-table-row-highlight td {
			background-color: #d9282d;
	} */
</style>