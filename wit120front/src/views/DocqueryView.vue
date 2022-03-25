<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <MyHeader></MyHeader>
      <DocNavMenu isActive="5"></DocNavMenu>
      <el-main style="background-color: #FFFFFF">
        <div style="height: 100%">
          <el-page-header @back="goBack" content="医技结果查询界面" style="margin-left: 168px">
          </el-page-header>

            <!-- <div class="title">
                患者医技预约信息
            </div> -->
          <div style="display: flex;justify-content: center;margin-top: 30px ">
            <span style="font-size: 20px;font-weight: bold ">患者医技结果查询</span>
          </div>
         <div style="display: flex;justify-content: left;margin-top: 15px;margin-left:320px">
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
                            prop="day"
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
                            fixed="right"
                            prop="detail"
                            label="预约结果"
                            width="140">
                        <template slot-scope="scope">
                            <el-button @click="handleClick1(scope.row.detail)" type="text" >查看</el-button>
                            <!-- <span v-if="scope.row.detail==='预约成功'"><el-button  type="danger" @click.native.prevent="deleteRow(scope.$index, tableData)" >删除</el-button></span>
                            <span v-if="scope.row.detail==='预约失败'"><el-button  type="danger" disabled>删除</el-button></span> -->
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
import DocNavMenu from "@/components/DocNavMenu";

export default {
  name: "DocqueryView",
  components: {DocNavMenu, MyHeader},
  data(){
      return{
        formVisible:false,
        detail:'',
        patientId:'',

        tableData:[{
            medResOrderId:'1',
            medResName:'2',
            createTime:'3',
            day:'4',
            noon:'5',
            cost:'6',
        //   handle:'是',
            detail:"预约成功"
        },
        {
            medResOrderId:'1',
            medResName:'2',
            createTime:'3',
            day:'4',
            noon:'5',
            cost:'6',
        //   handle:'否',
            detail:"预约失败"
        },]
      }
  },
  mounted(){
      this.sendPatientId
  },
  methods:{
    goBack(){
      this.$router.push('/Recipel')
    },
    handleClick1(data) {
        this.detail=data
        this.formVisible=true
      },
    deleteRow(index, rows) {//删除改行
            rows.splice(index, 1);
            },
    sendPatientId(){
        this.request.post('', {patientId:this.patientId,orderId:this.orderId}).then(res =>{
            if (res.code === '200'){
            this.$message({
                message: '发送成功',
                type: 'success'
            })
            }else{
            this.$message(res.msg)
            }
        })
    },
    showTableData() {
      this.request.get('').then(res =>{
      if (res.code === '200'){
        this.tableData = res.data.table
      }else{
        this.$message(res.msg);
      }
    });
    },
  }
}
</script>

<style scoped>
.title{
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