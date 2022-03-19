<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse" isActive="4"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">药品信息管理</a></el-breadcrumb-item>
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
            <el-table-column prop="drugId" label="编号" width="70px">
            </el-table-column>
            <el-table-column prop="drugName" label="药品名称">
            </el-table-column>
            <el-table-column prop="approvalNum" label="批准文号">
            </el-table-column>
            <el-table-column prop="formulation" label="剂型">
            </el-table-column>
            <el-table-column prop="specification" label="规格">
            </el-table-column>
            <el-table-column prop="manufacturer" label="生产厂商">
            </el-table-column>
            <el-table-column prop="category" label="分类">
            </el-table-column>
            <el-table-column prop="cost" label="单价">
            </el-table-column>
            <el-table-column label="操作" width="170px">
              <template slot-scope="scope">
                <el-button type="success" @click="edit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                <el-button type="danger" @click="deleteDrug(scope.row.drugId)">删除<i class="el-icon-remove-outline"></i></el-button>
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
      <el-dialog title="新增药品" :visible.sync="dialogFormVisible1" width="35%">
        <el-form :model="form1" :rules="rules" ref="addDrugForm">
          <el-form-item label="药品名称" :label-width="formLabelWidth" prop="drugName">
            <el-input v-model="form1.drugName" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="批准文号" :label-width="formLabelWidth" prop="approvalNum">
            <el-input v-model="form1.approvalNum" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="剂型" :label-width="formLabelWidth" prop="formulation">
            <el-input v-model="form1.formulation" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="规格" :label-width="formLabelWidth" prop="specification">
            <el-input v-model="form1.specification" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="生产厂商" :label-width="formLabelWidth" prop="manufacturer">
            <el-input v-model="form1.manufacturer" autocomplete="off" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth" prop="category">
            <el-select v-model="form1.category" placeholder="请选择分类" style="width: 300px">
              <el-option label="中药" value="中药"></el-option>
              <el-option label="西药" value="西药"></el-option>
              <el-option label="中成药" value="中成药"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" :label-width="formLabelWidth" prop="cost">
            <el-input v-model="form1.cost" autocomplete="off" style="width: 300px" placeholder="请输入保留两位小数的单价"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible1=false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑药品信息" :visible.sync="dialogFormVisible2" width="35%">
      <el-form :model="form2" :rules="rules" ref="updateDrugForm">
        <el-form-item label="药品名称" :label-width="formLabelWidth" prop="drugName">
          <el-input v-model="form2.drugName" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="批准文号" :label-width="formLabelWidth" prop="approvalNum">
          <el-input v-model="form2.approvalNum" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="剂型" :label-width="formLabelWidth" prop="formulation">
          <el-input v-model="form2.formulation" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth" prop="specification">
          <el-input v-model="form2.specification" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="生产厂商" :label-width="formLabelWidth" prop="manufacturer">
          <el-input v-model="form2.manufacturer" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form2.category" placeholder="请选择分类" style="width: 300px">
            <el-option label="中药" value="中药"></el-option>
            <el-option label="西药" value="西药"></el-option>
            <el-option label="中成药" value="中成药"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth" prop="cost">
          <el-input v-model="form2.cost" autocomplete="off" style="width: 300px" placeholder="请输入保留两位小数的单价"></el-input>
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
  name: "DrugManage",
  components: {AdminHeader, AdminAside},
  data(){
    const validateCost = (rule,value,callback) =>{
      let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
      if(!value){
        callback(new Error('单价不能为空'))
      }else if(!reg.test(value)){
        callback(new Error('请输入正确格式的单价'))
        this.$set(this.form1, "cost", '');
      }else if(value.length > 6){
        callback(new Error('整数部分最多有3位'))
        this.$set(this.form1, "cost", '');
      }else{
        callback();
      }
    };
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
      form1:{
        drugName: '',
        approvalNum: '',
        formulation: '',
        specification: '',
        manufacturer: '',
        category: '',
        cost: 0.00
      },
      form2:{
        drugId: 0,
        drugName: '',
        approvalNum: '',
        formulation: '',
        specification: '',
        manufacturer: '',
        category: '',
        cost: 0.00
      },
      rules:{
        drugName: [
          {required: true, message: '请输入药品名称', trigger: 'blur'}
        ],
        approvalNum: [
          {required: true, message: '请输入批准文号', trigger: 'blur'}
        ],
        formulation: [
          {required: true, message: '请输入剂型', trigger: 'blur'}
        ],
        specification: [
          {required: true, message: '请输入规格', trigger: 'blur'}
        ],
        manufacturer: [
          {required: true, message: '请输入生产厂商', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '请输入分类', trigger: 'blur'}
        ],
        cost: [
          {required: true, trigger: 'blur', validator: validateCost}
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
      this.request.get('/drug/page/' + this.pageNum + '/' + this.pageSize).then(res => {
        if (res.code === '200'){
          this.tableData = res.data.tableList
          this.total = res.data.total
        }
      })
    },
    submitAdd(){
      this.$refs['addDrugForm'].validate((valid) => {
        if (valid) {
          this.request.post('/drug', {
            drugName: this.form1.drugName,
            approvalNum: this.form1.approvalNum,
            formulation: this.form1.formulation,
            specification: this.form1.specification,
            manufacturer: this.form1.manufacturer,
            category: this.form1.category,
            cost: this.form1.cost
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
      this.form2.drugId = row.drugId
      this.form2.drugName = row.drugName
      this.form2.approvalNum = row.approvalNum
      this.form2.formulation = row.formulation
      this.form2.specification = row.specification
      this.form2.manufacturer = row.manufacturer
      this.form2.category = row.category
      this.form2.cost = row.cost
    },
    submitEdit(){
      this.$refs['updateDrugForm'].validate((valid) => {
        if (valid) {
          this.request.put('/drug', {
            drugId: this.form2.drugId,
            drugName: this.form2.drugName,
            approvalNum: this.form2.approvalNum,
            formulation: this.form2.formulation,
            specification: this.form2.specification,
            manufacturer: this.form2.manufacturer,
            category: this.form2.category,
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
    deleteDrug(drugId){
      this.$confirm('此操作将删除一条药品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete('/drug/' + drugId).then(res => {
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