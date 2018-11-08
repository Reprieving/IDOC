<template>
    <el-container class="container">
       <el-aside style="width:250px">
          <el-header class="menu-header">
            <i class="el-icon-menu"></i> <span class="logo-text">Banolia</span>
          </el-header>
          <el-menu class="el-menu-vertical" background-color="#393E46" text-color="#F7F7F7" router @select="addTab" active-text-color="#ffd04b">
              <menu-tree :nodes="menuList"></menu-tree>
          </el-menu>
       </el-aside>

       <el-container>
          <el-header class="user-header">
            <span>Serarch</span>
          </el-header>
          <el-main style="padding:0px">
            <el-tabs class="tabpane-container"  v-model="editableTabsValue" type="card"  @tab-remove="removeTab">
                <el-tab-pane
                    :key="item.name"
                    v-for="(item, index) in tabList"
                    :label="item.label"
                    :name="item.name"
                    :menuIndex="index"
                    :closable="item.closable"
                    class="tabpane-entity"
                >
                  <component class="tab-comp" :is="item.component" ></component>
                </el-tab-pane>
            </el-tabs>
          </el-main>
       </el-container>
    </el-container>

</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import store from "@/store";
import Login from "./Login";
import MenuTree from "@/components/system/MenuTree";

export default {
  data() {
    return {};
  },
  created: function() {
    if (store.state.permissionList.length < 1) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.permissionList,
      tabList: state => state.tabList
    }),

    editableTabsValue: {
      get() {
        return store.state.activeTabName;
      },
      set(value) {
        store.commit("setActiveTabName", value);
      }
    },

    onRoutes() {
      return this.$route.path;
    }
  },
  methods: {
    addTab(state, index) {
      store.dispatch("addTabPane", state);
    },
    removeTab(state, index) {
      store.dispatch("removeTabPane", state);
    }
  },
  components: {
    MenuTree
  }
};
</script>

<style lang="scss" scoped>
.container {
  font-family: Arial, Helvetica, sans-serif;
  
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: #393e46;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }

  .header {
    height: 60px;
    line-height: 60px;
    background: #232931;
    color: #f7f7f7;
    font-size: 20px;
  }

  .menu-header {
    padding-left: 10px;
    @extend .header;
  }

  .user-header {
    @extend .header;
  }

  .tabpane-container{
    .tab-comp{
      // margin-top: 10px;
      // padding-bottom:5px;
      margin: 0 1px;
      overflow-y: scroll;
      height: calc(100vh - 116px);
    }

  }

  .el-menu-vertical {
    overflow-y: scroll;
    // background-color: #393E46;
    height: calc(100vh - 60px);
  }
}
</style>