<template>
  <div class="nav">
    <el-card shadow="hover">
      <div class="header">
        <span>菜单导航</span>&nbsp;<span class="iconfont icon-nav"></span>
      </div>
      <div class="nav-item">
        <span class="iconfont icon-attention"></span>
        <span>已关注问题</span>
      </div>
      <div class="nav-item">
        <span class="iconfont icon-history"></span>
        <span>浏览足迹</span>
      </div>
      <div class="nav-item">
        <span class="iconfont icon-collect"></span>
        <span>我的收藏</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NavPanel"
}
</script>

<style scoped lang="scss">
.nav {
  margin-top: 20px;

  ::v-deep .el-card__body {
    padding: 20px 0;
  }

  .header {
    .iconfont {
      font-size: 25px;
      color: $nav-header-icon;
    }

    padding-left: 10px;
    margin-bottom: 10px;
  }

  .nav-item {
    cursor: pointer;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;

    &:hover {
      background-color: #f6f6f6;
    }

    .iconfont {
      font-size: 23px;
      font-weight: bold;

      &.icon-attention {
        color: $nav-item-attention-icon;
      }

      &.icon-history {
        color: $nav-item-history-icon;
      }

      &.icon-collect {
        color: $nav-item-collect-icon;
      }

      &:after {
        content: ' ';
      }
    }
  }
}
</style>
