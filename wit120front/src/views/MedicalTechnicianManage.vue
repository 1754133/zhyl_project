<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse" isActive="5"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">医技管理</a></el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="margin: 10px 0">
            <el-input style="width: 200px" suffix-icon="el-icon-search" v-model="phoneNum"></el-input>
            <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
          </div>
          <div style="margin: 10px 0">
            <el-button type="primary" @click="dialogFormVisible1=true">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button>
            <el-button type="primary">导出<i class="el-icon-top"></i></el-button>
          </div>
          <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column prop="technicianId" label="医技编号">
            </el-table-column>
            <el-table-column prop="technicianName" label="医技名称">
            </el-table-column>
            <el-table-column prop="username" label="负责帐号">
            </el-table-column>
            <el-table-column prop="cost" label="医技价格">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" @click="edit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                <el-button type="danger" @click="deleteMedicalTechnician(scope.row.technicianId)">删除<i class="el-icon-remove-outline"></i></el-button>
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
      <el-dialog title="新增医技" :visible.sync="dialogFormVisible1" width="35%">
        <el-form :model="form1" :rules="rules" ref="newTechnicianForm">
          <el-form-item label="医技名称" :label-width="formLabelWidth" prop="technicianName">
            <el-input v-model="form1.technicianName" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="负责帐号" :label-width="formLabelWidth" prop="username">
            <el-select v-model="form1.username" placeholder="请选择可用的负责帐号" style="width: 300px" @click.native="showUsername">
              <el-option v-for="(name, index) in usernameList" :label="name" :value="name" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医技价格" :label-width="formLabelWidth" prop="cost">
            <el-input v-model="form1.cost" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible1=false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑医技信息" :visible.sync="dialogFormVisible2" width="35%">
        <el-form :model="form2" :rules="rules" ref="editTechnicianForm">
          <el-form-item label="医技名称" :label-width="formLabelWidth" prop="technicianName">
            <el-input v-model="form2.technicianName" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="负责帐号" :label-width="formLabelWidth" prop="username">
            <el-select v-model="form2.username" placeholder="请选择可用的负责帐号" style="width: 300px" @click.native="showUsername">
              <el-option v-for="(name, index) in usernameList" :label="name" :value="name" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医技价格" :label-width="formLabelWidth" prop="cost">
            <el-input v-model="form2.cost" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible2=false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import AdminAside from "@/components/AdminAside";
import AdminHeader from "@/components/AdminHeader";

export default {
  name: "MedicalTechnicianManage",
  components: {AdminAside, AdminHeader},
  data(){
    return{
      sideWidth: 200,
      logoTextShow: true,
      isCollapse: false,
      tableData: [],
      pageNum: 1,
      pageSize: 3,
      total: 0,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      form1: {
        technicianName: '',
        username: '',
        cost: 0
      },
      usernameList: [],
      form2: {
        technicianId: 0,
        technicianName: '',
        username: '',
        cost: 0
      },
      rules: {
        technicianName: [
          {required: true, message: '请输入医技名称', trigger: 'blur'},
          {max: 20, message: '长度不超过20个字符', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请选择可用的负责帐号', trigger: 'blur'}
        ],
        cost: [
          {required: true, message: '请输入医技价格', trigger: 'blur'},
        ]
      }
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
    searchPage(){
      this.request.get('/medicalTechnician/page/' + this.pageNum + '/' + this.pageSize).then(res => {
        if (res.code === '200'){
          this.tableData = res.data.tableList
          this.total = res.data.total
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    showUsername(){
      this.request.get('/user/username').then(res => {
        if (res.code === '200'){
          this.usernameList = res.data
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    submitAdd() {
      this.$refs['newTechnicianForm'].validate((valid) => {
        if (valid) {
          this.request.post('/medicalTechnician', {
            technicianName: this.form1.technicianName,
            username: this.form1.username,
            cost: this.form1.cost
          }).then(res => {
            if (res.code === '200'){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.resetForm('newTechnicianForm')
              this.dialogFormVisible1 = false
              this.searchPage()
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
          return false
        }
      })
    },
    edit(row){
      this.dialogFormVisible2 = true
      this.form2.technicianId = row.technicianId
      this.form2.technicianName = row.technicianName
      this.form2.username = row.username
      this.form2.cost = row.cost
    },
    submitEdit(){
      this.$refs['editTechnicianForm'].validate((valid) => {
        if (valid) {
          this.request.put('/medicalTechnician', {
            technicianId:　this.form2.technicianId,
            technicianName: this.form2.technicianName,
            username: this.form2.username,
            cost: this.form2.cost
          }).then(res => {
            if (res.code === '200'){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialogFormVisible2 = false
              this.searchPage()
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
          return false
        }
      })
    },
    deleteMedicalTechnician(TechnicianId){
      this.$confirm('此操作将删除一条医技信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete('/medicalTechnician/' + TechnicianId).then(res => {
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>