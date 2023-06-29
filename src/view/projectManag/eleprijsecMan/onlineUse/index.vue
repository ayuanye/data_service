<template>
	<!-- 组件   在线应用 -->
	<div class="main">
		<Card :bordered="false">
			<div class="handleAddList">
				<p slot="title" style="margin-left:20px;font-size: 16px;">在线应用</p>
			</div>
			<br/>
			<Table :columns="columns1" :loading="loading" :data="tableData" border highlight-row></Table>
		</Card>
	</div>
</template>

<script>
  import {onlineV2} from "@/services/eleprijsecManApi/onlineUseApi"
  import expandRow  from './table-detail.vue'
  export default {
    name: "onlineUse",
    components: { expandRow },
    data() {
      return {
        loading:false,
        open: false,
        columns1: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
                return h(expandRow,{
                    props: {
                      exList:params.row
                    }
                })
            }
          },
          {
            title: '系统IP',
            key: 'addressIp',
            align: 'center',
          },
          {
            title: '应用名称',
            key: 'appName',
            align: 'center',
          },
          {
            title: '项目工程',
            key: 'projectSrcName',
            align: 'center',
          },
          {
            title: 'agent版本',
            key: 'agentVersion',
            align: 'center',
          },
          {
            title: '在线时长',
            key: 'onlineTime',
            align: 'center'
          },
        ],
        tableData: [],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
      this.loading= true
        var data = {
          projectId: window.localStorage.getItem('appId')
        }
        onlineV2(data).then(res => {
          this.tableData = res.data
          this.loading = false
        })
      },
    }
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

	;
</style>