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
                <div class="left" v-if="blogInfo.user">
                  <el-avatar :src="blogInfo.user.avatarUrl" shape="square" :size="50"></el-avatar>
                  <div>
                    <div>
                      <span class="user-name">{{
                          blogInfo.user.nickname ? blogInfo.user.nickname : blogInfo.user.username
                        }}</span><br>
                      <span class="idea-num">{{ blogInfo.user.introduction }}</span>
                    </div>
                    <div v-if="getUser.id != blogInfo.user.id">
                      <el-button color="#26bfbf" size="large" plain
                                 @click="collect({typeId: blogInfo.user.id , type: 'author'})">
                        <el-icon v-if="blogInfo.userIsAttention">
                          <Check/>
                        </el-icon>
                        <el-icon v-else>
                          <Plus/>
                        </el-icon>
                        <span><span v-show="blogInfo.userIsAttention">已</span>关注</span>
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
                    <el-button color="#26bfbf" plain size="large" @click="giveALike">
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
                                 @closed="closeSendComment"
                                 @commentSuccess="loadBlogInfo"/>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="collect" @click="collect({typeId: blogInfo.id , type: 'article'})">
                    <div v-if="!blogInfo.isCollect">
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
                    <span>{{ browseNum }}次浏览</span>
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
                <div v-if="otherArticle.length > 0">
                  <span v-for="(item,index) in otherArticle" :key="item.id">
                    <el-link class="blog-link" type="success" @click="changeArticle(item)">{{ item.title }}</el-link>
                    <el-link type="info">{{ item.praiseNum }}人喜欢</el-link>
                    <el-divider></el-divider>
                  </span>
                </div>
                <div v-else>
                  <el-empty description="什么都麻油..."></el-empty>
                </div>
              </el-card>
            </div>
            <div class="correlation">
              <el-card shadow="hover">
                <h3>相关博客</h3>
                <el-divider></el-divider>
                <div v-if="relationArticleList.length > 0">
                  <span v-for="(item,index) in relationArticleList" :key="item.id">
                    <el-link class="blog-link" type="success" @click="changeArticle(item)">{{ item.title }}</el-link>
                    <el-link type="info">{{ item.praiseNum }}人喜欢</el-link>
                    <el-divider></el-divider>
                  </span>
                </div>
                <div v-else>
                  <el-empty description="什么都麻油..."></el-empty>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {AlarmClock, CirclePlus, Key, Plus, Promotion, UserFilled, Check} from "@element-plus/icons-vue";
import Comment from '../comment'
import SendComment from "@/components/base/SendComment";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {getArticleDetail, addBrowse, getFixTagArticleList, getUserArticleList} from "@/api/article";
import {addPraise} from "@/api/praise";
import {addCollect} from "@/api/collect";
import {addFootprint} from "@/api/footprint";
import {mapGetters, mapActions} from 'vuex'

import {tagPrefix, userIdPrefix} from '@/config'

export default {
  name: "Blog",
  data() {
    return {
      tagPrefix: tagPrefix,
      userIdPrefix: userIdPrefix,
      loading: false,
      meUrl:
        require('@/assets/image/me.jpg'),
      blogLove: false,
      blogInfo: {},
      showSendComment: false,
      browseNum: 0,
      relationArticleList: [],
      otherArticle: []
    }
  },
  created() {
    this.addBrowseNum();
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Comment, SendComment, MdEditor, Check
  },
  computed: {
    ...mapGetters(['getToken', 'getUser']),
    articleId() {
      return this.$route.query.id;
    }
  },
  watch: {
    articleId(newVal, oldVal) {
      if(newVal){
        this.addBrowseNum()
      }
    }
  },
  methods: {
    getOtherArticle() {
      getUserArticleList(userIdPrefix + this.blogInfo.user.id, 1, 6, this.blogInfo.type).then(res => {
        if (res.code == 200) {
          this.otherArticle = res.data.records.filter(item => item.id != this.blogInfo.id);
        }
      })
    },
    changeArticle(data) {
      this.$router.push({
        path: '/detail',
        name: 'Detail',
        query: {
          id: data.id,
          type: data.type
        }
      })
      this.blogInfo = data;
      this.addBrowseNum()
    },
    getRelationArticle() {
      const tags = this.blogInfo.labelList.map(temp => this.tagPrefix + temp.labelName).join(',')
      getFixTagArticleList({
        tag: tags,
        current: 1,
        size: 6,
        type: this.blogInfo.type
      }).then(res => {
        if (res.code == 200) {
          this.relationArticleList = res.data.records.filter(temp => temp.id != this.blogInfo.id);
        }
      })
    },
    loadBlogInfo(flag) {
      if (flag) {
        this.getBlogInfo()
      }
    },
    addVisited() {
      addFootprint({articleId: this.$route.query.id}).then(res => {
        console.log(res.message)
      })
    },
    addBrowseNum() {
      addBrowse(this.$route.query.id).then(res => {
        this.getBlogInfo()
        // console.log("添加浏览次数成功")
        this.browseNum = res.data
        this.addVisited()
      })
    },
    collect(data) {
      addCollect(data).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
          this.getBlogInfo()
        }
      })
    },
    giveALike() {
      addPraise({
        "giveType": 'article',
        "praiseType": 1,
        "typeId": this.blogInfo.id
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
        }
        this.getBlogInfo()
      })
    },
    getBlogInfo() {
      this.loading = true;
      getArticleDetail(this.$route.query.id).then(res => {
        if (res.code == 200) {
          this.blogInfo = res.data;
        }
        this.loading = false;
        this.getRelationArticle();
        this.getOtherArticle()
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
        color: $nav-btn-blog-icon;

        :hover {
          color: $nav-btn-blog-icon !important;
        }
      }

      .correlation {
        margin-top: 20px;
      }
    }
  }
}
</style>
