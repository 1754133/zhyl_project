<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <DocNavMenu isActive="3"></DocNavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="患者预约管理界面" style="margin-left: 168px">
          </el-page-header>
          <div style="display: flex;justify-content: center;margin-top: 30px">
            <div style="display: flex;justify-content: center;width: 79%">
              <el-table
                  :data="tableData"
                  style="width: 100%"
                  height="250">
                <el-table-column
                    prop="orderTime"
                    label="申请日期"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="patientName"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="departmentName"
                    label="科室"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="orderTimeSlice"
                    label="时间段"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="deal"
                    label="已处理"
                    width="120">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="选项"
                    width="200">
                  <template slot-scope="scope">
                    <el-button
                        type="text" size="small" @click="goNext(scope.row)">处理挂号
                    </el-button>
                    <el-button v-if="scope.row.deal === '否'"
                        type="text" size="small" @click="handleDelete(scope.row.orderId)">过号
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import DocNavMenu from "@/components/DocNavMenu";

export default {
  name: "PatientInfoView",
  components: {DocNavMenu, MyHeader},
  data() {
    return {
      date: '',
      tableData: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    handleTableData(tableData){
      for (let item of tableData){
        if (item.gender === true){
          item.gender = '男'
        }else{
          item.gender = '女'
        }
        if (item.deal === true){
          item.deal = '是'
        }else{
          item.deal = '否'
        }
        if (item.orderTimeSlice === 1){
          item.orderTimeSlice = '8:00-9:00'
        }else if (item.orderTimeSlice === 2){
          item.orderTimeSlice = '9:00-10:00'
        }else if (item.orderTimeSlice === 3){
          item.orderTimeSlice = '10:00-11:00'
        }else if (item.orderTimeSlice === 4){
          item.orderTimeSlice = '14:00-15:00'
        }else if (item.orderTimeSlice === 5){
          item.orderTimeSlice = '15:00-16:00'
        }else{
          item.orderTimeSlice = '16:00-17:00'
        }
      }
      return tableData
    },
    getTableData(){
      this.date = this.getCurrentDate()
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user){
        this.request.get('/doctor/todayPatient/' + user.userId + '/' + this.date).then(res => {
          if (res.code === '200'){
            console.log(res.data)
            this.tableData = this.handleTableData(res.data)
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{
        this.$message('请先登录')
        this.$router.push('/')
      }
    },
    getCurrentDate(n) {
      let dd = new Date();
      if (n) {
        dd.setDate(dd.getDate() - n);
      }
      let year = dd.getFullYear();
      let month =
          dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      let day = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return year + "-" + month + "-" + day;
    },
    goBack() {
      this.$router.push('/')
    },
    goNext(row) {
      this.$router.push({path:'/Recipe',query : {orderId: row.orderId, patientId: row.patientId}})
    },
    handleDelete(orderId) {
      this.$confirm('此操作将跳过该患者挂号信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete('/order/appointment/' + orderId).then(res => {
          if (res.code === '200') {
            this.$message({
              message: '过号成功',
              type: 'success'
            })
            this.getTableData()
          } else {
            this.$message.error(res.code)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
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