<template>
  <div class="send-comment">
    <div class="panel">
      <el-dialog
        v-model="dialogVisible"
        width="30%"
        :lock-scroll="false"
        :before-close="handleClose"
      >
        <div class="info-panel">
          <h3>评论文章：{{ articleInfo.title }}</h3>
          <span v-if="isReply">@{{
              replyComment.user.nickname ? replyComment.user.nickname : replyComment.user.username
            }}: {{ replyComment.content }}</span>
        </div>
        <div class="input-panel">
          <el-input type="textarea" resize="none" v-model="commentContent" placeholder="输入您评论的内容" :rows="3"
                    show-word-limit
                    maxlength="50"></el-input>
          <div class="send-btn">
            <el-button type="primary" :color="themeColor" @click="sendComment">发布评论</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import {addComment} from "@/api/comment";

export default {
  name: "SendComment",
  data() {
    return {
      commentContent: ''
    }
  },
  props: {
    themeColor: {
      type: String,
      default: '#17a788'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    articleInfo: {
      type: Object,
      required: true
    },
    isReply: {
      type: Boolean,
      default: false
    },
    replyComment: {
      type: Object,
      required: false
    }
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      if (newVal) {
        if (this.isReply) {
          if (!this.replyComment) {
            this.$notify.error('回复评论失败，评论信息有误')
            this.handleClose()
          }
        }
      }
    }
  },
  created() {
  },
  methods: {
    sendComment() {
      if (this.commentContent.trim() == '') {
        return this.$notify({
          title: '提示',
          message: '请输入评论内容',
          type: 'error'
        })
      }
      addComment({
        parentId: this.replyComment ? this.replyComment.id : 0,
        articleId: this.articleInfo.id,
        content: this.commentContent,
        type: 'comment'
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: '评论成功',
            type: 'success'
          })
          // console.log(123)
          this.$emit("commentSuccess", true)
          this.handleClose()
        }
      })
    },
    handleClose() {
      this.$emit('closed', true)
      this.commentContent = '';
    }
  }
}
</script>

<style scoped lang="scss">
.send-comment {
  .panel {
    ::v-deep .el-dialog__header {
      padding: 0;
    }

    ::v-deep .el-dialog__body {
      padding: var(--el-dialog-padding-primary) var(--el-dialog-padding-primary);
      color: var(--el-text-color-regular);
      font-size: var(--el-dialog-content-font-size);
      word-break: break-all;
    }

    .input-panel {
      ::v-deep .el-textarea__inner:focus {
        outline: 0;
        border-color: $theme-color;
      }

      .send-btn {
        margin: 10px 0;
        text-align: right;
      }
    }
  }
}

</style>
