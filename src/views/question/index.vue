<template>
  <div class="question">
    <div class="panel">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="left">
            <div class="header">
              <el-row>
                <el-col :span="3">
                  <el-button type="primary" plain size="large">为你推荐</el-button>
                </el-col>
                <el-col :span="3">
                  <el-button type="primary" plain size="large">最新问题</el-button>
                </el-col>
                <el-col :span="3">
                  <el-button type="primary" plain size="large">热门问题</el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <div class="question-list">
              <QuestionAnswer v-for="(item,index) in 5" :key="index" info-type="like"></QuestionAnswer>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right">
            <div class="write-panel">
              <WritePanel/>
            </div>
            <div class="nav">
              <NavPanel/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import QuestionAnswer from './answer'
import WritePanel from "@/components/base/WritePanel";
import NavPanel from "@/components/base/NavPanel";

export default {
  name: "Question",
  data() {
    return {}
  },
  methods: {},
  created() {

  },
  components: {
    NavPanel,
    WritePanel,
    QuestionAnswer
  }
}
</script>

<style scoped lang="scss">
.question {
  .panel {
    width: $panel-width;
    min-height: 300px;
    box-sizing: border-box;
    box-shadow: $panel-shadow;
    margin: auto;
    padding: 20px;

    .right, .left {
      min-height: 100px;
      box-sizing: border-box;
    }

    .left {
      border: 1px solid var(--el-border-color-base);
      border-radius: 2px;
      padding: 20px;
    }

    .right {
      padding: 0 20px;
    }
  }
}
</style>
