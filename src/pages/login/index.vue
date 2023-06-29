<template>
  <div class="app-container">
    <Card class="login-form-layout" v-show="showlogin">
      <Form
        autoComplete="off"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <img
            src="../../assets/images/log.png"
            style="width: 60px; height: 60px; color: #409eff"
          />
        </div>
        <h2 class="login-title color-main">质 控 系 统</h2>
        <FormItem prop="nameOrEmail">
          <Input
            name="nameOrEmail"
            type="text"
            v-model="loginForm.nameOrEmail"
            autoComplete="off"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <Icon type="ios-contact" class="color-main"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            v-model="loginForm.password"
            type="password"
            @keyup.enter.native="login"
            password
            autoComplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <Icon type="md-lock" class="color-main" />
            </span>
            <!-- <span slot="suffix" @click="showPwd">
                <Icon type="ios-eye" />
            </span> -->
          </Input>
        </FormItem>
        <FormItem style="margin-top: -15px; text-align: right">
          <Button type="text" style="color: #2d8cf0" @click="handleTry"
            >忘记密码</Button
          >
        </FormItem>
        <FormItem style="margin-bottom: 60px; text-align: center">
          <Button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click.native.prevent="login('loginForm')"
          >
            登录
          </Button>
          <!-- <Button  style="width: 45%" type="primary" @click.native.prevent="handleTry">
              注册
            </Button > -->
        </FormItem>
        <FormItem style="margin-bottom: 10px; text-align: center">
          <span
            >尚未拥有账号？<Button
              type="text"
              style="color: #2d8cf0"
              @click="handleTry"
              >注册</Button
            ></span
          >
        </FormItem>
      </Form>
    </Card>
    <register v-show="!showlogin" @showLogin="showLogin" />
    <dynamic-bg-blue />
  </div>
</template>
<script>
import config from "@/utils/config";
import login_center_bg from "@/assets/images/login_center_bg.png";
import dynamicBgBlue from "@/components/dynamicBgBlue/index.vue";
import { login } from "@/services/login";
import { mapActions } from "vuex";
import store from "@/store";
import register from "./register/index.vue";
export default {
  components: {
    dynamicBgBlue,
    register,
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      logo: config.shrinkLogoUrl,
      autoLogin: false,
      maxlength: 20,
      showlogin: true,
      loading: false,
      loginForm: {
        nameOrEmail: "",
        password: "",
      },
      loginRules: {
        nameOrEmail: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      pwdType: "password",
      login_center_bg,
    };
  },
  watch: {},
  methods: {
    ...mapActions(["setUserInfo", "setRouteTagNames"]),
    pswChange(ev) {
      if (ev.keyCode === 13) {
        this.login();
      }
    },
    showLogin(event) {
      if (event) {
        this.showlogin = event;
      }
    },
    login(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          if (!this.loginForm.nameOrEmail || !this.loginForm.password) {
            this.$Message.warning("用户名或密码不能为空");
          } else {
            let param = {
              nameOrEmail: this.loginForm.nameOrEmail,
              password: this.loginForm.password,
            };
            login(param).then((res) => {
              if (res.code === 10000) {
                this.$router.push({
                  name: "eleprijsecMan",
                });
                this.initMenuData(res);
              }
            });
          }
        }
      });
    },
    initMenuData(res) {
      var userData = res.data;
      this.setUserInfo(userData);
      store.dispatch("setUserInfo", userData);
      // this.setRouteTagNames([])
    },

    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },

    handleTry() {
      this.showlogin = false;
    },
  },
};
</script>
<style scoped>
.login-form-layout {
  border: none;
  position: absolute;
  left: 0;
  right: 0;
  width: 400px;
  height: auto;
  margin: auto;
  z-index: 3;
  filter: opacity(90%);
  margin-top: 200px;
}
.login-form-layout:hover {
  width: 430px;
}
.login-title {
  text-align: center;
}
.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
