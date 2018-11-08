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
      <el-dialog title="Subscriber Create" :visible.sync="dialogVisible" width="30%">
        <el-form :model="newNode" label-width="100px">
          <el-form-item label="User Name">
            <el-input v-model="newNode.userName"></el-input>
          </el-form-item>
          <el-form-item label="Real Name">
            <el-input v-model="newNode.realName"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="newNode.password"></el-input>
          </el-form-item>
          <el-form-item label="Work Num">
            <el-input v-model="newNode.workNumber"></el-input>
          </el-form-item>
          <el-form-item label="Role">
            <el-checkbox-group v-model="checkedRoles">
              <el-checkbox v-for="role in roles" :label="role" :key="role.id" value="role.id">{{role.name}}</el-checkbox>
            </el-checkbox-group>
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
      <el-table ref="multipleTable" :data="tableData" border style="width: 1050px" @selection-change="handleSelectionChange">
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="userName" label="User Name" width="120">
        </el-table-column>
        <el-table-column prop="roleName" label="Real Name" width="120">
        </el-table-column>
        <el-table-column prop="departmentName" label="Department" width="120">
        </el-table-column>
        <el-table-column prop="workNumber" label="Work Num" width="120">
        </el-table-column>
        <el-table-column prop="createBy" label="Creater" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="Create Time" width="120">
        </el-table-column>
        <el-table-column prop="isValid" label="Validity" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="Operate" width="100">
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
const roleOptions = [{id:1,name:'role1'},{id:2,name:'role2'},{id:3,name:'role3'}];
export default {
  data() {
    return {
      newNode: {
        isValid:true
      },
      checkAll: false,
      checkedRoles: [{id:1,name:'role1'},{id:2,name:'role2'}],
      roles: roleOptions,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        
      ],
      currentPage1: 5,
      multipleSelection: [],
      dialogVisible: false
    };
  },
  methods: {
    addSubscriber(){
      
    },

    onSubmit() {
      
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose(done){
      done();
    }
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