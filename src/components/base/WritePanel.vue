<template>
  <div class="write">
    <div class="header">
      <el-row>
        <el-col>
          <el-row>
            <el-col :span="12">
              <div class="left">
                <span class="iconfont icon-write"></span>
                <span>&nbsp;&nbsp;放手去做吧</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="right">
                        <span>
                          草稿箱(0)
                        </span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="center">
      <div class="btn-group">
        <el-row :gutter="20">
          <el-col :span="6">
            <div @click="openSendQuestion">
              <span class="iconfont icon-question"></span><br>
              <span class="text-question">提问</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="goto({path:'/question',name:'Question'})">
              <span class="iconfont icon-answer"></span>
              <br>
              <span class="text-answer">解决问题</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="goto({path: '/send-article', name: 'SendArticle' , query:{type: 'idea'}})">
              <span class="iconfont icon-idea"></span>
              <br>
              <span class="text-idea">发布想法</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="goto({path: '/send-article', name: 'SendArticle' , query:{type: 'blog'}})">
              <span class="iconfont icon-blog"></span>
              <br>
              <span class="text-blog">写博客</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="text-panel">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="write-text">
              <p>开启你的创作之路吧...</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer">
      <el-button auto-insert-space size="large" type="success" plain
                 @click="goto({path: '/send-article' , name: 'SendArticle', query: {type: 'blog'}})">
        从这里开始
        <el-icon class="el-icon--right">
          <Plus/>
        </el-icon>
      </el-button>
    </div>
    <SendQuestion :dialog-visible="showSendQuestion" @closed="closeSendQuestion" @saveQuestion="getSaveFlag"/>
  </div>
</template>

<script>
import {AlarmClock, CirclePlus, Key, Plus, Promotion, UserFilled} from "@element-plus/icons-vue";
import SendQuestion from "@/components/base/SendQuestion";
import {mapGetters} from 'vuex'

export default {
  name: "WritePanel",
  data() {
    return {
      squareUrl:
        require('@/assets/image/shy.png'),
      showSendQuestion: false
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    getSaveFlag(flag) {
      if (flag) {
        this.$emit("saveQuestionSuccess", true)
      }
    },
    closeSendQuestion(closed) {
      this.showSendQuestion = !closed;
    },
    openSendQuestion() {
      if (!this.getToken) {
        return this.$notify({
          title: '提示',
          message: '请先登录吧',
          type: 'error'
        })
      }
      this.showSendQuestion = true;
    },
    goto(route) {
      this.$router.push(route);
    }
  },
  components: {
    SendQuestion,
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled
  }
}
</script>

<style scoped lang="scss">
.write {

  border-radius: $panel-radius;
  padding: 10px;
  border: 1px solid gainsboro;

  &:hover {
    box-shadow: $panel-shadow;
    transition: box-shadow .6s;
  }

  .header {
    height: 30px;
    line-height: 30px;
    margin-bottom: 15px;

    .left {
      text-align: left;

      .iconfont {
        font-size: 24px;
        color: $theme-color;
      }

      span:last-child {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .right {
      text-align: right;

      span {
        font-size: 14px;
        color: $info-color;
        cursor: pointer;
      }
    }
  }

  .center {
    .btn-group {
      div {
        text-align: center;
        cursor: pointer;

        [class^='text'] {
          font-size: 14px;
        }

        .iconfont {
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          line-height: 50px;
          font-size: 24px;
          font-weight: bold;

          &.icon-question {
            background-color: $nav-btn-question-back;
            color: $nav-btn-question-icon;
          }

          &.icon-answer {
            background-color: $nav-btn-answer-back;
            color: $nav-btn-answer-icon;
          }

          &.icon-idea {
            background-color: $nav-btn-idea-back;
            color: $nav-btn-idea-icon;
          }

          &.icon-blog {
            background-color: $nav-btn-blog-back;
            color: $nav-btn-blog-icon;
          }

        }
      }
    }

    .text-panel {
      padding: 30px 0;

      .write-text {
        text-align: center;
      }
    }

  }

  .footer {
    text-align: center;

    .el-button {
      width: 80%;
    }
  }
}
</style>
