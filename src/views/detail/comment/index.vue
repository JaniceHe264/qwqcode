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
                <el-button size="mini" type="primary" :color="themeColor">回复</el-button>
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
                  <el-button size="mini" type="primary" :color="themeColor">回复</el-button>
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
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      meUrl:
        require('@/assets/image/me.jpg'),
    }
  },
  props: {
    themeColor: {
      default: '#26bfbf',
      type: String
    },
    blogId: {
      type: Number,
      required: true
    }
  },
  created() {
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
