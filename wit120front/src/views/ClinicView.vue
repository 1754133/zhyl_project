<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <NavMenu isActive="3"></NavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="排班信息界面" style="margin-left: 168px">
          </el-page-header>
          <!--          <el-input placeholder="请输入医生姓名" v-model="input1" style="width: 20%;margin-left: 1057px;margin-top: 20px">
                      <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>-->
          <div style="display: flex;justify-content: center;margin-top: 50px">
            <div class="title">
              出诊信息
            </div>
          </div>
          <div style="display: flex;justify-content: center">
            <table class='snui-table'>

              <tr>
                <th>科室</th>
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
                <td colspan="9" class="parent-dept parent-dept-font">{{ departmentName }}</td>
              </tr>
              <tr>
                <td rowspan="2" style="text-align: center">{{ departmentName }}</td>
                <td>上午</td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===weekday"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===(weekday + 1) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===(weekday + 2) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>
                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===(weekday + 3) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>
                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===(weekday + 4) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===(weekday + 5) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===1&&item.day===(weekday + 6) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

              </tr>


              <tr>
                <td>下午</td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===weekday"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===(weekday + 1) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===(weekday + 2) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===(weekday + 3) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===(weekday + 4) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===(weekday + 5) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>

                <td class="doctor-td">
                  <div class="doctor-box">
                    <div v-for="item in tableData" v-if="item.noon===2&&item.day===(weekday + 6) % 7"><span><span
                        class="el-popover__reference-wrapper"><el-button type="text" style="font-size: 15px"
                                                                         @click="goNext(item.doctorId, departmentId)"
                                                                         aria-describedby="el-popover-5969"
                                                                         tabindex="0"><span><span>{{
                        item.doctorName
                      }}</span></span></el-button></span></span>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
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
  name: "ClinicView",
  components: {NavMenu, MyHeader},
  data() {
    return {
      month: '',
      day: '',
      weekday: '',
      departmentName: '',
      departmentId: 0,
      tableData: []
    }
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
  created() {
    this.departmentName = this.$route.query.departmentName
    this.departmentId = this.$route.query.departmentId
    this.showTableData()
  },
  methods: {
    showTableData() {
      this.request.get('/department/shiftInfo/' + this.departmentId).then(res => {
        if (res.code === '200') {
          this.tableData = res.data
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    goBack() {
      this.$router.push('/Department')
    },
    goNext(doctorId, departmentId) {
      this.$router.push({path: '/DocDetail', query: {doctorId: doctorId, departmentId: departmentId}})
    },
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
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
.el-main {
  padding: 0;
  flex-grow: 1;
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
  width: 78%;
}

.snui-table {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  width: 78%;
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

.doctor-box {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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
  width: 100%;
  padding: 5px 10px;
  overflow: hidden;
  text-align: left;
  background-color: transparent;
}
</style>