<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="margin-left:30px;margin-top:10px"
    >
      <el-form-item label="表单名称">
        <el-input placeholder="请输入表单名称" v-model="formInline.user" style="width:600px" maxlength="30" clearable='true'></el-input>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="margin-left:30px;margin-top:-10px"
    >
      <el-form-item label="专业类型">
        <el-input v-model="formInline.user" placeholder="请先选择专业类型" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="标准wbs">
        <el-select v-model="formInline.region" placeholder="请选择标准wbs" style="width:300px">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form style="margin-left:30px;margin-top:-10px;margin-right:30px">
      <el-form-item label="表单内容">
        <table style="table-layout: fixed;">
          <thead style="backgroung-color:red">
            <tr bgcolor="#F9F9FA">
              <th style="width:52px">序号</th>
              <th style="width:150px">检查项</th>
              <th>检查内容</th>
              <th style="width:200px">控制类型</th>
              <th style="width:150px">操作</th>
            </tr>
          </thead>
          <tr>
            <td style="width:50px">111</td>
            <td style="width:150px">
              <el-select v-model="formInline.region" placeholder="请选择检查项" style="width:150px;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </td>
            <td>
              <tbody>
                <td style="border-left:none;border-right:none;border-top:none;border-bottom:none;">333</td>
              </tbody>
            </td>
            <td style="width:150px">
              <tbody>
                <td style="border-left:none;border-right:none;border-top:none;border-bottom:none;width:150px">4444</td>
              </tbody>
            </td>
            <td style="width:140px">
              <tbody>
                   <!-- style="margin-left:10%;margin-right:9%" -->
                <span style="margin-left:12px;margin-right:20px">添加下一行</span>
                <span>删除</span>
              </tbody>
            </td>
          </tr>
        </table>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="scss" scoped>
table,
td,
th {
  border-collapse: collapse;
  border: 1px solid #d9d9d9;
}
tr,
th,
td {
  width: 300px;
  line-height: 30px;
  height: 100%;
  text-align: center;
  vertical-align: auto;
  color: #606266;
}
</style>