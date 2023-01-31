<template>
  <el-dialog title="二维码" :visible.sync="dialogVisible" width="30%" @opened="isShowQrcode">
    <div class="erweima">
      <canvas ref="myCanvas" />
    </div>
  </el-dialog>
</template>

<script>
import qrcode from 'qrcode'
export default {
  data() {
    return {
      dialogVisible: false,
      imgUrl: ''
    }
  },
  methods: {
    isShowQrcode() {
      qrcode.toCanvas(this.$refs.myCanvas, this.imgUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.erweima {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
