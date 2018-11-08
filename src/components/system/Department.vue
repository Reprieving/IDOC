<template>
    <el-container style="">
        <el-aside width="400px">
            <el-input
                placeholder="Name filter"
                v-model="filterText">
            </el-input>
            <el-tree
              :data="funcTree"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="tree">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                  <el-button type="text" size="mini" @click="() => appendTo(data)">
                      <i class="el-icon-plus"></i>
                  </el-button>
                  <el-button type="text" size="mini" @click="() => remove(node, data)">
                      <i class="el-icon-minus"></i>
                  </el-button>
                  </span>
              </span>
            </el-tree>
            <el-dialog
              title="新增部门"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <el-form :model="newNode" label-width="80px">
                <el-form-item label="部门名称">
                  <el-input v-model="newNode.name"></el-input>
                </el-form-item>
                <el-form-item label="组件名称">
                  <el-input v-model="newNode.componentName"></el-input>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-switch v-model="newNode.isValid"></el-switch>
                </el-form-item>
                <el-form-item label="是否目录">
                    <el-switch v-model="newNode.isLeaf"></el-switch>
                  </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="newNode.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="append()">确 定</el-button>
              </span>
            </el-dialog>
        </el-aside>

        <el-container>
            <el-main class="nodeMain">
                <el-form :model="editNode" label-width="80px">
                  <el-form-item label="部门名称">
                    <el-input v-model="editNode.name"></el-input>
                  </el-form-item>
                  <el-form-item label="组件名称">
                    <el-input v-model="editNode.componentName"></el-input>
                  </el-form-item>
                  <el-form-item label="是否有效">
                    <el-switch v-model="editNode.isValid"></el-switch>
                  </el-form-item>
                  <el-form-item label="是否目录">
                    <el-switch v-model="editNode.isLeaf"></el-switch>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="editNode.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
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
      newNode: {
        name: "",
        componentName: "",
        isValid: true,
        isLeaf: false,
        desc: ""
      },
      editNode: {
        name: "",
        componentName: "",
        isValid: true,
        isLeaf: true,
        desc: ""
      },
      dialogVisible: false
    };
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  computed: {
    funcTree: {
      get() {
        return JSON.parse(JSON.stringify(store.state.departmentTree));
      },
      set(value) {
        store.commit("addDptTreeNode", value);
      }
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    appendTo(data) {
      this.dialogVisible = true;
      this.appendNode = data;
      this.newNode = {
        name: "",
        componentName: "",
        isValid: true,
        isLeaf: false,
        desc: ""
      };
    },
    append() {
      this.dialogVisible = false;
      store
        .dispatch("appendFuncTree", {
          appendNode: this.appendNode,
          newNode: this.newNode
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
      this.$confirm("确认关闭？")
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
.nodeMain{
  padding: 0 10px;
}
</style>