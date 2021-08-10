<template>
  <div class="nav" v-if="getToken">
    <el-card shadow="hover">
      <div class="header">
        <span>菜单导航</span>&nbsp;<span class="iconfont icon-nav"></span>
      </div>
      <div class="nav-item" v-for="item in articleNumData" :key="item.id" @click="goto(item.value)">
        <span>{{ item.label }} </span> <span :style="{color: getNumColor(item.articleNum)}">({{
          item.articleNum
        }})</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getUserArticleNum} from "@/api/user";

import {getColor, checkLogin} from "@/utils/utils";

import {mapGetters} from 'vuex';

export default {
  name: "NavPanel",
  data() {
    return {
      articleNumData: []
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  created() {
    if (checkLogin()) {
      this.getUserArticleNumData()
    }
  },
  watch: {
    getToken(newVal, oldVal) {
      if (newVal) {
        this.getUserArticleNumData()
      }
    }
  },
  methods: {
    getNumColor(num) {
      return getColor(num);
    },
    getUserArticleNumData() {
      getUserArticleNum().then(res => {
        if (res.code == 200) {
          this.articleNumData = res.data;
        }
      })
    },
    goto(active) {
      this.$router.push({
        path: '/personal',
        name: 'Personal',
        query: {
          active: active
        }
      })
    }
  }
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
