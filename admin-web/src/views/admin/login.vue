<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title" style="color: #fff">管理后台登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" style="color: #fff" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="账号" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" style="color: #fff" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" style="color: #fff" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="infor" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import * as api from "@/api/api";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        name: "",
      },
      type: "登录",
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    async handleLogin() {
      // if (
      //   this.loginForm.username == "admin" &&
      //   this.loginForm.password == "admin"
      // ) {
      //   sessionStorage.setItem("islogin", true);
      //   sessionStorage.setItem("superadmin", true);
      //   this.$router.push({ path: "/admin" });
      //   return;
      // }
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.error("请输入账号密码!");
        return;
      }

      await api
        .adminlist({
          limit: 1,
          offset: 1,
          user: this.loginForm.username,
          pwd: this.loginForm.password,
        })
        .then((res) => {
          if (res.data.total) {
            Object.keys(res.data.list[0]).forEach((key) => {
              sessionStorage.setItem(key, res.data.list[0][key]);
            });
            sessionStorage.setItem("islogin", true);
            sessionStorage.setItem("superadmin", true);
            this.$router.push({ path: "/admin" });
            return;
          } else {
            this.$message.error("账号密码错误!");
          }
        });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
html {
  height: 100%;
}
/* reset element-ui css */
.login-container {
  background: url("../../assets/login.png") no-repeat;
  background-size: 100%;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-size: 100% 100%;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 300px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
