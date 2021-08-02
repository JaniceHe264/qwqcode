<template>
  <div class="hot-topic">
    <el-card shadow="hover" class="hot-card">
      <div class="header">
        <el-row>
          <el-col>
            <p>热门话题&nbsp;<span class="iconfont icon-hot"></span></p>
          </el-col>
        </el-row>
      </div>
      <div class="hot-body">
        <el-row>
          <el-col>
            <div class="hot-body-item" v-for="(item,index) in articleList" :key="item.id"
                 @click="goDetail(item.id , item.type)">
              <p>{{ item.title }}</p>
              <el-divider></el-divider>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getHotArticleList} from "@/api/article";

export default {
  name: "HotTopic",
  data() {
    return {
      articleList: []
    }
  },
  created() {
    this.getArticleList();
  },
  methods: {
    goDetail(id, type) {
      this.$router.push({
        path: '/detail',
        name: 'Detail',
        query: {
          id: id,
          type: type
        }
      })
    },
    getArticleList() {
      getHotArticleList(5, 'question').then(res => {
        if (res.code == 200) {
          this.articleList = res.data.records;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.hot-topic {
  .header {
    .iconfont.icon-hot {
      color: #ff0000;
      font-size: 20px;
    }
  }

  ::v-deep .el-card__body {
    padding: 10px !important;
  }

  .hot-card {
    .hot-body {
      .hot-body-item {
        cursor: pointer;
      }
    }
  }
}
</style>
