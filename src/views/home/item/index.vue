<template>
  <div class="article-item">
    <div class="panel">
      <div class="item article">
        <!-- 博客 -->
        <div>
          <h3>{{ articleInfo.title }}</h3>
          <div class="tag-panel">
            <el-tag class="ml-2" :style="{backgroundColor: getLabelColor(item.id), color: 'white'}"
                    v-for="item in articleInfo.labelList" :key="item.id">{{ item.labelName }}
            </el-tag>
          </div>
          <div v-if="articleInfo.type != 'question'">
            <el-row :gutter="20">
              <el-col :span="5" v-if="hasFirstPic">
                <el-image :src="articleInfo.firstUrl ? articleInfo.firstUrl : squareUrl" fit="fill">
                  <template #placeholder>
                    <div class="image-slot">玩命加载中<span class="dot">...</span></div>
                  </template>
                  <template #error>
                    <div class="image-slot">
                      <el-icon>
                        <Picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
              </el-col>
              <el-col :span="contentHoldNum">
                <p class="item-text" v-html="compiledMarkdown"></p>
              </el-col>
            </el-row>
          </div>
          <p>
            <el-link class="article-link" type="success" :style="{color: themeColor}" :underline="false"
                     @click="goDetail(articleInfo.id , articleInfo.type)">
              阅读全文
            </el-link>
          </p>
          <div class="btn-group">
            <el-row v-if="articleInfo.type == 'blog'">
              <el-col :span="5">
                <el-button color="#26bfbf" plain size="large">
                  我觉得很有用&nbsp;
                  <span class="iconfont icon-good"></span>
                  <span>{{ articleInfo.praiseNum }}</span>
                </el-button>
              </el-col>
              <el-col :span="4">
                <div class="comment" @click="sendComment">
                  <span class="iconfont icon-comment"></span>
                  <span>{{ articleInfo.commentNum }}条评论</span>
                </div>
                <!--                <div class="send-comment">-->
                <!--                  <SendComment :dialog-visible="showSendComment" :article-info="blogInfo" @closed="closeSendComment"/>-->
                <!--                </div>-->
              </el-col>
              <el-col :span="3">
                <div class="collect" @click="articleInfo.isCollect = !articleInfo.isCollect">
                  <div v-if="articleInfo.isCollect">
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
                  <span>{{ articleInfo.updateTime }}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>{{ articleInfo.user.nickname ? articleInfo.user.nickname : articleInfo.user.username }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="articleInfo.type == 'idea'">
              <el-col :span="6">
                <el-button type="warning" plain size="large">
                  这是一个好想法&nbsp;
                  <span class="iconfont icon-good"></span>
                  <span>{{ articleInfo.praiseNum }}</span>
                </el-button>
              </el-col>
              <el-col :span="4">
                <div class="comment">
                  <span class="iconfont icon-comment"></span>
                  <span>{{ articleInfo.commentNum }}条评论</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="collect" @click="articleInfo.isCollect = !articleInfo.isCollect">
                  <div v-if="articleInfo.isCollect">
                    <span class="iconfont icon-collect"></span>
                    <span>收藏想法</span>
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
                  <span>{{ articleInfo.updateTime }}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>{{ articleInfo.user.nickname ? articleInfo.user.nickname : articleInfo.user.username }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="articleInfo.type == 'question'">
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
                      <span>{{ articleInfo.praiseNum }}</span>
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <div class="comment">
                  <span class="iconfont icon-comment"></span>
                  <span>{{ articleInfo.commentNum }}条评论</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="collect" @click="articleInfo.isCollect = !articleInfo.isCollect">
                  <div v-if="articleInfo.isCollect">
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
                  <span>{{ articleInfo.updateTime }}</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="author-info">
                  <el-icon :size="25">
                    <UserFilled/>
                  </el-icon>
                  <span>{{ articleInfo.user.nickname ? articleInfo.user.nickname : articleInfo.user.username }}</span>
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
import {AlarmClock, CirclePlus, Key, Plus, Promotion, UserFilled, Picture} from "@element-plus/icons-vue";
import SendComment from "@/components/base/SendComment";
import {getColor} from "@/utils/utils";
import {marked} from "marked"

export default {
  name: "ArticleItem",
  data() {
    return {
      circleUrl:
        require('@/assets/image/me.jpg'),
      squareUrl:
        require('@/assets/image/shy.png'),
      contentHoldNum: 24,
      showSendComment: false,
    }
  },
  props: {
    hasFirstPic: {
      default: false,
      type: Boolean
    },
    articleInfo: {
      type: Object,
      required: true
    },
    themeColor: {
      type: String,
      required: false,
      default: "#26bfbf"
    }
  },
  created() {
    this.contentHoldNum = this.hasFirstPic ? 18 : 24
  },
  computed: {
    compiledMarkdown() {
      //this.articleDetail.context数据
      if (this.articleInfo.content) {
        return marked(this.articleInfo.content, {sanitize: true})
      }
      return "";
    },
  },
  methods: {
    getLabelColor(id) {
      return getColor(id)
    },
    closeSendComment(closed) {
      this.showSendComment = !closed;
    },
    sendComment() {
      this.showSendComment = true
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
    },
  },
  components: {
    SendComment,
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Picture
  }
}
</script>

<style scoped lang="scss">
.article-item {
  .panel {
    .item {
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid var(--el-border-color-base);

      &.article {
        .article-link {
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
          border: none;
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
        -webkit-line-clamp: 5; /* 显示5行 */
        /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
