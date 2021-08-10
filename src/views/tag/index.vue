<template>
  <div class="tag">
    <div class="panel">
      <el-row :gutter="30">
        <el-col :span="5">
          <div class="left">
            <div class="header">
              <h4>标签列表</h4>
            </div>
            <div class="tag-name-panel">
              <div class="tag-item" :class="{active: curTag == item.labelName}" v-for="(item , index) in tagList"
                   :key="index"
                   @click="changeCurTag(item)">
                <p>{{ item.labelName }}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="right" v-infinite-scroll="loadMore">
            <el-row>
              <el-col v-for="(item , index) in articleList" :key="item.id">
                <ArticleItem
                  :theme-color="item.type == 'blog' ? '#26bfbf' : item.type == 'idea' ? '#f4c807' : '#0066ff'"
                  :article-info="item" :has-first-pic="item.firstUrl != '' && item.firstUrl != null"/>
              </el-col>
            </el-row>
            <div class="footer"><span class="info-text">
              {{ infoText }}
            </span></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/views/home/item/question/index";
import IdeaItem from "@/views/home/item/idea/index";
import BlogItem from "@/views/home/item/blog/index";

import {tagPrefix} from '@/config'

import {getAllLabelName} from "@/api/label";
import {getFixTagArticleList} from "@/api/article";
import ArticleItem from "@/views/home/item/index";

export default {
  name: "Tag",
  data() {
    return {
      tagPrefix: tagPrefix,
      curTag: '',
      tagList: [],
      articleList: [],
      page: {
        current: 1,
        size: 5,
        total: 0,
        pages: 1
      },
      infoText: '玩命加载中...',
    }
  },
  created() {
    this.getTagList();
  },
  watch: {
    curTag(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page.current = 1;
        this.articleList = []
        this.infoText = '玩命加载中...'
        this.getArticleList()
      }
    }
  },
  methods: {
    loadMore() {
      if (this.curTag) {
        if (this.page.current > this.page.pages) {
          return;
        }
        this.page.current++;
        this.getArticleList()
      }
    },
    getArticleList() {
      getFixTagArticleList({
        tag: this.tagPrefix + this.curTag,
        type: 'article',
        current: this.page.current,
        size: this.page.size
      }).then(res => this.res2DataList(res))
    },
    changeCurTag(label) {
      this.curTag = label.labelName;
    },
    res2DataList(res) {
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
    },
    getTagList() {
      getAllLabelName().then(res => {
        if (res.code == 200) {
          this.tagList = res.data;
          this.curTag = this.tagList[0].labelName
        }
      })
    }
  },
  components: {
    ArticleItem,
    QuestionItem, IdeaItem, BlogItem,
  }
}
</script>

<style scoped lang="scss">
.tag {
  .panel {
    width: $panel-width;
    box-sizing: border-box;
    box-shadow: $panel-shadow;
    min-height: 300px;
    padding: 20px;
    margin: auto;

    .left {
      width: 100%;
      min-height: 100px;
      padding: 0 10px;

      .header {
        box-shadow: $panel-shadow;
        box-sizing: border-box;
        padding: 5px;

        h4 {
          padding: 5px;
          margin: 0;
          color: $info-color;
        }
      }

      .tag-name-panel {
        box-sizing: border-box;
        box-shadow: $panel-shadow;

        .tag-item {
          cursor: pointer;
          padding: 10px 0 10px 15px;

          &:hover {
            background-color: $tint-back;
            transition: background-color .5s;
          }

          &.active {
            background-color: $tint-back;
            transition: background-color .5s;
          }

          p {
            margin: 0;
            padding: 0;
            color: $info-color;
          }
        }
      }
    }

    .right {
      box-sizing: border-box;
      width: 100%;
      min-height: 100px;

      .footer {
        text-align: center;
        padding: 20px 0;

        .info-text {
          color: $info-color;
        }
      }
    }
  }
}
</style>
