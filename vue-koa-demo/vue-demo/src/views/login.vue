<template>
  <div class="loginOrRegister">
    <h3>苏坡儿爱豆的笑容</h3>
    <div class="formSpace" v-if="loginOrNot">
      <Form ref="loginFormRefs" :model="loginForm" :rules="loginFormRules">
        <FormItem prop="userName">
          <Input v-model="loginForm.userName" placeholder="请输入账号名称" type="text">
            <Icon type="ios-person-outline" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input v-model="loginForm.password" placeholder="请输入密码" type="password">
            <Icon type="ios-lock-outline" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem>
          <Button class="demo-form-ok-btn" @click="login">登录</Button>
          <Button class="demo-form-clear" @click="clear">重置</Button>
        </FormItem>
      </Form>
      <!--<div class="tl"><span class="activeFontB" @click="loginOrNot = false">没有账户？点击注册...</span></div>-->
    </div>
    <!--<div class="formSpace" v-else>
      <Form ref="registerFormRefs" :model="registerForm" :rules="registerFormRules">
        <FormItem prop="userName">
          <Input v-model="registerForm.userName" placeholder="请输入账号名称" type="text">
            <Icon type="ios-person-outline" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input v-model="registerForm.password" placeholder="请输入密码" type="password">
            <Icon type="ios-lock-outline" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem prop="rePassword">
          <Input v-model="registerForm.rePassword" placeholder="请确认密码" type="password">
            <Icon type="ios-lock-outline" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem>
          <Button class="demo-form-ok-btn" @click="register">注册</Button>
          <Button class="demo-form-clear" @click="clear">重置</Button>
        </FormItem>
      </Form>
      <div class="tl"><span class="activeFontB" @click="loginOrNot = true">已有账户？点击登录...</span></div>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginOrNot: true,
        loginForm: {
          userName: '',
          password: ''
        },
        loginFormRules: {
          userName: {
            required: true
          },
          password: {
            required: true
          }
        },
        registerForm: {
          userName: '',
          password: '',
          rePassword: ''
        },
        registerFormRules: {
          userName: {
            required: true
          },
          password: {
            required: true
          },
          rePassword: {
            required: true
          },
        },

      }
    },

    methods: {
      login() {
        this.$refs.loginFormRefs.validate( valid => {
          if(valid) {
            this.$http.post('/auth/login', this.loginForm)
              .then((res) => {
              if(res && res.data.success) { // 如果成功
                localStorage.setItem('demo-token', res.data.token) // 用sessionStorage把token存下来
                localStorage.setItem('nickname', res.data.nickname)
                if(res.data.avatarPath) {
                  localStorage.setItem('avatarPath', res.data.avatarPath)
                }
                this.$Message.success('登录成功！')
                this.$router.push('/index')
              } else {
                this.$Message.error(res.data.info) // 登录失败，显示提示语
                localStorage.setItem('demo-token', null) // 将token清空
              }
            }).catch(e => {
              console.log(e)
              this.$Message.error('登录出错！')
              localStorage.setItem('demo-token', null) // 将token清空
            })
          }
        })
      },

      register() {
        this.$refs.registerFormRefs.validate( valid => {
          if(valid) {
            delete this.registerForm.rePassword
            this.$http.post('/auth/register', this.registerForm).then(res => {
              if(res && res.data.success){
                this.$Message.success('注册成功！')
              }else {
                this.$Message.error('注册失败！')
              }
            }).catch(e => {this.$Message.error('请求出错！')})
          }
        })
      },

      clear() {
        if(this.loginOrNot) {
          this.$refs.loginFormRefs.resetFields()
        }else {
          this.$refs.registerFormRefs.resetFields()
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
.loginOrRegister{
  padding-top: 50px;
  text-align: center;
  .formSpace{
    margin: 30px auto;
    width: 400px;
  }
}
</style>
