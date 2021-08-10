<template>
  <div class="search">
    <div class="panel">
      <el-dialog
        v-model="resultVisible"
        width="35%"
        destroy-on-close
        :lock-scroll="false"
        :before-close="handClose"
      >
        <div class="content" v-if="resultData">
          <div v-for="(item,index) in resultData.records" :key="item.id">
            <span class="title" @click="goDetail(item.id, item.type)">{{ index + 1 }}.&nbsp;{{ item.title }}</span>&nbsp;
            <span class="info">
              <span class="type" v-html="getType(item.type)"></span>
              <span>有{{ item.praiseNum }}人点赞</span>
            </span>
          </div>
          <div class="footer">
            <span class="info-text" @click="loadMore">{{ infoText }}</span>
          </div>
        </div>
        <div v-else>
          <el-empty description="啥也没有，换个关键字搜索吧..."></el-empty>
        </div>
        <template #title>
          <div class="logo">
            <span class="zhi">栀</span>
            <span class="xiao">晓</span>
          </div>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <span class="info-text">总共{{ resultData.total }}个结果</span>
            <el-button type="success" @click="handClose">哦了</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  data() {
    return {
      infoText: "点击查看更多..."
    }
  },
  watch: {
    resultData(newVal, oldVal) {
      if (this.resultData.current < this.resultData.pages) {
        this.infoText = "点击加载更多..."
      } else {
        this.infoText = "没有更多了哦"
      }
    }
  },
  created() {
  },
  methods: {
    loadMore() {
      if (this.resultData.current > this.resultData.pages) {
        this.infoText = '没有更多了哦';
        return;
      }
      this.$emit('loadPage', this.resultData)
    },
    getType(type) {
      if (type == 'blog') {
        return `<span style='color: #26bfbf'>博客</span>`
      } else if (type == 'question') {
        return `<span style='color: #0066ff'>问题</span>`
      } else if (type == 'idea') {
        return `<span style='color: #f4c807'>想法</span>`
      } else {
        return `<span style='color: #26bfbf'>${type}</span>`
      }
    },
    handClose() {
      this.$emit("closed", true);
    },
    goDetail(id, type) {
      this.$router.push({
        path: '/detail',
        name: 'Detail',
        query: {
          id: id,
          type: type
        }
      })
      this.handClose()
    },
  },
  props: {
    resultVisible: {
      type: Boolean,
      default: false
    },
    resultData: {
      type: Object
    }
  },
}
</script>

<style scoped lang="scss">
.search {
  .panel {
    box-sizing: border-box;

    .logo {
      text-align: center;
      height: $header-height;
      width: 100%;
      line-height: $header-height;

      span {
        font-weight: bolder;
        cursor: pointer;
      }

      .zhi {
        font-family: 华文隶书;
        color: $header-zhi-color;
        font-size: $header-zhi-size;
      }

      .xiao {
        font-family: 方正舒体;
        color: $header-xiao-color;
        font-size: $header-xiao-size;
      }
    }

    .content {
      > div {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: 18px;
          cursor: pointer;
        }
      }

      .footer {
        display: block !important;
        width: 100%;
        text-align: center;

        .info-text {
          cursor: pointer;
          text-align: center;
          font-size: 15px;
          color: $info-color;
        }
      }
    }

    ::v-deep .el-dialog__body {
      padding: 0 30px;
    }

    .dialog-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info-text {
        color: $info-color;
      }
    }
  }
}
</style>
