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
      <tr>
            <th style="width:188px" bgcolor="#F9F9FA">表单名称</th>
            <th style="width:188px" colspan="3">{{this.checkInfo.name}}</th>
          </tr>
     <tr>
            <th style="width:188px" bgcolor="#F9F9FA">专业类型</th>
            <th style="width:188px">{{this.checkInfo.wbsName}}</th>
            <th style="width:188px" bgcolor="#F9F9FA">标准wbs</th>
            <th style="width:188px">{{this.checkInfo.sysWbsName}}</th>
          </tr>
      <table style="table-layout: fixed;">
        <thead style="backgroung-color:red">
          <tr bgcolor="#F9F9FA">
            <th style="width:52px">序号</th>
            <th style="width:100px">检查项</th>
            <th>检查内容</th>
            <th style="width:200px">控制类型</th>
          </tr>
        </thead>
        <tr v-for="(item,index) in this.checkInfo.label" :key="index">
           <td style="width:50px">{{index+1}}</td>
          <td style="width:200px">{{item.label}}</td>
          <td>
            <tbody v-for="(item,index) in item.listitem" :key="index">
              <td style="border-left:none;border-right:none;border-top:none;">{{item.checkstandard}}</td>
            </tbody>
          </td>
          <td style="width:200px">
            <tbody v-for="(item,index) in item.listitem" :key="index"  style="width:200px" >
              <td style="border-left:none;border-right:none;border-top:none;width:200px">{{item.controltype}}</td>
            </tbody>
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>
<script>
export default {
   props: {
    checkInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      formLabelWidth: "120px",
      info: [
        {
          itemm: "路面工程",
          sort:1,
          con: [
            { content: "请注意倒车", type: "主控项目" },
            { content: "请注意倒车", type: "主控项目" },
            { content: "请注意倒车", type: "主控项目" }
          ]
        },
        {
          itemm: "水利工程",
          sort:2,
          con: [
            { content: "111111111", type: "主控项目" },
            { content: "2222", type: "主控项目" },
            { content: "33333333333444444", type: "主控项目" },
            { content: "55555555555", type: "主控项目" }
          ]
        }
      ]
    };
  },
};
</script>
<style lang="scss" scoped>
table {
  margin: auto;
}
table,
td,
th {
  border-collapse: collapse;
  border: 1px solid #D9D9D9;
}
tr,
th,
td {
  width: 400px;
  line-height: 30px;
  height: 100%;
  text-align: center;
  vertical-align: auto;
}
*, *:before, *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
    padding-bottom: 0;
}
.title{
  width: 100px;
}
</style>