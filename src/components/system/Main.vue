<template>
  <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="always">
        
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="never">
        
      </el-card>
    </el-col>
  </el-row>

</template>

<script>


export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created: function() {
    
  },
  computed: {
    
  },
  methods: {
    

  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>