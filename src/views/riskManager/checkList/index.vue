<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container" v-show="this.switch">
      <!-- 搜索 -->
      <el-input
        v-model="query.value"
        clearable
        placeholder="输入检查单名称搜索"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="toQuery"
      />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
      >搜索</el-button>
      <!-- 新增 -->
      <div
        v-permission="['ADMIN','USERJOB_ALL','USERJOB_CREATE']"
        style="display: inline-block;margin: 0px 2px;"
      >
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >新增</el-button>
      </div>
      <!-- 新增 -->
      <div
        v-permission="['ADMIN','USERJOB_ALL','USERJOB_CREATE']"
        style="display: inline-block;margin: 0px 2px;"
      >
        <el-button
          class="filter-item"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="del"
        >批量删除</el-button>
      </div>
    </div>
    <!--表单组件-->
    <!-- <eForm ref="form" :is-add="isAdd" :dicts="dicts"/> -->
    <checkInfo  ref="forms" :checkInfo="this.checkInfo" :dicts="dicts"/>
    <!--表格渲染-->
    <el-table :data="this.data" v-loading="loading" size="small" border stripe style="width: 100%;" v-show="this.switch">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="name" label="检查单名称" width="150" align="center"></el-table-column>
      <el-table-column prop="sysWbsName" label="专业类型" width="180" align="center"></el-table-column>
      <el-table-column prop="wbsName" label="标准wbs" align="center"></el-table-column>
      <el-table-column prop="createdBy" label="创建人" align="center"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkPermission(['ADMIN','USERJOB_ALL','USERJOB_EDIT','USERJOB_DELETE'])"
        label="操作"
        width="160px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <!-- 详情 -->
          <el-button
            style="margin-right:-10px"
            v-permission="['ADMIN','USERJOB_ALL','USERJOB_EDIT']"
            size="mini"
            type="primary"
            icon="el-icon-info"
            @click="info(scope.row.id)"
          />
          <!-- 编辑 -->
          <!-- <router-link to="/checkForm"> -->
          <el-button
            v-permission="['ADMIN','USERJOB_ALL','USERJOB_EDIT']"
            size="mini"
            type="warning"
            icon="el-icon-edit"
            :loading="loading"
            @click="edit"
          />
          <!-- 删除 -->
          <el-popover
            v-permission="['ADMIN','USERJOB_ALL','USERJOB_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180"
          >
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button
                :loading="delLoading"
                type="primary"
                size="mini"
                @click="subDelete(scope.row.id)"
              >确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
      v-show="this.switch"
    />
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import initDict from "@/mixins/initDict";
import { del,getAllInfo} from "@/api/riskCheck";
import { parseTime } from "@/utils/index";
// import eForm from "./form";
import checkInfo from "./checkInfo";
export default {
  name: "Job",
  // eForm,
  components: {checkInfo},
  mixins: [initData, initDict],
  data() {
    return {
      loading:false,
      checkInfo:null,
      switch:"true",
      delLoading: false,
      enabledTypeOptions: [
        { key: "true", display_name: "正常" },
        { key: "false", display_name: "禁用" }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
      // 加载数据字典
      this.getDict("job_status");
    });
  },
  methods: {
    getMsgFormSon(data){
       this.switch = data
       console.log(this.switch)
    },
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = "api/riskChecklists";
      const sort = "createdTime,desc";
      this.params = { page: this.page, size: this.size, sort: sort }; //异步传参
      const query = this.query;
      const value = query.value;
      const enabled = query.enabled;
      if (value) {
        this.params["name"] = value;
      }
      if (enabled !== "" && enabled !== null) {
        this.params["enabled"] = enabled;
      }
      return true;
    },
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then(res => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.dleChangePage();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500
          });
        })
        .catch(err => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
    info(id) {
        if (id === null || id === undefined) {
            this.$refs.forms.dialogTableVisible = false;
          }else{
              this.$refs.forms.dialogTableVisible = true;
      getAllInfo(id).then(res=>{
        this.checkInfo=res
        console.log(this.checkInfo);      
      })
          }
    
    },
    add() {
      this.isAdd = true;
      this.$refs.form.getDepts();
      this.$refs.form.dialog = true;
    },
    edit() {
      // alert('1  0')
      this.$router.push('/riskManager/checkForm')

      // this.isAdd = false;//判断标题
      // const _this = this.$refs.form;//获取表单
      // _this.form = {
      //   id: data.id,
      //   name: data.name,
      //   sysWbsName: data.sysWbsName,
      //   wbsName: data.wbsName
      // };
      // _this.dialog = true;
      
    }
  }
};
</script>

<style scoped>
</style>
