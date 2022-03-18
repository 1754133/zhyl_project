<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse" isActive="1-2"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">医生帐号管理</a></el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="margin: 10px 0">
            <el-input style="width: 200px" suffix-icon="el-icon-search" v-model="phoneNum"></el-input>
            <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
          </div>
          <div style="margin: 10px 0">
            <el-button type="primary" @click="formVisible1=true">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button>
            <el-button type="primary">导出<i class="el-icon-top"></i></el-button>
          </div>
          <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column prop="userId" label="编号">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="danger" @click="deleteAccount(scope.row.userId)">删除<i class="el-icon-remove-outline"></i></el-button>
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
      <el-dialog title="新增医生帐号" :visible.sync="formVisible1" width="35%">
        <el-form :model="form" :rules="rules" ref="accountForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="form.username" autocomplete="off" style="width: 300px"
                      prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off" style="width: 300px" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="formVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import AdminAside from "@/components/AdminAside";
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "DoctorAccountManage",
  components: {AdminHeader, AdminAside},
  data(){
    return{
      sideWidth: 200,
      logoTextShow: true,
      isCollapse: false,
      tableData: [],
      phoneNum: '',
      total: 0,
      pageNum: 1,
      pageSize: 3,
      formLabelWidth: '120px',
      form:{
        username: '',
        phone: '',
        password: ''
      },
      formVisible1: false
    }
  },
  created() {
    this.searchPage()
  },
  methods:{
    changeAside(sideWidth, logoTextShow, isCollapse){
      this.sideWidth = sideWidth
      this.logoTextShow = logoTextShow
      this.isCollapse = isCollapse
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.searchPage()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.searchPage()
    },
    searchPage() {
      this.request.get('/user/doc/' + this.pageNum + '/' + this.pageSize).then(res => {
        if (res.code === '200'){
          this.tableData = res.data.tableList
          this.total = res.data.total
        }
      })
    },
    submitAdd(){
      this.request.post('/user/doc', {
        username: this.form.username,
        password: this.form.password,
        phone: this.form.phone,
        permission: 2
      }).then(res => {
        if (res.code === '200'){
          this.formVisible1 = false
          this.$message({
            message: '新增帐号成功',
            type: 'success'
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    deleteAccount(docId){
      this.$confirm('此操作将删除一个医生帐号及其对应的医生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete('/user/doc/' + docId).then(res => {
          if (res.code === '200'){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.searchPage()
          }else{
            this.$message.error(res.code)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
