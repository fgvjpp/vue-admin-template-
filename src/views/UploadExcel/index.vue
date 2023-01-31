<template>
  <div class="excel">
    <upload-excel :on-success="success" />
  </div>
</template>

<script>
import { addAllEmployees } from '@/api/employees'
export default {
  methods: {
    async success({ results }) {
      const excelData = results.map(item => {
        return {
          username: item['姓名'],
          mobile: item['手机号'],
          workNumber: item['工号'],
          timeOfEntry: this.formatDate(item['入职日期'], '-'),
          correctionTime: this.formatDate(item['转正日期'], '-'),
          formOfEmployment: '',
          departmentName: ''
        }
      })
      console.log(excelData)
      await addAllEmployees(excelData)
      this.$message.success('上传成功')
      this.$router.back()
    },
    // 因为excel转换到js数据的时间不对需要手动进行转换
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style lang="scss" scoped>
.excel {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>
