<template>
  <div class="detail">
    <div class="panel">
      <div class="question">
        <div class="question-content-panel">
          <div class="question-content">
            <h2>我是一个问题的标题</h2>
            <div class="tag-panel">
              <el-tag
                v-for="(item,index) in 6"
                :key="index"
                effect="dark"
                size="large"
              >
                tag{{ item }}
              </el-tag>
            </div>
            <div class="content">
              <p>
                我是一个问题的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文
                字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文
                字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文
                字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
              </p>
            </div>
            <div class="btn-group">
              <el-row>
                <el-col :span="5">
                  <el-row :gutter="8">
                    <el-col :span="12">
                      <el-button type="primary" size="large" plain>
                        <i class="iconfont icon-answer"></i>&nbsp;替他解答
                      </el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="primary" size="large" plain @click="questionAttention = !questionAttention">
                        <div v-if="questionAttention">
                          <el-icon :size="19">
                            <CirclePlus/>
                          </el-icon>
                          关注问题
                        </div>
                        <div v-else>
                          <i class="iconfont icon-attention"></i>&nbsp;
                          已关注问题
                        </div>
                      </el-button>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="2">
                  <div class="attention">
                    <el-button type="primary" plain size="large">
                      <i class="iconfont icon-good"></i>
                      188
                    </el-button>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="comment">
                    <span class="iconfont icon-comment"></span>
                    <span>1888条评论</span>
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
                <el-col :span="3">
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
                <el-col :span="6">
                  <div class="article-browse-info">
                    <span>已有18888人关注该问题</span><span class="vertical">|</span><span>被浏览20000次</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="question-answer-panel">
          <el-row>
            <el-col :span="18">
              <div class="answer-header">
                <h3>23672个回答</h3>
                <el-divider></el-divider>
              </div>
              <div class="answer-content" v-for="(item , index) in 6" :key="index">
                <div class="author-info">
                  <el-avatar :src="squareUrl" shape="square" size="50"></el-avatar>
                  <span class="user-name">孙峻</span>
                  <span class="send-time">2022-02-24</span>
                </div>
                <div class="answer-good-num">
                  <span>有3000人觉得这个回答不错</span>
                </div>
                <div class="answer-info">
                  <p>我是回答这个问题的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
                    字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                    文字字测试文字测试文字测试文字测试文字测试文字测试文字测试文字 字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文
                    字字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试</p>
                </div>
                <el-button type="primary" plain><span class="iconfont icon-good"></span>我觉得很不错</el-button>
                <el-divider></el-divider>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="correlation">
                <el-card shadow="hover">
                  <h3>相关问题</h3>
                  <el-divider></el-divider>
                  <span v-for="(item,index) in 6" :key="index">
                    <el-link type="primary">我是一个相关问题的标题标题标题标题标题标题标题</el-link>
                    <el-link type="info">{{ index + 1 }}个回答</el-link>
                    <el-divider></el-divider>
                  </span>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled} from '@element-plus/icons-vue'

export default {
  name: "index",
  data() {
    return {
      questionAttention: false,
      squareUrl:
        require('@/assets/image/shy.png'),
    }
  },
  created() {
  },
  methods: {},
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled
  }
}
</script>

<style scoped lang="scss">
.detail {
  .panel {
    .question {
      .question-content-panel {
        width: 100%;
        box-shadow: $panel-shadow;
        box-sizing: border-box;
        padding: 15px 0;

        .question-content {
          box-sizing: border-box;
          padding: 0 50px;
          margin: auto;
          width: $panel-width;
          min-height: 200px;

          .tag-panel {
            .el-tag {
              margin-right: 5px;
            }
          }

          .content {
            p {
              font-size: 18px;
            }
          }

          .btn-group {
            div {
              display: flex;
              align-items: center;
            }

            span, .el-icon {
              cursor: pointer;
              color: $info-color
            }

            .iconfont {
              display: inline-block;
              height: 50px;
              line-height: 50px;
              font-size: 24px;
              font-weight: bold;

              &.icon-answer {
                font-size: 18px;
              }
            }

            .article-browse-info {
              span {
                font-weight: bold;
                color: $info-color;
              }

              .vertical {
                display: inline-block;
                padding: 5px;
              }
            }
          }
        }
      }

      .question-answer-panel {
        width: $panel-width;
        margin: auto;
        box-shadow: $panel-shadow;
        border-radius: 5px;
        padding: 15px 20px;
        margin-top: 10px;

        .answer-header {
          h3 {
            padding: 0;
            margin: 0;
          }
        }

        .answer-content {
          .author-info {
            display: flex;
            align-items: flex-end;

            .user-name {
              font-size: 18px;
              font-weight: bold;
              display: inline-block;
              margin-left: 8px;
            }

            .send-time {
              font-size: 15px;
              display: inline-block;
              margin-left: 5px;
              color: $info-color;
            }
          }

          .answer-good-num {
            padding: 5px 0;

            span {
              font-size: 14px;
              color: $info-color;
            }
          }
        }

        .correlation {
          margin: 0 20px;

          .el-card {
            h3 {
              padding: 0;
              margin: 0;
            }

            .el-divider {
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>
