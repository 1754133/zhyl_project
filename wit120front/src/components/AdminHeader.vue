<template>
  <el-header style="font-size: 12px; display: flex">
    <div style="flex: 1; font-size: 22px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
    </div>
    <el-dropdown style="width: 70px; cursor: pointer">
      <span>{{username}}</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="quit">退出登录</el-dropdown-item>
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
      sideWidth: 200,
      username: ''
    }
  },
  created(){
    this.setUsername()
  },
  methods:{
    quit(){
      localStorage.removeItem("user")
      this.$router.push('/')
    },
    setUsername(){
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user){
        this.username = user.username
      }else{
        this.$message('请先登录')
        this.$router.push('/')
      }
    },
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