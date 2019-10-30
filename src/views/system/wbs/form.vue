<template>
  <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="isAdd ? '新增WBS' : '编辑WBS'" append-to-body width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 360px;"/>
      </el-form-item>
      <el-form-item label="编码" prop="num">
        <el-input v-model="form.num" style="width: 360px;" disabled="false"/>
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="上级类目" v-show="false">
        <treeselect  :options="permissions" style="width: 360px;" placeholder="选择上级类目" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="text" @click="getId">按钮</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { add, edit, getPermissionTree } from '@/api/permission'
import { add, edit, getPermissionTree  } from '@/api/wbs'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false, permissions: [],
      form: { id:'',name: '', num: ''},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        // num: [
        //   { message: '请输入编码', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form.id,this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
//  doAdd() {
//       this.url = 'api/sysWbs'
//       const sort = 'id,desc'
//       const query = this.query //双向绑定值传递
//       const value = query.value
//       this.params = { page: this.page, size: this.size, sort: sort }
//       if (value) { this.params['blurry'] = value }      
//       return true
//     },

    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', num: '' }
    },
    getPermissions() {
      getPermissionTree().then(res => {
        this.permissions = []
        const permission = { id: 0, label: '顶级类目', children: [] }
        permission.children = res
        this.permissions.push(permission)
      })
    },
    getId(){
      console.log(this.form.id);
      
    }
  }
}
</script>

<style scoped>

</style>
