<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse" isActive="3"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">科室管理</a></el-breadcrumb-item>
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
            <el-table-column prop="departmentId" label="科室编号">
            </el-table-column>
            <el-table-column prop="departmentName" label="科室名">
            </el-table-column>
            <el-table-column label="科室简介">
              <template slot-scope="scope">
                <el-button type="text" @click="showDesc(scope.row.departmentDesc)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" @click="edit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                <el-button type="danger" @click="deleteDepartment(scope.row.departmentId)">删除<i class="el-icon-remove-outline"></i></el-button>
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
      <el-dialog title="科室简介" :visible.sync="dialogVisible2" width="35%">
        <span>{{desc}}</span>
      </el-dialog>
      <el-dialog title="新增科室" :visible.sync="dialogFormVisible1" width="35%">
        <el-form :model="form1" :rules="rules" ref="newDepartmentForm">
          <el-form-item label="科室名" :label-width="formLabelWidth" prop="departmentName">
            <el-input v-model="form1.departmentName" autocomplete="off" style="width: 300px" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="科室简介" :label-width="formLabelWidth" prop="departmentDesc">
            <el-input type="textarea" v-model="form1.departmentDesc" autocomplete="off" style="width: 300px"
                      maxlength="1000" show-word-limit :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible1=false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑科室信息" :visible.sync="dialogFormVisible2" width="35%">
        <el-form :model="form2" :rules="rules" ref="editDepartmentForm">
          <el-form-item label="科室名" :label-width="formLabelWidth" prop="departmentName">
            <el-input v-model="form2.departmentName" autocomplete="off" style="width: 300px" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="科室简介" :label-width="formLabelWidth" prop="departmentDesc">
            <el-input type="textarea" v-model="form2.departmentDesc" autocomplete="off" style="width: 300px"
                      maxlength="1000" show-word-limit :autosize="{ minRows: 4, maxRows: 8}"></el-input>
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
import AdminHeader from "@/components/AdminHeader";
import AdminAside from "@/components/AdminAside";

export default {
  name: "DepartmentManage",
  components: {AdminHeader, AdminAside},
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
      dialogVisible2: false,
      desc: '',
      formLabelWidth: '120px',
      form1: {
        departmentName: '',
        departmentDesc: ''
      },
      rules: {
        departmentName: [
          {required: true, message: '请输入新增的科室名', trigger: 'blur'},
          {max: 20, message: '长度不超过20个字符', trigger: 'blur'}
        ],
        departmentDesc: [
          {required: true, message: '请输入新增的科室简介', trigger: 'blur'},
          {max: 1000, message: '长度不超过1000个字符', trigger: 'blur'}
        ]
      },
      form2: {
        departmentId: 0,
        departmentName: '',
        departmentDesc: ''
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
      this.request.get('/department/page/' + this.pageNum + '/' + this.pageSize).then(res => {
        if (res.code === '200'){
          this.tableData = res.data.tableList
          this.total = res.data.total
        }
      })
    },
    showDesc(departmentDesc){
      this.dialogVisible2 = true
      this.desc = departmentDesc
    },
    submitAdd() {
      this.$refs['newDepartmentForm'].validate((valid) => {
        if (valid) {
          this.request.post('/department', {
            departmentName: this.form1.departmentName,
            departmentDesc: this.form1.departmentDesc
          }).then(res => {
            if (res.code === '200'){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
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
      this.form2.departmentId = row.departmentId
      this.form2.departmentName = row.departmentName
      this.form2.departmentDesc = row.departmentDesc
    },
    submitEdit() {
      this.$refs['editDepartmentForm'].validate((valid) => {
        if (valid) {
          this.request.put('/department', {
            departmentId:　this.form2.departmentId,
            departmentName: this.form2.departmentName,
            departmentDesc: this.form2.departmentDesc
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
    deleteDepartment(departmentId){
      this.$confirm('此操作将删除一条科室信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete('/department/' + departmentId).then(res => {
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