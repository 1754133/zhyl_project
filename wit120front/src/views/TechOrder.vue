<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <NavMenu isActive="4"></NavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="选择医技界面" style="margin-left: 168px">
          </el-page-header>
          <el-input placeholder="请输入医技名称" v-model="input1" style="width: 20%;margin-left: 1057px;margin-top: 20px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <div v-for="i in (row-1)">
            <div style="display: flex;justify-content: center;margin-top: 50px">
              <mu-button full-width style="width: 15%" @click="goNext(form[(i-1)*5])">{{ form[(i - 1) * 5].technicianName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px" @click="goNext(form[(i-1)*5+1])">
                {{ form[(i - 1) * 5 + 1].technicianName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px" @click="goNext(form[(i-1)*5+2])">
                {{ form[(i - 1) * 5 + 2].technicianName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px" @click="goNext(form[(i-1)*5+3])">
                {{ form[(i - 1) * 5 + 3].technicianName }}
              </mu-button>
              <mu-button full-width style="width: 15%;margin-left: 10px" @click="goNext(form[(i-1)*5+4])">
                {{ form[(i - 1) * 5 + 4].technicianName }}
              </mu-button>
            </div>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 50px">
            <mu-button full-width style="width: 15%" @click="goNext(form[(row-1)*5])">{{form[(row-1)*5].technicianName}}</mu-button>
            <mu-button v-for='i in col - 1' full-width style="width: 15%;margin-left: 10px"
                       @click="goNext(form[(row-1)*5+i])">{{ form[(row-1)*5+i].technicianName }}
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

export default {
  name: "TechOrder",
  components: {NavMenu, MyHeader},
  data() {
    return {
      orderId: 0,
      input1: '',
      form: [],
      row: 0,
      col: 0,
      length: 0,
    }
  },
  mounted() {
    this.showTech()
    this.orderId = this.$route.query.orderId
  },
  methods: {
    goBack() {
      this.$router.push('/OrderQuery')
    },
    goNext(data) {
      this.$router.push({path: '/TechScheduling', query: {tech: data.technicianName, orderId: this.orderId}})
    },
    callayout() {
      this.length = this.form.length
      this.row = Math.ceil(this.length / 5)
      this.col = this.length - (this.row - 1) * 5
    },
    showTech() {
      this.request.get('/medicalResource').then(res => {
        if (res.code === '200') {
          this.form = res.data
          this.length = this.form.length
          this.row = Math.ceil(this.length / 5)
          this.col = this.length - (this.row - 1) * 5
        } else {
          this.$message(res.msg);
        }
      });
    },
  }
}
</script>

<style scoped>
.el-main {
  padding: 0;
  flex-grow: 1;
}
</style>