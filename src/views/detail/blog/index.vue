<template>
  <div class="blog">
    <div class="panel">
      <el-row>
        <el-col :span="18">
          <div class="blog-panel" v-loading="loading">
            <div class="blog-content">
              <h3>{{ blogInfo.title }}</h3>
              <MdEditor v-model="blogInfo.content" class="markdown" previewOnly></MdEditor>
            </div>
            <div class="tag-panel">
              <el-tag type="info" size="large" effect="dark" color="#26bfbf" v-for="(item,index) in blogInfo.labelList"
                      :key="item.id">
                {{ item.labelName }}
              </el-tag>
            </div>
            <div class="author-info">
              <el-row>
                <div class="left">
                  <el-avatar :src="meUrl" shape="square" :size="50"></el-avatar>
                  <div>
                    <div v-if="blogInfo.user">
                      <span class="user-name">{{
                          blogInfo.user.nickname ? blogInfo.user.nickname : blogInfo.user.username
                        }}</span><br>
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
                      {{ blogInfo.praiseNum }}
                    </el-button>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="comment" @click="sendComment">
                    <span class="iconfont icon-comment"></span>
                    <span>{{ blogInfo.commentNum }}条评论</span>
                  </div>
                  <div class="send-comment">
                    <SendComment :dialog-visible="showSendComment" :article-info="blogInfo" :theme-color="'#26bfbf'"
                                 @closed="closeSendComment"/>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="collect" @click="blogInfo.isCollect = !blogInfo.isCollect">
                    <div v-if="blogInfo.isCollect">
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
                    <span>{{ blogInfo.updateTime }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="browse-info">
                    <span>该博客被{{ blogInfo.praiseNum }}人点赞</span>
                    <span class="vertical">|</span>
                    <span>{{ blogInfo.browse }}人浏览</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <Comment :theme-color="'#26bfbf'" :article-info="blogInfo"/>
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
import SendComment from "@/components/base/SendComment";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {getArticleDetail} from "@/api/article";

export default {
  name: "Blog",
  data() {
    return {
      loading: false,
      meUrl:
        require('@/assets/image/me.jpg'),
      blogLove: false,
      blogInfo: {
        title: '我是博客标题',
        content: '我是博客内容'
      },
      showSendComment: false
    }
  },
  created() {
    this.getBlogInfo();
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Comment, SendComment, MdEditor
  },
  methods: {
    getBlogInfo() {
      this.loading = true;
      getArticleDetail(this.$route.query.id).then(res => {
        if (res.code == 200) {
          this.blogInfo = res.data;
        }
        this.loading = false;
      })
    },
    closeSendComment(closed) {
      this.showSendComment = !closed;
    },
    sendComment() {
      this.showSendComment = true
    },
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
        padding: 10px 20px;

        h3 {
          text-align: center;
        }
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
