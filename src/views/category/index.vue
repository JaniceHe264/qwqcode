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
          <div class="center">
            <el-tabs v-model="curCategory" class="demo-tabs">
              <el-tab-pane label="博客" name="blog">
                <BlogItem v-for="(item,index) in 6" :key="index" :has-first-pic="true"/>
              </el-tab-pane>
              <el-tab-pane label="问题" name="question">
                <QuestionItem v-for="(item,index) in 6" :key="index"/>
              </el-tab-pane>
              <el-tab-pane label="想法" name="idea">
                <IdeaItem v-for="(item,index) in 6" :key="index"/>
              </el-tab-pane>
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
import QuestionItem from "@/views/home/item/question/index";
import IdeaItem from "@/views/home/item/idea/index";
import BlogItem from "@/views/home/item/blog/index";

import {getHotArticleList, getNewArticleList} from "@/api/article";

export default {
  name: "Category",
  data() {
    return {
      curCategory: 'blog',
      hotData: [],
      newData: []
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
      }
    }
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
    getNew() {
      getNewArticleList(5, this.curCategory).then(res => {
        if (res.code == 200) {
          this.newData = res.data.records;
        }
      })
    },
    getHot() {
      getHotArticleList(5, this.curCategory).then(res => {
        if (res.code == 200) {
          this.hotData = res.data.records;
        }
      })
    }
  },
  components: {
    HotTopic, QuestionItem, IdeaItem, BlogItem,
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
    }

    .right {
      width: 100%;
      min-height: 100px;
    }
  }
}
</style>
