<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">药品信息管理</a></el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column prop="department" label="科室">
            </el-table-column>
            <el-table-column prop="docInfoId" label="编号">
            </el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <div v-html="scope.row.docName"></div>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminAside from "@/components/AdminAside";
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "DrugManage",
  components: {AdminHeader, AdminAside},
  data(){
    return{
      sideWidth: 200,
      logoTextShow: true,
      isCollapse: false,
      tableData: [
        {
          department: '消化内科',
          docInfoId: '1',
          docName: '<el-button type="text">黄金鑫</el-button><br/><el-button type="text">甘舒</el-button>'
        },
        {
          department: '消化内科',
          docInfoId: '1',
          docName: '<el-link type="primary">黄金鑫</el-link><br/><el-button type="text">甘舒</el-button></br>' +
              '<el-button type="text">黄金鑫</el-button><br/><el-button type="text">甘舒</el-button>'
        }
      ]
    }
  },
  methods:{
    changeAside(sideWidth, logoTextShow, isCollapse){
      this.sideWidth = sideWidth
      this.logoTextShow = logoTextShow
      this.isCollapse = isCollapse
    }
  }
}
</script>

<style scoped>

</style>