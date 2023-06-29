<template>
  <div>
    <Modal
      width="50%"
      v-model="showSyste"
      title="保存系统快照"
      ok-text="保存"
      @on-ok="asyncOK"
      @on-cancel="cancel"
    >
      <Form :model="formItem" >
        <Row>
          <Col span="14">
            <Card dis-hover :bordered="false">
              <Row>
                <Col :span="22">
                  <FormItem label="" prop="title">
                    <span>名称:</span>
                    <Input
                      v-model="formItem.title"
                      style="width: 100%"
                      placeholder="请输入名称"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="16">
                  <FormItem label="" prop="image">
                    <span>图片:</span>
                    <Input
                      v-model="formItem.image"
                      style="width: 100%"
                      disabled
                      placeholder="未选择图片"
                    >
                    </Input>
                  </FormItem>
                </Col>
                <Col :span="6">
                  <Upload action="/api/resource/upload" 
                            style="padding-top:32px;padding-left:5px"
                            ref="upload"
                            :data="dataForm"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="3072"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple>
                        <Button type="primary">选择文件</Button>
                    </Upload>
                </Col>
              </Row>
              <Row>
                <Col :span="23">
                  <FormItem label="" prop="describe">
                    <span>描述:</span>
                    <Input
                      v-model="formItem.describe"
                      type="textarea"
                      placeholder="请输入描述"
                      style="width: 100%"
                      :autosize="{ minRows: 2, maxRows: 5 }"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span="8" offset="1">
            <Card style="border-right: 1px #fff;border-top: 1px #fff;border-bottom: 1px #fff;border-radius: 0%;" dis-hover>
              <Row>
                <Col :span="22">
                  <FormItem
                    label="所属应用:"
                    prop="appId"
                  >
                    <Input
                      v-model="formItem.appId"
                      style="width: 100%"
                      placeholder="请输入所属应用"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="22">
                  <FormItem label="目录:" prop="directory" >
                    <Select v-model="formItem.directory" placeholder="-请选择目录-">
                      <Option
                        v-for="item in catalogList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.path }}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="22">
                  <FormItem
                    label="版本有效周期:"
                    prop="versionCycle"
                  >
                    <Input
                      v-model="formItem.versionCycle"
                      style="width: 100%"
                      placeholder="请输入版本有效周期">
                      <span slot="append"> 天 </span>
                    </Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="22">
                  <FormItem
                    label="添加标签:"
                    prop="labels"
                  >
                    <Select
                      v-model="formItem.labels"
                      placeholder="-请选择添加标签-"
                      multiple
                      clearable
                    >
                      <Option
                        v-for="item in addTab"
                        :value="item.name"
                        :key="item.name"
                        >{{ item.name }}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="22">
                  <FormItem label="负责人:" prop="fuzeren" >
                    <Input
                      v-model="formItem.user"
                      style="width: 100%"
                      placeholder="请输入所属应用"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {openSystemSnapshotV2,doSaveSystemSnapshotV2} from '@/services/monitoringStationApi'
export default {
  name: "systemModel",
  props: {
    systeShow: {
      type: Boolean,
      default: false,
    },
    addTab:{
      type: Array,
      default: false,
    },
    codeList:{
      type:Array,
      default:false
    }
  },
  data() {
    return {
      showSyste: false,
      formItem: {
        title: "",
        image: "",
        describe: "",
        appId: "",
        directory: "",
        versionCycle: "",
        labels: [],
        user: "",
      },
      catalogList: [],
      uploadList:[],
      dataForm:{
        md5: "f57edfc04e1b6ccd0b65829927c07470"
      },
      upImageData:'',
    };
  },
  watch: {
    systeShow: {
      handler(val) {
        this.showSyste = val;
      },
      deep: true,
      immediate: true,
    },
    codeList: {
      handler(val) {
        if(val.length !==0){
            var data ={
              traceId:val[0].traceId,
              projectId:window.localStorage.getItem('appId'),
            }
            openSystemSnapshotV2(data).then(res=>{
              if(res.data.dirs.length!==0){
                this.catalogList = res.data.dirs
              }else{
                this.catalogList = [{path:"/root", id:"root" }]
              }
              this.formItem.user = res.data.user.name
            })
          
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    asyncOK() {
        var data = {
            traceId:this.codeList[0].traceId,
            projectId:window.localStorage.getItem('appId'),
            title:this.formItem.title,
            describe:this.formItem.describe,
            appId: this.formItem.appId,
            directory: this.formItem.directory,
            versionCycle: this.formItem.versionCycle,
            labels: this.formItem.labels,
            user: this.formItem.user,
            topicImage: this.upImageData,
        }
        doSaveSystemSnapshotV2(data).then(res=>{
          if(res.data==10000){
            this.$Message.info('保存成功！')
          }
          this.cancel()
        })
        
    },
    cancel() {
      this.formItem= {
        title: "",
        image: "",
        describe: "",
        appId: "",
        directory: "",
        versionCycle: "",
        labels: "",
        user: "",
      }
      this.$emit('showsysteF',false)
    },
    handleSuccess (res, file) {
        this.upImageData = res.data
        this.formItem.image = file.name
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式错误',
            desc: '文件 ' + file.name + ' 格式错误, 请上传 jpg 或者 png格式！'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '文件内存错误',
            desc: '文件  ' + file.name + ' 内存过大，请重新上传！'
        });
    },
    handleBeforeUpload (file) {
      this.formItem.image = file.name
        const check = this.uploadList.length < 5;
        if (!check) {
            this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
            });
        }
        return check;
    }
  },
};
</script>
