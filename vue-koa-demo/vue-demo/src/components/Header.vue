<template>
  <div class="header-x">
    <div v-for="(item, index) in menuMap" :key="index">
      <div class="each activeFontW" :class="{activeTitle: index === headerNo}" @click="turnTo(item.path, index)">{{ item.title }}</div>
    </div>
    <div class="weatherReport activeFontUser" @mouseover="pointUser = true; operation = 3" @mouseleave="pointUser = false">
      {{ location }}
      <Icon type="ios-sunny" size="20" color="#FFE325" style="margin-left: 5px;"/> {{ weather}}
      <span class="airQuality">{{ airQuality }}</span>
    </div>
    <span class="setting activeFontUser" @mouseover="pointUser = true; operation = 2" @mouseleave="pointUser = false">设置</span>
    <div class="userInfo activeFontUser" @mouseover="pointUser = true; operation = 1" @mouseleave="pointUser = false">
      <img :src="avatarUrl" alt="" class="avatar" @click="previewAvatar">
      {{ userName }}
    </div>
    <div class="hoverModal" :style="{display: pointUser ? 'initial' : 'none'}" @mouseover="pointUser = true" @mouseleave="pointUser = false">
      <div class="personalMenu" v-show="operation === 1">
        <a class="fontColor activeFontB" v-for="(item, index) in personalList" @click="personalOpera(item.todo)" :key="index">{{ item.title }}</a>
      </div>
      <div class="settingMenu" v-show="operation === 2">
        <a class="fontColor activeFontB" v-for="(item, index) in settingList" @click="personalOpera(item.todo)" :key="index">{{ item.title }}</a>
      </div>
      <div class="weatherMenu" v-show="operation === 3">

      </div>
    </div>
    <Modal ref="avatarRef" class-name="checkAvatarModal" width="250px" v-model="checkAvatar" :mask-closable="false" footer-hide @on-cancel="avatarChange = false">
      <div class="avatarSpace" @mouseover="showChange = true" @mouseleave="showChange = false">
        <Upload action="file/upload" :format="['jpg']" :show-upload-list="false" :on-success="uploadSuccess" :on-format-error="formatError">
          <img :src="avatarPre" alt="" class="imageSpace" :class="{avatarImage: showChange}">
          <div class="changeAvatar" v-show="showChange">点击更换</div>
          <div class="box1" v-show="showChange"></div>
          <div class="box2" v-show="showChange"></div>
          <div class="box3" v-show="showChange"></div>
          <div class="box4" v-show="showChange"></div>
        </Upload>
      </div>
      <Button v-show="avatarChange" @click="updateAvatar">确定</Button>
    </Modal>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import {mapActions} from "vuex"
  import corsUrl from "../../config/config"

  export default {
    name: "Header",
    data() {
      return{
        pointUser: false,
        userName: null,
        avatarUrl: null,
        checkAvatar: false,
        showChange: false,
        avatarPre: null,
        avatarChange: false,
        newAvatarId: null,
        headerNo: null,
        menuMap: [
          {
            title: '首页',
            path: '/index'
          },
          {
            title: '门户',
            path: '/door'
          },
          {
            title: '商城',
            path: '/shop'
          },
          {
            title: '可视化统计',
            path: '/dataStatistics'
          },
          {
            title: '待开发',
            path: '/waiting'
          }
        ],
        location: '重庆',
        weather: '36.4℃',
        airQuality: '优',
        operation: null,
        personalList: [
          {
            title: '个人中心',
            todo: '/door'
          },
          {
            title: '账号设置',
            todo: '/door'
          },
          {
            title: '更换账户',
            todo: '/door'
          },
          {
            title: '退出登录',
            todo: this.logout
          }
        ],
        settingList: [
          {
            title: '搜索设置',
            todo: '/door'
          },
          {
            title: '高级搜索',
            todo: '/door'
          },
          {
            title: '关闭预测',
            todo: '/door'
          },
          {
            title: '隐私设置',
            todo: '/door'
          },
          {
            title: '隐藏资讯',
            todo: '/door'
          },
          {
            title: '更换皮肤',
            todo: '/door'
          }
        ]
      }
    },

    created() {
      this.getUserInfo()

      //获取头像url
      this.avatarUrl = localStorage.getItem('avatarPath') ? corsUrl.imageUrl + localStorage.getItem('avatarPath') : '../assets/JM.jpg'
    },

    methods: {

      ...mapActions([
        'logout'
      ]),

      turnTo(path, index) {
        this.headerNo = index
        this.$router.push(path)
      },

      getUserInfo() {
        this.userName = localStorage.getItem('nickname')
        /*let token = localStorage.getItem('demo-token')
        let userInfo = jwt.decode(token)   //解析token获取用户信息
        if(userInfo) {
          this.userName = userInfo.userName
        }*/
      },

      previewAvatar() {
        this.avatarPre = this.avatarUrl
        this.checkAvatar = true
      },

      personalOpera(todo) {
        if(typeof(todo) === 'string') {
          this.$router.push(todo)
        }else if(typeof(todo) === 'function'){
          todo()
        }
      },

      uploadSuccess(file) {
        this.avatarChange = true
        //上传成功后，返回的图片信息
        this.newAvatarId = file.retFileInfo.id
        this.avatarPre = corsUrl.imageUrl + file.retFileInfo.path
      },

      formatError() {
        console.log('格式错误')
      },

      updateAvatar() {
        this.$http.put('/auth/updateAvatar', {fileId: this.newAvatarId}).then( ret => {
          if(ret && ret.data.success) {
            this.$Message.success('修改成功！')
            this.$refs.avatarRef.close()
          }else {
            this.$Message.error('修改失败！')
          }
        }).catch(() => {
          this.$Message.error('修改出错！')
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
.header-x{
  height: 60px;
  //渐变色  background-image: linear-gradient(to right , #00ADF0, #00E181);
  background-color: rgba(39, 39, 39, 0.2);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: 20px;
  box-shadow: 1px 1px 20px -16px black;
  .each{
    margin: 0 20px;
  }

  .weatherReport{
    position: absolute;
    right: 220px;
    line-height: 50px;
    .airQuality{
      display: inline-block;
      line-height: 16px;
      width: 25px;
      font-size: 12px;
      text-align: center;
      background-color: #37bd26;
      border-radius: 10px;
      margin-left: 5px;
    }
  }

  .setting{
    position: absolute;
    right: 160px;
    line-height: 50px;
  }

  .userInfo{
    position: absolute;
    right: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    .avatar{
      min-width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  .hoverModal{
    .personalMenu{
      position: absolute;
      top: 50px;
      right: 40px;
      background-color: #FFFFFF;
      width: 85px;
      height: 120px;
      border-radius: 10px;
      padding-top: 8px;
      .fontColor{
        font-size: 14px;
        display: block;
        line-height: 26px;
        text-align: center;
      }
    }
    .settingMenu{
      position: absolute;
      top: 50px;
      right: 130PX;
      background-color: #FFFFFF;
      width: 85px;
      height: 185px;
      border-radius: 10px;
      padding-top: 8px;
      .fontColor{
        font-size: 14px;
        display: block;
        line-height: 26px;
        text-align: center;
        &:last-child{
          border-top: #c6c6c6 1px solid;
          margin: 8px auto 0;
          width: 56px;
          line-height: 38px;
        }
      }
    }
    .weatherMenu{
      position: absolute;
      top: 50px;
      right: 40PX;
      background-color: #FFFFFF;
      width: 500px;
      height: 250px;
      border-radius: 10px;
      padding-top: 8px;
    }
  }
}
</style>
<style lang="scss">
  .checkAvatarModal{
    .ivu-modal-close{
      right: 0!important;
      top: 0!important;
    }
    .ivu-modal-header{
      text-align: center;
    }
    .ivu-modal-body{
      text-align: center;
      .avatarSpace{
        position: relative;
        margin: 35px auto 10px;
        cursor: pointer;
        .imageSpace{
          width: 200px;
          height: 200px;
        }
        .avatarImage{
          opacity: 0.3;
        }
        .changeAvatar{
          position: absolute;
          top: 85px;
          left: 70px;
          font-weight: bold;
          font-size: 20px;
          color: black;
        }
        .box1{
          position: absolute;
          top: 0;
          left: 9px;
          height: 40px;
          width: 40px;
          border-top: 2px solid black;
          border-left: 2px solid black;
          &:before{
            position: absolute;
            top: 8px;
            left: -4px;
            content: '';
            height: 0;
            border: 1px solid black;
            width: 25px;
            transform: rotate(45deg)
          }
        }
        .box2{
          position: absolute;
          top: 0;
          right: 9px;
          height: 40px;
          width: 40px;
          border-top: 2px solid black;
          border-right: 2px solid black;
          &:before{
            position: absolute;
            top: 8px;
            right: -4px;
            content: '';
            height: 0;
            border: 1px solid black;
            width: 25px;
            transform: rotate(135deg)
          }
        }
        .box3{
          position: absolute;
          bottom: 6px;
          left: 9px;
          height: 40px;
          width: 40px;
          border-bottom: 2px solid black;
          border-left: 2px solid black;
          &:before{
            position: absolute;
            bottom: 8px;
            left: -4px;
            content: '';
            height: 0;
            border: 1px solid black;
            width: 25px;
            transform: rotate(135deg)
          }
        }
        .box4{
          position: absolute;
          bottom: 6px;
          right: 9px;
          height: 40px;
          width: 40px;
          border-bottom: 2px solid black;
          border-right: 2px solid black;
          &:before{
            position: absolute;
            bottom: 8px;
            right: -4px;
            content: '';
            height: 0;
            border: 1px solid black;
            width: 25px;
            transform: rotate(45deg)
          }
        }
      }
    }
    .ivu-modal-footer{
      text-align: center;
    }
  }
</style>
