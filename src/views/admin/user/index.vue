<template>
  <div class="user-list">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="根据用户名或昵称查找" size="large" clearable v-model="queryForm.name"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="根据手机号查找" size="large" clearable v-model="queryForm.phone"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="queryForm.roleName" class="m-2" clearable placeholder="角色名" size="large">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-button type="success" size="large" @click="search">搜索</el-button>
        <el-button type="primary" size="large" @click="toEdit('add')">新建</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-table :data="userList" style="width: 100%" v-loading="loading" table-layout="auto">
        <el-table-column label="序号" fixed width="80">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="100"/>
        <el-table-column prop="nickname" label="昵称" width="100"/>
        <el-table-column prop="introduction" label="简介" width="200"/>
        <el-table-column prop="phone" label="电话号码" width="120"/>
        <el-table-column prop="email" label="邮箱" width="200"/>
        <el-table-column prop="qq" label="qq号码" width="120"/>
        <el-table-column prop="wechat" label="微信" width="150"/>
        <el-table-column prop="constellation" label="星座" width="100"/>
        <el-table-column prop="chineseZodiac" label="生肖" width="100"/>
        <el-table-column prop="birthday" label="生日" width="120"/>
        <el-table-column label="头像">
          <template #default="scope">
            <div>
              <el-avatar :size="50" :src="scope.row.avatarUrl"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="200"/>
        <el-table-column prop="questionNum" label="提出问题数量" width="120"/>
        <el-table-column prop="blogNum" label="发布博客数量" width="120"/>
        <el-table-column prop="ideaNum" label="想法数量" width="120"/>
        <el-table-column prop="beFocused" label="被关注数量" width="120"/>
        <el-table-column label="角色" width="150">
          <template #default="scope">
            {{ scope.row.role.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template #default="scope">
            <div>
              <el-button type="primary" size="mini" @click="toEdit('reset',scope.row)">重置密码</el-button>
              <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
        width="30%"
      >
        <el-form :model="userForm" ref="userForm" :rules="rules">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名..." v-model.trim="userForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码..." v-model.trim="userForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="roleName">
            <el-select placeholder="请选择用户角色" style="width: 100%" v-model="userForm.roleName">
              <el-option v-for="item in roleList" :key="item.id" :label="item.name"
                         :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser('userForm')">保存</el-button>
      </span>
        </template>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import {getAdminUserList, saveAdminUser, delAdminUser} from "@/api/user";
import {getRoleList} from "@/api/role";

export default {
  name: "AdminUserList",
  data() {
    return {
      dialogVisible: false,
      loading: false,
      queryForm: {
        name: '',
        roleName: '',
        phone: ''
      },
      roleList: [],
      userList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        pages: 1
      },
      userForm: {
        username: '',
        password: '',
        roleName: ''
      },
      rules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }, {
          max: 30, message: '最多示输入30个字符', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          max: 30, message: '最多输入30个字符', trigger: 'blur'
        }],
        roleName: [{
          required: true, message: '请选择用户角色', trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getRoleData();
    this.getUserList()
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      if (newVal) {
        this.getRoleData();
      }
    }
  },
  methods: {
    del(id) {
      this.$confirm("确定删除该用户吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        delAdminUser(id).then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
          }
          this.getUserList();
        })
      }).catch(() => {
      })
    },
    saveUser(formName) {
      this.$refs[formName].validate(flag => {
        if (flag) {
          saveAdminUser(this.userForm).then(res => {
            if (res.code == 200) {
              this.$notify({
                title: '提示',
                message: '保存成功',
                type: 'success'
              })
              this.getUserList()
              this.dialogVisible = false;
            }
          })
        }
      })
    },
    toEdit(type, data) {
      if (type == 'add') {
        this.userForm = {
          username: '',
          password: '',
          roleName: ''
        }
      }
      if (type == 'reset' && data) {
        const temp = JSON.parse(JSON.stringify(data));
        this.userForm = {
          id: temp.id,
          username: temp.username,
          password: temp.password,
          roleName: temp.role.name
        };
      }
      this.dialogVisible = true;
    },
    currentChange(current) {
      this.page.current = current;
      this.getUserList()
    },
    sizeChange(size) {
      this.page.size = size;
      this.getUserList()
    },
    search() {
      this.getUserList()
    },
    getRoleData() {
      getRoleList().then(res => {
        if (res.code == 200) {
          this.roleList = res.data;
        }
      })
    },
    getUserList() {
      this.loading = true;
      getAdminUserList({
        current: this.page.current,
        size: this.page.size,
        name: this.queryForm.name,
        roleName: this.queryForm.roleName,
        phone: this.queryForm.phone
      }).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
          this.userList = res.data.records;
          if (res.data.records.length == 0 && this.page.current != 1) {
            this.page.current--
            this.getUserList();
          }
        }
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped lang="scss">
.user-list {
  .page-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 40px 0 0;
  }
}
</style>
