<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <NavMenu isActive="3"></NavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="选择科室界面" style="margin-left: 145px">
          </el-page-header>
          <el-input placeholder="请输入医生姓名" v-model="input1" style="width: 20%;margin-left: 1057px;margin-top: 20px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

<!--          <div style="display: flex;justify-content: left;margin-top: 50px;margin-left:200px">-->
          <div style="display: flex;justify-content: center;margin-top: 50px">
            <el-container>
              <el-container>
                <el-aside width="200px" style="margin-left: 145px">
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px'}">
                        <img src="../assets/img/doctor.png" class="image">
                        <div style="padding: 14px;">
                          <span>{{ FormData.name }}</span>
                          <div class="bottom clearfix">
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-aside>

                <el-main>
                  <el-descriptions style="margin-left:50px;" label-class-name="my-label" content-class-name="my-content"
                                   title="医生简介" :column="1">
                    <el-descriptions-item label="姓名">{{ FormData.name }}</el-descriptions-item>
                    <el-descriptions-item label="性别">{{ FormData.gender }}</el-descriptions-item>
                    <el-descriptions-item label="年龄">{{ FormData.age }}</el-descriptions-item>
                    <el-descriptions-item label="所属科室">{{ FormData.depart }}</el-descriptions-item>
                    <el-descriptions-item label="职称">{{ FormData.job }}</el-descriptions-item>
                    <el-descriptions-item label="简介">
                      {{ FormData.information }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-main>
              </el-container>

              <el-footer>
                <div class="title" style="margin-top: 50px;margin-left: 127px;width: 85%">
                  专家坐诊表
                </div>

                <table class='snui-table' style="margin-left: 127px">

                  <tr>
                    <th>科室</th>
                    <th width="80">时段</th>
                    <th class="">
                      <div>{{ CalWeekDay(this.weekday) }}</div>
                      <div>{{ this.month + '/' + this.day }}</div>
                    </th>
                    <th class="">
                      <div>{{ CalWeekDay(this.weekday + 1) }}</div>
                      <div>{{ this.month + '/' + (this.day + 1) }}</div>
                    </th>
                    <th class="">
                      <div>{{ CalWeekDay(this.weekday + 2) }}</div>
                      <div>{{ this.month + '/' + (this.day + 2) }}</div>
                    </th>
                    <th class="">
                      <div>{{ CalWeekDay(this.weekday + 3) }}</div>
                      <div>{{ this.month + '/' + (this.day + 3) }}</div>
                    </th>
                    <th class="">
                      <div>{{ CalWeekDay(this.weekday + 4) }}</div>
                      <div>{{ this.month + '/' + (this.day + 4) }}</div>
                    </th>
                    <th class="">
                      <div>{{ CalWeekDay(this.weekday + 5) }}</div>
                      <div>{{ this.month + '/' + (this.day + 5) }}</div>
                    </th>
                    <th class="">
                      <div>{{ CalWeekDay(this.weekday + 6) }}</div>
                      <div>{{ this.month + '/' + (this.day + 6) }}</div>
                    </th>
                  </tr>
                  <tr>
                    <td colspan="9" class="parent-dept parent-dept-font">{{ FormData.name }}</td>
                  </tr>
                  <tr>
                    <td rowspan="2">智慧预约挂号系统</td>
                    <td>上午</td>
                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime" v-if="item.noon===1&&item.day===weekday">
                          <span><span class="el-popover__reference-wrapper"><el-button type="text"
                                                                                       style="font-size: 15px"
                                                                                       @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                                       aria-describedby="el-popover-5969"
                                                                                       tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===1&&item.day===(weekday + 1)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===1&&item.day===(weekday + 2)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>
                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===1&&item.day===(weekday + 3)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>
                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===1&&item.day===(weekday + 4)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===1&&item.day===(weekday + 5)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===1&&item.day===(weekday + 6)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>下午</td>
                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime" v-if="item.noon===2&&item.day===weekday">
                          <span><span class="el-popover__reference-wrapper"><el-button type="text"
                                                                                       style="font-size: 15px"
                                                                                       @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                                       aria-describedby="el-popover-5969"
                                                                                       tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===2&&item.day===(weekday + 1)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===2&&item.day===(weekday + 2)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===2&&item.day===(weekday + 3)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===2&&item.day===(weekday + 4)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===2&&item.day===(weekday + 5)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>

                    <td class="doctor-td">
                      <div class="doctor-box">
                        <div v-for="item in FormData.ordertime"
                             v-if="item.noon===2&&item.day===(weekday + 6)"><span><span
                            class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                             @click="goNext(FormData.doctorId,item.day,item.noon)"
                                                                             aria-describedby="el-popover-5969"
                                                                             tabindex="0"><span><span>出诊</span></span></el-button></span></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <div class="first" style="margin-left: 127px">
                  选择号源
                  <span v-if="noon !== ''">--{{ this.month + '/' + (this.day + (this.day1 - this.weekday + 7) % 7) }}</span> / {{ this.noon }}
                </div>
                  <div v-if="noon1 === 1" style="display: flex;justify-content: center;margin-top: 50px">
                    <mu-button full-width style="width: 25%;height:30%" color="success" @click="getOrder(FormData.doctorId, day1, 1, sliceNum1, '8:00--9:00')">
                      8:00--9:00 余号:{{ 4 - sliceNum1 }}
                    </mu-button>
                    <mu-button full-width style="width: 25%;margin-left: 10px" color="success" @click="getOrder(FormData.doctorId, day1, 2, sliceNum2, '9:00--10:00')">
                      9:00--10:00 余号:{{ 4 - sliceNum2 }}
                    </mu-button>
                    <mu-button full-width style="width: 25%;margin-left: 10px" color="success" @click="getOrder(FormData.doctorId, day1, 3, sliceNum3, '10:00--11:00')">
                      10:00--11:00 余号:{{ 4 - sliceNum3 }}
                    </mu-button>
                  </div>
                  <div v-if="noon1 === 2" style="display: flex;justify-content: center;margin-top: 50px">
                    <mu-button full-width style="width: 25%" color="success" @click="getOrder(FormData.doctorId, day1, 4, sliceNum1, '14:00--15:00')">14:00--15:00
                      余号:{{ 4 - sliceNum1 }}
                    </mu-button>
                    <mu-button full-width style="width: 25%;margin-left: 10px" color="success" @click="getOrder(FormData.doctorId, day1, 5, sliceNum2, '15:00--16:00')">
                      15:00--16:00 余号:{{ 4 - sliceNum2 }}
                    </mu-button>
                    <mu-button full-width style="width: 25%;margin-left: 10px" color="success" @click="getOrder(FormData.doctorId, day1, 6, sliceNum3, '16:00--17:00')">
                      16:00--17:00 余号:{{ 4 - sliceNum3 }}
                    </mu-button>
                  </div>

              </el-footer>
            </el-container>


          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import MyHeader from "@/components/MyHeader";
import NavMenu from "@/components/NavMenu";

export default {
  name: "DocDetail",
  components: {NavMenu, MyHeader},
  data() {
    return {
      sliceNum1: 0,
      sliceNum2: 0,
      sliceNum3: 0,
      time: '',
      date: '',
      day1: 0,
      noon1: 0,
      noon: '',
      month: '',
      day: '',
      weekday: '',
      depart: '',
      input1: '',
      FormData: {
        doctorId: 0,
        name: '',
        gender: '',
        age: 0,
        depart: '',
        job: '',
        information: '',
        ordertime: [],
        orderSlice: []
      }

    }
  },
  created() {
    this.FormData.doctorId = this.$route.query.doctorId
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
        if (weekday == '1') {
          return '周一'
        } else if (weekday == '2') {
          return '周二'
        } else if (weekday == '3') {
          return '周三'
        } else if (weekday == '4') {
          return '周四'
        } else if (weekday == '5') {
          return '周五'
        } else if (weekday == '6') {
          return '周六'
        } else if (weekday == '0') {
          return '周日'
        }
      }
    }
  },

  methods: {
    showTableData(){
      this.request.get('/doctor/conciseShiftInfo/' + this.FormData.doctorId).then(res => {
        if (res.code === '200'){
          this.FormData.ordertime = res.data
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    showDesc(){
      this.request.get('/docInfo/' + this.FormData.doctorId).then(res => {
        if (res.code === '200'){
          this.FormData.age = res.data.age
          this.FormData.depart = res.data.department
          this.FormData.information = res.data.docDesc
          this.FormData.job = res.data.level
          this.FormData.name = res.data.docName
          if (res.data.gender === true){
            this.FormData.gender = '男'
          }else{
            this.FormData.gender = '女'
          }
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    goBack() {
      this.$router.push({path:'/Clinic',query : {departmentId: this.$route.query.departmentId, departmentName: this.FormData.depart}})
    },goNext(doctorId, day, noon){
      this.day1 = day
      this.noon1 = noon
      if (noon === 1){
        this.noon = '上午'
      }else {
        this.noon = '下午'
      }
      this.request.get('/doctor/shiftInfo/slice/' + doctorId + '/' + day + '/' + noon).then(res => {
        if (res.code === '200'){
          this.FormData.orderSlice = res.data
          for (let item of res.data){
            if (noon === 1){
              if (item.orderTimeSlice === 1){
                this.sliceNum1 = item.patientsNumber
              }else if (item.orderTimeSlice === 2){
                this.sliceNum2 = item.patientsNumber
              }else{
                this.sliceNum3 = item.patientsNumber
              }
            }else{
              if (item.orderTimeSlice === 4){
                this.sliceNum1 = item.patientsNumber
              }else if (item.orderTimeSlice === 5){
                this.sliceNum2 = item.patientsNumber
              }else{
                this.sliceNum3 = item.patientsNumber
              }
            }
          }
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getOrder(doctorId, day, timeSlice, sliceNum, sliceStr) {
      if (sliceNum >= 4){
        this.$message.error("该时间段预约人数已满")
      }else{
        let dateStr = this.month + '/' + (this.day + (this.day1 - this.weekday + 7) % 7) + '/' + this.noon
        this.$router.push({path:'/ConfirmOrderView',query : {doctorId: doctorId, day: day, timeSlice: timeSlice, sliceStr: sliceStr, dateStr: dateStr, doctorName: this.FormData.name, departmentName: this.FormData.depart}})
      }
    },
    getdate() {
      var date = new Date();
      this.weekday=date.getDay()
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.day = strDate
      this.month = month
    },

  }
}

</script>

<style>
.el-main {
  padding: 0;
  flex-grow: 1;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.my-label {
  font-size: 20px;
  background: #bcf3f7;
}

.my-content {
  font-size: 20px;
  background: #eef6f8;
}

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
}

.snui-table {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  width: 85%;
  border-spacing: 0;
  border-collapse: collapse;
  background-color: transparent;
  font-size: 14px;
  table-layout: fixed;
  margin-bottom: 0;
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

.el-button {
  -webkit-text-size-adjust: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: rgb(2, 90, 148);
  color: #084e02;
  -webkit-appearance: none;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  padding: 5px 10px;
  overflow: hidden;
  text-align: left;
  background-color: transparent;
}

.first {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  float: left;
  font-size: 18px;
  color: #008B8B;
  border-bottom: 3px solid #008B8B;
  padding-bottom: 5px;
}
</style>