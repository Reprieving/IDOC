<template>
    <el-container style="">
        <el-aside width="400px">
            <el-input
                placeholder="Function Name"
                v-model="filterText">
            </el-input>
            <el-tree
              :data="funcTree"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                  <el-button type="text" size="mini" @click="() => appendTo(node,data)">
                      <i class="el-icon-plus"></i>
                  </el-button>
                  <el-button type="text" size="mini" @click="() => remove(node, data)">
                      <i class="el-icon-minus"></i>
                  </el-button>
                  </span>
              </span>
            </el-tree>
            <el-dialog
              title="Function Create"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <el-form :model="newNode" label-width="80px">
                <el-form-item label="Name">
                  <el-input v-model="newNode.functionName"></el-input>
                </el-form-item>
                <el-form-item label="Module">
                  <el-input v-model="newNode.moduleName"></el-input>
                </el-form-item>
                <el-form-item label="Component">
                  <el-input v-model="newNode.component"></el-input>
                </el-form-item>
                <el-form-item label="Url">
                  <el-input v-model="newNode.url"></el-input>
                </el-form-item>
                <el-form-item label="Validity">
                    <el-switch v-model="newNode.isValid"></el-switch>
                </el-form-item>
                <el-form-item label="isLeaf">
                    <el-switch v-model="newNode.isLeaf"></el-switch>
                  </el-form-item>
                <el-form-item label="Desc">
                  <el-input type="textarea" v-model="newNode.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="append()">Yes</el-button>
              </span>
            </el-dialog>
        </el-aside>

        <el-container>
            <el-main class="nodeMain">
                <el-form :model="editNode" label-width="80px" v-if="editNode.functionName">
                  <el-form-item label="Name">
                    <el-input v-model="editNode.functionName"></el-input>
                  </el-form-item>
                  <el-form-item label="Module">
                    <el-input v-model="editNode.moduleName"></el-input>
                  </el-form-item>
                  <el-form-item label="Component">
                    <el-input v-model="editNode.component"></el-input>
                  </el-form-item>
                  <el-form-item label="Url">
                  <el-input v-model="editNode.url"></el-input>
                </el-form-item>
                  <el-form-item label="Validity">
                    <el-switch v-model="editNode.isValid"></el-switch>
                  </el-form-item>
                  <el-form-item label="isLeaf">
                    <el-switch v-model="editNode.isLeaf"></el-switch>
                  </el-form-item>
                  <el-form-item label="Desc">
                    <el-input type="textarea" v-model="editNode.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">Save</el-button>
                  </el-form-item>
                </el-form>
            </el-main>
        </el-container> 

    </el-container>
</template>

<script>
let id = 1000;
import store from "@/store";
export default {
  data() {
    return {
      filterText: "",
      appendNode: {},
      appendParentNode: "",
      appendParentNodeId: "",
      newNode: {
        isValid: true,
        isLeaf: false,
      },
      editNode: {
      },
      dialogVisible: false
    };
  },

  created: function() {
    store
      .dispatch("getFunctionTree", {
        subscriberId: "1"
      })
      .then(res => {
        // console.log(res);
      })
      .catch(res => {
        // console.log(res);
      });
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  computed: {
    funcTree: {
      get() {
        return store.state.functionTree;
      },
      set(value) {
        store.commit("addFuncTreeNode", value);
      }
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.appendParentNodeId = data.id;
      store
        .dispatch("viewFunc", {
          fucId: data.id
        })
        .then(res => {
          const stateCode = res.stateCode;
          if (stateCode == 0) {
            this.editNode = res.object;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(res => {

        });
    },
    appendTo(node, data) {
      this.dialogVisible = true;
      this.appendNode = data;
      this.appendParentNode = node.parent;
      this.newNode = {
        // functionName: "",
        // component: "",
        isValid: true,
        isLeaf: false
        // desc: ""
      };
    },
    append() {
      this.dialogVisible = false;
      store
        .dispatch("appendFuncTree", {
          appendNode: this.appendNode,
          newNode: this.newNode,
          appendParentNodeId: this.appendParentNodeId
        })
        .then(res => {})
        .catch(res => {
          console.log(res);
        });
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    onSubmit() {
      console.log("submit!");
    },

    handleClose(done) {
      this.$confirm("Confirm close?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.nodeMain {
  padding: 0 10px;
}
</style>