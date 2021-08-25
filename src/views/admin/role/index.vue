<template>
  <div class="admin-role">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入搜索关键字" size="large" clearable v-model="name"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="success" size="large" @click="search">搜索</el-button>
        <el-button type="primary" size="large" @click="create">新建</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="roleList" style="width: 100%" v-loading="loading" table-layout="auto">
        <el-table-column label="序号" fixed width="80">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名" width="200"/>
        <el-table-column prop="code" label="角色编码" width="200"/>
        <el-table-column prop="remark" label="备注" width="300"/>
        <el-table-column prop="level" label="角色等级" width="150"/>
        <el-table-column prop="createTime" label="创建时间" width="300"/>
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="success" @click="setAuth(scope.row)">分配权限</el-button>
              <el-button type="warning" @click="toEdit(scope.row)">编辑角色</el-button>
              <el-button type="danger" @click="del(scope.row.id)">删除角色</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box">
        <el-pagination
          hide-on-single-page
          v-model:currentPage="page.current"
          :page-size="page.size"
          background
          layout="prev, pager, next, total, sizes, jumper"
          :total="page.total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
      <el-dialog
        v-model="dialogVisible"
        title="分配权限"
        destroy-on-close
        width="35%"
      >
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          ref="tree"
          node-key="id"
          empty-text="加载中，请稍后"
          :props="props"
          check-on-click-node
          check-strictly
          @check="checkChange"
        ></el-tree>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="success" @click="saveAuth">保存</el-button>
      </span>
        </template>
      </el-dialog>
      <el-dialog
        v-model="addDialogVisible"
        title="编辑角色"
        destroy-on-close
        width="35%"
      >
        <el-form :model="roleForm" ref="roleForm" :rules="rules" label-width="80px" label-position="right">
          <el-form-item label="角色名" prop="name">
            <el-input placeholder="请输入角色名..." v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="角色编码">
            <el-input placeholder="请输入角色编码..." v-model="roleForm.code"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <el-input placeholder="请输入备注..." v-model="roleForm.remark"></el-input>
          </el-form-item>
          <el-form-item prop="level" label="等级">
            <el-input placeholder="请输入角色等级..." v-model="roleForm.level"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="success" @click="saveRoleData('roleForm')">保存</el-button>
          </span>
        </template>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import {getRoleList, setRoleMenu, saveRole, delRole} from "@/api/role";
import {getMenuList, getMenuListByRoleId} from "@/api/menu";
import {allMenu} from '@/config'
import {delAdminUser} from "@/api/user";

export default {
  name: "AdminRole",
  data() {
    return {
      roleForm: {
        name: '',
        code: '',
        remark: '',
        level: ''
      },
      rules: {
        name: [{required: true, message: '请输入角色名', trigger: 'blur'}, {max: 30, message: '最多输入三十个字符', trigger: 'blur'}],
        code: [{required: true, message: '请输入角色编码', trigger: 'blur'}, {max: 30, message: '最多输入三十个字符', trigger: 'blur'}],
        remark: [{required: false, max: 100, message: '最多输入100个字符', trigger: 'blur'}],
        level: [{required: false, pattern: /^[1-9][\d]{0,5}$/, message: '请输入6位数以下(包含六位数)的正整数', trigger: 'blur'}]
      },
      addDialogVisible: false,
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
      },
      dialogVisible: false,
      allMenu: allMenu,
      loading: false,
      name: '',
      page: {
        current: 1,
        size: 10,
        total: 0,
        pages: 1
      },
      roleList: [],
      menuList: [],
      curRole: null
    }
  },
  created() {
    this.getRoleData()
    this.getMenuData();
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      if (!newVal) {
        this.curRole = null
        this.$refs.tree.setCheckedNodes([])
      }
    },
    addDialogVisible(newVal, oldVal) {
      if (!newVal) {
        this.roleForm = {
          name: '',
          code: '',
          remark: '',
          level: ''
        }
      }
    }
  },
  methods: {
    toEdit(data) {
      this.roleForm = JSON.parse(JSON.stringify(data));
      this.addDialogVisible = true;
    },
    del(id) {
      this.$confirm("确定删除该角色吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        delRole(id).then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
          }
          this.getRoleData();
        })
      }).catch(() => {
      })
    },
    saveRoleData(formName) {
      this.$refs[formName].validate(flag => {
        if (flag) {
          saveRole(this.roleForm).then(res => {
            if (res.code == 200) {
              this.$notify({
                title: '提示',
                message: '保存成功',
                type: 'success'
              })
              this.getRoleData()
              this.addDialogVisible = false;
            }
          })
        }
      })
    },
    create() {
      this.addDialogVisible = true;
    },
    setRoleDefaultMenu(role) {
      getMenuListByRoleId(role.id).then(res => {
        if (res.code == 200) {
          res.data.forEach(item => {
            this.$refs.tree.setChecked(item.id, true, false)
          })
        }
      })
    },
    saveAuth() {
      const result = this.$refs.tree.getCheckedKeys()
      setRoleMenu({
        menuIds: result,
        roleId: this.curRole.id
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
        }
        this.dialogVisible = false;
      })
    },
    setAuth(data) {
      this.curRole = data;
      this.$nextTick(() => {
        this.setRoleDefaultMenu(data);
      })
      this.dialogVisible = true;
    },
    checkChange(a) {
      const self = this
      const anode = this.$refs.tree.getNode(a)
      if (anode.checked) {//删除选中的
        this.setParentChecked(anode.parent)
        //点击权限子节点
        anode.childNodes.map(res => {
          res.checked = true
        })
      } else {//新增选中的
        this.deleteParentChecked(anode.parent)
        this.deleteChildChecked(anode.childNodes)
      }
    },
    setParentChecked(parent) {//如果不是全选中为父级添加半选状态，如果子集全选后，父级也要全选
      const fnode = this.$refs.tree.getNode(parent)
      const isAllChecked = fnode.childNodes.every(k => k.checked && k.indeterminate === false)//子集是否是全选
      if (!fnode.isLeaf) {
        fnode.indeterminate = !isAllChecked//子集是否是全选，如果子集全选，则半选状态为假
        fnode.checked = true
      }
      if (fnode.parent) {
        this.setParentChecked(fnode.parent)
      }
    },
    deleteParentChecked(parent, d = false) {//如果取消子节点的选中， 设置父级节点选中状态
      const fnode = this.$refs.tree.getNode(parent)
      const isAllChecked = fnode.childNodes.some(k => d ? (k.checked || k.indeterminate) : k.checked)//子集是否是全选
      if (!fnode.isLeaf) {
        fnode.indeterminate = isAllChecked//子集是否是全选，如果子集全选，则半选状态为假
        fnode.checked = isAllChecked
        if (fnode.parent) {//如果有父节点，则需要去判断父节点是否选中
          this.deleteParentChecked(fnode.parent, true)
        }
      }
    },
    deleteChildChecked(childNodes) {//删除子节点的勾选状态
      if (childNodes && childNodes.length > 0) {
        childNodes.map(k => {
          k.indeterminate = false
          k.checked = false
          this.deleteChildChecked(this.$refs.tree.getNode(k).childNodes)
        })
      }
    },
    getMenuData() {
      getMenuList(this.allMenu, false).then(res => {
        if (res.code == 200) {
          this.menuList = res.data;
        }
      })
    },
    getRoleData() {
      this.loading = true;
      getRoleList({
        name: this.name,
        current: this.page.current,
        size: this.page.size,
        type: 'rolePage'
      }).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
          this.roleList = res.data.records;
          if (res.data.records.length == 0 && this.page.current != 1) {
            this.page.current--
            this.getRoleData();
          }
        }
        this.loading = false;
      })
    },
    currentChange(current) {
      this.page.current = current;
      this.getRoleData()
    },
    sizeChange(size) {
      this.page.size = size;
      this.getRoleData()
    },
    search() {
      this.getRoleData();
    },
  }
}
</script>

<style scoped lang="scss">
.admin-role {
  .page-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 40px 0 0;
  }
}
</style>
