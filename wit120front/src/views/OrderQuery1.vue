<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <DocNavMenu isActive="3"></DocNavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="挂号查询界面" style="margin-left: 168px">
          </el-page-header>

          <div class="title">
            挂号信息
          </div>
          <div style="display: flex;justify-content: left;margin-top: 50px;margin-left:200px">
            <el-container>
              <el-main>
                <el-table
                    :data="tableData"
                    border
                    style="width: 80%;font-size:18px">
                  <el-table-column
                      fixed
                      prop="patientName"
                      label="病患姓名"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="doctorId"
                      label="医生编号"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="doctorName"
                      label="医生姓名"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="departmentName"
                      label="科室"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="orderTimeSlice"
                      label="预约时间段"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="orderTime"
                      label="预约日期"
                      width="220">
                  </el-table-column>
                  <el-table-column
                      prop="createTime"
                      label="预约单生成时间"
                      width="220">
                  </el-table-column>
                  <el-table-column
                      prop="cost"
                      label="花费"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="deal"
                      label="已处理"
                      width="100">
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      prop="detail"
                      label="操作"
                      width="240">
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.deal==='是'" @click="handleClick1(scope.row.orderId)" type="success">查看医技</el-button>
                      <el-button v-if="scope.row.deal==='否'" @click="handleClick1(scope.row.orderId)" type="success" disabled>查看医技</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
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
import DocNavMenu from "@/components/DocNavMenu";

export default {
  name: "orderQuery",
  components: {DocNavMenu, MyHeader},
  data() {
    return {
      technicianRecommend: '',
      recommendtech: [],
      formVisible: false,
      medicalrecord: '',
      prescription: '',
      patientId: 0,
      orderId: 0,
      tableData: []
    }
  },
  mounted() {
    this.patientId = this.$route.query.patientId
    this.orderId = this.$route.query.orderId
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.request.get('/user/orders/' + this.patientId).then(res => {
        if (res.code === '200') {
          this.tableData = this.handleTableData(res.data)
        }else{
          this.tableData = []
        }
      })
    },
    handleTableData(tableData) {
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
    goBack() {
      this.$router.push({path:'/Recipe',query : {orderId: this.orderId, patientId: this.patientId}})
    },
    handleClick1(orderId) {
      this.$router.push({path: '/TechQuery1', query : {orderId: orderId, patientId: this.patientId, thisOrderId: this.orderId}})
    }
  }
}
</script>

<style scoped>
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
  margin-top: 50px;
}

.demo-chip {
  margin: 8px;
  vertical-align: middle;
}
</style>