// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router'
import store from './store'
import TreeView from "vue-json-tree-view";
import '@/sass/my.scss'
import locale from 'element-ui/lib/locale/lang/en'


Vue.use(ElementUI,{locale})
Vue.use(TreeView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
})
