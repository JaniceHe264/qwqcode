<template>
  <div class="answer">
    <div class="panel">
      <div class="question">
        <div class="avatar-info" v-if="answerData">
          <el-avatar shape="square" :size="35" :src="meUrl">
          </el-avatar>
          <span
            class="user-name">{{
              answerData.user.nickname ? answerData.user.nickname : answerData.user.username
            }}</span>
        </div>
        <div class="question-title">
          <h3>{{ answerData.article.title }}</h3>
        </div>
      </div>
      <div class="mine-answer">
        <p>我的回答：</p>
        <p>{{ answerData.content }}</p>
      </div>
      <div class="answer-info">
        <el-link type="info" :underline="false" @click="remove">删除</el-link>
      </div>
      <el-divider/>
    </div>
  </div>
</template>

<script>

import {removeComment} from "@/api/comment";

export default {
  name: "Answer",
  data() {
    return {
      meUrl: require('@/assets/image/me.jpg')
    }
  },
  props: {
    answerData: {
      type: Object,
      required: true
    }
  },
  created() {
  },
  methods: {
    remove() {
      this.$confirm("确定删除该回答吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(flag => {
        removeComment(this.answerData.id).then(res => {
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
    }
  }
}
</script>

<style scoped lang="scss">
.answer {
  .panel {
    padding: 10px;
    border: 1px solid var(--el-border-color-base);

    .question {
      .avatar-info {
        display: flex;
        align-items: flex-end;

        .user-name {
          display: inline-block;
          padding: 0 5px;
          font-size: 15px;
        }
      }
    }

    .mine-answer {
      p:nth-child(1) {
        font-weight: bold;
      }
    }

    .answer-info {
      .el-link {
        color: $theme-color;

        &:hover {
          opacity: .8;
        }
      }
    }

    .el-divider {
      margin: 5px 0;
    }
  }
}
</style>
