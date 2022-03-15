<template>
  <el-header style="display: flex;justify-content: center;align-items: center">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 20px">医院首页</el-menu-item>
      <el-menu-item index="2" style="font-size: 20px">科室导航</el-menu-item>
      <el-menu-item index="3" style="font-size: 20px">预约挂号</el-menu-item>
      <el-menu-item index="4" style="font-size: 20px">医技预约</el-menu-item>
      <el-menu-item index="5" style="font-size: 20px">报告查询</el-menu-item>
      <el-menu-item index="6" style="font-size: 20px">挂号查询</el-menu-item>
      <el-menu-item index="7" style="font-size: 20px">病历查询</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "NavMenu",
  data(){
    return{
      activeIndex: '1'
    }
  },
  methods:{
    handleSelect(){

    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #FFFFFF;
  color: #333;
  line-height: 100px;
  height: 100px !important;
  display: flex;
  align-items: center
}
</style>