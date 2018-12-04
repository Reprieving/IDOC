<template>
  <el-container>
    <el-header class="form-header" style="">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-col>
        <el-col :span="4">
          <i class="el-icon-search create-porject-icon"></i>
          <i class="el-icon-plus create-porject-icon" @click="dialogVisible = true"></i>
        </el-col>
      </el-row>
      <el-dialog title="Role Create" :visible.sync="dialogVisible" width="50%">
        <el-form :model="newNode" label-width="100px">
          <el-form-item label="Role Name">
            <el-input v-model="newNode.roleName"></el-input>
          </el-form-item>
          <el-form-item label="Function">
            <el-input
                placeholder="Function Name"
                v-model="filterText">
            </el-input>
            <el-tree :data="funcTree" show-checkbox node-key="id" default-expand-all 
            :expand-on-click-node="false" :filter-node-method="filterNode" @check-change="handleCheckChange"
            ref="tree">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </el-form-item>
          <el-form-item label="Validity">
            <el-switch v-model="newNode.isValid"></el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addSubscriber()">Yes</el-button>
        </span>
      </el-dialog>

    </el-header>
    <el-main class="talbeMain">
      <el-table ref="multipleTable" :data="tableData" border style="width: 700px" @selection-change="handleSelectionChange">
        <el-table-column fixed type="selection" width="40">
        </el-table-column>
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="roleName" label="Role Name" width="150">
        </el-table-column>
        <el-table-column prop="createBy" label="Creator" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="Create Time" width="120">
        </el-table-column>
        <el-table-column prop="isValid" label="Validity" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="Operator" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">Detail</el-button>
            <el-button type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, sizes, prev, pager, next" :total="1000">
      </el-pagination>
    </el-main>
  </el-container>
</template>


<script>
import store from "@/store";
export default {
  data() {
    return {
      filterText: "",
      formInline: {
        user: "",
        region: ""
      },
      newNode: {
        isValid: true
      },
      tableData: [],
      currentPage1: 5,
      multipleSelection: [],
      dialogVisible: false
    };
  },

  computed: {
    funcTree: {
      get() {
        return store.state.functionTree[0].children;
      },
      set(value) {
        store.commit("addFuncTreeNode", value);
      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    onSubmit() {
      console.log("submit!");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose() {}
  }
};
</script>

<style lang="scss" scoped>
el-header {
  height: 100px;
  // overflow: scroll;
}
.talbeMain {
  padding: 0px;
}

.create-porject-icon {
  font-size: 20px;
  cursor: pointer;
  margin-left: 5px;
  padding: 10px;
  border-radius: 25%;
  // border: solid #8a9ddb 1px;
}

.pagination {
  width: 293px;
  margin-top: 10px;
  right: 50px;
}
</style>