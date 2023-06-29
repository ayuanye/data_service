<template>
  <div class="table_app">
    <Tabs value="name1">
      <TabPane label="基本信息" name="name1">
        <Row>
          <Col span="17">
            <Card
              dis-hover
              style="
                border-left: 1px #fff;
                border-top: 1px #fff;
                border-bottom: 1px #fff;
                border-radius: 0%;
              "
            >
              <Input
                v-model="snapshot.title"
                placeholder="请输入标题"
                size="large"
                @on-enter="title()"
                @on-blur="title()"
              />
              <p style="margin: 10px 10px">
                {{ snapshot.subTitle ? snapshot.subTitle : "" }}
              </p>
              <Input
                v-model="snapshot.describe"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入描述..."
                @on-enter="describe()"
                @on-blur="describe()"
              />
              <div style="text-align: center; margin: 30px 0">
                <div
                  class="demo-upload-list"
                  v-for="item in uploadList"
                  :key="item.url"
                >
                  <template>
                    <img :src="snapshot.topicImage"/>
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-trash-outline"
                        size="30"
                        @click.native="handleRemove(item)"
                      ></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg', 'jpeg', 'png']"
                  :max-size="204800"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="/api/resource/upload"
                  style="display: inline-block; width: 250px"
                >
                  <div style="width: 250px; height: 250px; line-height: 250px">
                    <Icon type="ios-camera" size="50"></Icon>
                  </div>
                </Upload>
              </div>
              <p style="font-size: 26px; font-weight: bold">动态</p>
              <Divider />
              <List>
                <ListItem v-for="item in dynamics" :key="item.data">
                  <ListItemMeta
                    avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                    :title="item.title"
                    :description="item.describe"
                  />
                  <template slot="action">
                    <li>
                      <Icon type="ios-alarm-outline" />&nbsp;{{ item.time }}
                    </li>
                    <li v-if="item.type !== 'create'">
                      <Button type="text" @click="delDescribe(item)"
                        >删除</Button
                      >
                    </li>
                  </template>
                </ListItem>
              </List>
              <Input
                style="margin: 10px 0"
                v-model="talk"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="添加评论..."
              />
              <Button type="primary" @click="talkList()">添加评论</Button>
            </Card>
          </Col>
          <Col span="5" offset="1">
            <Card dis-hover :bordered="false">
              <div>
                <span style="fon-size: 23px; font-weight: bold"
                  >所属应用：{{ name ? name : "" }}</span
                >
              </div>
              <Form
                ref="formInline"
                :model="formInline"
                inline
                style="text-align: left"
              >
                <Row>
                  <Col span="22">
                    <FormItem label="版本号：">
                      <Input
                        v-model="snapshot.version"
                        style="width: 200px"
                        placeholder="请输入版本号"
                        @on-enter="version()"
                        @on-blur="version()"
                      >
                      </Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="版本周期（天）：">
                      <Input
                        v-model="snapshot.versionCycle"
                        style="width: 200px"
                        placeholder="请输入版本周期"
                        @on-enter="versionCycle()"
                        @on-blur="versionCycle()"
                      >
                      </Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="标签：">
                      <Select
                        v-model="snapshot.labels"
                        placeholder="选择标签"
                        multiple
                        style="width: 200px"
                        @on-change="labels()"
                      >
                        <Option
                          v-for="item in addTab"
                          :key="item.name"
                          :value="item.name"
                          >{{ item.name }}</Option
                        >
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="负责人：">
                      <Select
                        v-model="snapshot.principals"
                        placeholder="选择负责人"
                        multiple
                        style="width: 200px"
                        @on-change="principals()"
                      >
                        <Option
                          v-for="item in principalsList"
                          :key="item.id"
                          :value="item.id"
                          >{{ item.memberName }}</Option
                        >
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="流程图" name="name2">
        <div style="padding: 50px 50px; text-align: center">
          <ImageView :needTraceId="needTraceId" />
        </div>
      </TabPane>
      <TabPane label="堆栈列表" name="name3">
        <HeapListVue :needTraceId="needTraceId" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import ImageView from "../../../monitoringStation/imageview/index.vue";
// import HeapListVue from "../../../monitoringStation/mySnapshot/heapList.vue";
import HeapListVue from "./heapList.vue"
import {
  V2,
  updateV2,
  addDescribeV2,
  delDescribe,
} from "@/services/applicationCenter/sysSnapshot/sysSnapshotApi";
export default {
  components: {
    ImageView,
    HeapListVue,
  },
  props: ["appId", "snapshotId"],
  data() {
    return {
      value1: "123123123",
      value2: "",
      formInline: {},
      talk: "",
      defaultList: [
        {
          name: "a42bdcc1178e62b4694c830f028db5c0",
          url: "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar",
        },
      ],
      uploadList: [],
      needTraceId: "",
      snapshot: {},
      dynamics: [],
      name: "",
      addTab: [],
      principalsList: [],
    };
  },
  watch: {
    snapshotId: {
      handler(val) {
        if (val) {
          V2({
            projectId: window.localStorage.getItem("appId"),
            snapshotId: val,
          }).then((res) => {
            this.needTraceId = res.data.stackItems[0].traceId;
            this.snapshot = res.data.snapshot;
            this.dynamics = res.data.dynamics;
            this.name = res.data.app.name;
            this.principalsList = res.data.members;
            this.addTab = res.data.labels;
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // this.snapshotId = this.$route.params.snapshotId
    // this.appId = this.$route.params.appId
  },
  methods: {
    version() {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        version: this.snapshot.version,
      };
      this.dataList(data);
    },
    versionCycle() {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        versionCycle: this.snapshot.versionCycle,
      };
      this.dataList(data);
    },
    labels() {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        labels: this.snapshot.labels,
      };
      this.dataList(data);
    },
    principals() {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        principals: this.snapshot.principals,
      };
      this.dataList(data);
    },
    title() {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        title: this.snapshot.title,
      };
      this.dataList(data);
    },
    describe() {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        describe: this.snapshot.describe,
      };
      this.dataList(data);
    },
    dataList(data) {
      updateV2(data).then((res) => {
        this.getList()
        this.$Message.info(res.message);
      });
    },
    talkList() {
      addDescribeV2({
        content: this.talk,
        snapshotId: this.snapshotId,
      }).then((res) => {
        this.$Message.info(res.message);
        this.talk = "";
        this.getList();
      });
    },
    getList() {
      V2({
        projectId: window.localStorage.getItem("appId"),
        snapshotId: this.snapshotId,
      }).then((res) => {
        this.needTraceId = res.data.stackItems[0].traceId;
        this.snapshot = res.data.snapshot;
        this.dynamics = res.data.dynamics;
        this.name = res.data.app.name;
        this.principalsList = res.data.members;
      });
    },
    delDescribe(item) {
      delDescribe({
        snapshotId: this.snapshotId,
        content: item.describe,
        dateTime: item.date,
      }).then((res) => {
        this.getList();
      });
    },
    handleRemove(file) {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        topicImage: '',
      };
      this.dataList(data);
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      var data = {
        appId: this.appId,
        projectId: window.localStorage.getItem("appId"),
        id: this.snapshotId,
        topicImage: res.data,
      };
      this.dataList(data);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc: "文件：" + file.name + " 上传格式错误，请上传jpg或者png格式！",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 2;
      if (!check) {
        this.$Notice.warning({
          title: "只能上传一张图片！",
        });
      }
      return check;
    },
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
};
</script>
<style>
.table_app {
  /* width: 900px; */
}
.demo-upload-list {
  display: inline-block;
  width: 250px;
  height: 250px;
  text-align: center;
  line-height: 250px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>