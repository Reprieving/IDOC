import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/system/Login.vue'
import Function from '@/components/system/Function.vue'
import Home from '@/components/system/Home.vue'
import Role from '@/components/system/Role.vue'
import Department from '@/components/system/Department.vue'
import Subscriber from '@/components/system/Subscriber.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          label:'用户管理',
          path: '/subscriber',
          name: 'subscriber',
          component: Subscriber,
          component_name:'Subscriber'
        },
        {
          label:'菜单管理',
          path: '/function',
          name: 'function',
          component: Function,
          component_name:'Function'
        },
        {
          label:'部门管理',
          path: '/department',
          name: 'department',
          component: Department,
          component_name:'Department'
        },
        {
          label:'角色管理',
          path: '/role',
          name: 'role',
          component: Role,
          component_name:'Role'
        },
      ]
    }
  ]
})
