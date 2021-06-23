<template>
  <div class="idea">
    <div class="panel">
      <el-row>
        <el-col :span="18">
          <div>
            <div class="author-info">
              <el-row>
                <el-col :span="12">
                  <div class="left">
                    <el-avatar :src="meUrl" shape="square" :size="50"></el-avatar>
                    <span class="user-name">孙峻</span>
                    <span class="idea-num">共有189个想法</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="right">
                    <span>该想法被1923人认可</span>
                    <span class="vertical">|</span>
                    <span>3984人浏览</span>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <div class="idea-content">
              <div class="tag-panel">
                <el-tag type="warning" v-for="(item,index) in 6" :key="index">tag {{ index }}</el-tag>
              </div>
              <div>
                <p>
                  我觉得我可以有一百个女朋友测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
                </p>
              </div>
              <div class="btn-group">
                <el-row>
                  <el-col :span="3">
                    <div class="attention">
                      <el-button type="warning" plain size="large">
                        赞同&nbsp;
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
                  <el-col :span="5">
                    <div class="article-info">
                      <el-icon :size="25">
                        <AlarmClock/>
                      </el-icon>
                      <span>2022-02-04 12:39</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
            <div class="comment-panel">
              <div class="header">
                <h3>总共18732条评论</h3>
              </div>
              <div class="body">
                <div class="comment-item" v-for="(item,index) in 3" :key="index">
                  <div class="author-info">
                    <el-avatar :src="meUrl" :size="35" shape="square"></el-avatar>
                    <span class="user-name">孙峻</span>
                    <span class="send-time">评论时间2022-02-24 19:36</span>
                  </div>
                  <div class="reply">
                    <div class="reply-btn">
                      <el-button size="mini" type="warning">回复</el-button>
                    </div>
                    <div class="reply-content">
                      <p>哈哈哈哈哈哈，一百个都少了</p>
                    </div>
                  </div>
                  <div class="comment-item" v-for="(item,index) in 2" :key="index+10">
                    <div class="author-info">
                      <el-avatar :src="meUrl" :size="35" shape="square"></el-avatar>
                      <span class="user-name">孙峻</span>
                      <span class="send-time">评论时间2022-02-24 19:36</span>
                    </div>
                    <div class="reply">
                      <div class="reply-btn">
                        <el-button size="mini" type="warning">回复</el-button>
                      </div>
                      <div class="reply-content">
                        <p>哈哈哈哈哈哈，一百个都少了</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right-panel">
            <div class="other-idea">
              <el-card shadow="hover">
                <h3>作者的其他想法</h3>
                <el-divider></el-divider>
                <span v-for="(item,index) in 5" :key="index">
                    <el-link type="warning">我是作者的另一个想法</el-link>
                    <el-link type="info">{{ index + 1 }}人赞同</el-link>
                    <el-divider></el-divider>
                  </span>
              </el-card>
            </div>
            <div class="correlation">
              <el-card shadow="hover">
                <h3>相关想法</h3>
                <el-divider></el-divider>
                <span v-for="(item,index) in 5" :key="index">
                    <el-link type="warning">我是一个与该想法类似的想法</el-link>
                    <el-link type="info">{{ index + 1 }}人赞同</el-link>
                    <el-divider></el-divider>
                  </span>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {AlarmClock, CirclePlus, Key, Plus, Promotion, UserFilled} from "@element-plus/icons-vue";

export default {
  name: "Idea",
  data() {
    return {
      meUrl:
        require('@/assets/image/me.jpg'),
    }
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled
  }
}
</script>

<style scoped lang="scss">
.idea {
  .panel {
    box-sizing: border-box;
    margin: auto;
    box-shadow: $panel-shadow;
    width: $panel-width;
    min-height: 300px;
    padding: 20px 50px;

    .author-info {
      .left {
        span {
          display: inline-block;
          margin-left: 5px;
        }

        .user-name {
          font-size: 20px;
          font-weight: bold;
        }

        .idea-num {
          font-size: 14px;
          color: $info-color;
        }
      }

      .right {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;

        span {
          font-size: 16px;
          color: $info-color;
          font-weight: bold;

          &.vertical {
            display: inline-block;
            padding: 0 5px;
          }
        }
      }
    }

    .idea-content {
      .tag-panel {
        .el-tag {
          margin-right: 5px;
        }
      }

      .btn-group {
        div {
          display: flex;
          align-items: center;
        }

        span, .el-icon {
          cursor: pointer;
          color: $info-color;
        }

        .iconfont {
          display: inline-block;
          height: 50px;
          line-height: 50px;
          font-size: 24px;
          font-weight: bold;

          &.icon-good {
            font-weight: normal;
          }

          &.icon-answer {
            font-size: 18px;
            font-weight: normal;
          }
        }
      }
    }

    .comment-panel {
      .body {
        .comment-item {
          .comment-item {
            margin-left: 37px;
          }

          .author-info {
            display: flex;
            align-items: flex-end;

            span {
              display: inline-block;
            }

            .user-name {
              font-size: 18px;
              padding: 0 5px;
            }

            .send-time {
              font-size: 15px;
              color: $info-color;
            }
          }

          .reply {
            margin-left: 37px;

            .reply-btn {
              .el-button {
                font-size: 10px;
                padding: 5px;
                height: 20px;
                line-height: 20px;
              }
            }

            .reply-content {
              p {
                font-size: 14px;
              }
            }
          }
        }
      }
    }

    .right-panel {
      padding: 0 20px;

      .other-idea {
        margin-bottom: 20px;
      }
    }
  }
}

</style>
