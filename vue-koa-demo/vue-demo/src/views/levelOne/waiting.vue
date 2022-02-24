<template>
  <ak-table :columns="columns" :data="tableData" />
</template>

<script>
  export default {
    name: "lesson",
    data() {
      return {
        columns: [
          {
            title: '日期',
            key: 'date',
            align: 'center',
            minWidth: 250,
            render: (h, params) => {
              return h('span', {
                style: {color: 'red'}
              }, params.row.date)
            }
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center',
            minWidth: 250
          },
          {
            title: '地址',
            key: 'address',
            align: 'center',
            minWidth: 400
          }
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '瓦达西瓦',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '口你急哇',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '他大姨妈',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '哟拉西扩',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
