/**
 * ajax请求配置
 */
import axios from 'axios'
import apiURL from './url.js'
import store from "@/store";

// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiURL;  // 默认地址

//trans form data
axios.defaults.transformRequest = function (data) {
  let ret = "";

  for (let it in data) {
    ret +=
      encodeURIComponent(it) +
      "=" +
      encodeURIComponent(data[it]) +
      "&";
  }
  return ret;
};

// http request interceptor
axios.interceptors.request.use(
  config => {
    //config.data = JSON.stringify(config.data);  
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    config.headers['accessToken'] = store.state.loginToken

    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// http response interceptor
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode=="404") {
        return
    }else{
        return response;
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
export default axios;