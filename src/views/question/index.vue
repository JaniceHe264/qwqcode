<template>
  <div class="question">
    <div class="panel">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="left">
            <div class="header">
              <el-row>
                <el-col :span="3">
                  <el-button type="primary" :plain="curType != 'recommend'" size="large"
                             @click="changeType('recommend')"><i
                    class="iconfont icon-recommend"></i>为你推荐
                  </el-button>
                </el-col>
                <el-col :span="3">
                  <el-button type="primary" :plain="curType != 'new'" size="large" @click="changeType('new')"><i
                    class="iconfont icon-best-new"></i>最新问题
                  </el-button>
                </el-col>
                <el-col :span="3">
                  <el-button type="primary" :plain="curType != 'hot'" size="large" @click="changeType('hot')"><i
                    class="iconfont icon-hot-text"></i>热门问题
                  </el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <div class="question-list" v-infinite-scroll="loadMore">
              <QuestionAnswer v-for="item in articleList" :key="item.id" :question-info="item"
                              :info-type="curType"></QuestionAnswer>
            </div>
            <div class="footer"><span class="info-text">
              {{ infoText }}
            </span></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right">
            <div class="write-panel">
              <WritePanel/>
            </div>
            <div class="nav">
              <NavPanel/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import QuestionAnswer from './answer'
import WritePanel from "@/components/base/WritePanel";
import NavPanel from "@/components/base/NavPanel";
import {getNewArticleList, getHotArticleList, getRecommendArticleList} from "@/api/article";
import {mapGetters} from 'vuex'

export default {
  name: "Question",
  data() {
    return {
      page: {
        current: 1,
        pages: 1,
        total: 0,
        size: 5
      },
      articleList: [],
      infoText: '玩命加载中...',
      curType: 'recommend'
    }
  },
  watch: {
    curType(newVal, oldVal) {
      // console.log(newVal, oldVal)
      if (newVal != oldVal) {
        this.page.current = 1;
        this.articleList = []
        this.infoText = '玩命加载中...'
        this.getArticleList()
      }
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    changeType(type) {
      if (this.curType != type) {
        this.curType = type;
      }
    },
    loadMore() {
      if (this.page.current > this.page.pages) {
        return;
      }
      this.page.current++;
      this.getArticleList()
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
    getArticleList() {
      if (this.curType == 'recommend') {
        getRecommendArticleList('question', this.page.current, this.page.size, Boolean(this.getToken)).then(res => this.res2DataList(res))
      } else if (this.curType == 'new') {
        getNewArticleList(this.page.current, this.page.size, 'question').then(res => this.res2DataList(res))
      } else if (this.curType == 'hot') {
        getHotArticleList(this.page.current, this.page.size, 'question').then(res => this.res2DataList(res))
      }
    },
  },
  created() {
    this.getArticleList();
  },
  components: {
    NavPanel,
    WritePanel,
    QuestionAnswer
  }
}
</script>

<style scoped lang="scss">
.question {
  .panel {
    width: $panel-width;
    min-height: 300px;
    box-sizing: border-box;
    box-shadow: $panel-shadow;
    margin: auto;
    padding: 20px;

    .right, .left {
      min-height: 100px;
      box-sizing: border-box;
    }

    .left {
      border: 1px solid var(--el-border-color-base);
      border-radius: 2px;
      padding: 20px;
    }

    .right {
      padding: 0 20px;
    }

    .footer {
      text-align: center;
      padding: 20px 0;

      .info-text {
        color: $info-color;
      }
    }
  }
}
</style>
