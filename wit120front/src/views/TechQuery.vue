<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <NavMenu isActive="5"></NavMenu>
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
                      fixed
                      prop="medResOrderId"
                      label="医技预约编号"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="medResName"
                      label="医疗资源名称"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="createTime"
                      label="预约单生成时间"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="orderTime"
                      label="日期"
                      width="70">
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
                      width="70">
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      prop="detail"
                      label="操作"
                      width="220">
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.deal === '是'" @click="handleClick1(scope.row.detail)" type="success">查看检查结果</el-button>
                      <el-button v-if="scope.row.deal === '否'" @click="handleClick1(scope.row.detail)" type="success" disabled>查看检查结果</el-button>
                      <span v-if="scope.row.deal==='否'"><el-button type="danger"
                                                                        @click.native.prevent="deleteRow(scope.$index, tableData)">取消预约</el-button></span>
                      <span v-if="scope.row.deal==='是'"><el-button type="danger" disabled>取消预约</el-button></span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-dialog title="预约结果" :visible.sync="formVisible" width="45%">
                  <el-input type="textarea" :rows="10" v-model="detail" readonly></el-input>
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
import NavMenu from "@/components/NavMenu";

export default {
  name: "TechQuery",
  components: {NavMenu, MyHeader},
  data() {
    return {
      formVisible: false,
      detail: '',
      patientId: '',
      tableData: []
    }
  },
  mounted() {
    this.showTableData()
  },
  methods: {
    handleTableData(tableData) {
      for (let item of tableData){
        if (item.noon === 1){
          item.noon = '上午'
        }else{
          item.noon = '下午'
        }
        if (item.deal === true){
          item.deal = '是'
        }else{
          item.deal = '否'
        }
      }
      return tableData
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
    sendPatientId() {
      this.request.post('', {patientId: this.patientId, orderId: this.orderId}).then(res => {
        if (res.code === '200') {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        } else {
          this.$message(res.msg)
        }
      })
    },
    showTableData() {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user){
        this.request.get('/medicalResource/appointment/' + user.userId).then(res => {
          if (res.code === '200') {
            this.tableData = this.handleTableData(res.data)
          } else {
            this.$message(res.msg);
          }
        })
      }else {
        this.$message('请先登录')
        this.$router.push('/')
      }
    },
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