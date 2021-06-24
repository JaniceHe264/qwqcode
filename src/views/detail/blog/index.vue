<template>
  <div class="blog">
    <div class="panel">
      <el-row>
        <el-col :span="18">
          <div class="blog-panel">
            <div class="blog-content">
              <h3>我是博客的标题</h3>
              <p>我是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字</p>
              <p>我是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字</p>
              <p>我是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字</p>
              <p>我是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字</p>
              <p>我是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字</p>
              <p>我是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字</p>
            </div>
            <div class="tag-panel">
              <el-tag type="info" size="large" effect="dark" color="#26bfbf" v-for="(item,index) in 6" :key="index">
                tag{{ index }}
              </el-tag>
            </div>
            <div class="author-info">
              <el-row>
                <div class="left">
                  <el-avatar :src="meUrl" shape="square" :size="50"></el-avatar>
                  <div>
                    <div>
                      <span class="user-name">孙峻</span><br>
                      <span class="idea-num">希望我一切顺利</span>
                    </div>
                    <div>
                      <el-button color="#26bfbf" size="large" plain>
                        <el-icon>
                          <Plus/>
                        </el-icon>
                        <span>关注</span>
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-row>
            </div>
            <div class="btn-group">
              <el-row>
                <el-col :span="3">
                  <div class="attention">
                    <el-button color="#26bfbf" plain size="large">
                      厉害&nbsp;
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
                  <div class="collect" @click="blogLove = !blogLove">
                    <div v-if="blogLove">
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
                <el-col :span="8">
                  <div class="browse-info">
                    <span>该博客被1923人点赞</span>
                    <span class="vertical">|</span>
                    <span>3984人浏览</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <Comment :theme-color="'#26bfbf'" :blog-id="1"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right-panel">
            <div class="other-idea">
              <el-card shadow="hover">
                <h3>作者的其他博客</h3>
                <el-divider></el-divider>
                <span v-for="(item,index) in 5" :key="index">
                    <el-link class="blog-link" type="warning">我是作者的另一个想法</el-link>
                    <el-link type="info">{{ index + 1 }}人赞同</el-link>
                    <el-divider></el-divider>
                  </span>
              </el-card>
            </div>
            <div class="correlation">
              <el-card shadow="hover">
                <h3>相关博客</h3>
                <el-divider></el-divider>
                <span v-for="(item,index) in 5" :key="index">
                    <el-link class="blog-link" type="warning">我是一个与该想法类似的想法</el-link>
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
  name: "Blog",
  data() {
    return {
      meUrl:
        require('@/assets/image/me.jpg'),
      blogLove: false
    }
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Comment
  }
}
</script>

<style scoped lang="scss">
.blog {
  .panel {
    width: $panel-width;
    margin: auto;
    box-shadow: $panel-shadow;
    min-height: 300px;
    box-sizing: border-box;
    padding: 20px 30px;

    .blog-panel {
      .blog-content {
        border: 1px solid var(--el-border-color-base);
        border-radius: 5px;
        text-align: center;
        padding: 10px 0;
      }

      .tag-panel {
        padding: 10px 0;

        .el-tag {
          color: white;
          margin-right: 5px;
          border: 1px solid $nav-btn-blog-icon;
        }
      }

      .author-info {
        padding: 20px 0;

        .left {
          display: flex;
          width: 100%;

          > div {
            width: 100%;
            margin-left: 15px;
            display: flex;
            justify-content: space-between;
          }

          span {
            display: inline-block;
            margin-left: 5px;
          }

          .user-name {
            font-size: 16px;
            font-weight: bold;
          }

          .idea-num {
            font-size: 14px;
            color: $info-color;
          }
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

        .browse-info {
          .vertical {
            display: inline-block;
            padding: 0 5px;
          }
        }
      }
    }

    .right-panel {
      padding: 0 30px;

      .el-link.blog-link {
        color: #26bfbf;
      }

      .correlation {
        margin-top: 20px;
      }
    }
  }
}
</style>
