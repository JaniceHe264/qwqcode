<template>
  <div class="category">
    <div class="panel">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="left">
            <div class="new-list">
              <el-card shadow="none">
                <h3>
                  最新文章 <span class="iconfont icon-new"></span>
                </h3>
                <div class="article-item" v-for="(item,index) in newData" :key="item.id"
                     @click="goDetail(item.id , item.type)">
                  <p>{{ item.title }}</p>
                  <el-divider></el-divider>
                </div>
              </el-card>
            </div>
            <div class="hot-list">
              <el-card shadow="none">
                <span class="hot-text">热门</span>
                <h3>
                  热门文章
                </h3>
                <div class="article-item" v-for="(item,index) in hotData" :key="item.id"
                     @click="goDetail(item.id , item.type)">
                  <p>{{ item.title }}</p>
                  <el-divider></el-divider>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="center" v-infinite-scroll="loadMore">
            <el-tabs v-model="curCategory" class="demo-tabs">
              <el-tab-pane label="博客" name="blog">
              </el-tab-pane>
              <el-tab-pane label="问题" name="question">
              </el-tab-pane>
              <el-tab-pane label="想法" name="idea">
              </el-tab-pane>
              <div v-for="item in articleList" :key="item.id">
                <ArticleItem
                  :theme-color="item.type == 'blog' ? '#26bfbf' : item.type == 'idea' ? '#f4c807' : '#0066ff'"
                  :article-info="item" :has-first-pic="item.firstUrl != '' && item.firstUrl != null"/>
              </div>
              <div class="footer"><span class="info-text">{{ infoText }}</span></div>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="right">
            <HotTopic/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import HotTopic from "@/components/base/HotTopic";
import ArticleItem from '@/views/home/item'

import {getHotArticleList, getNewArticleList} from "@/api/article";

export default {
  name: "Category",
  data() {
    return {
      curCategory: 'blog',
      hotData: [],
      newData: [],
      page: {
        current: 0,
        pages: 1,
        total: 0,
        size: 5
      },
      articleList: [],
      infoText: '玩命加载中...'
    }
  },
  created() {
    this.getHot();
    this.getNew()
  },
  watch: {
    curCategory(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getHot();
        this.getNew();
        this.articleList = []
        this.page.current = 0;
        this.infoText = '玩命加载中...'
        this.getArticleList()
      }
    }
  },
  methods: {
    loadMore() {
      if (this.page.current > this.page.pages) {
        return;
      }
      this.page.current++;
      this.getArticleList()
    },
    getArticleList() {
      getNewArticleList(this.page.current, this.page.size, this.curCategory).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.pages = res.data.pages;
          this.page.total = res.data.total;
          this.page.size = res.data.size;
          this.articleList.push(...res.data.records)
          if (this.page.current > this.page.pages) {
            this.infoText = "没有更多了哦"
          }
          // console.log(this.articleList)
        }
      })
    },
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
    getNew() {
      getNewArticleList(1, 5, this.curCategory).then(res => {
        if (res.code == 200) {
          this.newData = res.data.records;
        }
      })
    },
    getHot() {
      getHotArticleList(1, 5, this.curCategory).then(res => {
        if (res.code == 200) {
          this.hotData = res.data.records;
        }
      })
    }
  },
  components: {
    HotTopic, ArticleItem
  }
}
</script>

<style scoped lang="scss">
.category {
  .panel {
    width: $panel-width;
    box-shadow: $panel-shadow;
    min-height: 300px;
    margin: auto;
    box-sizing: border-box;
    padding: 20px;

    .left {
      width: 100%;
      min-height: 100px;

      .new-list, .hot-list {
        ::v-deep .el-card__body {
          padding: 0;
        }

        .el-card {
          position: relative;
          padding: 0;
          overflow: hidden;
          box-sizing: border-box;

          h3, p {
            width: 100%;
            margin: 0;
            padding: 10px;
            box-sizing: border-box;
          }

          h3 {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .iconfont.icon-new {
              font-weight: normal;
              font-size: 25px;
              color: dodgerblue;
            }
          }

          .hot-text {
            display: inline-block;
            width: 100px;
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            background-color: #ff0000;
            text-align: center;
            color: white;
            position: absolute;
            right: -36px;
            top: -5px;
            transform: rotate(45deg);
          }

          .article-item {
            cursor: pointer;
            margin: 10px 0;
            box-sizing: border-box;

            &:hover {
              background-color: $tint-back;
              transition: background-color .4s;
            }

            .el-divider {
              margin: 0;
            }
          }
        }
      }

      .new-list {
        margin-bottom: 20px;
      }
    }

    .center {
      width: 100%;
      box-sizing: border-box;
      min-height: 100px;
      box-shadow: $panel-shadow;
      padding: 10px 20px;

      ::v-deep .el-tabs__item.is-active {
        color: $theme-color;
      }

      ::v-deep .el-tabs__active-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: $theme-color;
        z-index: 1;
        transition: width var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier), transform var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
        list-style: none;
      }

      ::v-deep .el-tabs__item {
        &:hover {
          color: $theme-color;
        }
      }

      .footer {
        text-align: center;
        padding: 20px 0;

        .info-text {
          color: $info-color;
        }
      }
    }

    .right {
      width: 100%;
      min-height: 100px;
    }
  }
}
</style>
