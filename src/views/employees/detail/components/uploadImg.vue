<template>
  <div>
    <el-upload :on-change="change" :http-request="uploadImg" :on-remove="removeList" :class="{upload:isOk}" action="#" :on-preview="preview" list-type="picture-card" :file-list="fileList">
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="progressShow" style="width:193px;" :percentage="percentage" />
    <el-dialog title="图片预览" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
const cos = new COS({
  SecretId: 'AKIDLPE5APmCxXcUKurPIwIhs10jDTSeumkb', // 身份识别 ID
  SecretKey: 'nMVR6wZmmqxrCG7kH7j3CyjEUaIp8GDP' // 身份密钥
})
export default {
  props: {
    userimg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [{
        url: 'https://huahua-1304600167.cos.ap-guangzhou.myqcloud.com/%E6%9C%AA%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png'
      }],
      percentage: 0,
      progressShow: false,
      status: true
    }
  },
  computed: {
    isOk() {
      return this.fileList.length > 0 || this.status
    }
  },
  watch: {
    userimg(val) {
      if (val) {
        if (this.fileList.length > 0) {
          this.fileList[0].url = val
        } else {
          this.fileList.push({ url: val })
        }
      }
    }
  },
  methods: {
    // 点击预览图片
    preview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    // 点击删除图片列表
    removeList(file, fileList) {
      this.fileList.splice(0, 1)
      this.$emit('userImg', '')
      setTimeout(() => {
        this.status = false
      }, 1100)
    },
    // 上传到腾讯云
    uploadImg(files) {
      this.progressShow = true
      cos.putObject({
        Bucket: 'heihei-1304600167', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: files.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: files.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: (progressData) => {
          this.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        setTimeout(() => {
          this.percentage = 0
          this.progressShow = false
        }, 1400)
        console.log(err || data)
        this.status = true
        this.$emit('userImg', 'https://' + data.Location)
      })
    },
    // 添加图片回调
    change(file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .upload {
    .el-upload {
        display: none;
    }
}
</style>
