<template>
  <el-header style="font-size: 12px; display: flex">
    <div style="flex: 1; font-size: 22px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
    </div>
    <el-dropdown style="width: 70px; cursor: pointer">
      <span>王小虎</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </el-header>
</template>

<script>
export default {
  name: "AdminHeader",
  data(){
    return{
      isCollapse: false,
      logoTextShow: true,
      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200
    }
  },
  methods:{
    collapse(){//点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      this.logoTextShow = !this.logoTextShow
      if (this.isCollapse){
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
      }else{
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
      }
      this.$emit("changeAside", this.sideWidth, this.logoTextShow, this.isCollapse)
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>