<template>
  <el-container>
    <el-header class="">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="Project">
                <el-select v-model="projectSelectId" filterable placeholder="select" @change="projectSelect">
                  <el-option v-for="item in projectOptions" :key="item.id" :label="item.projectName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-header>
    <el-container>
      <el-aside width="400px">
        <el-input placeholder="Interface Name" v-model="filterText">
        </el-input>
        <el-tree :data="docTree" node-key="id" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" @node-click="apiTreeNodeClick">
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
        <el-dialog title="Create Interface" :visible.sync="ITFVisible" width="40%">
          <el-form :label-position="labelPosition" :model="newNode" label-width="150px">
            <el-input placeholder="Url" v-model="newNode.url" class="url-input">
              <el-select v-model="newNode.httpType" slot="prepend" placeholder="Http Type" class="httpSelect" style="width:120px">
                <el-option label="GET" value="GET"></el-option>
                <el-option label="POST" value="POST"></el-option>
              </el-select>
            </el-input>
            <el-form-item label="Interface Name">
              <el-input v-model="newNode.interfaceName"></el-input>
            </el-form-item>
            <el-form-item label="Request Param Statement">
              <el-input :rows="10" type="textarea" v-model="newNode.reqParamStatement"></el-input>
            </el-form-item>
            <el-form-item label="Request Param Content">
              <el-input :rows="10" type="textarea" v-model="newNode.reqParamContent"></el-input>
            </el-form-item>
            <el-form-item label="Response Param Statement">
              <el-input :rows="10" type="textarea" v-model="newNode.rspParamStatement"></el-input>
            </el-form-item>
            <el-form-item label="Response Param Content">
              <el-input :rows="10" type="textarea" v-model="newNode.rspParamContent"></el-input>
            </el-form-item>
            <el-form-item label="Remark">
              <el-input type="textarea" v-model="newNode.remark"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ITFVisible = false">Cancel</el-button>
            <el-button type="primary" @click="append()">Yes</el-button>
          </span>
        </el-dialog>
      </el-aside>
      <el-main class="nodeMain">
        <el-dialog title="Requset Param Statement" :visible.sync="ITFVReqStateVisible" width="80%">
          <el-input type="textarea" v-model="reqParamStatementStr" :rows="20"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ITFVReqStateVisible = false">Cancel</el-button>
            <el-button type="primary" @click="ITFVReqStateVisible = false">Yes</el-button>
          </span>
        </el-dialog>

        <el-dialog title="Requset Param Content" :visible.sync="ITFVReqContentVisible" width="80%">
          <el-input type="textarea" v-model="reqParamContentStr" :rows="20"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ITFVReqContentVisible = false">Cancel</el-button>
            <el-button type="primary" @click="ITFVReqContentVisible = false">Yes</el-button>
          </span>
        </el-dialog>

        <el-dialog title="Response Param Statement" :visible.sync="ITFVRspStateVisible" width="80%">
          <el-input type="textarea" v-model="rspParamStatementStr" :rows="20"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ITFVRspStateVisible = false">Cancel</el-button>
            <el-button type="primary" @click="ITFVRspStateVisible = false">Yes</el-button>
          </span>
        </el-dialog>

        <el-dialog title="Response Param Content" :visible.sync="ITFVRspContentVisible" width="80%">
          <el-input type="textarea" v-model="rspParamContentStr" :rows="20"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ITFVRspContentVisible = false">Cancel</el-button>
            <el-button type="primary" @click="ITFVRspContentVisible = false">Yes</el-button>
          </span>
        </el-dialog>

        <el-card class="box-card">
          <el-input placeholder="Url" v-model="editNode.url" class="url-input">
            <el-select v-model="editNode.httpType" slot="prepend" placeholder="Http" class="httpSelect">
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
            </el-select>
          </el-input>
          <el-tabs v-model="activeName" type="border-card" class="param-tab">
            <el-tab-pane label="Req" name="first">
              <el-row :gutter="12">
                <el-col :span="16" class="sroller-y">
                  <i class="fa fa-pencil-square-o fa-lg request-data-edit" @click="ITFVReqStateVisible = true"></i>
                  <el-table :data="editNode.reqParamStatement" style="width: 100%">
                    <el-table-column prop="dataKey" label="Key" width="330">
                    </el-table-column>
                    <el-table-column prop="dataType" label="Type" width="120">
                    </el-table-column>
                    <el-table-column prop="remark" label="Desc">
                    </el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="8" class="sroller-y">
                  <div class="well">
                    <i class="fa fa-pencil-square-o fa-lg request-data-edit" @click="ITFVReqContentVisible = true"></i>
                    <tree-view :data="editNode.reqParamContent" :options="{rootObjectKey: ''}"></tree-view>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Rsp" name="second">
              <el-row :gutter="12">
                <el-col :span="16" class="sroller-y">
                  <i class="fa fa-pencil-square-o fa-lg request-data-edit" @click="ITFVRspStateVisible = true"></i>
                  <el-table :data="editNode.rspParamStatement" style="width: 100%">
                    <el-table-column prop="dataKey" label="Key" width="130">
                    </el-table-column>
                    <el-table-column prop="dataType" label="Type" width="120">
                    </el-table-column>
                    <el-table-column prop="remark" label="Desc">
                    </el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="8" class="sroller-y">
                  <div class="well">
                    <i class="fa fa-pencil-square-o fa-lg request-data-edit" @click="ITFVRspContentVisible = true"></i>
                    <tree-view :data="editNode.rspParamContent" :options="{rootObjectKey: ''}"></tree-view>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          <el-button @click="update" type="primary">Save</el-button>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from "@/store";
import rspStateCode from "@/utils/responseStateCode.js";

export default {
  data() {
    return {
      activeName: "first",
      labelPosition: "top",
      filterText: "",
      appendNode: {},
      appendParentNodeId: "",
      newNode: {},
      editNode: {},
      ITFVisible: false,
      ITFVReqStateVisible: false,
      ITFVReqContentVisible: false,
      ITFVRspStateVisible: false,
      ITFVRspContentVisible: false,
      projectOptions: [],
      projectSelectId: ""
    };
  },

  created: function() {
    this.projectSelectId = "";
    store.commit("work/setDocTree", []);
    store
      .dispatch("work/getSubProject", {})
      .then(res => {
        this.projectOptions = res.object;
      })
      .catch(res => {});
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  computed: {
    docTree: {
      get() {
        return store.state.work.docTree;
      },
      set(value) {}
    },
    reqParamStatementStr: {
      get() {
        return JSON.stringify(this.editNode.reqParamStatement, null, 2);
      },
      set(value) {
        try {
          this.editNode.reqParamStatement = JSON.parse(value);
        } catch (e) {
          this.$notify.error({
            title: "error",
            message: "Wrong String Format "
          });
        }
      }
    },

    reqParamContentStr: {
      get() {
        return JSON.stringify(this.editNode.reqParamContent, null, 2);
      },
      set(value) {
        try {
          this.editNode.reqParamContent = JSON.parse(value);
        } catch (e) {
          this.$notify.error({
            title: "error",
            message: "Wrong String Format "
          });
        }
      }
    },

    rspParamStatementStr: {
      get() {
        return JSON.stringify(this.editNode.rspParamStatement, null, 2);
      },
      set(value) {
        try {
          this.editNode.rspParamStatement = JSON.parse(value);
        } catch (e) {
          this.$notify.error({
            title: "error",
            message: "Wrong String Format "
          });
        }
      }
    },

    rspParamContentStr: {
      get() {
        return JSON.stringify(this.editNode.rspParamContent, null, 2);
      },
      set(value) {
        try {
          this.editNode.rspParamContent = JSON.parse(value);
        } catch (e) {
          this.$notify.error({
            title: "error",
            message: "Wrong String Format "
          });
        }
      }
    }
  },

  methods: {
    projectSelect(projectId) {
      if (projectId != "" && projectId != undefined) {
        store
          .dispatch("work/getAppInterfaces", {
            project: {
              id: projectId
            }
          })
          .then(res => {})
          .catch(res => {
            // console.log(res);
          });
      }
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    appendTo(node, data) {
      this.newNode = {};
      this.ITFVisible = true;
      this.appendNode = data;
    },

    append() {
      this.ITFVisible = false;
      this.newNode.parentId = this.appendParentNodeId;
      this.newNode.projectId = this.projectSelectId;

      store
        .dispatch("work/appendApiTree", {
          apiTreeNode: this.newNode
        })
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },

    apiTreeNodeClick(data) {
      this.appendParentNodeId = data.id;
      store
        .dispatch("work/getAppInterfaceInfo", {
          project: {
            id: data.id
          }
        })
        .then(res => {
          var msgType = [];
          rspStateCode(res, msgType);
          if ("success" == msgType) {
            this.editNode = res.object;
            this.editNode.reqParamContent = JSON.parse(res.object.reqParamContent);
            this.editNode.rspParamContent = JSON.parse(res.object.rspParamContent);
          } else {
            this.$message({
              message: res.message,
              type: msgType
            });
          }
        })
        .catch(res => {
          // console.log(res);
        });
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    update() {
      store
        .dispatch("work/updateAppInterface",
          this.editNode
        )
        .then(res => {
          var msgType = [];
          rspStateCode(res, msgType);
          this.$message({
            message: res.message,
            type: msgType
          });
        })
        .catch(res => {
          
        });
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

<style lang="scss">
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
  .box-card {
    .httpSelect {
      width: 100px;
    }

    .el-card__body {
      padding: 0px;
      .param-tab {
        .sroller-y {
          height: 600px;
          overflow-y: scroll;
        }
      }

      .el-tabs--border-card > .el-tabs__content {
        padding: 0px;
      }

      .el-tabs__item {
        width: 102px;
      }

      .request-data-edit {
        margin: 5px;
        cursor: pointer;
      }

      .tree-view-item {
        font-family: monospace;
        font-size: 14px;
        margin-left: 18px;
      }

      /* Find the first nested node and override the indentation */
      .tree-view-item-root > .tree-view-item-leaf > .tree-view-item {
        margin-left: 14px;
      }
      /* Root node should not be indented */
      .tree-view-item-root {
        margin-left: 0;
      }

      .tree-view-wrapper {
        overflow: auto;
      }

      .tree-view-item-node {
        cursor: pointer;
        position: relative;
        white-space: nowrap;
      }

      .tree-view-item-leaf {
        white-space: nowrap;
      }

      .tree-view-item-key {
        font-weight: bold;
      }

      .tree-view-item-value {
        font-weight: bold;
      }

      .tree-view-item-value-string {
        color: #002bdc;
      }

      .tree-view-item-value-boolean {
        color: #e41f7b;
      }

      .tree-view-item-value-number {
        color: #0e9577;
      }

      .tree-view-item-key-with-chevron {
        padding-left: 14px;
      }

      .tree-view-item-key-with-chevron.opened::before {
        position: absolute;
        top: 4px;
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
      }

      .tree-view-item-key-with-chevron::before {
        color: #444;
        content: "\25b6";
        font-size: 10px;
        left: 1px;
        position: absolute;
        top: 3px;
        transition: -webkit-transform 0.1s ease;
        transition: transform 0.1s ease;
        transition: transform 0.1s ease, -webkit-transform 0.1s ease;
        -webkit-transition: -webkit-transform 0.1s ease;
      }

      .tree-view-item-hint {
        color: #ccc;
      }
    }
  }
}
</style>