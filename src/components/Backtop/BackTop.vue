<template>
  <el-backtop :bottom="9" :right="40">
    <div title="回到顶部"
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 1px 0 0;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        color: #167df0;
      }"
    >
      <i class="el-icon-caret-top"></i>
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
    .el-backtop {
        width: 30px;
        height: 30px;
    }
</style>