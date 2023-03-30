<template>
  <div>
    <Card class="login-form-layout">
      <Form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <img src="../../assets/images/log.png" style="width: 60px;height: 60px;color: #409EFF"/>
        </div>
        <h2 class="login-title color-main">数据服务系统</h2>
        <FormItem  prop="username">
          <Input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <Icon type="ios-contact"  class="color-main"></Icon>
          </span>
          </Input>
        </FormItem >
        <FormItem  prop="password">
          <Input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <Icon type="md-lock" class="color-main"/>
          </span>
            <span slot="suffix" @click="showPwd">
              <Icon type="md-sunny" class="color-main"/>
          </span>
          </Input>
        </FormItem >
        <FormItem  style="margin-bottom: 60px;text-align: center">
          <Button  style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </Button >
          <Button  style="width: 45%" type="primary" @click.native.prevent="handleTry">
            注册
          </Button >
        </FormItem >
      </Form>
    </Card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>
<script>
import login_center_bg from '@/assets/images/login_center_bg.png'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    };
    return {
      loading: false,
      loginForm:{
        username: '',
        password: '',
      },
      loginRules:{
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      pwdType: 'password',
      login_center_bg,
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin(){},
    handleTry(){}
  },
}
</script>
<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }
  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }

</style>

