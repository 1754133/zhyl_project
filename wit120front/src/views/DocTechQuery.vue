<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <DocNavMenu1 isActive="2"></DocNavMenu1>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="医疗技术预约界面" style="margin-left: 168px">
          </el-page-header>

          <div class="title">
            医技预约信息
          </div>
          <div style="display: flex;justify-content: left;margin-top: 50px;margin-left:300px">
            <el-container>
              <el-main>
                <el-table
                    :data="tableData"
                    border
                    style="width: 70%;font-size:18px">
                  <el-table-column
                      prop="medResOrderId"
                      label="预约单编号"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="orderTime"
                      label="预约时间"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="medResName"
                      label="医疗资源名称"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="patientName"
                      label="病患名称"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="createTime"
                      label="预约单生成时间"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="noon"
                      label="时间"
                      width="70">
                  </el-table-column>
                  <el-table-column
                      prop="cost"
                      label="花费"
                      width="70">
                  </el-table-column>
                  <el-table-column
                      prop="deal"
                      label="已处理"
                      width="100">
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      label="操作"
                      width="140">
                    <template slot-scope="scope">
                      <el-button @click="handleClick1(scope.row.deal)" type="success">处理</el-button>
                      <span v-if="scope.row.deal==='否'"><el-button type="danger"
                                                                   @click.native.prevent="deleteRow(scope.$index, tableData)">过号</el-button></span>
                      <span v-if="scope.row.deal==='是'"><el-button type="danger" disabled>过号</el-button></span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-dialog title="检查结果" :visible.sync="formVisible" width="45%">
                  <el-input type="textarea" :rows="10" v-model="result" placeholder="请填入检查结果"></el-input>
                </el-dialog>


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
import DocNavMenu1 from "@/components/DocNavMenu1";

export default {
  name: "DocTechQuery",
  components: {DocNavMenu1, MyHeader},
  data() {
    return {
      date: '',
      formVisible: false,
      detail: '',
      patientId: '',
      result: '',
      tableData: [/*{
        medResOrderId: '1',
        orderId: '23',
        patientId: '23',
        medResId: '4',
        orderTime: '51',
        patientName: '',
        medResName: '2',
        createTime: '3',
        day: '4',
        noon: '5',
        cost: '6',
        deal: '是',
      },
        {
          medResOrderId: '1',
          orderId: '2323',
          patientId: '2324',
          medResId: '24',
          orderTime: '2525',
          patientName: '222',
          medResName: '2',
          createTime: '3',
          day: '4',
          noon: '5',
          cost: '6',
          deal: '否',
        },*/]
    }
  },
  created() {
    this.showTableData()
  },
  methods: {
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
    handleClick1(data) {
      this.detail = data
      this.formVisible = true
    },
    deleteRow(index, rows) {//删除改行
      rows.splice(index, 1);
    },
    calweekday(weekday) {
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
    },
    calnoon(noon) {
      if (noon === 1) {
        return '上午'
      } else {
        return '下午'
      }
    },
    showTableData() {
      this.date = this.getCurrentDate()
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user){
        this.request.get('/medicalResource/orders/' + user.userId + '/' + this.date).then(res => {
          if (res.code === '200') {
            this.tableData = res.data
            for (let item of this.tableData) {
              item.noon = this.calnoon(item.noon)
              if (item.deal === false){
                item.deal = '否'
              }else {
                item.deal = '是'
              }
            }
          } else {
            this.$message(res.msg);
          }
        })
      }else{
        this.$message('请先登录')
        this.$router.push('/')
      }
    },
    // sendPatientId(){
    //     this.request.post('', {patientId:this.patientId,orderId:this.orderId}).then(res =>{
    //         if (res.code === '200'){
    //         this.$message({
    //             message: '发送成功',
    //             type: 'success'
    //         })
    //         }else{
    //         this.$message(res.msg)
    //         }
    //     })
    // },
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
</style>