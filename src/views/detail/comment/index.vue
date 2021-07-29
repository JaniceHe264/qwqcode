<template>
  <div class="comment">
    <div class="panel">
      <div class="comment-panel" v-infinite-scroll="loadMore">
        <div class="header" v-if="articleInfo.commentNum">
          <h3>总共{{ articleInfo.commentNum }}条评论</h3>
        </div>
        <div class="header" v-else>
          <h3>暂无评论</h3>
        </div>
        <div class="body" v-if="commentList.length">
          <div class="comment-item" v-for="(item,index) in commentList" :key="item.id">
            <div class="author-info">
              <el-avatar :src="meUrl" :size="35" shape="square"></el-avatar>
              <span class="user-name">{{ item.user.nickname ? item.user.nickname : item.user.username }}</span>
              <span class="send-time">评论时间{{ item.createTime }}</span>
            </div>
            <div class="reply">
              <div class="reply-btn">
                <el-button size="mini" type="primary" :color="themeColor" @click="reply(item)">
                  艾特{{ item.user.sex == '女' ? '她' : '他' }}
                </el-button>
              </div>
              <div class="reply-content">
                <p>{{ item.content }}</p>
              </div>
            </div>
            <div class="comment-item" v-for="(item2,index) in item.childList" :key="item2.id">
              <div class="author-info">
                <el-avatar :src="meUrl" :size="25" shape="square"></el-avatar>
                <span class="user-name">{{
                    item2.user.nickname ? item2.user.nickname : item2.user.username
                  }}</span>
                <span
                  class="reply-user">@{{
                    item2.parent.user.nickname ? item2.parent.user.nickname : item2.parent.user.username
                  }}&nbsp;</span>
                <span class="send-time">评论时间{{ item2.createTime }}</span>
              </div>
              <div class="reply">
                <div class="reply-btn">
                  <el-button size="mini" type="primary" :color="themeColor" @click="reply(item2)">
                    艾特{{ item2.user.sex == '女' ? '她' : '他' }}
                  </el-button>
                </div>
                <div class="reply-content">
                  <p>{{ item2.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <span class="info-text">{{ infoText }}</span>
        </div>
      </div>
    </div>
    <SendComment :dialog-visible="showSendComment" :article-info="articleInfo" :is-reply="true"
                 :reply-comment="replyComment" @closed="closeSendComment" :theme-color="themeColor"
                 @commentSuccess="loadCommentList"/>
  </div>
</template>

<script>
import SendComment from "@/components/base/SendComment";
import {getCommentList} from "@/api/comment";

export default {
  name: "Comment",
  components: {SendComment},
  data() {
    return {
      meUrl:
        require('@/assets/image/me.jpg'),
      showSendComment: false,
      commentList: [],
      replyComment: {},
      page: {
        current: 0,
        size: 5,
        total: 0,
        pages: 0
      },
      isReady: false,
      infoText: "玩命加载中..."
    }
  },
  props: {
    themeColor: {
      default: '#26bfbf',
      type: String
    },
    articleInfo: {
      type: Object,
      required: true
    }
  },
  created() {
    if (this.isReady) {
      this.getCommentData()
    }
  },
  watch: {
    articleInfo(newVal, oldVal) {
      if (newVal) {
        this.getCommentData()
      }
    }
  },
  methods: {
    loadMore() {
      this.page.current++;
      if (this.page.current > this.page.pages) {
        return;
      }
      this.getCommentData();
    },
    getCommentData() {
      console.log(this.articleInfo)
      getCommentList({
        articleId: this.articleInfo.id,
        current: this.page.current,
        size: this.page.size,
        type: 'comment'
      }).then(res => {
        if (res.code == 200) {
          this.commentList.push(...res.data.records);
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
    loadCommentList(flag) {
      this.getCommentData()
    },
    closeSendComment(closed) {
      this.showSendComment = !closed
    },
    reply(data) {
      // 设置当前回复的评论信息
      this.replyComment = data;
      // 打开评论面板
      this.showSendComment = true
    }
  }
}
</script>

<style scoped lang="scss">
.comment {
  .panel {
    .comment-panel {
      .body {
        .comment-item {
          .comment-item {
            margin-left: 37px;
          }

          .author-info {
            display: flex;
            align-items: flex-end;

            span {
              display: inline-block;
            }

            .user-name {
              font-size: 18px;
              padding: 0 5px;
            }

            .reply-user {
              font-size: 13px;
            }

            .send-time {
              font-size: 12px;
              color: $info-color;
            }
          }

          .reply {
            margin-left: 37px;

            .reply-btn {
              .el-button {
                font-size: 10px;
                padding: 5px;
                height: 20px;
                line-height: 20px;
              }
            }

            .reply-content {
              p {
                font-size: 15px;
                font-weight: bold;
              }
            }
          }
        }
      }

      .footer {
        text-align: center;

        .info-text {
          color: $info-color;
        }
      }
    }
  }
}
</style>
