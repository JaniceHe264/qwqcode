<template>
  <div class="admin-comment">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="chooseType" class="m-2" clearable placeholder="请选择评论类型" size="large">
          <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-button type="success" size="large" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-table :data="commentList" style="width: 100%" v-loading="loading">
        <el-table-column label="序号" width="80">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" min-width="200"/>
        <el-table-column label="类型" min-width="200">
          <template #default="scope">
            <div>
              {{ scope.row.type == 'answer' ? '回答' : '评论' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="articleTitle" label="评论文章标题" min-width="200"/>
        <el-table-column label="评论用户" min-width="200">
          <template #default="scope">
            <div>
              {{ scope.row.user.nickname ? scope.row.user.nickname : scope.row.user.username }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评论时间" min-width="200">
          <template #default="scope">
            <div>
              {{ scope.row.createTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
    </el-row>
  </div>
</template>

<script>
import {getAdminCommentList, delCommentAdmin} from "@/api/comment";

export default {
  name: "AdminComment",
  data() {
    return {
      loading: false,
      chooseType: '',
      page: {
        current: 1,
        size: 10,
        total: 0,
        pages: 1
      },
      type: [
        {
          name: '回答',
          value: 'answer'
        }, {
          name: '评论',
          value: 'comment'
        }
      ],
      commentList: []
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    del(id) {
      this.$confirm("确定删除该评论吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        delCommentAdmin(id).then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
          }
          this.getCommentList();
        })
      }).catch(() => {
      })
    },
    getCommentList() {
      this.loading = true;
      getAdminCommentList({
        type: this.chooseType,
        current: this.page.current,
        size: this.page.size
      }).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
          this.commentList = res.data.records;
          if (res.data.records.length == 0 && this.page.current != 1) {
            this.page.current--
            this.getCommentList();
          }
        }
        this.loading = false;
      })
    },
    currentChange(current) {
      this.page.current = current;
      this.getCommentList()
    },
    sizeChange(size) {
      this.page.size = size;
      this.getCommentList()
    },
    search() {
      this.getCommentList();
    },
  }
}
</script>

<style scoped lang="scss">
.admin-comment {
  .page-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 40px 0 0;
  }
}
</style>
