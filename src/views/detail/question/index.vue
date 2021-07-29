<template>
  <div class="detail">
    <div class="panel" v-loading="loading">
      <div class="question" v-infinite-scroll="loadMore">
        <div class="question-content-panel">
          <div class="question-content">
            <div class="left">
              <el-avatar :src="meUrl" shape="square" :size="50"></el-avatar>
              <div>
                <div v-if="questionInfo.user">
                  <span
                    class="user-name">{{
                      questionInfo.user.nickname ? questionInfo.user.nickname : questionInfo.user.username
                    }}</span>
                  <span class="idea-num">共提出了{{ questionInfo.user.questionNum }}个问题</span>
                </div>
                <div>
                  <el-button type="primary" circle plain
                             @click="collect({typeId: questionInfo.user.id , type: 'author'})">
                    <el-icon v-if="questionInfo.userIsAttention">
                      <Check/>
                    </el-icon>
                    <el-icon v-else>
                      <Plus/>
                    </el-icon>
                    <span><span v-show="questionInfo.userIsAttention">已</span>关注</span>
                  </el-button>
                </div>
              </div>
            </div>
            <h2>{{ questionInfo.title }}</h2>
            <div class="tag-panel">
              <el-tag
                v-for="(item,index) in questionInfo.labelList"
                :key="item.id"
                effect="dark"
                size="large"
              >
                {{ item.labelName }}
              </el-tag>
            </div>
            <div class="content">
              <!--              <p>-->
              <!--                我是一个问题的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文-->
              <!--                字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文-->
              <!--                字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文-->
              <!--                字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字-->
              <!--              </p>-->
            </div>
            <div class="btn-group">
              <el-row :gutter="questionInfo.isCollect ? 0 : 30">
                <el-col :span="questionInfo.isCollect ? 5 : 4">
                  <el-row :gutter="questionInfo.isCollect ? 0 : 30">
                    <el-col :span="12">
                      <el-button type="primary" size="large" plain @click="answerQuestion">
                        <i class="iconfont icon-answer"></i>&nbsp;替他解答
                      </el-button>
                    </el-col>
                    <el-col :span="12">
                      <div class="attention-btn">
                        <el-button type="primary" size="large" plain
                                   @click="collect({typeId: questionInfo.id , type: 'article'})">
                          <div v-if="!questionInfo.isCollect">
                            <el-icon :size="19">
                              <CirclePlus/>
                            </el-icon>
                            关注问题
                          </div>
                          <div v-else>
                            <i class="iconfont icon-attention"></i>&nbsp;
                            已关注问题
                          </div>
                        </el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="2">
                  <div class="attention">
                    <el-button type="primary" plain size="large" @click="giveALike">
                      <i class="iconfont icon-good"></i>
                      {{ questionInfo.praiseNum }}
                    </el-button>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="comment" @click="sendComment">
                    <span class="iconfont icon-comment"></span>
                    <span>{{ questionInfo.commentNum }}条评论</span>
                  </div>
                  <div class="send-comment">
                    <SendComment :dialog-visible="showSendComment" :article-info="questionInfo"
                                 @closed="closeSendComment" theme-color="#0066ff" @commentSuccess="loadQuestion"/>
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
                <el-col :span="4">
                  <div class="article-info">
                    <el-icon :size="25">
                      <AlarmClock/>
                    </el-icon>
                    <span>{{ questionInfo.updateTime }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="article-browse-info">
                    <span>已有{{ questionInfo.collectNum }}人关注该问题</span><span
                    class="vertical">|</span><span>被浏览{{ browseNum }}次</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <div class="question-answer-panel">
          <el-row>
            <el-col :span="18">
              <el-tabs v-model="activeName">
                <el-tab-pane :label="page.total + '个回答'" name="answer">
                  <div class="answer-content" v-for="(item , index) in answerList" :key="item.id">
                    <div class="author-info">
                      <el-avatar :src="squareUrl" shape="square" size="50"></el-avatar>
                      <span class="user-name">{{ item.user.nickname ? item.user.nickname : item.user.username }}</span>
                      <span class="send-time">{{ item.createTime }}</span>
                    </div>
                    <div class="answer-good-num">
                      <span>有{{ item.praiseNum }}人觉得这个回答不错</span>
                    </div>
                    <div class="answer-info">
                      <p>{{ item.content }}</p>
                    </div>
                    <el-button type="primary" plain @click="praiseComment(item)"><span
                      class="iconfont icon-good"></span>我觉得很不错
                    </el-button>
                    <el-divider></el-divider>
                  </div>
                  <div class="answer-footer">
                    <span class="info-text">{{ infoText }}</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="评论" name="second">
                  <Comment theme-color="#409eff" :article-info="questionInfo"/>
                </el-tab-pane>
              </el-tabs>

            </el-col>
            <el-col :span="6">
              <div class="correlation">
                <el-card shadow="hover">
                  <h3>相关问题</h3>
                  <el-divider></el-divider>
                  <span v-for="(item,index) in 6" :key="index">
                    <el-link type="primary">我是一个相关问题的标题标题标题标题标题标题标题</el-link>
                    <el-link type="info">{{ index + 1 }}个回答</el-link>
                    <el-divider></el-divider>
                  </span>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="answer-question-panel">
          <el-dialog
            v-model="answerQuestionVisible"
            :title="questionInfo.title"
            width="45%"
            :lock-scroll="false"
          >
            <el-input type="textarea" v-model="answerContent" size="large" :rows="5"
                      placeholder="为他/她/它解答难题吧"></el-input>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="answerQuestionVisible = false">取消</el-button>
                <el-button type="primary" @click="subAnswer"
                >提交</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Check} from '@element-plus/icons-vue'
import SendComment from "@/components/base/SendComment";
import Comment from "@/views/detail/comment/index";
import {addCollect} from "@/api/collect";
import {addPraise} from "@/api/praise";
import {getArticleDetail, addBrowse} from "@/api/article";
import {addFootprint} from "@/api/footprint";
import {getCommentList} from "@/api/comment";
import {addComment} from "@/api/comment";

export default {
  name: "index",
  data() {
    return {
      answerContent: '',
      answerQuestionVisible: false,
      activeName: 'answer',
      questionAttention: false,
      squareUrl:
        require('@/assets/image/shy.png'),
      meUrl:
        require('@/assets/image/me.jpg'),
      showSendComment: false,
      questionInfo: {},
      loading: false,
      browseNum: 0,
      page: {
        current: 0,
        size: 5,
        pages: 0,
        total: 0
      },
      answerList: [],
      infoText: '玩命加载中...'
    }
  },
  created() {
    this.addBrowseNum();
  },
  methods: {
    praiseComment(data) {
      addPraise({
        "giveType": 'answer',
        "praiseType": 1,
        "typeId": data.id
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
        }
        if (res.message == '点赞成功')
          data.praiseNum++;
      })
    },
    subAnswer() {
      if (this.answerContent.trim() == '') {
        return this.$notify({
          title: '提示',
          message: '您还没有提出解决方案哦~',
          type: 'warning'
        })
      }
      addComment({
        "articleId": this.questionInfo.id,
        "content": this.answerContent,
        "parentId": 0,
        "type": "answer"
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: '已为您提出您的解答方案',
            type: 'success'
          })
          this.page.current = 1;
          this.answerList = []
          this.getAnswerData()
          this.answerQuestionVisible = false;
          this.answerContent = '';
        }
      })
    },
    answerQuestion() {
      this.answerQuestionVisible = true;
    },
    loadMore() {
      this.page.current++;
      if (this.page.current > this.page.pages) {
        return;
      }
      this.getCommentData();
    },
    getAnswerData() {
      getCommentList({
        articleId: this.questionInfo.id,
        current: this.page.current,
        size: this.page.size,
        type: 'answer'
      }).then(res => {
        if (res.code == 200) {
          this.answerList.push(...res.data.records);
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.pages = res.data.pages;
          this.page.total = res.data.total;
          if (this.page.current >= this.page.pages) {
            this.infoText = '没有更多了哦~'
          }
        }
      })
    },
    loadQuestion(flag) {
      if (flag)
        this.getQuestionInfo();
    },
    addVisited() {
      addFootprint({articleId: this.$route.query.id}).then(res => {
        console.log(res.message)
      })
    },
    addBrowseNum() {
      addBrowse(this.$route.query.id).then(res => {
        this.getQuestionInfo()
        console.log("添加浏览次数成功")
        this.browseNum = res.data
        this.addVisited();
      })
    },
    collect(data) {
      addCollect(data).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
          this.getQuestionInfo()
        }
      })
    },
    giveALike() {
      addPraise({
        "giveType": 'article',
        "praiseType": 1,
        "typeId": this.questionInfo.id
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
        }
        this.getQuestionInfo();
      })
    },
    getQuestionInfo() {
      this.loading = true;
      getArticleDetail(this.$route.query.id).then(res => {
        if (res.code == 200) {
          this.questionInfo = res.data;
          this.getAnswerData()
        }
        this.loading = false;
      })
    },
    closeSendComment(closed) {
      this.showSendComment = !closed;
    },
    sendComment() {
      console.log(123)
      this.showSendComment = true
    },
  },
  components: {
    Comment,
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, SendComment, Check
  }
}
</script>

<style scoped lang="scss">
.detail {
  .panel {
    .question {
      .question-content-panel {
        width: 100%;
        box-shadow: $panel-shadow;
        box-sizing: border-box;
        padding: 15px 0;

        .question-content {
          box-sizing: border-box;
          padding: 0 50px;
          margin: auto;
          width: $panel-width;
          min-height: 200px;

          .left {
            display: flex;

            > div {
              margin-left: 15px;
            }

            span {
              display: inline-block;
              margin-left: 5px;
            }

            .user-name {
              font-size: 16px;
              font-weight: bold;
            }

            .idea-num {
              font-size: 14px;
              color: $info-color;
            }
          }

          .tag-panel {
            .el-tag {
              margin-right: 5px;
            }
          }

          .content {
            p {
              font-size: 18px;
            }
          }

          .btn-group {
            div {
              display: flex;
              align-items: center;
            }

            span, .el-icon {
              cursor: pointer;
              color: $info-color
            }

            .iconfont {
              display: inline-block;
              height: 50px;
              line-height: 50px;
              font-size: 24px;
              font-weight: bold;

              &.icon-answer {
                font-size: 18px;
              }
            }

            .article-browse-info {
              span {
                font-weight: bold;
                color: $info-color;
              }

              .vertical {
                display: inline-block;
                padding: 5px;
              }
            }

            .attention-btn {
              text-align: center;
            }
          }
        }
      }

      .question-answer-panel {
        width: $panel-width;
        margin: auto;
        box-shadow: $panel-shadow;
        border-radius: 5px;
        padding: 15px 20px;
        margin-top: 10px;

        .answer-header {
          h3 {
            padding: 0;
            margin: 0;
          }
        }

        .answer-footer {
          text-align: center;

          .info-text {
            color: $info-color;
          }
        }

        .answer-content {
          .author-info {
            display: flex;
            align-items: flex-end;

            .user-name {
              font-size: 18px;
              font-weight: bold;
              display: inline-block;
              margin-left: 8px;
            }

            .send-time {
              font-size: 15px;
              display: inline-block;
              margin-left: 5px;
              color: $info-color;
            }
          }

          .answer-good-num {
            padding: 5px 0;

            span {
              font-size: 14px;
              color: $info-color;
            }
          }
        }

        .correlation {
          margin: 0 20px;

          .el-card {
            h3 {
              padding: 0;
              margin: 0;
            }

            .el-divider {
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>
