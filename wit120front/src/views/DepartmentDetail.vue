<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader @changePermission="changePermission"></MyHeader>
      <NavMenu isActive="2" v-if="permission === 1 || permission === 0"></NavMenu>
      <DocNavMenu isActive="2" v-if="permission === 2"></DocNavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="选择科室界面" style="margin-left: 168px">
          </el-page-header>
<!--          <el-input placeholder="请输入医生姓名" v-model="input1" style="width: 20%;margin-left: 1057px;margin-top: 20px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>-->
          <div>
            <div style="display: flex;justify-content: center;margin-top: 50px">
              <div class="title">
                {{ departmentName }}
              </div>
            </div>
            <div style="margin-top: 25px">
              <span style="font-size: 25px;margin-left: 168px">科室简介</span><br/><br/>
              <div style="display: flex;justify-content: center">
                <div style="width: 78%">
                  <span style="font-size: 20px">{{ departmentDesc }}</span>
                </div>
              </div>
              <div style="display: flex;justify-content: center">
                <mu-divider :shallow-inset="true" style="margin-top: 25px;width: 78%"></mu-divider>
              </div>
              <div style="margin-left: 168px;margin-top: 25px">
                <span style="font-size: 25px">专家团队</span><br/><br/>
                <div v-for="i in (row-1)">
                  <div style="display: flex;margin-top: 20px">
                    <mu-card style="width: 100%; max-width: 200px">
                      <mu-card-media :title="form[(i - 1) * 5].docName">
                        <img src="../assets/img/doctor.png">
                      </mu-card-media>
                      <mu-card-title :title="form[(i - 1) * 5].level"></mu-card-title>
                      <mu-button flat color="primary" @click="goNext(form[(i - 1) * 5].docId)">查看详情</mu-button>
                    </mu-card>
                    <mu-card style="width: 100%;max-width: 200px;margin-left: 50px">
                      <mu-card-media :title="form[(i - 1) * 5 + 1].docName">
                        <img src="../assets/img/doctor.png">
                      </mu-card-media>
                      <mu-card-title :title="form[(i - 1) * 5 + 1].level"></mu-card-title>
                      <mu-button flat color="primary" @click="goNext(form[(i - 1) * 5 + 1].docId)">查看详情</mu-button>
                    </mu-card>
                    <mu-card style="width: 100%; max-width: 200px;margin-left: 50px">
                      <mu-card-media :title="form[(i - 1) * 5 + 2].docName">
                        <img src="../assets/img/doctor.png">
                      </mu-card-media>
                      <mu-card-title :title="form[(i - 1) * 5 + 2].level"></mu-card-title>
                      <mu-button flat color="primary" @click="goNext(form[(i - 1) * 5 + 2].docId)">查看详情</mu-button>
                    </mu-card>
                    <mu-card style="width: 100%; max-width: 200px;margin-left: 50px">
                      <mu-card-media :title="form[(i - 1) * 5 + 3].docName">
                        <img src="../assets/img/doctor.png">
                      </mu-card-media>
                      <mu-card-title :title="form[(i - 1) * 5 + 3].level"></mu-card-title>
                      <mu-button flat color="primary" @click="goNext(form[(i - 1) * 5 + 3].docId)">查看详情</mu-button>
                    </mu-card>
                    <mu-card style="width: 100%; max-width: 200px;margin-left: 50px">
                      <mu-card-media :title="form[(i - 1) * 5 + 4].docName">
                        <img src="../assets/img/doctor.png">
                      </mu-card-media>
                      <mu-card-title :title="form[(i - 1) * 5 + 4].level"></mu-card-title>
                      <mu-button flat color="primary" @click="goNext(form[(i - 1) * 5 + 4].docId)">查看详情</mu-button>
                    </mu-card>
                  </div>
                </div>
                <div>
                  <div style="display: flex;margin-top: 20px">
                    <mu-card style="width: 100%; max-width: 200px">
                      <mu-card-media :title="form[(row - 1) * 5].docName">
                        <img src="../assets/img/doctor.png">
                      </mu-card-media>
                      <mu-card-title :title="form[(row - 1) * 5].level"></mu-card-title>
                      <mu-button v-if="hasData === true" flat color="primary" @click="goNext(form[(row - 1) * 5].docId)">查看详情</mu-button>
                    </mu-card>
                    <mu-card v-for='i in col - 1' style="width: 100%; max-width: 200px;margin-left: 50px">
                      <mu-card-media :title="form[(row - 1) * 5 + i].docName">
                        <img src="../assets/img/doctor.png">
                      </mu-card-media>
                      <mu-card-title :title="form[(row - 1) * 5 + i].level"></mu-card-title>
                      <mu-button flat color="primary" @click="goNext(form[(row - 1) * 5 + i].docId)">查看详情</mu-button>
                    </mu-card>
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
import DocNavMenu from "@/components/DocNavMenu";

export default {
  name: "DepartmentDetail",
  components: {DocNavMenu, NavMenu, MyHeader},
  data() {
    return {
      hasData: false,
      permission: 0,
      departmentName: '',
      departmentDesc: '',
      departmentId: 0,
      row: 0,
      col: 0,
      length: 1,
      form: [{
        docId: 0,
        docName: '暂无',
        level: '暂无'
      }]
    }
  },
  created() {
    this.judgePermission()
  },
  mounted() {
    this.getData()

  },
  methods: {
    goNext(doctorId){
      this.$router.push({path:'/DocDetail1',query : {doctorId: doctorId, departmentId: this.departmentId}})
    },
    callayout() {
      this.length = this.form.length
      this.row = Math.ceil(this.length / 5)
      this.col = this.length - (this.row - 1) * 5
    },
    changePermission(permission) {
      this.permission = permission
    },
    judgePermission() {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user) {
        this.permission = user.permission
      }
    },
    getData() {
      this.departmentId = this.$route.query.departmentId
      this.departmentName = this.$route.query.departmentName
      this.request.get('/department/description/' + this.departmentId).then(res => {
        if (res.code === '200') {
          this.departmentDesc = res.data.departmentDesc
        } else {
          this.$message.error(res.msg)
        }
      })
      this.request.get('/department/doc/' + this.departmentId).then(res => {
        if (res.code === '200'){
          this.hasData = true
          this.form = res.data
          this.length = this.form.length
          this.row = Math.ceil(this.length / 5)
          this.col = this.length - (this.row - 1) * 5
        }else{
          this.row = Math.ceil(this.length / 5)
          this.col = this.length - (this.row - 1) * 5
          this.$message.error(res.msg)
        }
      })
    },
    goBack(){
      this.$router.push('/DepartmentIntro')
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
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  width: 78%;
}
</style>