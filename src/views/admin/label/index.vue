<template>
  <div class="admin-label">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-input placeholder="请输入标签名字" size="large" v-model="name"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="success" size="large" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-table :data="labelList" style="width: 100%" v-loading="loading">
        <el-table-column label="序号" width="80">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="labelName" label="标签名" min-width="200"/>
        <el-table-column label="创建用户" min-width="200">
          <template #default="scope">
            <div>
              {{ scope.row.user.nickname ? scope.row.user.nickname : scope.row.user.username }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="200">
          <template #default="scope">
            <div>
              {{ scope.row.createTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template #default="scope">
            <div>
              <el-button type="danger" @click="del(scope.row.id, scope.row.user.id)">删除</el-button>
              <el-button type="danger" @click="forceDel(scope.row.id)">强制删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box">
        <el-pagination
          v-model:currentPage="page.current"
          :page-size="page.size"
          background
          layout="prev, pager, next, total, sizes, jumper"
          :total="page.total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </el-row>
  </div>
</template>

<script>

import {getAdminLabelList, delLabel,forceDelLabel} from "@/api/label";

export default {
  name: "AdminLabel",
  data() {
    return {
      name: '',
      loading: false,
      page: {
        current: 1,
        size: 10,
        total: 0,
        pages: 1
      },
      labelList: []
    }
  },
  created() {
    this.getLabelList()
  },
  methods: {
    forceDel(id){
      this.$confirm("该操作将会强制删除当前标签，并且直接从包含当前标签的文章中移除，是否继续？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        forceDelLabel(id).then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
          }
          this.getLabelList();
        })
      }).catch(() => {
      })
    },
    del(id, userId) {
      this.$confirm("确定删除该标签吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        delLabel(id, userId).then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
          }
          this.getLabelList();
        })
      }).catch(() => {
      })
    },
    getLabelList() {
      this.loading = true;
      getAdminLabelList(this.name, this.page.current, this.page.size).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
          this.labelList = res.data.records;
          if (res.data.records.length == 0 && this.page.current != 1) {
            this.page.current--
            this.getLabelList();
          }
        }
        this.loading = false;
      })
    },
    currentChange(current) {
      this.page.current = current;
      this.getLabelList()
    },
    sizeChange(size) {
      this.page.size = size;
      this.getLabelList()
    },
    search() {
      this.getLabelList();
    },
  }
}
</script>

<style scoped lang="scss">
.admin-label {
  .page-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 40px 0 0;
  }
}
</style>
