<!-- 初步封装table组件，使其能通过传入render函数来重渲染表格数据栏 -->
<template>
  <el-table
    :data="data"
    style="width: 100%">
    <el-table-column
      v-for="(column, index) in columns"
      :prop="column.key"
      :label="column.title"
      :min-width="column.minWidth"
      :align="column.align"
    >
      <template slot-scope="scope">
        <template v-if="column.render">
          <container :column="column" :row="scope.row" :render="column.render" :index="index" />
        </template>
        <template v-else>
          <span>{{ scope.row[column.key] }}</span>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'akTable',
    //组件
    components: {
      container: {
        functional: true, //函数式组件，没有上下文this
        props: {
          row: Object,
          render: Function,
          index: Number,
          column: {
            type: Object,
            default: null
          }
        },
        render: (h, ctx) => {
          const params = {
            row: ctx.props.row,       //同一行数控值，对象
            index: ctx.props.index    //同一行数据序号
          }
          if (ctx.props.column) params.column = ctx.props.column    //每一个column
          // params 里包含每一行的数据值row对象，该列column序号index，及对应的表格栏定义column对象
          return ctx.props.render(h, params)
        }
      }
    },
    props: {
      columns: {
        type: Array,
        default: null
      },
      data: {
        type: Array,
        default: null
      }
    },
    data() {
      return {

      }
    },

  }
</script>
