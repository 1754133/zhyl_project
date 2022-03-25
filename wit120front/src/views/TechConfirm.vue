<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <NavMenu isActive="4"></NavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="医技预约确认界面" style="margin-left: 168px">
          </el-page-header>
          <div style="display: flex;justify-content: left;margin-left:100px;margin-right:100px">
            <el-container>
              <el-main>
                <div class="title">
                  预约信息
                </div>
              </el-main>
            </el-container>
            <div style="display: flex;justify-content: left">

              <div class="appointment-content">
                <div class="box-title">
                  <div>预约确认

                  </div>
                </div>
                <div class="patient-content">
                  <div class="patient-msg el-row is-justify-space-around el-row--flex">
                    <div class="el-col el-col-24">
                      <div>检查时间：{{ date }}--{{ time }}</div>
                      <div>医疗技术：{{ tech }}</div>
                    </div>
                  </div>
                  <div class="patient-msg el-row is-justify-space-around el-row--flex">
                    <div class="el-col el-col-24">
                      <div>预约人：{{ realName }}</div>

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
                                  class="el-button appointment-btn appointment-btn-sdql el-button--primary" @click="sendVerificationCode">
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
      input: '',
      date: '',
      time: '',
      tech: '',
      input1: '',
      noon: '',
      day: '',
      patientId: '',
      orderId: '',
      realName: '王小虎'
    }
  },
  created() {
    this.getRealName()
  },
  mounted() {
    this.time = this.$route.query.time
    this.date = this.$route.query.date
    this.tech = this.$route.query.tech
    this.day = this.$route.query.day
    this.orderId = this.$route.query.orderId
    if (this.time === '上午') {
      this.noon = 1
    } else {
      this.noon = 2
    }
  },
  methods: {
    getRealName() {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user) {
        this.patientId = user.userId
        this.request.get('/patient/patientInfo/realName/' + user.username).then(res => {
          if (res.code === '200') {
            this.realName = res.data
          } else {
            this.$message.error(res.msg);
          }
        })
      } else {
        this.$message('请先进行登录!')
        this.$router.push('/')
      }
    },
    goBack() {
      this.$router.push({path: '/TechScheduling', query: {tech: this.tech, orderId: this.orderId}})
    },
    sendVerificationCode() {
      this.request.post('/medicalResource/appointment', {
        patientId: this.patientId,
        orderId: this.orderId,
        medResName: this.tech,
        day: this.day,
        noon: this.noon
      }).then(res => {
        if (res.code === '200') {
          this.$message({
            message: '预约成功',
            type: 'success'
          })
          this.$router.push('/TechQuery')
        } else {
          this.$message(res.msg)
        }
      })
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