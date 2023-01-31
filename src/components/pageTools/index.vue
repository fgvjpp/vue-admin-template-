<template>
  <el-card class="box-card">
    <el-row type="flex" class="row-bg">
      <el-col>
        <el-row type="flex" style="height: 100%;" align="middle">
          <slot name="left" />
        </el-row>
      </el-col>
      <el-col>
        <el-row type="flex" style="height:100%;" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
