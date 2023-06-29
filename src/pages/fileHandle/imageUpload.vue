<template>
  <div class="img-upload-wrapper">
    <div class="title">
      <Divider orientation="left">选择图片</Divider>
    </div>
    <div class="content">
      <div class="upload-list" v-for="item in uploadList" :key="item.name">
        <template v-if="item.status === 'finished'">
          <img :src="item.url" />
          <div class="upload-list-cover">
            <Icon
              type="ios-eye-outline"
              size="30"
              @click.native="handleView(item)"
            ></Icon>
            <Icon
              type="ios-trash-outline"
              size="30"
              @click.native="handleRemove(item)"
            ></Icon>
          </div>
        </template>
        <template v-else>
          <Progress
            v-if="item.showProgress"
            :percent="item.percentage"
            hide-info
          ></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg', 'jpeg', 'png']"
        :max-size="2048"
        :default-file-list="defaultList"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:100px;"
      >
        <div style="width: 100px;height:100px;line-height: 102px;">
          <Icon type="ios-camera" size="30"></Icon>
        </div>
      </Upload>
    </div>
    <div class="btn">
      <Button type="info" size="large" long @click="confirm">确认上传</Button>
    </div>
    <div class="title title-address">
      <Divider orientation="left">图片地址</Divider>
    </div>
    <div class="address">
      <div class="single" v-for="item in uploadList" :key="item.url">
        <img :src="item.url" alt="">
        <Input v-model="item.url"></Input>
      </div>
    </div>
    <Modal
      v-model="showImage"
      title="view Image">
      <img :src="url" style="width: 100%;">
    </Modal>
  </div>
</template>
<script>
import { Upload, Divider, Progress } from 'view-design'
export default {
  components: {
    Upload,
    Divider,
    Progress
  },
  data () {
    return {
      uploadList: [],
      defaultList: [],
      imgName: '',
      url: '',
      showImage: false
    }
  },
  methods: {
    handleSuccess (res, file, fileList) {
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },
    handleView (item) {
      this.url = item.url
      this.showImage = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    confirm () {
      this.$router.push({
        name: 'imghidden'
      })
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style lang="stylus" scoped>
.img-upload-wrapper
  width 100%
  height 100%
  background-color #fff
  padding 10px 15px
  box-sizing border-box
  .title
    overflow hidden
  .btn
    margin-top 30px
    width 150px
  .title-address
    margin-top 20px
  .address
    .single
      display flex
      justify-content flex-start
      align-items center
      margin-bottom 20px
      img
        width 100px
        height 100px
        margin-right 20px
  .content
    display flex
    justify-content flex-start
    align-items flex-start
    flex-wrap wrap
    .upload-list
      display flex
      justify-content center
      align-items center
      width 100px
      height 100px
      border 1px solid transparent
      border-radius 4px
      overflow hidden
      background #fff
      position relative
      box-shadow 0 1px 1px rgba(0, 0, 0, 0.2)
      margin-right 10px
    .upload-list img
      width 100%
      height 100%
    .upload-list-cover
      display none
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      background rgba(0, 0, 0, 0.6)
      justify-content center
      align-items center
    .upload-list
      &:hover
        .upload-list-cover
          display flex
    .upload-list-cover i
      color: #fff
      font-size: 30px
      cursor: pointer
      margin: 0 2px
</style>
