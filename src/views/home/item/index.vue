<template>
  <div class="article-item">
    <div class="panel">
      <div class="item article">
        <div>
          <h3>{{ articleInfo.title }}</h3>
          <div class="tag-panel">
            <el-tag class="ml-2" :style="{backgroundColor: getLabelColor(item.id), color: 'white'}"
                    v-for="item in articleInfo.labelList" :key="item.id">{{ item.labelName }}
            </el-tag>
          </div>
          <div v-if="articleInfo.type != 'question'">
            <el-row :gutter="20">
              <el-col :span="5" v-if="hasFirstPic">
                <el-image :src="articleInfo.firstUrl ? articleInfo.firstUrl : squareUrl" fit="fill">
                  <template #placeholder>
                    <div class="image-slot">玩命加载中<span class="dot">...</span></div>
                  </template>
                  <template #error>
                    <div class="image-slot">
                      <el-icon>
                        <Picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
              </el-col>
              <el-col :span="contentHoldNum">
                <p class="item-text" v-html="compiledMarkdown"></p>
              </el-col>
            </el-row>
          </div>
          <p>
            <el-link class="article-link" type="success" :style="{color: themeColor}" :underline="false"
                     @click="goDetail(articleInfo.id , articleInfo.type)">
              阅读全文
            </el-link>
            <el-link class="edit-link" type="success" :style="{color: themeColor}" :underline="false"
                     v-if="this.$route.path == '/personal'"
                     @click="toEdit(articleInfo)">
              编辑
            </el-link>
            <el-link class="del-link" type="danger" v-if="this.$route.path == '/personal' && showDel" :underline="false"
                     @click="delArticle">
              删除
            </el-link>
          </p>
          <div class="btn-group">
            <el-row v-if="articleInfo.type == 'blog'">
              <el-col :span="5">
                <el-button color="#26bfbf" plain size="large" @click="giveALike">
                  我觉得很有用&nbsp;
                  <span class="iconfont icon-good"></span>
                  <span>{{ praiseNum }}</span>
                </el-button>
              </el-col>
              <el-col :span="4">
                <div class="comment" @click="goDetail(articleInfo.id, articleInfo.type)">
                  <span class="iconfont icon-comment"></span>
                  <span>{{ articleInfo.commentNum }}条评论</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="collect" @click="collect({typeId: articleInfo.id , type: 'article'})">
                  <div v-if="!isCollect">
                    <span class="iconfont icon-collect"></span>
                    <span>收藏博客</span>
                  </div>
                  <div v-else>
                    <span class="iconfont icon-love"></span>&nbsp;
                    <span>已收藏</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="2">
                <el-popover
                  placement="bottom"
                  :width="100"
                  trigger="click"
                  popper-class="share-popover"
                >
                  <template #reference>
                    <div class="share">
                      <el-icon :size="25">
                        <Promotion/>
                      </el-icon>
                      <span>分享</span>
                    </div>
                  </template>
                  <div class="share-panel">
                    <div class="share-item">
                      <p>微信扫一扫</p>
                    </div>
                  </div>
                </el-popover>
              </el-col>
              <el-col :span="5">
                <div class="article-info">
                  <el-icon :size="25">
                    <AlarmClock/>
                  </el-icon>
                  <span>{{ articleInfo.updateTime }}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>{{ articleInfo.user.nickname ? articleInfo.user.nickname : articleInfo.user.username }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="articleInfo.type == 'idea'">
              <el-col :span="6">
                <el-button type="warning" plain size="large" @click="giveALike">
                  这是一个好想法&nbsp;
                  <span class="iconfont icon-good"></span>
                  <span>{{ praiseNum }}</span>
                </el-button>
              </el-col>
              <el-col :span="4">
                <div class="comment" @click="goDetail(articleInfo.id, articleInfo.type)">
                  <span class="iconfont icon-comment"></span>
                  <span>{{ articleInfo.commentNum }}条评论</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="collect" @click="collect({typeId: articleInfo.id , type: 'article'})">
                  <div v-if="!isCollect">
                    <span class="iconfont icon-collect"></span>
                    <span>收藏想法</span>
                  </div>
                  <div v-else>
                    <span class="iconfont icon-love"></span>&nbsp;
                    <span>已收藏</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="2">
                <el-popover
                  placement="bottom"
                  :width="100"
                  trigger="click"
                  popper-class="share-popover"
                >
                  <template #reference>
                    <div class="share">
                      <el-icon :size="25">
                        <Promotion/>
                      </el-icon>
                      <span>分享</span>
                    </div>
                  </template>
                  <div class="share-panel">
                    <div class="share-item">
                      <p>微信扫一扫</p>
                    </div>
                  </div>
                </el-popover>
              </el-col>
              <el-col :span="5">
                <div class="article-info">
                  <el-icon :size="25">
                    <AlarmClock/>
                  </el-icon>
                  <span>{{ articleInfo.updateTime }}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>{{ articleInfo.user.nickname ? articleInfo.user.nickname : articleInfo.user.username }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="articleInfo.type == 'question'">
              <el-col :span="7">
                <el-row>
                  <el-col :span="15">
                    <el-button type="primary" size="large" @click="goDetail(articleInfo.id, articleInfo.type)">
                      <span class="iconfont icon-answer"></span>&nbsp;给他提建议
                    </el-button>
                  </el-col>
                  <el-col :span="9">
                    <el-button type="primary" plain size="large" @click="giveALike">
                      <span class="iconfont icon-good"></span>
                      <span>{{ praiseNum }}</span>
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <div class="comment" @click="goDetail(articleInfo.id, articleInfo.type)">
                  <span class="iconfont icon-comment"></span>
                  <span>{{ articleInfo.commentNum }}条评论</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="collect" @click="collect({typeId: articleInfo.id , type: 'article'})">
                  <div v-if="!isCollect">
                    <el-icon :size="25">
                      <CirclePlus/>
                    </el-icon>
                    <span>关注问题</span>
                  </div>
                  <div v-else>
                    <span class="iconfont icon-attention"></span>&nbsp;
                    <span>已关注问题</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="2">
                <el-popover
                  placement="bottom"
                  :width="100"
                  trigger="click"
                  popper-class="share-popover"
                >
                  <template #reference>
                    <div class="share">
                      <el-icon :size="25">
                        <Promotion/>
                      </el-icon>
                      <span>分享</span>
                    </div>
                  </template>
                  <div class="share-panel">
                    <div class="share-item">
                      <p>微信扫一扫</p>
                    </div>
                  </div>
                </el-popover>
              </el-col>
              <el-col :span="5">
                <div class="article-info">
                  <el-icon :size="25">
                    <AlarmClock/>
                  </el-icon>
                  <span>{{ articleInfo.updateTime }}</span>
                </div>
              </el-col>
              <el-col :span="2" v-if="!articleInfo.anonymity">
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>{{ articleInfo.user.nickname ? articleInfo.user.nickname : articleInfo.user.username }}</span>
                </div>
              </el-col>
              <el-col :span="2" v-else>
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>匿名</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <SendQuestion :dialog-visible="questionVisible"
                      @closed="closeSendQuestion"
                      @saveQuestion="reloadArticleList"
                      :update-data="editQuestionData"/>
      </div>
    </div>
  </div>
</template>

<script>
import {AlarmClock, CirclePlus, Key, Plus, Promotion, UserFilled, Picture} from "@element-plus/icons-vue";
import {getColor} from "@/utils/utils";
import {marked} from "marked"
import {addPraise} from "@/api/praise";
import {addCollect} from "@/api/collect";
import SendQuestion from "@/components/base/SendQuestion";
import {removeComment} from "@/api/comment";
import {delArticle} from "@/api/article";

export default {
  name: "ArticleItem",
  data() {
    return {
      editQuestionData: null,
      questionVisible: false,
      circleUrl:
        require('@/assets/image/me.jpg'),
      squareUrl:
        require('@/assets/image/shy.png'),
      contentHoldNum: 24,
      praiseNum: 0,
      isCollect: false,
    }
  },
  props: {
    showDel: {
      type: Boolean,
      default: false
    },
    hasFirstPic: {
      default: false,
      type: Boolean
    },
    articleInfo: {
      type: Object,
      required: true
    },
    themeColor: {
      type: String,
      required: false,
      default: "#26bfbf"
    }
  },
  created() {
    this.contentHoldNum = this.hasFirstPic ? 18 : 24
    this.praiseNum = this.articleInfo.praiseNum;
    this.isCollect = this.articleInfo.isCollect;
  },
  computed: {
    compiledMarkdown() {
      //this.articleDetail.context数据
      if (this.articleInfo.content) {
        return marked(this.articleInfo.content, {sanitize: true})
      }
      return "";
    },
  },
  methods: {
    delArticle() {
      this.$confirm("确定删除该文章吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        delArticle(this.articleInfo.id).then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
          }
          this.$emit("delSuccess", true);
        })
      }).catch(() => {
      })
    },
    closeSendQuestion(closed) {
      this.questionVisible = !closed;
    },
    reloadArticleList(flag) {
      this.$emit("reload", flag);
    },
    collect(data) {
      addCollect(data).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
          this.isCollect = !this.isCollect;
          this.reloadArticleList(true)
        }
      })
    },
    giveALike() {
      addPraise({
        "giveType": 'article',
        "praiseType": 1,
        "typeId": this.articleInfo.id
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
          if (res.message == '点赞成功') {
            this.praiseNum++;
          }
        }
      })
    },
    getLabelColor(id) {
      return getColor(id)
    },
    toEdit(data) {
      if (data.type == 'question') {
        this.questionVisible = true;
        const temp = JSON.parse(JSON.stringify(data));
        temp.tags = temp.labelList.map(temp => temp.labelName);
        this.editQuestionData = temp;
        return;
      }
      this.$router.push({
        path: '/send-article',
        name: 'SendArticle',
        query: {
          id: data.id,
          type: data.type
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
  },
  components: {
    SendQuestion,
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Picture
  }
}
</script>

<style scoped lang="scss">
.article-item {
  .panel {
    .item {
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid var(--el-border-color-base);

      &.article {
        .article-link {
          color: #26bfbf;

          &:hover {
            opacity: .8;
          }
        }

        .edit-link {
          margin-left: 10px;
        }

        .del-link {
          margin-left: 10px;
        }

        .el-image {
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
        }
      }

      .tag-panel {
        .el-tag {
          margin-right: 5px;
          margin-bottom: 5px;
          border: none;
        }
      }

      .iconfont {
        &.icon-good {
          font-size: 20px;
        }

        &.icon-comment {
          font-size: 24px;
        }

        &.icon-collect {
          font-size: 26px;
        }

        &.icon-love {
          font-size: 20px;
        }
      }

      .comment, .share, .article-info, .author-info {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        color: $info-color;
      }

      .collect {
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        color: $info-color;

        div {
          display: flex;
          align-items: center;
        }

        .icon-attention {
          font-size: 25px;
        }
      }


      .item-text {
        /* 设置溢出隐藏 */
        overflow: hidden;
        /* 设置隐藏部分显示为省略号 */
        text-overflow: ellipsis;
        /* 弹性伸缩和子模型显示 */
        display: -webkit-box;
        /* 限制在一个块元素中显示的行数 */
        -webkit-line-clamp: 5; /* 显示5行 */
        /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
