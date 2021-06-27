<template>
  <div class="hot-topic">
    <el-card shadow="hover" class="hot-card">
      <div class="header">
        <el-row>
          <el-col>
            <p>热门话题&nbsp;<span class="iconfont icon-hot"></span></p>
          </el-col>
        </el-row>
      </div>
      <div class="hot-body">
        <el-row>
          <el-col>
            <div class="hot-body-item" v-for="(item,index) in 5" :key="index">
              <p>为什么你没有女朋友？</p>
              <el-divider></el-divider>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HotTopic"
}
</script>

<style scoped lang="scss">
.hot-topic {
  .header {
    .iconfont.icon-hot {
      color: #ff0000;
      font-size: 20px;
    }
  }

  ::v-deep .el-card__body {
    padding: 10px !important;
  }

  .hot-card {
    .hot-body {
      .hot-body-item {
        cursor: pointer;
      }
    }
  }
}
</style>
