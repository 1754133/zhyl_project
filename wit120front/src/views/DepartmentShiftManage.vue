<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse" isActive="2"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>科室排班管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="margin: 10px 0">
            <el-input style="width: 200px" suffix-icon="el-icon-search" v-model="departmentName"></el-input>
            <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
          </div>
          <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column prop="departmentId" label="科室编号">
            </el-table-column>
            <el-table-column prop="departmentName" label="科室名">
            </el-table-column>

            <el-table-column prop="doctorNum" label="医生总人数">
            </el-table-column>
            <el-table-column prop="noShiftNum" label="未排班人数">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="goNext(scope.row.departmentId)">查看排班<i class="el-icon-date"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding: 10px 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[3, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
import AdminAside from "@/components/AdminAside";

export default {
  name: "DepartmentShiftManage",
  components: {AdminHeader, AdminAside},
  data(){
    return{
      isAll: true,   //当前表格数据是否是全部数据，也就是未经搜索的数据，如果是就为true
      departmentName: '',
      sideWidth: 200,
      logoTextShow: true,
      isCollapse: false,
      tableData: [],
      pageNum: 1,
      pageSize: 3,
      total: 0
    }
  },
  created() {
    this.search()
  },
  methods: {
    changeAside(sideWidth, logoTextShow, isCollapse){
      this.sideWidth = sideWidth
      this.logoTextShow = logoTextShow
      this.isCollapse = isCollapse
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.search()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.search()
    },
    searchPage(){
      this.isAll = true
      this.request.get('/department/shift/' + this.pageNum + '/' + this.pageSize).then(res => {
        if (res.code === '200'){
          this.tableData = res.data.tableList
          this.total = res.data.total
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    search(){
      if (this.departmentName === ''){
        this.searchPage()
      }else{
        if (this.isAll){
          this.pageNum = 1
          this.isAll = false
        }
        this.request.get('/department/page/' + this.departmentName + '/' + this.pageNum + '/' + this.pageSize).then(res => {
          if (res.code === '200'){
            this.tableData = res.data.tableList
            this.total = res.data.total
          }else {
            this.$message.error(res.msg);
          }
        })
      }
    },
    goNext(departmentId){
      this.$router.push({path: '/DepartmentShiftDetail', query: {departmentId: departmentId}})
    }
  }
}
</script>

<style scoped>

</style>