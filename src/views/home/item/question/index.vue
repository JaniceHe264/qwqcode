<template>
  <div class="question-item">
    <div class="panel">
      <div class="item question">
        <!-- 提问 -->
        <div>
          <h3>这是提问的标题</h3>
          <div class="tag-panel">
            <el-tag class="ml-2" type="success">Tag 2</el-tag>
            <el-tag class="ml-2" type="info">Tag 3</el-tag>
            <el-tag class="ml-2" type="warning">Tag 4</el-tag>
            <el-tag class="ml-2" type="danger">Tag 5</el-tag>
          </div>
          <p class="item-text">这是提问的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
            文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
            测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
            文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
            测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
            文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测 </p>
          <p>
            <el-link type="primary" :underline="false" @click="goDetail(1 , 'question')">阅读全文</el-link>
          </p>
          <div class="btn-group">
            <el-row>
              <el-col :span="7">
                <el-row>
                  <el-col :span="15">
                    <el-button type="primary" size="large">
                      <span class="iconfont icon-answer"></span>&nbsp;给他提建议
                    </el-button>
                  </el-col>
                  <el-col :span="9">
                    <el-button type="primary" plain size="large">
                      <span class="iconfont icon-good"></span>
                      <span>188</span>
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <div class="comment">
                  <span class="iconfont icon-comment"></span>
                  <span>1888条评论</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="collect" @click="questionAttention = !questionAttention">
                  <div v-if="questionAttention">
                    <el-icon :size="25">
                      <CirclePlus/>
                    </el-icon>
                    <span>关注问题</span>
                  </div>
                  <div v-else>
                    <span class="iconfont icon-attention"></span>&nbsp;
                    <span>已关注问题</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="2">
                <el-popover
                  placement="bottom"
                  :width="100"
                  trigger="click"
                  popper-class="share-popover"
                >
                  <template #reference>
                    <div class="share">
                      <el-icon :size="25">
                        <Promotion/>
                      </el-icon>
                      <span>分享</span>
                    </div>
                  </template>
                  <div class="share-panel">
                    <div class="share-item">
                      <p>微信扫一扫</p>
                    </div>
                  </div>
                </el-popover>
              </el-col>
              <el-col :span="5">
                <div class="article-info">
                  <el-icon :size="25">
                    <AlarmClock/>
                  </el-icon>
                  <span>2022-02-04 12:39</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>孙峻</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {AlarmClock, CirclePlus, Key, Plus, Promotion, UserFilled} from "@element-plus/icons-vue";

export default {
  name: "QuestionItem",
  data() {
    return {
      questionAttention: false,
    }
  },
  props: {
    questionInfo: {
      type: Object,
      required: true
    }
  },
  methods: {

    goDetail(id, type) {
      this.$router.push({
        path: '/detail',
        name: 'Detail',
        query: {
          id: 1,
          type: type
        }
      })
    },
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled
  }
}
</script>

<style scoped lang="scss">
.question-item {
  .panel {
    .item {
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid var(--el-border-color-base);

      &.blog {
        .blog-link {
          color: #26bfbf;

          &:hover {
            opacity: .8;
          }
        }

        .el-image {
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
        }
      }

      .tag-panel {
        .el-tag {
          margin-right: 5px;
          margin-bottom: 5px;
        }
      }

      .iconfont {
        &.icon-good {
          font-size: 20px;
        }

        &.icon-comment {
          font-size: 24px;
        }

        &.icon-collect {
          font-size: 26px;
        }

        &.icon-love {
          font-size: 20px;
        }
      }

      .comment, .share, .article-info, .author-info {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        color: $info-color;
      }

      .collect {
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        color: $info-color;

        div {
          display: flex;
          align-items: center;
        }

        .icon-attention {
          font-size: 25px;
        }
      }


      .item-text {
        /* 设置溢出隐藏 */
        overflow: hidden;
        /* 设置隐藏部分显示为省略号 */
        text-overflow: ellipsis;
        /* 弹性伸缩和子模型显示 */
        display: -webkit-box;
        /* 限制在一个块元素中显示的行数 */
        -webkit-line-clamp: 3; /* 显示两行 */
        /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
