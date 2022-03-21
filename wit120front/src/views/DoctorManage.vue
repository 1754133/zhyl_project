<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse" isActive="1-1"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">医生信息管理</a></el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="margin: 10px 0">
            <el-input style="width: 200px" suffix-icon="el-icon-search" v-model="username"></el-input>
            <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
          </div>
          <div style="margin: 10px 0">
            <el-button type="primary">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button>
            <el-button type="primary">导出<i class="el-icon-top"></i></el-button>
          </div>
          <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column prop="docInfoId" label="编号">
            </el-table-column>
            <el-table-column prop="docName" label="姓名">
            </el-table-column>
            <el-table-column label="性别">
              <template slot-scope="scope">
                <span v-if="scope.row.gender===false">女</span>
                <span v-if="scope.row.gender===true">男</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="identificationNum" label="身份证号">
            </el-table-column>
            <el-table-column prop="department" label="所属科室">
            </el-table-column>
            <el-table-column prop="level" label="职称">
            </el-table-column>
            <el-table-column label="简介">
              <template slot-scope="scope">
                <el-button type="text" @click="showDesc(scope.row.docDesc)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" @click="edit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
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
      <el-dialog title="医生信息编辑" :visible.sync="formVisible" width="35%">
        <el-form :model="form" :rules="rules" ref="docForm">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="docName">
            <el-input v-model="form.docName" autocomplete="off" style="width: 300px"
                      prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
            <el-radio v-model="form.gender" value="male" :label="true">男</el-radio>
            <el-radio v-model="form.gender" value="female" :label="false">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="form.age" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth" prop="identificationNum">
            <el-input v-model="form.identificationNum" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="所属科室" :label-width="formLabelWidth" prop="department">
            <el-select v-model="form.department" placeholder="请选择科室" style="width: 300px" @click.native="showDepartmentName">
              <el-option v-for="(name, index) in departmentNameList" :label="name" :value="name" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称" :label-width="formLabelWidth" prop="level">
            <el-select v-model="form.level" placeholder="请选择职称" style="width: 300px">
              <el-option label="主任医师" value="主任医师"></el-option>
              <el-option label="副主任医师" value="副主任医师"></el-option>
              <el-option label="主治医师" value="主治医师"></el-option>
              <el-option label="医师" value="医师"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth" prop="docDesc">
            <el-input type="textarea" v-model="form.docDesc" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="formVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="医生简介" :visible.sync="dialogVisible" width="35%">
        <span>{{desc}}</span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import AdminAside from "@/components/AdminAside";
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "DoctorManage",
  components: {AdminHeader, AdminAside},
  data(){
    return{
      desc: '',
      sideWidth: 200,
      logoTextShow: true,
      isCollapse: false,
      username: '',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 3,
      formVisible: false,
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
        docName: '',
        gender: false,
        age: 0,
        identificationNum: '',
        department: '',
        level:'',
        docDesc: '',
        docInfoId: 0
      },
      departmentNameList: []
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
      this.request.get('/docInfo/page/' + this.pageNum + '/' + this.pageSize).then(res => {
        if (res.code === '200'){
          this.tableData = res.data.tableList
          this.total = res.data.total
        }
      })
    },
    edit(row){
      this.form.docName = row.docName
      this.form.gender = row.gender
      this.form.age = row.age
      this.form.identificationNum = row.identificationNum
      this.form.department = row.department
      this.form.level = row.level
      this.form.docDesc = row.docDesc
      this.form.docInfoId =row.docInfoId
      this.formVisible = true
    },
    showDepartmentName(){
      this.request.get('/department/name').then(res => {
        if (res.code === '200'){
          this.departmentNameList = res.data
        }else {
          this.$message.error(res.msg);
        }
      })
    },
    submitEdit(){
      this.request.put('/docInfo', {
        docInfoId: this.form.docInfoId,
        docName:　this.form.docName,
        department: this.form.department,
        level: this.form.level,
        docDesc: this.form.docDesc,
        identificationNum: this.form.identificationNum,
        gender: this.form.gender,
        age: this.form.age
      }).then(res => {
        if (res.code === '200'){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.formVisible = false
          this.searchPage()
        }else {
          this.$message.error(res.msg);
        }
      })
    },
    showDesc(docDesc){
      this.dialogVisible = true
      this.desc = docDesc
    }
  }
}
</script>

<style>
.headerBg{
  background: #eee!important;
}
</style>