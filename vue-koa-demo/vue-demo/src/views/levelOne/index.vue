<template>
  <div class="topLevel tc">
    <div class="popSearchBox" v-show="showOrNot">
      <img src="../../assets/logo.jpg" alt="logo"/>
      <Input search enter-button="你过来呀" placeholder="想要射点什么..." :maxlength="30" class="searchBoxA"/>
    </div>
    <img src="../../assets/logo.jpg" alt="logo" class="logo-image"/>
    <Input search enter-button="你过来呀" placeholder="想要射点什么..." :maxlength="30" class="searchBoxB"/>
    <div class="content tl" ref="contentRefs">
      <div class="selection" :class="{fixSelection: upWheel}">
        <span class="cp m10" @click="state = 1" :class="{active: state === 1}">我的关注</span>
        <span class="cp m10" @click="state = 2" :class="{active: state === 2}">推荐</span>
        <span class="cp m10" @click="state = 3" :class="{active: state === 3}">导航</span>
      </div>
      <div class="attention" v-if="state === 1">
        <Upload action="/file/upload">
          <Button icon="ios-cloud-upload-outline">图片上传</Button>
        </Upload>
      </div>
      <div class="recommend" v-if="state === 2" :style="{height: contHeight + 'px'}">
        <div class="leftCon">
          <div v-for="(item, index) in msgList" :key="index" class="eachMsg">
            <span class="title conActiveFont">{{ item.title }}</span>
            <div class="author">
              <span class="cp">{{ item.author }} {{ item.date }}</span>
            </div>
          </div>
          <div class="loadingSpan" v-if="loading">
            <loading-svg/>
          </div>
        </div>
        <div class="rightCon" :class="{showPopSBox: showOrNot}">
          <div class="rightConTitle">
            <span class="cp fl">热搜</span>
            <span class="hoverBlue fr"><Icon type="md-refresh" size="18"/> 换一换</span>
          </div>
          <div class="hotNews" v-for="(item, index) in hostList" :key="index">
            <span class="listNo">{{ item.listNo }}</span>
            <span class="conActiveFont">{{ item.listTitle }}</span>
            <div class="hotIcon" v-show="item.hot">热</div>
            <span class="fr">{{ item.clickRate }}</span>
          </div>
        </div>
      </div>
      <div class="navigation" v-if="state === 3">

      </div>
    </div>
  </div>
</template>

<script>
  import msgList from "../../components/msgList"
  import loadingSvg from "../../components/loadingSvg"
  import hostList from "../../components/hostList"
  import corsUrl from '../../../config/config'

  export default {
    name: "index",
    components: {loadingSvg},
    data() {
      return{
        showOrNot: false,
        upWheel: false,
        msgList: msgList,
        hostList: hostList,
        state: 1,
        loading: false,
        oldScrollTop: 0
      }
    },

    computed: {
      contHeight() {
        return this.msgList.length * 70 + 51 + 50
      }
    },

    mounted() {
      window.addEventListener('scroll', this.windowScroll)
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.windowScroll)
    },

    methods: {

      windowScroll() {
        // 以下写法原生兼容
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if(scrollTop + windowHeight === scrollHeight) {
          this.loadMsg()
        }
        const offset = this.$refs.contentRefs.getBoundingClientRect() // 监控搜索框的位置离开可视区以后
        if(offset.top <= 80) {
          this.showOrNot = true
          this.upWheel = scrollTop - this.oldScrollTop < 0
          this.oldScrollTop = scrollTop
        }else {
          this.showOrNot = false
          this.upWheel = false
        }
      },

      loadMsg() {
        this.loading = true
        this.msgList.push(
          {
            id: 0,
            title: '海外侨民没保护到，自己反而成了救护对象……',
            author: '中国青年网',
            date: '07-18 14:42',
          },
          {
            id: 1,
            title: '脸书驳斥：我们比美国政府更有效！',
            author: '北晚新视觉网',
            date: '07-18 18:10',
          },
          {
            id: 2,
            title: '伊朗外交部：令人愤怒！',
            author: '北晚新视觉网',
            date: '07-19 07:44',
          }
        )
        setTimeout(() => {
          this.loading = false
        }, 2000)
      },


    }
  }
</script>

<style lang="scss" scoped>
  @import "../../global/variables.scss";
  .topLevel{
    position: relative;
    width: 1100px;
    margin: 30px auto 0;
    padding-bottom: 20px;
    .popSearchBox{
      position: fixed;
      top: 0;
      left: 0;
      height: 70px;
      width: 100%;
      background-color: white;
      z-index: 1000;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 360px;
      box-shadow: 1px 1px 20px -16px black;
      &>img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .searchBoxA{
        width: 656px;
      }
    }
    .logo-image{
      width: 100px;
      height: 100px;
    }
    .searchBoxB{
      width: 656px;
      margin: 20px auto 80px;
    }
    .content{
      background-color: rgba(255, 255, 255, 0.8);
      min-height: 500px;
      border-radius: 20px;
      padding: 20px 10px 0 10px;
      .selection{
        min-height: 0;
        .m10{
          padding-bottom: 3px;
          &:hover{
            color: black;
          }
        }
      }
      .fixSelection{
        position: fixed;
        top: 70px;
        left: 0;
        min-height: 40px;
        transition: min-height 0.5s;
        width: 100%;
        padding: 10px 0 0 412px;
        background-color: #F1F1F1;
        z-index: 999;
      }
      .attention{
        height: 200px;
      }
      .recommend{
        padding-top: 10px;
        .leftCon{
          position: absolute;
          left: 0;
          overflow: hidden;
          padding-left: 20px;
          .eachMsg{
            height: 50px;
            margin-bottom: 20px;
            &:first-child{
              margin-top: 0;
            }
            .title{
              font-size: 20px;
            }
            .author{
              margin-top: 5px;
              font-size: 13px;
            }
          }
          .loadingSpan{
            position: relative;
            height: 50px;
          }
        }
        .rightCon{
          position: absolute;
          right: 0;
          width: 350px;
          padding-right: 20px;
          .rightConTitle{
            position: relative;
            top: -30px;
            color: black;
          }
          .hotNews{
            position: relative;
            top: -20px;
            clear: both;
            margin: 10px 0;
            &:nth-child(2)>.listNo{
              color: red;
            }
            &:nth-child(3)>.listNo{
              color: #e46a29;
            }
            &:nth-child(4)>.listNo{
              color: #ffa111;
            }
            .listNo{
              margin-right: 10px;
            }
            .hotIcon{
              display: inline-block;
              width: 16px;
              height: 16px;
              color: white;
              font-size: 12px;
              background-color: #e46a29;
              border-radius: 3px;
              margin-left: 8px;
              padding-left: 2px;
            }
          }
        }
      }
      .navigation{
        height: 200px;
      }
    }
  }

  .showPopSBox{
    position: fixed!important;
    top: 140px!important;
    right: 401.5px!important;
  }

  .active{
    color: black;
    border-bottom: $conFontHover 2px solid;
  }
</style>

<style lang="scss">
  @import "../../global/variables.scss";
  .searchBoxA, .searchBoxB{
    .ivu-input{
      height: 40px;
      font-size: 16px;
      border: $headerFontHover 1px solid;
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
    }
    .ivu-input-search{
      width: 108px;
      height: 40px;
      font-size: 16px;
      background-color: $headerFontHover;
      border: $headerFontHover 1px solid;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
    }
  }

  .ivu-scroll-container{
    overflow: hidden;
    .ivu-scroll-content{
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .ivu-spin-fix{
    background-color: unset;
  }
</style>
