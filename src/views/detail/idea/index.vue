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
                    <div>
                      <div>
                        <span class="user-name">孙峻</span>
                        <span class="idea-num">共有189个想法</span>
                      </div>
                      <div>
                        <el-button type="warning" circle plain>
                          <el-icon>
                            <Plus/>
                          </el-icon>
                          <span>关注</span>
                        </el-button>
                      </div>
                    </div>
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
                    <div class="collect" @click="ideaLove = !ideaLove">
                      <div v-if="ideaLove">
                        <span class="iconfont icon-collect"></span>
                        <span>收藏博客</span>
                      </div>
                      <div v-else>
                        <span class="iconfont icon-love"></span>&nbsp;
                        <span>已收藏</span>
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
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
            <Comment theme-color="#ff9607" :blog-id="1"/>
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
import Comment from '../comment'


export default {
  name: "Idea",
  data() {
    return {
      meUrl:
        require('@/assets/image/me.jpg'),
      ideaLove: false
    }
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Comment
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
        display: flex;

        > div {
          margin-left: 15px;
        }

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

          &.icon-love {
            font-size: 20px;
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
