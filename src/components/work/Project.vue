<template>
  <el-row :gutter="12" class="project-list">
    <el-dialog title="Project Create" :visible.sync="dialogVisible" width="30%">
      <el-form :model="newProject" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="newProject.projectName"></el-input>
        </el-form-item>
        <el-form-item label="Desc">
          <el-input type="textarea" v-model="newProject.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createProject()">Yes</el-button>
      </span>
    </el-dialog>
    <el-col :span="20">
      <el-col :span="24">
        <label class="header-label">My Task</label>
        <ul class="t-ul">
          <li>T</li>
          <li>T</li>
          <li>T</li>
        </ul>
        <label class="header-label">Recent Task</label>
        <el-table class="data-table" :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="180">
          </el-table-column>
          <el-table-column prop="address" label="Address">
          </el-table-column>
        </el-table>
      </el-col>
    </el-col>
    <el-col :span="4">
      <el-select v-model="selectedProjectId" @change="changeProject" filterable placeholder="Project">
        <el-option v-for="item in options" :key="item.id" :label="item.projectName" :value="item.id">
        </el-option>
      </el-select>
      <i class="el-icon-plus create-porject-icon" @click="dialogVisible = true"></i>
    </el-col>
  </el-row>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      tabPosition: "left",
      dialogVisible: false,
      options: [],
      selectedProjectId: "",
      newProject: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "Reon",
          address: "Reon Address"
        },
        {
          date: "2016-05-04",
          name: "Reon",
          address: "Reon Address"
        },
        {
          date: "2016-05-01",
          name: "Reon",
          address: "Reon Address"
        },
        {
          date: "2016-05-03",
          name: "Reon",
          address: "Reon Address"
        }
      ]
    };
  },

  created: function() {
    store
      .dispatch("work/getSubProject", {})
      .then(res => {
        this.options = res.data;
        // console.log(res);
      })
      .catch(res => {
        // console.log(res);
      });
  },

  methods: {
    createProject() {
      this.dialogVisible = false;
      store
        .dispatch("work/addProject", {
          project: this.newProject
        })
        .then(res => {
          var type = res.stateCode == "0" ? "success" : "error";
          this.$message({
            message: res.message,
            type: type
          });
        })
        .catch(res => {
          // console.log(res);
        });
    },
    changeProject(selectedProjectId) {
      console.log(selectedProjectId);
    }
  }
};
</script>
<style lang="scss">
.header-label {
  color: #575151;
  margin-top: 50px;
  // padding:30 1px;
  font-weight: bold;
  font-size: 20px;
  // border-bottom: solid 3px #8a9ddb;
}

.create-porject-icon {
  cursor: pointer;
  margin-left: 5px;
  padding: 10px;
  border-radius: 25%;
  // border: solid #8a9ddb 1px;
}

.t-ul li {
  list-style: none;
  margin-left: -40px;
  // border: solid #cdcfd8 1px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f0f0f0;
}

.clearfix:before,
.clearfix:after {
  display: table;
}

.clearfix:after {
  clear: both;
}
</style>
