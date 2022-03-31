<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <DocNavMenu isActive="5"></DocNavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="病房信息查询界面" style="margin-left: 168px">
          </el-page-header>
          <div class="title">
            病房信息详情
          </div>
          <div style="display: flex;justify-content: left;margin-top: 50px;margin-left:150px">
            <el-container>
              <el-main>
                <el-table
                    :data="tableData"
                    border
                    style="width: 90%;font-size:18px">
                  <el-table-column
                      prop="wardId"
                      label="病房号"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="bedId"
                      label="床位号"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="patientName"
                      label="患者姓名"
                      width="150">
                  </el-table-column>
                  <el-table-column
                      prop="gender"
                      label="性别"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="age"
                      label="年龄"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="createTime"
                      label="入院时间"
                      width="220">
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      prop="detail"
                      label="操作"
                      width="220">
                    <template slot-scope="scope">
                      <el-button @click="onSubmit(scope.row.patientId)" type="success">编辑查房记录</el-button>
                      <el-button @click="deleteRow(scope.row.patientId)" type="danger">出院</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <el-dialog title="编辑查房信息内容" :visible.sync="formVisible" width="45%">
                  <el-input type="textarea" :rows="10" v-model="detail"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="formVisible=false">取 消</el-button>
                    <el-button type="primary" @click="submitEdit">保 存</el-button>
                  </div>
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
import DocNavMenu from "@/components/DocNavMenu";

export default {
  name: "WardQuery",
  components: {DocNavMenu, MyHeader},
  data() {
    return {
      formVisible: false,
      detail: '',
      //医生个人ID
      doctorId: 0,

      tableData: [],
      patientId: 0
    }
  },
  mounted() {
    this.showTableData()
  },
  methods: {
    handleTableData(tableData) {
      for (let item of tableData) {
        if (item.gender === true) {
          item.gender = '男'
        } else {
          item.gender = '女'
        }

      }
      return tableData
    },

    goBack() {
      this.$router.push('/')
    },
    onSubmit(patientId) {
      this.request.get('/ward/checkRecord/' + patientId).then(res => {
        this.patientId = patientId
        this.formVisible = true
        if (res.code === '200'){
          this.detail = res.data
        }else{
          this.detail = ''
          this.$message.error(res.msg)
        }
      })
    },
    showTableData() {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      if (user) {
        this.request.get('/ward/patientInfo/' + user.userId).then(res => {
          if (res.code === '200') {
            this.tableData = this.handleTableData(res.data)
          } else {
            this.tableData = []
            this.$message(res.msg);
          }
        })
      } else {
        this.$message('请先登录')
        this.$router.push('/')
      }
    },
    deleteRow(patientId){
      this.$confirm('此操作将让该病人出院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete('/ward/wardInfo/' + patientId).then(res => {
          if (res.code === '200'){
            this.$message({
              message: '出院成功',
              type: 'success'
            })
            this.showTableData()
          }else{
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    submitEdit() {
      let params = new FormData()
      params.append('patientId', this.patientId)
      params.append('checkRecord', this.detail)
      this.request.post('/ward/checkRecord', params).then(res => {
        if (res.code === '200') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.formVisible = false
          this.detail = ''
        } else {
          this.$message.error(res.msg)
        }
      })
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