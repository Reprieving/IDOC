<template>
  <div>
    <template v-for="(node,index) in nodes">
      <el-submenu :index="node.name+''" v-if="node.isLeaf==false" :key="index+'-'">
        <template slot="title">
          <span><i :class="node.iconCode" aria-hidden="true"></i> {{node.name}}</span>
        </template>
        <menu-tree :nodes="node.children"></menu-tree>
      </el-submenu>
      <el-menu-item v-if="node.isLeaf==true" :index="node.name+''" :route="{name:node.path}" :key="index+'-'">
        <span><i :class="node.iconCode" aria-hidden="true"></i> {{node.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MenuTree",
  data() {
    return {};
  },
  props: {
    nodes: {
      // required: true
    }
  }
};
</script>

<style lang="scss" scoped>
  i{
    margin-right: 5px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

</style>