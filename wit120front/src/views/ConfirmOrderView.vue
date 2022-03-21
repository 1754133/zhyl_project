<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <NavMenu isActive="3"></NavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="医生预约界面" style="margin-left: 168px">
          </el-page-header>
          <el-input placeholder="请输入医生姓名" v-model="input1" style="width: 20%;margin-left: 1057px;margin-top: 20px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <div style="display: flex;justify-content: center">

            <div style="display: flex;justify-content: left">

              <div class="appointment-content">
                <div class="box-title">
                  <div>预约确认

                  </div>
                </div>
                <div class="patient-content">
                  <div class="patient-msg el-row is-justify-space-around el-row--flex">
                    <div class="el-col el-col-24">
                      <div>就诊时间：{{dateStr}}&nbsp;&nbsp;{{ sliceStr }}</div>
                      <div>科室：{{ departmentName }}</div>
                      <div>医生姓名：{{ doctorName }}</div>
                      <div>费用：{{ cost }}元</div>
                    </div>
                  </div>
                  <div class="patient-msg el-row is-justify-space-around el-row--flex">
                    <div class="el-col el-col-24">
                      <div>就诊人：{{realName}}</div>

                      <div style="margin-top: 10px;">
                        <mu-alert color="info" style="font-size:24px">温馨提醒</mu-alert>
                        <div class="content">★ 疫情防控期间，为避免人员聚集，<span>您只能取预约时间点前2小时内的号源</span>，请不要早到医院，谢谢配合！</div>
                        <div class="content">★ 坐诊医生因应急、突发事件等原因可能会有变动，以当日实际坐诊医生为准，敬请谅解。</div>
                      </div>
                      <div class="text-center">
                        <div> 点击查看<span class="notice">《预约须知》
          
          </span></div>
                        <div>
                          <button type="button"
                                  class="el-button appointment-btn appointment-btn-sdql el-button--primary" @click="submitOrder">
                            <span>确认预约</span></button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>


              </div>
            </div>
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
  name: "ConfirmOrderView",
  components: {NavMenu, MyHeader},
  data() {
    return {
      doctorId: 0,
      day: 0,
      timeSlice: 0,
      cost: 20,
      realName: '',
      input: '',
      sliceStr: '',
      dateStr: '',
      departmentName: '',
      doctorName: '',
      input1: '',
      FormData: {
        name: '理塘丁真',
        age: '6324',
        depart: '华科',
        job: '主治医师',
        information: '大家好我是理塘丁真，这是我的小马 珍珠',
        ordertime: [
          {
            date: '03/20',
            time: '上午',
            remain_1: '5',
            remain_2: '4',
            remain_3: '2'
          },
          {
            date: '03/23',
            time: '下午',
            remain_1: '9',
            remain_2: '1',
            remain_3: '7',
          }
        ]
      }

    }
  },
  mounted() {
    this.sliceStr = this.$route.query.sliceStr
    this.dateStr = this.$route.query.dateStr
    this.departmentName = this.$route.query.departmentName
    this.doctorName = this.$route.query.doctorName
    this.doctorId = this.$route.query.doctorId
    this.day = this.$route.query.day
    this.timeSlice = this.$route.query.timeSlice
  },
  created() {
    this.getRealName()
  },
  methods: {
    goBack() {
      this.$router.push('/DocDetail')
    },
    getRealName(){
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user){
        this.request.get('/patient/patientInfo/realName/' + user.username).then(res => {
          if (res.code === '200'){
            this.realName = res.data
          }else{
            this.$message.error(res.msg);
          }
        })
      }else{
        this.$message('请先进行登录!')
        this.$router.push('/')
      }
    },
    submitOrder(){
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user){
        this.request.post('/order/appointment', {
          username: user.username,
          doctorId: this.doctorId,
          orderDay: this.day,
          orderTimeSlice: this.timeSlice,
          cost: this.cost
        }).then(res => {
          if (res.code === '200'){
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.push('/')
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{
        this.$message('请先进行登录!')
        this.$router.push('/')
      }
    }
  }
}

</script>

<style>
.el-main {
  padding: 0;
  flex-grow: 1;
}

.appointment-content {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  margin: 0;
  padding: 0;
  outline: none;
  margin-top: 10px;
  font-size: 24px;
}

.box-title {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  font-size: 24px;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  border-bottom: 3px solid #008080;
  overflow: hidden;
}

.patient-content {
  -webkit-text-size-adjust: 100%;
  font-family: SourceHanSansCN-Regular, Hiragino Sans GB, Microsoft YaHei, -apple-system-font, Helvetica Neue, sans-serif;
  color: #313131;
  font-size: 24px;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 260px;
  /* text-align: center; */
  margin: 30px auto 10px;
}

.title {
  -webkit-text-size-adjust: 50%;
  /* font-family: SourceHanSansCN-Regular,Hiragino Sans GB,Microsoft YaHei,-apple-system-font,Helvetica Neue,sans-serif; */
  margin: 0;
  outline: none;
  /* box-sizing: border-box; */
  /* position: relative; */
  background-color: #008080;
  /* padding: 10px 0; */
  text-align: center;
  font-size: 20px;
  /* font-weight: 700; */
  color: #fff;
}
</style>