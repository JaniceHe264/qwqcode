<template>
  <div class="answer">
    <div class="panel">
      <div class="question">
        <div class="avatar-info">
          <el-avatar shape="square" :size="35" :src="meUrl">
          </el-avatar>
          <span class="user-name">小明</span>
        </div>
        <div class="question-title">
          <h3>我是问题的标题</h3>
        </div>
      </div>
      <div class="mine-answer">
        <p>我的回答：</p>
        <p>我是问题的答案测试文字测试文字测试文字测试文字测试文字测试文字</p>
      </div>
      <div class="answer-info">
        <el-link type="info" :underline="false">删除</el-link>
      </div>
      <el-divider/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Answer",
  data() {
    return {
      meUrl: require('@/assets/image/me.jpg')
    }
  },
  created() {

  },
  methods: {}
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
