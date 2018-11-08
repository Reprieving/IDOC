import Vue from "vue";
import Vuex from "vuex";
import axios_form from "@/config/http";
import apiUrl from "@/config/url.js";
import axios from "axios";

Vue.use(Vuex);

const state = {
  docTree: []
};

const getters = {};

const mutations = {
  setDocTree(state, docTree) {
    state.docTree = docTree;
  }
};

const actions = {
  getAppInterfaces({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl + "appInterface/interfaces", data.project)
        .then(res => {
          if (res.data.stateCode == "0") {
            let arrTmp = [];
            arrTmp.push(res.data.object);
            commit("setDocTree", arrTmp);
          }
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    });
  },

  getAppInterfaceInfo({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl + "appInterface/interfaceInfo", data.project)
        .then(res => {
          console.log(res);
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    });
  },

  updateAppInterface({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      if (!data == JSON.stringify(data)) {
        reject();
      } else {
        axios
          .post(apiUrl + "appInterface/update", {
            dataStr: JSON.stringify(data)
          })
          .then(res => {
            resolve(res.data);
          })
          .catch(() => {
            reject();
          });
      }
    });
  },

  appendApiTree({ dispatch, commit, state }, data) {
    return new Promise((resolve, reject) => {
      var appInterface = Object.assign({}, data.apiTreeNode);
      appInterface.reqParamStatement = JSON.parse(
        appInterface.reqParamStatement
      );
      appInterface.rspParamStatement = JSON.parse(
        appInterface.rspParamStatement
      );
      axios
        .post(apiUrl + "appInterface/create", {
          dataStr: JSON.stringify(appInterface)
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    }).then(() => {
      dispatch("getAppInterfaces", {
        project: {
          id: data.apiTreeNode.projectId
        }
      }).then(res => {
        console.log(res);
      });
    });
  },

  getSubProject({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl + "project/subProjects", data.project)
        .then(res => {
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    });
  },

  addProject({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl + "project/create", data.project)
        .then(res => {
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
