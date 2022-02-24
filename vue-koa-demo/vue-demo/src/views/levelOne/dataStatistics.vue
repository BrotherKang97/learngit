<template>
  <div class="chartStatistics">
    <!--柱形图：系列设置数据-->
    <div ref="echart1" style="width: 500px; height: 300px;"></div>
    <!--折线图-->
    <div ref="echart2" style="width: 500px; height: 300px;"></div>
    <!--饼图-->
    <div ref="echart3"></div>
    <!--仪表盘-->
    <div ref="echart4" style="width: 300px; height: 300px;"></div>
    <!--倒三角-->
    <div ref="echart5" style="width: 300px; height: 300px;"></div>
    <!--柱形图：数据集设置数据-->
    <div ref="echart6"></div>
    <!--折线图、饼图 数据互联-->
    <div ref="echart7"></div>

  </div>
</template>

<script>
  export default {
    name: "dataStatistics",
    data (){
      return {

      }
    },

    mounted() {
      this.getRender()
    },

    methods: {

      getRender() {
        //柱形图，初始化
        let Echart1 = this.$echarts.init(this.$refs.echart1)
        //配置参数
        let config1 = {
          title: {
            text: '系列设置数据'
          },
          tooltip: {},
          legend: {
            //data: ['2019', '2020', '2021']
          },
          xAxis: {
            data: ['衬衫', '皮外套', '西裤', '帆布鞋', '赖皮蛇', '真皮沙发']
          },
          yAxis: {},
          series: [
            {
              name: '2019',
              type: 'bar',
              data: [5, 2, 8, 7, 6, 2]
            },
            {
              name: '2020',
              type: 'bar',
              data: [4, 5, 5, 5, 4, 1]
            },
            {
              name: '2021',
              type: 'bar',
              data: [3, 8, 9, 5, 7, 3]
            },
          ]
        }
        Echart1.on('click', data => {
          let routeUrl = this.$router.resolve({path: '/waiting'})
          window.open(routeUrl.href, '_blank')
          //console.log(data)
        })
        //设置参数
        Echart1.setOption(config1)

        //折线图
        let Echart2 = this.$echarts.init(this.$refs.echart2)
        //配置参数
        let config2 = {
          title: {text: '购物日记'},
          tooltip: {
            trigger: 'axis',
            showContent: true
          },
          legend: {},
          xAxis: {
            data: ['2017', '2018', '2019', '2020', '2021', '2022']
          },
          yAxis: {},
          series: [
            {
              name: '衬衫',
              type: 'line',
              smooth: true,
              data: [2, 3, 5, 7, 9, 12]
            },
            {
              name: '皮外套',
              type: 'line',
              smooth: true,
              data: [4, 5, 6, 8, 9, 9]
            },
            {
              name: '赖皮蛇',
              type: 'line',
              smooth: true,
              data: [18, 17, 9, 7, 6, 3]
            },
            {
              name: '真皮沙发',
              type: 'line',
              smooth: true,
              data: [2, 7, 9, 12, 15, 22]
            }
          ],
        }
        Echart2.resize({
          width: 500,
          height: 300,
        })
        Echart2.setOption(config2)

        //饼状图
        let echart3 = this.$echarts.init(this.$refs.echart3, 'dark',  //第二个参数修改主题,再次修改为深色模式
          {
            width: 480,
            height: 300
          })    //容易未定宽高，可自行传参定义容器大小
        //配置参数
        let config3 = {
          //自定义配色，根据index来匹配
          color:[ '#00ADF0', '#00E181', '#c23531'],
          legend: {
            orient: 'vertical',
            top: 50,
            left: 0
          },
          series: [
            {
              name: '销量',
              type: 'pie',
              selectedMode: 'single',
              data: [
                {value: 20, name: '卡布奇诺'},
                {value: 15, name: '82年拉菲'},
                {value: 10, name: '烧饼'},
                {value: 12, name: '芭菲'},
                {value: 25, name: '牛牪'},
                {value: 8, name: '邳圩'},
              ]
            }
          ]
        }
        //手动单独设置图表图形的大小，不是标签容器的大小
        /*echart3.resize({
          width: 420,
          height: 300,
        })*/
        //设置参数
        echart3.setOption(config3)

        //仪表盘
        let echart4 = this.$echarts.init(this.$refs.echart4)
        //配置参数
        let config4 = {
          title: {text: '速度50迈', left: 'center'},
          series: [
            {
              name: '销量',
              type: 'gauge',
              data: [50]
            }
          ]
        }
        echart4.setOption(config4)

        //倒三角
        let echart5 = this.$echarts.init(this.$refs.echart5)
        //配置参数
        let config5 = {
          legend: {
            data: ['貂皮', '猪皮', '蛇皮', '虎皮', '扒皮']
          },
          tooltip: {
            showContent: true
          },
          series: [
            {
              name: '销量',
              type: 'funnel',
              data: [
                {value: 60, name: '貂皮'},
                {value: 20, name: '猪皮'},
                {value: 80, name: '蛇皮'},
                {value: 40, name: '虎皮'},
                {value: 100, name: '扒皮'}
              ]
            }
          ]
        }
        echart5.setOption(config5)


        //数据集
        let echart6 = this.$echarts.init(this.$refs.echart6, null,
          {
            width: 500,
            height: 300
          })
        //配置参数
        let config6 = {
          title: {text: '数据集设置数据'},
          legend: {},
          tooltip: {},
          dataset: {
            //提供一份数据，有数组和对象两种方式
            /*source: [
              ['product', '2016', '2017', '2018'],
              ['马萨卡', 24.5, 18.9, 21.3],
              ['阿玛尼', 26.1, 25.4, 28.3],
              ['默契都', 27.9, 29.1, 12.6],
              ['念慈菴', 29.5, 32.5, 38.9]
            ]*/
            //以上数组方式或者以下对象方式
            dimensions: ['product', '2015', '2016', '2017'],
            source: [
              { product: '马萨卡', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
              { product: '阿玛尼', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
              { product: '默契都', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
              { product: '念慈菴', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
        }
        echart6.setOption(config6)


        //折线图、饼图 数据互联 ， 数据集
        let Echart7 = this.$echarts.init(this.$refs.echart7, 'dark',
          {
            width: 500,
            height: 400
          }
          )
        //配置参数
        let config7 = {
          title: {text: '购物日记'},
          tooltip: {
            trigger: 'axis',
            showContent: true
          },
          legend: {
            data: [
              {
                name: '衬衫',
                textStyle: {fontWeight: 'bold', color: 'orange'}
              },
              {
                name: '皮外套',
                //icon: 'circle',
                textStyle: {fontWeight: 'bold', color: 'orange'}
              },
              {
                name: '赖皮蛇',
                textStyle: {fontWeight: 'bold', color: 'orange'}
              },
              {
                name: '真皮沙发',
                textStyle: {fontWeight: 'bold', color: 'orange'}
              }
            ]
          },
          dataset: {
            source: [
              ['goods', '2017', '2018', '2019', '2020', '2021', '2022'],
              ['衬衫', 2, 3, 5, 7, 9, 12],
              ['皮外套', 4, 5, 6, 8, 9, 9],
              ['赖皮蛇', 18, 17, 9, 7, 6, 3],
              ['真皮沙发', 2, 7, 9, 12, 15, 22]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '50%'},   //距上方55%
          series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              emphasis: {focus: 'data'},
              label: {
                formatter: '{b}：{@2017} ({d}%)'
              },
              encode: {
                itemName: 'goods',
                value: '2017',
                tooltip: '2017'
              }
            }
          ],
        }
        Echart7.on('updateAxisPointer', function (event) {
          let xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            let dimension = xAxisInfo.value + 1;
            Echart7.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        Echart7.resize({
          width: 500,
          height: 400,
        })
        Echart7.setOption(config7)


      }

    }
  }
</script>

<style lang="scss" scoped>
  .chartStatistics{
    background-color: rgb(255, 255, 255);
    height: calc(100vh - 60px);
    border-radius: 20px;
    padding: 20px 10px 0 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
</style>
