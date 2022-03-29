<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader @changePermission="changePermission"></MyHeader>
      <NavMenu isActive="1" v-if="permission === 1 || permission === 0"></NavMenu>
      <DocNavMenu isActive="1" v-if="permission === 2"></DocNavMenu>
      <DocNavMenu1 isActive="1" v-if="permission === 4"></DocNavMenu1>
      <el-main style="background-color: #FFFFFF">
        <div>
          <mu-carousel transition="fade" style="height: 836px">
            <mu-carousel-item>
              <img src="../assets/img/1.jpg">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../assets/img/2.jpg">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../assets/img/3.jpg">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../assets/img/4.jpg">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../assets/img/5.jpg">
            </mu-carousel-item>
          </mu-carousel>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;margin-top: 80px">
          <mu-button full-width style="width: 18%;height: 207px;font-size: 30px;background-color: cadetblue">
            <mu-icon left value="date_range"></mu-icon>
            <span>门诊出诊表</span>
          </mu-button>
          <mu-button full-width
                     style="width: 18%;height: 207px;margin-left: 20px;font-size: 30px;background-color: burlywood">
            <mu-icon left value="book"></mu-icon>
            <span>就医须知</span>
          </mu-button>
          <mu-button full-width style="width: 18%;height: 207px;margin-left: 20px;font-size: 30px">
            <mu-icon left value="room"></mu-icon>
            <span>医院位置</span>
          </mu-button>
          <mu-button full-width
                     style="width: 18%;height: 207px;margin-left: 20px;font-size: 30px;background-color: forestgreen">
            <mu-icon left value="youtube_searched_for"></mu-icon>
            <span>专科专病</span>
          </mu-button>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;margin-top: 80px">
          <mu-card style="width: 100%; max-width: 370px">
            <mu-card-media title="医院公告">
              <img src="../assets/img/6.jpg">
            </mu-card-media>
            <mu-card-title title="医院公告"></mu-card-title>
            <mu-card-text>
              <el-link @click="goNext('医院公告',1)">1.本院2022年清明节，劳动节门诊安排,请注意查收</el-link>
              <br/><br/>
              <el-link @click="goNext('医院公告',2)">2.让医生提前了解您，诊前病史采集系统给您更好的体验</el-link>
              <br/><br/>
              <el-link @click="goNext('医院公告',3)">3.神经科“脑组织捐赠”招募</el-link>
            </mu-card-text>
          </mu-card>
          <mu-card style="width: 100%; max-width: 370px;margin-left: 20px">
            <mu-card-media title="重大新闻">
              <img src="../assets/img/3.jpg">
            </mu-card-media>
            <mu-card-title title="重大新闻"></mu-card-title>
            <mu-card-text>
              <el-link @click="goNext('重大新闻',1)">1.本院牵头发布《中国制定/修订临床诊疗指南的指导原则》</el-link>
              <br/><br/>
              <el-link @click="goNext('重大新闻',2)">2.我的冬奥日记，高山滑雪医疗队凝结出的冬奥精神</el-link>
              <br/><br/>
              <el-link @click="goNext('重大新闻',3)">3.探索破解罕见病诊疗世界三大难题的“本院方案”</el-link>
            </mu-card-text>
          </mu-card>
          <mu-card style="width: 100%; max-width: 370px;margin-left: 20px">
            <mu-card-media title="医生说">
              <img src="../assets/img/6.jpg">
            </mu-card-media>
            <mu-card-title title="医生说"></mu-card-title>
            <mu-card-text>
              <el-link @click="goNext('医生说',1)">1.世界睡眠日|春眠不觉晓，夜来呼噜知多少</el-link>
              <br/><br/>
              <el-link @click="goNext('医生说',2)">2.世界防结核病日|可累及各个器官，当心中招浪漫病</el-link>
              <br/><br/>
              <el-link @click="goNext('医生说',3)">3.“女神节”健康礼包二 | 科学产后康复，几组动作还妈妈健康优美体态</el-link>
            </mu-card-text>
          </mu-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import NavMenu from "@/components/NavMenu";
import DocNavMenu from "@/components/DocNavMenu";
import DocNavMenu1 from "@/components/DocNavMenu1";

export default {
  name: "HomeView2",
  components: {DocNavMenu1, DocNavMenu, NavMenu, MyHeader},
  data() {
    return {
      permission: 0
    }
  },
  created() {
    this.judgePermission()
  },
  methods: {
    judgePermission() {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user) {
        this.permission = user.permission
        if (this.permission === 3) {
          this.$router.push('/DoctorManage')
        }
      }
    },
    changePermission(permission) {
      this.permission = permission
    },
    goNext(title, item) {
      this.$router.push({path: '/AboutView', query: {title: title, item: item}})
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