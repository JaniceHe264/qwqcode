<template>
  <div class="admin-menu">
    <el-row>
      <el-button type="success" size="large" @click="toAddMenu">添加菜单</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="menuList"
        style="width: 100%; margin-top: 20px"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="treeProps"
        v-loading="loading"
      >
        <el-table-column label="序号" width="100">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="菜单名" prop="name"></el-table-column>
        <el-table-column label="菜单URL" prop="path"></el-table-column>
        <el-table-column label="菜单组件路由" prop="componentPath"></el-table-column>
        <el-table-column label="权限" prop="perms"></el-table-column>
        <el-table-column label="类型">
          <template #default="scope">
            <div v-if="scope.row.type == 0">
              <el-tag type="info">目录</el-tag>
            </div>
            <div v-if="scope.row.type == 1">
              <el-tag type="success">菜单</el-tag>
            </div>
            <div v-if="scope.row.type == 2">
              <el-tag type="primary">按钮</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="orderNum"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <div>
              <el-switch
                v-model="scope.row.status"
                class="ml-2"
                inline-prompt
                active-text="启"
                inactive-text="禁"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeStatus($event , scope.row)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="primary" size="small" @click="toEdit(scope.row)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      width="35%"
      :lock-scroll="false"
    >
      <el-form :model="menuForm" ref="menuForm" label-position="right" label-width="100px" :rules="rules">
        <el-form-item label="上级菜单" prop="parentId">
          <el-cascader :options="options" :props="{label: 'name', value: 'id',checkStrictly: true}"
                       placeholder="请选择上级菜单(除目录外，都需要有上级菜单)" style="width: 100%" v-model="menuForm.parentId"
                       clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="菜单名" prop="name">
          <el-input v-model="menuForm.name" placeholder="请输入菜单名"/>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="menuForm.path" placeholder="请输入菜单路径(类型为菜单时必填)"/>
        </el-form-item>
        <el-form-item label="菜单权限" prop="perms">
          <el-input v-model="menuForm.perms" placeholder="请输入菜单权限"></el-input>
        </el-form-item>
        <el-form-item label="菜单组件路径" prop="componentPath">
          <el-input v-model="menuForm.componentPath" placeholder="请输入菜单组件路径(类型为菜单时必填)"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-select v-model="menuForm.type" style="width: 100%" clearable placeholder="请选择菜单类型">
            <el-option
              v-for="item in menuType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="menuForm.icon" placeholder="请输入图标"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menuForm.orderNum" placeholder="请输入排序"/>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="menuForm.status"
            class="ml-2"
            inline-prompt
            active-text="启"
            inactive-text="禁"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="success" @click="save('menuForm')">保存</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {saveMenu, getMenuList} from "@/api/menu";
import {allMenu} from '@/config'

export default {
  name: "AdminMenuList",
  data() {
    const checkParent = (rule, value, callback) => {
      if (this.menuForm.type != 0) {
        if (this.menuForm.parentId == '') {
          callback(new Error("请选择一个上级菜单"))
        }
      }
      callback()
    }

    const checkComponentPath = (rule, value, callback) => {
      if (this.menuForm.type == 1) {
        if (value.trim() == '') {
          callback(new Error("请输入组件路径"))
        }
      }
      callback()
    }

    const checkPath = (rule, value, callback) => {
      if (this.menuForm.type == 1) {
        if (value.trim() == '') {
          callback(new Error("请输入菜单路由路径"))
        }
      }
      callback()
    }

    return {
      allMenu: allMenu,
      loading: false,
      menuType: [
        {
          label: '目录',
          value: 0
        }, {
          label: '菜单',
          value: 1
        }, {
          label: '按钮',
          value: 2
        }],
      menuForm: {
        id: null,
        parentId: '',
        name: '',
        path: '',
        perms: '',
        componentPath: '',
        type: 0,
        icon: '',
        orderNum: '',
        status: true
      },
      dialogVisible: false,
      options: [],
      treeProps: {
        children: 'children',
        hasChildren: 'hasChildren'
      },
      menuList: [],
      rules: {
        parentId: [
          {validator: checkParent, trigger: 'blur'}
        ],
        name: [{required: true, message: '请输入菜单名', trigger: 'blur'}],
        path: [{
          required: false, max: 50, message: '最多五十个字符', trigger: 'blur'
        }, {
          validator: checkPath, trigger: 'blur'
        }],
        perms: [{
          required: true, message: '请输入菜单权限', trigger: 'blur'
        }],
        componentPath: [{
          required: false, max: 100, message: '最多输入一百个字符', trigger: 'blur'
        }, {
          validator: checkComponentPath, trigger: 'blur'
        }],
        type: [{
          required: true, message: '请选择菜单类型', trigger: 'blur'
        }],
        icon: [{
          required: false, message: '请输入图标地址', trigger: 'blur'
        }],
        status: [{
          required: true, message: '请选择状态', trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  created() {
    this.getMenuData();
  },
  mounted() {
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      if (newVal) {
        this.getOptions()
      }
    }
  },
  methods: {
    changeStatus(status, data) {
      saveMenu(data).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: '修改成功',
            type: 'success'
          })
        } else {
          data.status = !data.status;
        }
      })
    },
    toEdit(data) {
      this.dialogVisible = true;
      this.menuForm = JSON.parse(JSON.stringify(data))
    },
    load(row, treeNode, resolve) {
      setTimeout(() => {
        resolve(row.children)
      }, 100)
    },
    getMenuData() {
      this.loading = true;
      setTimeout(() => {
        getMenuList(this.allMenu, true).then(res => {
          if (res.code == 200) {
            this.menuList = res.data;
            console.log(this.menuList)
          }
          this.loading = false;
        })
      }, 500)
    },
    getOptions() {
      getMenuList('no' + this.allMenu, false).then(res => {
        if (res.code == 200) {
          this.options = res.data;
        }
      })
    },
    save(formName) {
      const data = JSON.parse(JSON.stringify(this.menuForm))
      if (data.parentId.length > 0) {
        data.parentId = data.parentId[data.parentId.length - 1]
      }
      this.$refs[formName].validate(flag => {
        if (flag) {
          saveMenu(data).then(res => {
            if (res.code == 200) {
              this.$notify({
                title: '提示',
                message: '保存成功',
                type: 'success'
              })
            }
            this.dialogVisible = false;
            this.getMenuData();
          })
        }
      })
    },
    toAddMenu() {
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped lang="scss">
</style>
