<template>
  <div class="admin-article">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入搜索关键字(标题和内容包含都会找到)" size="large" clearable v-model="keyword"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="chooseCategory" class="m-2" clearable placeholder="请选择分类" size="large">
          <el-option
            v-for="item in category"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="chooseLabel" class="m-2" clearable placeholder="请选择标签" size="large">
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :label="item.labelName"
            :value="item.labelName"
          />
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-button type="success" size="large" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-table :data="articleList" style="width: 100%" v-loading="loading">
        <el-table-column label="序号" width="80">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="200"/>
        <el-table-column label="类型" width="100">
          <template #default="scope">
            {{ scope.row.type == 'blog' ? '博客' : scope.row.type == 'question' ? '问题' : '想法' }}
          </template>
        </el-table-column>
        <el-table-column prop="browse" label="被浏览次数"/>
        <el-table-column prop="praiseNum" label="被点赞数"/>
        <el-table-column prop="commentNum" label="评论数"/>
        <el-table-column label="标签列表" min-width="200">
          <template #default="scope">
            <div>
              <el-tag v-for="item in scope.row.labelList" :key="item.id"
                      :style="{backgroundColor: getColorById(item.id),color: 'white',border: 0,marginLeft: '5px'}">
                {{ item.labelName }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否匿名">
          <template #default="scope">
            <div>
              {{ scope.row.anonymity ? '是' : '否' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否私密">
          <template #default="scope">
            <div>
              {{ scope.row.isSecret ? '是' : '否' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="作者">
          <template #default="scope">
            <div>
              {{ scope.row.user.nickname ? scope.row.user.nickname : scope.row.user.username }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" min-width="200">
          <template #default="scope">
            <div>
              {{ scope.row.createTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" v-if="getAuth.indexOf('sys:menu:article:delete') != -1">
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
import {getAllLabelName} from "@/api/label";
import {adminDelArticle, getAdminArticleList} from "@/api/article";
import {getColor} from "@/utils/utils";
import {mapGetters} from 'vuex'

export default {
  name: "AdminArticle",
  data() {
    return {
      loading: false,
      keyword: '',
      chooseLabel: '',
      chooseCategory: '',
      category: [{
        label: '博客',
        value: 'blog'
      }, {
        label: '问题',
        value: 'question'
      }, {
        label: '想法',
        value: 'idea'
      }],
      labelList: [],
      articleList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        pages: 1
      }
    }
  },
  computed:{
    ...mapGetters(['getAuth'])
  },
  created() {
    this.getAllLabel();
    this.getAllArticleList();
  },
  methods: {
    currentChange(current) {
      this.page.current = current;
      this.getAllArticleList()
    },
    sizeChange(size) {
      this.page.size = size;
      this.getAllArticleList()
    },
    search() {
      this.getAllArticleList();
    },
    del(id) {
      this.$confirm("确定删除该文章吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        adminDelArticle(id).then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
          }
          this.getAllArticleList();
        })
      }).catch(() => {
      })
    },
    getColorById(id) {
      return getColor(id);
    },
    getAllArticleList() {
      this.loading = true;
      getAdminArticleList({
        "keyword": this.keyword,
        "current": this.page.current,
        "labelName": this.chooseLabel,
        "size": this.page.size,
        "type": this.chooseCategory
      }).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
          this.articleList = res.data.records;
          if (res.data.records.length == 0 && this.page.current != 1) {
            this.page.current--
            this.getAllArticleList();
          }
        }
        this.loading = false;
      })
    },
    getAllLabel() {
      getAllLabelName().then(res => {
        if (res.code == 200) {
          this.labelList = res.data;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.admin-article {
  .page-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 40px 0 0;
  }
}
</style>
