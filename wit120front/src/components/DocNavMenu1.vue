<template>
  <el-header style="display: flex;justify-content: center;align-items: center">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 20px">医院首页</el-menu-item>
      <el-menu-item index="2" style="font-size: 20px">预约处理</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "DocNavMenu1",
  props: ['isActive'],
  data(){
    return{
      activeIndex: this.isActive
    }
  },
  methods:{
    handleSelect(key, keyPath){
      switch (key){
        case "1":
          this.$router.push('/')
          break
        case "2":
          this.$router.push('/DocTechQuery')
          break
      }
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