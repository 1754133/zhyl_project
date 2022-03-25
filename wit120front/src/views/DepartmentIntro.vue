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
          <el-input placeholder="请输入科室名" v-model="input1" style="width: 20%;margin-left: 1057px;margin-top: 20px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <div v-for="i in (row-1)">
            <div style="display: flex;justify-content: center;margin-top: 50px">
              <mu-button full-width style="width: 15%"
                         @click="goNext(form[(i-1)*5].departmentId, form[(i-1)*5].departmentName)">
                {{ form[(i - 1) * 5].departmentName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px"
                         @click="goNext(form[(i-1)*5+1].departmentId, form[(i-1)*5+1].departmentName)">
                {{ form[(i - 1) * 5 + 1].departmentName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px"
                         @click="goNext(form[(i-1)*5+2].departmentId, form[(i-1)*5+2].departmentName)">
                {{ form[(i - 1) * 5 + 2].departmentName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px"
                         @click="goNext(form[(i-1)*5+3].departmentId, form[(i-1)*5+3].departmentName)">
                {{ form[(i - 1) * 5 + 3].departmentName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px"
                         @click="goNext(form[(i-1)*5+4].departmentId, form[(i-1)*5+4].departmentName)">
                {{ form[(i - 1) * 5 + 4].departmentName }}
              </mu-button>
            </div>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 50px">
            <mu-button full-width style="width: 15%"
                       @click="goNext(form[(row-1)*5].departmentId, form[(row-1)*5].departmentName)">
              {{ form[(row - 1) * 5].departmentName }}
            </mu-button>
            <mu-button v-for='i in col - 1' full-width style="width: 15%;margin-left: 10px"
                       @click="goNext(form[(row-1)*5+i].departmentId, form[(row-1)*5+i].departmentName)">
              {{ form[(row - 1) * 5 + i].departmentName }}
            </mu-button>
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
  name: "DepartmentIntro",
  components: {DocNavMenu, NavMenu, MyHeader},
  data() {
    return {
      permission: 0,
      form: [],
      row: 0,
      col: 0,
      length: 0
    }
  },
  created() {
    this.judgePermission()
  },
  mounted() {
    this.showDepartment()
  },
  methods: {
    judgePermission() {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user) {
        this.permission = user.permission
      }
    },
    changePermission(permission) {
      this.permission = permission
    },
    goBack() {
      this.$router.push('/')
    },
    goNext(departmentId, departmentName) {
      this.$router.push({path: '/DepartmentDetail', query: {departmentId: departmentId, departmentName: departmentName}})
    },
    callayout() {
      this.length = this.form.length
      this.row = Math.ceil(this.length / 5)
      this.col = this.length - (this.row - 1) * 5
    },
    showDepartment() {
      this.request.get('/department').then(res => {
        if (res.code === '200') {
          this.form = res.data
          this.length = this.form.length
          this.row = Math.ceil(this.length / 5)
          this.col = this.length - (this.row - 1) * 5
        } else {
          this.$message.error(res.msg);
        }
      });
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