<template>
  <div class="comment">
    <div class="panel">
      <div class="comment-panel">
        <div class="header">
          <h3>总共18732条评论</h3>
        </div>
        <div class="body">
          <div class="comment-item" v-for="(item,index) in 3" :key="index">
            <div class="author-info">
              <el-avatar :src="meUrl" :size="35" shape="square"></el-avatar>
              <span class="user-name">孙峻</span>
              <span class="send-time">评论时间2022-02-24 19:36</span>
            </div>
            <div class="reply">
              <div class="reply-btn">
                <el-button size="mini" type="primary" :color="themeColor" @click="reply">回复</el-button>
              </div>
              <div class="reply-content">
                <p>哈哈哈哈哈哈，一百个都少了</p>
              </div>
            </div>
            <div class="comment-item" v-for="(item,index) in 2" :key="index+10">
              <div class="author-info">
                <el-avatar :src="meUrl" :size="35" shape="square"></el-avatar>
                <span class="user-name">孙峻</span>
                <span class="send-time">评论时间2022-02-24 19:36</span>
              </div>
              <div class="reply">
                <div class="reply-btn">
                  <el-button size="mini" type="primary" :color="themeColor" @click="reply">回复</el-button>
                </div>
                <div class="reply-content">
                  <p>哈哈哈哈哈哈，一百个都少了</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SendComment :dialog-visible="showSendComment" :article-info="articleInfo" :is-reply="true"
                 :reply-comment="replyComment" @closed="closeSendComment" :theme-color="themeColor"/>
  </div>
</template>

<script>
import SendComment from "@/components/base/SendComment";

export default {
  name: "Comment",
  components: {SendComment},
  data() {
    return {
      meUrl:
        require('@/assets/image/me.jpg'),
      showSendComment: false,
      replyComment: {
        authorInfo: {
          username: '孙峻'
        },
        commentContent: '真好'
      }
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
  },
  methods: {
    closeSendComment(closed) {
      this.showSendComment = !closed
    },
    reply() {
      // 设置当前回复的评论信息
      this.replyComment = {
        authorInfo: {
          username: '孙峻'
        },
        commentContent: '真好'
      }
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

            .send-time {
              font-size: 15px;
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
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
