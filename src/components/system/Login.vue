<template>
  <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">Paperless</h3>
    <el-form-item prop="account">
      <el-input type="text" auto-complete="off" placeholder="Account"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <el-checkbox class="remember">Remember me </el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from "@/api/api";
import store from "@/store";
// import asyncRouter from "../utils/asyncRouter";

var dynamicRouters = [];
export default {
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    login() {
      var router = this.$router;
      store
          .dispatch("getPermission",{
            subscriberId:"1"
          })
          .then(res => {
            // asyncRouter(dynamicRouters,res.children);
            // this.$router.options.routes[1].children = dynamicRouters;
            // this.$router.addRoutes(dynamicRouters);
            router.push({ path: '/home' });
          })
          .catch(res=>{
            console.log(res)
          }); 
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    // border: 2px solid #8492A6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>