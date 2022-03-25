<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <DocNavMenu isActive="3"></DocNavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="处方管理界面" style="margin-left: 168px">
          </el-page-header>
          <div>
            <div style="margin-top: 25px">
              <span style="font-size: 25px;margin-left: 168px;font-weight: bold">患者信息</span><br/><br/>
              <span style="font-size: 20px;margin-left: 168px">患者姓名：{{ patientName }}</span><br/>
              <span style="font-size: 20px;margin-left: 168px">患者性别：{{ patientGender }}</span>
            </div>
          </div>
          <div style="display: flex;justify-content: center">
            <mu-divider :shallow-inset="true" style="margin-top: 25px;width: 78%"></mu-divider>
          </div>
          <div style="margin-top: 30px">
            <span style="font-size: 25px;font-weight: bold;margin-left: 168px">病历填写</span>
          </div>
          <div style="margin-top: 30px">
            <span style="font-size: 15px;margin-left: 380px">病历简述</span>
            <div style="display: flex;justify-content: center">
              <el-input type="textarea" v-model="form.desc" :rows="6" style="width: 50%"></el-input>
            </div>
            <div style="margin-left: 380px;margin-top: 20px">
              <el-button type="primary" @click="onSubmit">保存病历</el-button>
            </div>
          </div>
          <div style="display: flex;justify-content: center">
            <mu-divider :shallow-inset="true" style="margin-top: 25px;width: 78%"></mu-divider>
          </div>
          <div style="margin-top: 30px">
            <span style="font-size: 25px;font-weight: bold;margin-left: 168px">处方开具</span>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 30px">
            <el-form :model="form" :rules="rules" ref="recipelForm" label-width="80px">
              <el-form-item label="选择药品">
                <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'药品' + (index + 1)"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="{
                        required: true, message: '药品名不能为空', trigger: 'blur'
                      }"
                >
                  <el-select v-model="drug[index]" placeholder="请选择药品" style="width: 300px" @click.native="showDrugName">
                    <el-option v-for="(name, index) in drugNameList" :label="name" :value="name" :key="index"></el-option>
                  </el-select>
                  <el-input-number v-model="num[index]" @change="handleChange" :min="1" :max="999"
                                   label="药品数量"></el-input-number>
                  <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitRecipe">提交</el-button>
                  <el-button @click="addDomain">新增药品</el-button>
                </el-form-item>
              </el-form-item>
            </el-form>
          </div>
          <div style="display: flex;justify-content: center">
            <mu-divider :shallow-inset="true" style="margin-top: 25px;width: 78%"></mu-divider>
          </div>
          <div style="margin-top: 30px">
            <span style="font-size: 25px;font-weight: bold;margin-left: 168px">医技推荐</span>
          </div>
          <el-button type="text" @click="dialogVisible = true" style="margin-left: 168px;font-size: 20px">点击推荐医技</el-button>
        </div>
      </el-main>
    </el-container>
    <el-dialog
        title="选择你推荐的医技资源"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains1"
            :label="'医技' + (index + 1)"
            :key="domain.key"
            :prop="'domains1.' + index + '.value'"
            :rules="{
            required: true, message: '医技名不能为空', trigger: 'blur'
          }"
        >
          <el-select v-model="technician[index]" placeholder="请选择具体医技" @click.native="showTechnicianName">
            <el-option v-for="(name, index) in technicianNameList" :label="name" :value="name" :key="index"></el-option>
          </el-select>
          <el-button @click.prevent="removeDomain1(domain)">
            删除
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="addDomain1">
            新增医技
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTechnician">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import DocNavMenu from "@/components/DocNavMenu";

export default {
  name: "RecipeView",
  components: {DocNavMenu, MyHeader},
  data() {
    return {
      patientName: '',
      patientGender: '',
      orderId: 0,
      drugNameList: [],
      technicianNameList: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        input3: '',
        select: '',
        medinum: 1,
      },
      dialogVisible: false,
      FormData: {
        name: '理塘丁真',
        telnumber: '13888888888',
        nameid: '12333333333',
        age: '6324',
        depart: '华科',
        job: '主治医师',
        information: '大家好我是理塘丁真，这是我的小马 珍珠'
      },
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        domains1: [{
          value: ''
        }]
      },
      drug: [],
      num: [],
      technician: []
    }
  },
  created() {
    this.patientName = this.$route.query.patientName
    this.patientGender = this.$route.query.patientGender
    this.orderId = this.$route.query.orderId
    this.showCaseHistory()
  },
  methods: {
    submitTechnician(){
      let technicianStr = ''
      for (let item of this.technician){
        technicianStr = technicianStr + item +';'
      }
      let params = new FormData()
      params.append('orderId', this.orderId)
      params.append('recommend', technicianStr)
      this.request.post('/medicalResource/recommend', params).then(res => {
        if (res.code === '200'){
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.dialogVisible = false
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    showCaseHistory(){
      this.request.get('/doctor/caseHistory/' + this.orderId).then(res => {
        if (res.code === '200'){
          this.form.desc = res.data
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    submitRecipe(){
      let recipeStr = ''
      for (let i = 0, j = 0; i < this.drug.length, j < this.drug.length; i++, j++){
        recipeStr = recipeStr + this.drug[i] + 'x' + this.num[j] + ';'
      }
      let params = new FormData()
      params.append('orderId', this.orderId)
      params.append('prescription', recipeStr)
      this.request.post('/doctor/prescription', params).then(res => {
        if (res.code === '200'){
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    showDrugName(){
      this.request.get('/drug/names').then(res => {
        if (res.code === '200'){
          this.drugNameList = res.data
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    showTechnicianName(){
      this.request.get('/medicalTechnician/names').then(res => {
        if (res.code === '200'){
          this.technicianNameList = res.data
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    goBack() {
      this.$router.push('/PatientInfoView')
    },
    goNext() {
      this.$router.push('')
    },
    onSubmit() {
      let params = new FormData()
      params.append('orderId', this.orderId)
      params.append('caseHistory', this.form.desc)
      this.request.post('/doctor/caseHistory', params).then(res => {
        if (res.code === '200'){
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    showDepartmentName() {
      this.request.get('/department/name').then(res => {
        if (res.code === '200') {
          this.departmentNameList = res.data
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
        this.drug.splice(index, 1)
        this.num.splice(index, 1)
      }
    },
    removeDomain1(item){
      var index = this.dynamicValidateForm.domains1.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains1.splice(index, 1)
        this.technician.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '123',
        key: Date.now()
      });
    },
    addDomain1(){
      this.dynamicValidateForm.domains1.push({
        value: '123',
        key: Date.now()
      })
    },
    handleChange(value) {
      console.log(value);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    handleClick() {
      this.dialogVisible = true
    }
  }
}
</script>


<style scoped>
.el-main {
  padding: 0;
  flex-grow: 1;
}
</style>