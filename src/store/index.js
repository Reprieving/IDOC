import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import Main from "@/components/system/Main.vue";
import axios from "axios";
import work from "@/store/modules/work"
import axios_form from "@/config/http"
import findParentNodeInFuncTree from "@/utils/findParentNodeInFuncTree"
import findNodeInPermisTree from "@/utils/findNodeInPermisTree"
import apiUrl from '@/config/url.js'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    mode: "login",
    permissionList: [],
    activeTabName: "main",
    tabList: [
      {
        label: "Index",
        name: "main",
        closable: false,
        component: Main
      }
    ],
    functionTree: [
    ],
    departmentTree: [
    ]
  },
  getters: {},
  mutations: {
    setMode: (state, data) => {
      state.mode = data;
    },
    setPermissionList: (state, data) => {
      state.permissionList = data;
    },
    setActiveTabName(state, name) {
      state.activeTabName = name;
    },
    addTab(state, index) {
      if (state.tabList.filter(f => f.name == index) == 0) {
        let tabNo = []
        findNodeInPermisTree(tabNo,state.permissionList,index)
        let component = () =>
          import("@/components/"+tabNo[0].module+"/" + tabNo[0].component + ".vue");
        state.tabList.push({
          label: index,
          name: index,
          closable: true,
          component: component
        });
      }
      state.activeTabName = index;
    },
    closeTab(state, name) {
      let tab = state.tabList.filter(f => f.name == name)[0];
      let index = state.tabList.indexOf(tab);
      if (index != state.tabList.length - 1) {
        state.activeTabName = state.tabList[index + 1].name;
      } else {
        state.activeTabName = state.tabList[index - 1].name;
      }
      state.tabList = state.tabList.filter(f => f.name != name);
    },
    addFuncTreeNode(state, data) {
      const newChild = {
        id: Math.floor(Math.random() * 900000 + 99999),
        label: data.newNode.functionName,
        children: []
      };
      let funcChil = data.appendNode.children;
      if (!funcChil) {
        funcChil = data.appendNode;
      }
      funcChil.push(newChild);
    },
    setFuncTreeNode(state,data){
      state.functionTree = data;
    },
    addDptTreeNode(state, data) {
      const newChild = {
        id: Math.floor(Math.random() * 900000 + 99999),
        label: data.newNode.name,
        children: []
      };
      let funcChil = data.appendNode.children;
      if (!funcChil) {
        funcChil = data.appendNode;
      }
      funcChil.push(newChild);
    },
    setDptTreeNode(state,data){
      state.departmentTree = data;
    }
  },
  actions: {
    //get permission tree
    getPermission({ commit, state }, subscriber) {
      return new Promise((resolve, reject) => {
        axios_form
          .post(
            apiUrl+"function/subsFuncTree",
            { id: subscriber.subscriberId },
          )
          .then(res => {
            commit("setPermissionList", res.data.children);
            resolve(res.data);
          })
          .catch(() => {
            reject();
          });
      });
    },
    addTabPane({ commit, state }, data) {
      commit("addTab", data);
    },
    removeTabPane({ commit, state }, data) {
      commit("closeTab", data);
    },
    appendFuncTree({ commit, state }, data) {
      const newNode = data.newNode;
      return new Promise((resolve, reject) => {
        axios_form
          .post(
            apiUrl+"function/create",
            { 
              parentId: data.appendParentNodeId,
              moduleName:newNode.moduleName,
              functionName:newNode.functionName,
              component:newNode.component,
              url:newNode.url,
              isMenu:newNode.isMenu,
              isValid:newNode.isValid
            },
          )
          .then(res => {
            commit("addFuncTreeNode", {
              appendNode: data.appendNode,
              newNode: data.newNode
            });
            resolve(res.data);
          })
          .catch(res => {
            reject();
          });
      });
    },
    viewFunc({commit,state},data){
      return new Promise((resolve,reject)=>{
        axios_form
          .post(
            apiUrl+"function/info",
            { id: data.fucId},
          )
          .then(res => {
            resolve(res.data);
          })
          .catch(() => {
            reject();
          });
      })
    },
    appendDptTree({ commit, state }, data) {
      commit("addDptTreeNode", {
        appendNode: data.appendNode,
        newNode: data.newNode
      });
    },
    getFunctionTree({ commit, state }, subscriber){
      return new Promise((resolve, reject) => {
        axios_form
          .post(
            apiUrl+"function/allFuncTree",
            { id: subscriber.subscriberId },
          )
          .then(res => {
            let funcTree = [];
            funcTree.push(res.data)
            commit("setFuncTreeNode", funcTree);
            resolve(res.data);
          })
          .catch(() => {
            reject();
          });
      });
    }

  },
  modules: {
    work:work
    // tab: Tab
  }
});
