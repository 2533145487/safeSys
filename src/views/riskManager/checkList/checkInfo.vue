<template>
  <div>
    <el-dialog
      title="详情"
      :visible.sync="dialogTableVisible"
      width="60%"
      modal="modal"
      :close-on-click-modal="false"
      :before-close="cancel"
      append-to-body
    >
      <el-table :data="gridData" border stripe>
        <el-table-column  label="序号" width="150"></el-table-column>
        <el-table-column property="name" label="检查项" width="200"></el-table-column>
        <el-table-column property="address" label="检查内容"></el-table-column>
        <el-table-column property="address" label="控制类型"></el-table-column>
      </el-table>
      <!-- <button @click="btn">按钮</button> -->
    </el-dialog>
  </div>
</template>
<script>
import { getInfo } from "@/api/riskCheck";
export default {
  data() {
    return {
      dialogTableVisible: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods:{
    //   btn(){
    //       console.log(infoID);
          
    //   }
  }
};
</script>