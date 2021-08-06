<template>
  <div class="home">
    <div class="panel">
      <el-row :gutter="50">
        <el-col :span="6">
          <div class="left">
            <div class="avatar">
              <el-avatar :size="150" v-if="getToken" :src="getUser.avatarUrl"></el-avatar>
              <el-avatar :size="150" v-else :src="circleUrl"></el-avatar>
              <div class="user">
                <p v-if="getToken">{{ getUser.nickname ? getUser.nickname : getUser.username }}</p>
                <p v-else>还没有登录哦，去登录吧...</p>
              </div>
              <div class="info">
                <p v-if="getToken">{{ getUser.introduction ? getUser.introduction : '这个人很懒，什么都没留下...' }}</p>
              </div>
            </div>
            <div class="write">
              <WritePanel @saveQuestionSuccess="reLoadArticleList"/>
            </div>
            <div class="hot-topic">
              <HotTopic/>
            </div>
            <div class="nav">
              <NavPanel/>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="right">
            <div class="header">
              <el-row>
                <el-col :span="getToken ? 6 : 12" v-for="(item , index) in navData" :key="index">
                  <div class="nav-item" v-if="getToken ? true : item.value != mine && item.value != attention"
                       :class="{active: curActive == item.value}"
                       @click="changeNav(item.value)">
                    <span>{{ item.label }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="body" v-infinite-scroll="loadMore">
              <el-row>
                <el-col v-for="(item , index) in articleList" :key="item.id">
                  <!--                  <QuestionItem v-if="item.type == 'question'" :question-info="item"/>-->
                  <!--                  <IdeaItem v-if="item.type == 'idea'" :idea-info="item"/>-->
                  <ArticleItem
                    :theme-color="item.type == 'blog' ? '#26bfbf' : item.type == 'idea' ? '#f4c807' : '#0066ff'"
                    :article-info="item" :has-first-pic="item.firstUrl != '' && item.firstUrl != null"/>
                </el-col>
              </el-row>
              <div class="footer">
                <div>
                  <span class="info-text">{{ infoText }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled} from '@element-plus/icons-vue'
import ArticleItem from './item/index'
import HotTopic from '@/components/base/HotTopic'
import WritePanel from '@/components/base/WritePanel'
import NavPanel from "@/components/base/NavPanel";
import {getHomeArticleList} from "@/api/article";
import {mapGetters} from 'vuex'

import {homeNav, attentionAuthorArticle, mineArticle} from '@/config'

import {getDictDetailList} from "@/api/dict";

export default {
  name: "Home",
  data() {
    return {
      attention: attentionAuthorArticle,
      mine: mineArticle,
      infoText: '玩命加载中...',
      navData: [],
      articleList: [],
      circleUrl:
        require('@/assets/image/me.jpg'),
      squareUrl:
        require('@/assets/image/shy.png'),
      curActive: 1,
      page: {
        current: 1,
        size: 5,
        total: 0,
        pages: 1
      }
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getToken'])
  },
  created() {
    this.getArticleNavData()
  },
  methods: {
    changeNav(articleType) {
      this.page.current = 1;
      this.articleList = [];
      this.curActive = articleType;
      this.infoText = '玩命加载中...'
      this.getArticleList(articleType)
    },
    getArticleNavData() {
      getDictDetailList(homeNav).then(res => {
        if (res.code == 200) {
          this.navData = res.data;
          this.curActive = this.navData[0].value
          this.changeNav(this.curActive)
        }
      })
    },
    reLoadArticleList(flag) {
      console.log(flag)
      if (flag) {
        this.page.current = 1;
        this.articleList = [];
        this.getArticleList(this.curActive)
      }
    },
    loadMore() {
      if (this.page.current > this.page.pages) {
        return;
      }
      this.page.current++;
      this.getArticleList(this.curActive);
    },
    getArticleList(type) {
      getHomeArticleList(type, this.page).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
          this.articleList.push(...res.data.records);
          if (this.page.current > this.page.pages) {
            this.infoText = '没有更多了哦~'
          }
          console.log(this.articleList)
        }
      })
    },
    goDetail(id, type) {
      this.$router.push({
        path: '/detail',
        name: 'Detail',
        query: {
          id: 1,
          type: type
        }
      })
    },
  },
  components: {
    NavPanel, ArticleItem, HotTopic, WritePanel,
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled
  }
}
</script>

<style lang="scss" scoped>
.home {
  .panel {
    box-sizing: border-box;
    padding: 15px;
    box-shadow: $panel-shadow;
    margin: auto;
    width: $panel-width;
    min-height: 800px;

    .left {
      .avatar {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        p {
          padding: 0;
          margin: 0;
        }

        .user {
          margin-top: 10px;

          p {
            font-weight: bold;
            font-size: 16px;
          }
        }

        .info {
          p {
            font-size: 15px;
            color: #98a6ad;
          }
        }
      }

      .write {
        margin: 20px 0;
      }

    }

    .right {
      .header {
        margin-bottom: 20px;

        .nav-item {
          text-align: center;

          &.active {
            span {
              color: $theme-color;
              display: inline-block;
              border-bottom: 2px solid $theme-color;
            }
          }

          span {
            cursor: pointer;
            transition: color .3s;

            &:hover {
              color: $theme-color;
              display: inline-block;
              border-bottom: 2px solid $theme-color;
            }
          }
        }
      }

      .body {
        padding: 20px 45px;

        .footer {
          div {
            margin-top: 20px;
            text-align: center;

            .info-text {
              color: $info-color;
              font-size: 18px;
            }
          }
        }
      }


    }
  }
}
</style>
