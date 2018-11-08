<template>
  <div id="app">
    <el-container>
      <router-view to='/' />
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html,
body {
  height:100vh;
}

.el-tabs__content{
  border-top: solid #ffffff 0px;
}

.el-form--label-top .el-form-item__label{
  /* padding:5 0 0px; */
  padding-top: 5px;
  padding-bottom: 0px;
}

* {
  font-family: PingFang SC;
}

input:focus,
textarea:focus {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  box-shadow: 0 0 15px #8a9ddb;
  /* border: 1px solid #7e8085; */
  outline: none;
}

body {
  margin: 0;
}
</style>
