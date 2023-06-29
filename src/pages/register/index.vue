<template>
  <div class="app-container">
    <Card class="login-form-layout">
      <Form autoComplete="off"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <img src="../../assets/images/log.png" style="width: 60px;height: 60px;color: #409EFF"/>
        </div>
        <h2 class="login-title color-main">质 控 系 统</h2>
        <FormItem  prop="username" style="margin-top: 30px;">
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
        <FormItem  prop="email">
          <Input name="email"
                    type="email"
                    v-model="loginForm.email"
                    placeholder="请输入邮箱">
          <span slot="prefix">
            <Icon type="ios-mail" />
          </span>
          </Input>
        </FormItem >
        <FormItem  prop="password">
          <Input v-model="loginForm.password"
                    type="password"
                    @keyup.enter.native="handleLogin"
                    placeholder="至少6位密码，区分大小写"
                    >
          <span slot="prefix">
            <Icon type="md-lock" class="color-main"/>
          </span>
          </Input>
        </FormItem >
        <FormItem  prop="password">
          <Input v-model="loginForm.newpassword"
                    type="password"
                    @keyup.enter.native="handleLogin"
                    placeholder="确认密码"
                    >
          <span slot="prefix">
            <Icon type="md-lock" class="color-main"/>
          </span>
          </Input>
        </FormItem >
        <FormItem  style="margin-bottom: 60px;text-align: center">
          <Button  style="width: 45%" type="primary" @click.native.prevent="handleTry">
            注册
          </Button>
        </FormItem >
        <FormItem  style="margin-bottom: 10px;text-align: center">
          <span>已经拥有账号？<Button type="text" style="color:#2d8cf0" @click="skip">登录</Button></span>
        </FormItem >
      </Form>
    </Card>
    <dynamic-bg-blue/>
  </div>
</template>
<script>
import login_center_bg from '@/assets/images/login_center_bg.png'
// import dynamicBackgroun from '@/components/dynamicBackgroun'
import dynamicBgBlue from '@/components/dynamicBgBlue'
import { register} from '@/services/login'
export default {
  name: 'login',
  components:{ dynamicBgBlue },
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
    const validateNewPass = (rule, value, callback) =>{
      if (!isvalidateNewPass(value)) {
        callback(new Error('请输入新密码'))
      } else if(value !== loginForm.password){
        callback(new Error('两次密码输入的不同'))
      }else{
        callback()
      }
    }
    return {
      loading: false,
      loginForm:{
        username: '',
        email:'',
        password: '',
        newpassword:'',
      },
      loginRules:{
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}],
        newpassword: [{required : true,trigger:'blur', validator: validateNewPass}]
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
    skip(){
      this.$router.push({
        path:'/login'
      })
    },
    handleTry(){
      var data ={
        againPassword:this.loginForm.newpassword,
        nickname:'AWa',
        name: this.loginForm.username,
        email:this.loginForm.email,
        password: this.loginForm.password,
      }
      register(data).then(res =>{
        if(res.data.code == 10000){
          this.$router.push({
            path:'/login'
          })
        }
      })
    },
  }
}
</script>
<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    height: auto;
    margin: auto;
    z-index: 2;
    filter: opacity(90%);
    margin-top: 150px;
    border: none;
  }
  .login-form-layout:hover{
    width: 430px;
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
