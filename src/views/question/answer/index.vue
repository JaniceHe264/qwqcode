<template>
  <div class="answer">
    <div class="panel">
      <el-row>
        <el-col :span="18">
          <div class="left">
            <div class="author-info">
              <el-avatar shape="circle" :size="35" :src="meUrl"></el-avatar>
              <div>
                <span class="user-name">孙峻的提问</span>
                <span>&nbsp;期待您的回答</span>
                <span class="send-time">2022-02-26 11:29</span>
              </div>
            </div>
            <div class="question-content">
              <p>我是提问的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字</p>
            </div>
            <div class="question-info">
              <span class="info-type" v-if="infoType == 'like'">你可能感兴趣 ·</span>
              <span class="info-type" v-if="infoType == 'hot'">你可能感兴趣 ·</span>
              <span class="info-text"> 323回答 · 123关注</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right">
            <el-button type="primary" size="large">写回答</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionAnswer",
  data() {
    return {
      meUrl:
        require('@/assets/image/me.jpg'),
    }
  },
  props: {
    infoType: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.answer {
  .panel {
    box-sizing: border-box;
    justify-content: space-between;

    > .el-row {
      align-items: center;

      .left {
        .author-info {
          display: flex;
          align-items: flex-end;

          > div {
            margin-left: 5px;
            display: flex;
            align-items: flex-end;

            .user-name {
              display: inline-block;
              padding: 0 2px;
              font-size: 17px;
            }

            .send-time {
              display: inline-block;
              padding: 0 5px;
              color: $info-color;
              font-size: 13px;
            }

          }
        }

        .question-content {
          p {
            font-size: 18px;
          }
        }

        .question-info {
          span[class^='info'] {
            color: $info-color;
          }
        }
      }

      .right {
        text-align: right;
      }
    }
  }
}

</style>
