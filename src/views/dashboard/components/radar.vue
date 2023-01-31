<template>
  <div ref="radar" style="height:500px;" />
</template>

<script>

export default {
  mounted() {
    const myChart = this.$echarts.init(this.$refs.radar)
    const options = {

      tooltip: {
        trigger: 'item'
      },
      legend: {
        data: ['预算分配', '实际开销'],
        top: '0',
        left: '80%',
        icon: 'circle'
      },
      radar: {
        // shape: 'circle',
        axisName: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [5, 8],
          fontSize: 14,
          lineHeight: 20
        },
        indicator: [
          { name: '销售', max: 6500 },
          { name: '管理', max: 16000 },
          { name: '信息技术', max: 30000 },
          { name: '客服', max: 38000 },
          { name: '研发', max: 52000 },
          { name: '市场', max: 25000 }
        ]
      },
      series: [{
        name: '预算 vs 开销',
        type: 'radar',
        areaStyle: {},
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配'

          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销'
          }
        ]
      }]
    }
    myChart.setOption(options)
  }
}
</script>

<style>

</style>
