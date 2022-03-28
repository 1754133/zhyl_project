<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <AdminAside :asideWidth="sideWidth" :logoText="logoTextShow" :ifCollapse="isCollapse" isActive="2"></AdminAside>
      <el-container direction="vertical">
        <AdminHeader @changeAside="changeAside"></AdminHeader>
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path: '/DepartmentShiftManage'}">科室排班管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path: '/DepartmentShiftDetail', query:{departmentId: departmentId, departmentName: departmentName}}">科室排班详情</el-breadcrumb-item>
              <el-breadcrumb-item>医生排班详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="margin: 10px 0">
            <el-button type="primary" @click="dialogFormVisible = true">新增坐诊<i class="el-icon-circle-plus-outline"></i></el-button>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 50px">
            <div class="title">
              专家坐诊表
            </div>
          </div>
          <div style="display: flex;justify-content: center">
            <table class='snui-table'>
              <tr>
                <th>姓名</th>
                <th width="80">时段</th>
                <th class="">
                  <div>{{ CalWeekDay(this.weekday) }}</div>
                  <div>{{CalDate(this.month,this.day)}}</div>
                </th>
                <th class="">
                  <div>{{ CalWeekDay(this.weekday + 1) }}</div>
                  <div>{{CalDate(this.month,this.day+1)}}</div>
                </th>
                <th class="">
                  <div>{{ CalWeekDay(this.weekday + 2) }}</div>
                  <div>{{CalDate(this.month,this.day+2)}}</div>
                </th>
                <th class="">
                  <div>{{ CalWeekDay(this.weekday + 3) }}</div>
                  <div>{{CalDate(this.month,this.day+3)}}</div>
                </th>
                <th class="">
                  <div>{{ CalWeekDay(this.weekday + 4) }}</div>
                  <div>{{CalDate(this.month,this.day+4)}}</div>
                </th>
                <th class="">
                  <div>{{ CalWeekDay(this.weekday + 5) }}</div>
                  <div>{{CalDate(this.month,this.day+5)}}</div>
                </th>
                <th class="">
                  <div>{{ CalWeekDay(this.weekday + 6) }}</div>
                  <div>{{CalDate(this.month,this.day+6)}}</div>
                </th>
              </tr>
              <tr>
                <td colspan="9" class="parent-dept parent-dept-font">{{ doctorName }}</td>
              </tr>
              <tr>
                <td rowspan="2" style="text-align: center">{{ doctorName }}</td>
                <td style="text-align: center">上午</td>
                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===weekday">
                          <span><span class="el-popover__reference-wrapper"><el-button type="text"
                                                                                       style="font-size: 15px"
                                                                                       @click="goNext(doctorId,item.day,item.noon)"
                                                                                       aria-describedby="el-popover-5969"
                                                                                       tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===1&&item.day===(weekday + 1) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===1&&item.day===(weekday + 2) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>
                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===1&&item.day===(weekday + 3) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>
                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===1&&item.day===(weekday + 4) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===1&&item.day===(weekday + 5) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===1&&item.day===(weekday + 6) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="text-align: center">下午</td>
                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===weekday">
                          <span><span class="el-popover__reference-wrapper"><el-button type="text"
                                                                                       style="font-size: 15px"
                                                                                       @click="goNext(doctorId,item.day,item.noon)"
                                                                                       aria-describedby="el-popover-5969"
                                                                                       tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===2&&item.day===(weekday + 1) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===2&&item.day===(weekday + 2) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===2&&item.day===(weekday + 3) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===2&&item.day===(weekday + 4) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===2&&item.day===(weekday + 5) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData"
                         v-if="item.noon===2&&item.day===(weekday + 6) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(doctorId,item.day,item.noon)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </el-main>
      </el-container>
      <el-dialog title="新增坐诊信息" :visible.sync="dialogFormVisible" width="35%">
        <el-form :model="form" :rules="rules" ref="newShiftForm">
          <el-form-item label="周几值班" :label-width="formLabelWidth" prop="day">
            <el-select v-model="form.day" placeholder="请选择周几" style="width: 300px" clearable>
              <el-option label="周一" :value="1"></el-option>
              <el-option label="周二" :value="2"></el-option>
              <el-option label="周三" :value="3"></el-option>
              <el-option label="周四" :value="4"></el-option>
              <el-option label="周五" :value="5"></el-option>
              <el-option label="周六" :value="6"></el-option>
              <el-option label="周日" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值班时段" :label-width="formLabelWidth" prop="noon">
            <el-select v-model="form.noon" placeholder="请选择时段" style="width: 300px" clearable>
              <el-option label="上午" :value="1"></el-option>
              <el-option label="下午" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
import AdminAside from "@/components/AdminAside";

export default {
  name: "DocShiftManage",
  components: {AdminHeader, AdminAside},
  data(){
    return{
      sideWidth: 200,
      logoTextShow: true,
      isCollapse: false,
      weekday: 0,
      tableData: [],
      month: 0,
      day: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      doctorName: '',
      doctorId: 0,
      departmentId: 0,
      departmentName: '',
      form: {
        day: '',
        noon: ''
      },
      rules: {
        day: [
          { required: true, message: '请选择值班天数', trigger: 'change' }
        ],
        noon: [
          { required: true, message: '请选择值班时段', trigger: 'change' }
        ]
      },
    }
  },
  created() {
    this.doctorId = this.$route.query.doctorId
    this.departmentId = this.$route.query.departmentId
    this.showDesc()
    this.showTableData()
  },
  mounted() {
    this.getdate()
  },
  computed: {
    CalWeekDay() {
      return function (weekday) {
        weekday = weekday % 7
        if (weekday === 1) {
          return '周一'
        } else if (weekday === 2) {
          return '周二'
        } else if (weekday === 3) {
          return '周三'
        } else if (weekday === 4) {
          return '周四'
        } else if (weekday === 5) {
          return '周五'
        } else if (weekday === 6) {
          return '周六'
        } else if (weekday === 0) {
          return '周日'
        }
      }
    },
    CalDate() {
      return function (month, day) {
        if (month === 2) {
          if (day > 28) {
            month = (month + 1) % 12
            day = day % 28

          }
        } else if (month === 1 || month === 3 || month === 5 || month === 8 || month === 10) {
          if (day > 31) {
            month = (month + 1) % 12
            day = day % 31

          }
        } else if (month === 7 || month === 12) {
          if (day > 31) {
            month = (month + 1) % 12
            day = day % 31
          }
        } else {
          if (day > 30) {
            month = (month + 1) % 12
            day = day % 30
          }
        }
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (day >= 1 && day <= 9) {
          day = "0" + day;
        }
        return month + '/' + day
      }
    }
  },
  methods: {
    submitAdd(){
      this.$refs['newShiftForm'].validate((valid) => {
        if (valid) {
          this.request.post('/doctor/shiftInfo', {
            doctorId: this.doctorId,
            day: this.form.day,
            noon: this.form.noon
          }).then(res => {
            if (res.code === '200'){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.showTableData()
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
          return false
        }
      })
    },
    goNext(doctorId, day, noon){
      this.$confirm('此操作将删除该坐诊信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete('/doctor/shiftInfo/' + doctorId + '/' + day + '/' + noon).then(res => {
          if (res.code === '200'){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showTableData()
          }else{
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    showDesc(){
      this.request.get('/docInfo/' + this.doctorId).then(res => {
        if (res.code === '200'){
          this.departmentName = res.data.department
          this.doctorName = res.data.docName
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    showTableData(){
      this.request.get('/doctor/conciseShiftInfo/' + this.doctorId).then(res => {
        if (res.code === '200'){
          this.tableData = res.data
        }else{
          this.tableData = []
          this.$message.error(res.msg)
        }
      })
    },
    changeAside(sideWidth, logoTextShow, isCollapse){
      this.sideWidth = sideWidth
      this.logoTextShow = logoTextShow
      this.isCollapse = isCollapse
    },
    getdate() {
      var date = new Date();
      this.weekday = date.getDay()
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      this.day = strDate
      this.month = month
      this.date = month + '/' + strDate;
    }
  }
}
</script>

<style scoped>
.title {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  margin: 0;
  outline: none;
  box-sizing: border-box;
  /* position: relative; */
  background-color: #008080;
  padding: 10px 0;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  width: 100%;
}

.snui-table {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  background-color: transparent;
  font-size: 14px;
  table-layout: fixed;
}

.parent-dept-font {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0;
  outline: none;
  box-sizing: border-box;
  height: 40px;
  padding: 5px 10px;
  border: 1px solid #f1f1f1;
  text-align: left;
  color: #008B8B;
  background-color: #eee;
  font-size: 18px;
  font-weight: 700;
}

.doctor-td {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 14px;
  margin: 0;
  outline: none;
  box-sizing: border-box;
  height: 40px;
  font-weight: 400;
  text-align: center;
  border: 1px solid #f1f1f1;
  padding: inherit;
}

.el-popover__reference-wrapper {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}
</style>