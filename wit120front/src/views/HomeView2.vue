<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <NavMenu></NavMenu>
      <el-main style="background-color: #FFFFFF">
<!--        <div style="height: 100%;background-color: #FFFFFF;width: 80%">
          <span>测试文字</span>
        </div>-->
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
          <mu-button full-width style="width: 18%;height: 207px;margin-left: 20px;font-size: 30px;background-color: burlywood">
            <mu-icon left value="book"></mu-icon>
            <span>就医须知</span>
          </mu-button>
          <mu-button full-width style="width: 18%;height: 207px;margin-left: 20px;font-size: 30px">
            <mu-icon left value="room"></mu-icon>
            <span>医院位置</span>
          </mu-button>
          <mu-button full-width style="width: 18%;height: 207px;margin-left: 20px;font-size: 30px;background-color: forestgreen">
            <mu-icon left value="youtube_searched_for"></mu-icon>
            <span>专科专病</span>
          </mu-button>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;margin-top: 80px">
            <mu-card style="width: 100%; max-width: 370px">
              <mu-card-media title="Image Title" sub-title="Image Sub Title">
                <img src="../assets/img/6.jpg">
              </mu-card-media>
              <mu-card-title title="医院公告"></mu-card-title>
              <mu-card-text>
                <el-link>1.这是一段测试内容这是一段测试内容</el-link><br/><br/>
                <el-link>2.这是一段测试内容这是一段测试内容</el-link><br/><br/>
                <el-link>3.这是一段测试内容这是一段测试内容</el-link>
              </mu-card-text>
            </mu-card>
            <mu-card style="width: 100%; max-width: 370px;margin-left: 20px">
              <mu-card-media title="Image Title" sub-title="Image Sub Title">
                <img src="../assets/img/3.jpg">
              </mu-card-media>
              <mu-card-title title="重大新闻"></mu-card-title>
              <mu-card-text>
                <el-link>1.这是一段测试内容这是一段测试内容</el-link><br/><br/>
                <el-link>2.这是一段测试内容这是一段测试内容</el-link><br/><br/>
                <el-link>3.这是一段测试内容这是一段测试内容</el-link>
              </mu-card-text>
            </mu-card>
            <mu-card style="width: 100%; max-width: 370px;margin-left: 20px">
              <mu-card-media title="Image Title">
                <img src="../assets/img/6.jpg">
              </mu-card-media>
              <mu-card-title title="医生说"></mu-card-title>
              <mu-card-text>
                <el-link>1.这是一段测试内容这是一段测试内容</el-link><br/><br/>
                <el-link>2.这是一段测试内容这是一段测试内容</el-link><br/><br/>
                <el-link>3.这是一段测试内容这是一段测试内容</el-link>
              </mu-card-text>
            </mu-card>
        </div>
      </el-main>
<!--      <el-header>
        <img src="../assets/img/headerIcon.png" style="width: 80px;height: 80px;margin-left: 140px">
        <span style="font-size: 40px">智慧医疗信息系统</span>
        <div style="margin-left: 200px">
          <el-link :underline="false" style="font-size: 20px">患者版</el-link>
          <el-link :underline="false" style="font-size: 20px;margin-left: 20px">医生版</el-link>
          <el-link :underline="false" style="font-size: 20px;margin-left: 20px">管理员版</el-link>
        </div>
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2" style="width: 150px;margin-left: 20px">
        </el-input>
        <el-dropdown style="margin-left: 230px">
          <el-button type="text" style="font-size: 25px">登录/注册</el-button>
          <el-dropdown-menu>
            <el-dropdown-item style="font-size: 25px">个人信息</el-dropdown-item>
            <el-dropdown-item style="font-size: 25px; margin-top: 10px">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>-->
<!--      <el-header style="justify-content: center">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="font-size: 20px">医院首页</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">科室导航</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px">预约挂号</el-menu-item>
          <el-menu-item index="4" style="font-size: 20px">医技预约</el-menu-item>
          <el-menu-item index="5" style="font-size: 20px">报告查询</el-menu-item>
          <el-menu-item index="6" style="font-size: 20px">挂号查询</el-menu-item>
          <el-menu-item index="7" style="font-size: 20px">病历查询</el-menu-item>
        </el-menu>
      </el-header>-->
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import NavMenu from "@/components/NavMenu";
export default {
  name: "HomeView2",
  components: {NavMenu, MyHeader}
}
</script>

<style scoped>
.el-header {
  background-color: #FFFFFF;
  color: #333;
  line-height: 100px;
  height: 100px !important;
  display: flex;
  align-items: center
}

.el-main {
  padding: 0;
  background-color: rgb(198, 226, 255);
  flex-grow:1;
}
</style>