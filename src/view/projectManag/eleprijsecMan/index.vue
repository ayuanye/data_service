<template>
	<div class="main">
		<div class="project_side">
			<Layout>
				<Row style="background-color:white;width:100%;height:100%;">
					<Col span="4">
						<Menu :theme="theme2" :active-name="nameVal" :open-names="['1']" @on-select="select" style="width:auto" >
							<Submenu name="1">
								<template slot="title">
									<Icon type="ios-paper"/>
									项目设置
								</template>
								<MenuItem name="1-1">应用列表</MenuItem>
								<MenuItem name="1-2">在线应用</MenuItem>
								<MenuItem name="1-3">成员管理</MenuItem>
								<MenuItem name="1-4">工作环境</MenuItem>
								<MenuItem name="1-5">标签管理</MenuItem>
							</Submenu>
						</Menu>
					</Col>
					<Col span="20">
						<div class="project_main">
							<div style="background:#eee;margin-left: 50px">
								<UseList v-if="nameVal=='1-1'" @exampleOn="exampleOn"></UseList>
								<OnlineUse v-if="nameVal=='1-2'"></OnlineUse>
								<MemberManager v-if="nameVal=='1-3'"></MemberManager>
								<WorkEnvironment v-if="nameVal == '1-4'"></WorkEnvironment>
								<LabelsManager v-if="nameVal == '1-5'"></LabelsManager>
							</div>
						</div>
					</Col>
				</Row>
			</Layout>
		</div>
	</div>
</template>
<script>
  import UseList from './useList/index';
  import OnlineUse from './onlineUse/index';
  import MemberManager from './memberManager/index';
  import WorkEnvironment from './workEnvironment/index.vue'
  import LabelsManager from './labelsManager/index.vue'
  export default {
    name: "index",
    components: {UseList, OnlineUse, MemberManager,WorkEnvironment,LabelsManager},
    data() {
      return {
        theme2: 'light',
        nameVal: '1-1',
      }
    },
    methods: {
      select(val) {
        this.nameVal = val
      },
      exampleOn(val) {
        this.nameVal = val
      }
    }
  }
</script>
<style lang="stylus" scoped>
	// @import '~@/assets/styles/mixins.styl'
	.main
		width: 100%;
		height: 100%;
		background-color: white
		// display: flex
		// justify-content: space-between

		.project_side
			// width: 240px
			height: 100%;
			background-color: white
			width: 100%

		// flex-grow: 1;

		.project_main
			width: 100%
			margin: 30px 0 0 0
			padding-bottom: 20px
			padding-right: 60px
	 	// "d3": "^7.8.4",
    	// "dagre-d3": "^0.6.4",
	// height: 100%
	// background: green

</style>