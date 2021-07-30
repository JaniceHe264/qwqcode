<template>
  <div class="personal">
    <div class="panel">
      <div class="panel-header" v-infinite-scroll="loadMore">
        <div class="top" :style="{backgroundImage: backImg}">
          <el-button size="large" type="primary" plain color="#17a788">上传背景图片</el-button>
        </div>
        <div class="bottom">
          <el-row>
            <el-col :span="4">
              <div class="avatar">
                <el-avatar :src="meUrl" shape="square" :size="200"></el-avatar>
                <div class="hover">
                  <div class="hover-shade"></div>
                  <span class="hover-text">点击上传头像</span>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="info-panel">
                <div class="author-info">
                  <h2>孙峻</h2>
                  <span class="info-text">这家伙很懒什么都没留下...</span>
                </div>
                <div>
                  <el-button size="large" type="primary" plain color="#17a788">编辑个人资料</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="panel-bottom">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-tabs v-model="activeName" class="demo-tabs" :before-leave="changeTabHandle">
              <el-tab-pane :name="item.value" v-for="(item,index) in userArticleNumGroup"
                           :key="item.id">
                <template #label>
                  <span>{{ item.label }}({{ item.articleNum }})</span>
                </template>
                <template v-for="article in showData.data" :key="article.id">
                  <div v-if="showData.type == 'answer'">
                    <Answer :answer-data="article"/>
                  </div>
                  <ArticleItem v-else
                               :theme-color="article.type == 'blog' ? '#26bfbf' : article.type == 'idea' ? '#f4c807' : '#0066ff'"
                               :article-info="article"
                               :has-first-pic="article.firstUrl != '' && article.firstUrl != null"/>
                </template>
                <template v-if="!showData.data.length">
                  <el-empty description="没有内容哦~"/>
                </template>
              </el-tab-pane>
              <div class="footer">
                <div>
                  <span class="info-text">{{ infoText }}</span>
                </div>
              </div>
            </el-tabs>
          </el-col>
          <el-col :span="6">
            <div class="write">
              <WritePanel/>
            </div>
            <div class="hot-topic">
              <HotTopic/>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from "@/views/personal/answer/index";
import WritePanel from "@/components/base/WritePanel";
import NavPanel from "@/components/base/NavPanel";
import HotTopic from "@/components/base/HotTopic";
import ArticleItem from '@/views/home/item'

import {getUserArticleNum} from "@/api/user";
import {getFixArticleList} from "@/api/article";

export default {
  name: "Personal",
  components: {HotTopic, NavPanel, WritePanel, Answer, ArticleItem},
  data() {
    return {
      infoText: '玩命加载中...',
      userArticleNumGroup: [],
      activeName: 'answer-num',
      meUrl: require('@/assets/image/me.jpg'),
      backImg: `url(${require('@/assets/image/me.jpg')})`,
      page: {
        current: 1,
        size: 5,
        total: 0,
        pages: 1
      },
      showData: {
        type: 'article',
        data: []
      }
    }
  },
  created() {
    this.getArticleNumGroup()
  },
  methods: {
    loadMore() {
      this.page.current++;
      if (this.page.current > this.page.pages) {
        return;
      }
      this.getShowData();
    },
    getShowData() {
      getFixArticleList({
        type: this.activeName,
        current: this.page.current,
        size: this.page.size
      }).then(res => {
        this.showData.type = this.activeName == 'answer_num' ? 'answer' : 'article';
        this.showData.data.push(...res.data.records);
        this.page.current = res.data.current;
        this.page.size = res.data.size;
        this.page.total = res.data.total;
        this.page.pages = res.data.pages;
        if (this.page.current >= this.page.pages) {
          this.infoText = ''
        }
      })
    },
    changeTabHandle(activeName, oldName) {
      console.log(123)
      if (activeName != oldName) {
        this.page.current = 1;
        this.showData.data = [];
      }
      this.activeName = activeName;
      this.getShowData();
      return true;
    },
    getArticleNumGroup() {
      getUserArticleNum().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.userArticleNumGroup = res.data;
          if (res.data.length) {
            this.activeName = res.data[0].value
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.personal {
  .panel {
    box-sizing: border-box;
    width: $panel-width;
    min-height: 300px;
    margin: auto;

    .panel-header {
      width: 100%;
      min-height: 100px;
      box-shadow: $panel-shadow;

      .top {
        display: flex;
        align-items: flex-start;
        height: 200px;
        padding: 30px;
        box-sizing: border-box;
        justify-content: flex-end;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .el-button {
          opacity: .5;
        }
      }

      .bottom {
        padding: 10px 40px 50px 40px;

        .avatar {
          position: absolute;
          transform: translateY(-50%);
          z-index: 5;
          cursor: pointer;
          overflow: hidden;
          animation: hideIndex 0.3s;
          -moz-animation: hideIndex 0.3s; /* Firefox */
          -webkit-animation: hideIndex 0.3s; /* Safari and Chrome */
          -o-animation: hideIndex 0.3s; /* Opera */

          .hover {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: all .6s;
            top: 0;
            z-index: -10;

            .hover-shade {
              overflow: hidden;
              border-radius: 5px;
              position: absolute;
              width: 100%;
              height: 98%;

              &:hover {
                background: black;
                transition: background-color .3s;
                opacity: .3;
              }
            }

            .hover-text {
              color: white;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }

          &:hover {
            .hover {
              z-index: 10;
            }
          }
        }

        .info-panel {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .author-info {

          }
        }

      }
    }

    .panel-bottom {
      box-shadow: $panel-shadow;
      margin-top: 20px;
      min-height: 100px;
      padding: 20px;

      .footer {
        text-align: center;

        .info-text {
          color: $info-color;
        }
      }

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

      .hot-topic {
        margin-top: 20px;
      }
    }

  }
}
</style>
