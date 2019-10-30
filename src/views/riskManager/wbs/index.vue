<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入WBS名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <el-button style="margin-left:0px" class="filter-item" size="mini" type="danger" icon="el-icon-delete">批量删除</el-button>
    </div>
    <!--表单组件,操作弹出框-->
    <eForm ref="form" :is-add="isAdd"/> 
    <!--表格渲染-->
    <tree-table :ifShow="ifShow" v-loading="loading" :data="data" :expand-all="expand"  :height="height" :columns="columns" size="small">
      <el-table-column v-if="checkPermission(['ADMIN','PERMISSION_ALL','PERMISSION_EDIT','PERMISSION_DELETE'])" label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button style="margin-right:-10px"  v-permission="['ADMIN','PERMISSION_ALL','PERMISSION_EDIT']"  size="mini" type="primary" icon="el-icon-plus" @click="add(scope.row.id)"/>
          <el-button  v-permission="['ADMIN','PERMISSION_ALL','PERMISSION_EDIT']" size="mini" type="warning" icon="el-icon-edit" @click="edit(scope.row)"/>
          <el-popover
            v-permission="['ADMIN','PERMISSION_ALL','PERMISSION_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="200">
            <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import treeTable from '@/components/TreeSelect' //公共表格
import initData from '@/mixins/initData' 
import { del } from '@/api/wbs'
import { parseTime } from '@/utils/index'
import eForm from './form'
export default {
  name: 'Permission',
  components: { treeTable, eForm },
  mixins: [initData],
  data() {
    return {
      ifShow:true,
      columns: [
        {
          text: '名称',
          value: 'name'
        },
        {
          text: '编码',
          value: 'num'
        },
        {
          text: '等级',
          value: 'level'
        }
      ],
      delLoading: false, expand: true, height: 625,
    }
  },
  created() {
    
    this.$nextTick(() => {
      this.height = document.documentElement.clientHeight - 200
      this.init()
    })
  },

  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/sysWbs'
      const sort = 'id,desc'
      const query = this.query //双向绑定值传递
      const value = query.value
      this.params = { page: this.page, size: this.size, sort: sort }
      if (value) { this.params['blurry'] = value }      
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    add(id) {
      this.isAdd = true    
     const _this = this.$refs.form
      _this.form = { id: id}
      _this.dialog = true
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.form = { id: data.id, name: data.name, num: data.num}
      _this.dialog = true
      
    },
    changeExpand() {
      this.expand = !this.expand
      this.init()
    },
  }
}
</script>

<style scoped lang="scss">

</style>
