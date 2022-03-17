<template>
  <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
             background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="#ffd04b"
             :collapse-transition="false" :collapse="isCollapse">
      <div style="height: 60px; line-height: 60px; text-align: center">
        <img src="../assets/img/headerIcon.png" style="width: 40px;position: relative;top: 10px">
        <b style="color: aliceblue;font-size: 19px" v-show="logoTextShow">智慧医疗管理系统</b>
      </div>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">医生管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">排班管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">医技资源管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">科室管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">药品管理</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "AdminAside",
  props:['asideWidth','logoText','ifCollapse'],
  data(){
    return{
      sideWidth: this.asideWidth,
      isCollapse: this.ifCollapse,
      logoTextShow: this.logoText,
    }
  },
  watch:{
    asideWidth(newV, oldV){
      this.sideWidth = newV
    },
    logoText(newV, oldV){
      this.logoTextShow = newV
    },
    ifCollapse(newV, oldV){
      this.isCollapse = newV
    }
  }
}
</script>

<style scoped>
.el-aside {
  color: #333;
}
</style>