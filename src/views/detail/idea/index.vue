<template>
  <div class="idea">
    <div class="panel" v-loading="loading">
      <el-row>
        <el-col :span="18">
          <div>
            <div class="author-info">
              <el-row>
                <el-col :span="12">
                  <div class="left" v-if="ideaInfo.user">
                    <el-avatar :src="ideaInfo.user.avatarUrl" shape="square" :size="50"></el-avatar>
                    <div>
                      <div>
                        <span class="user-name">{{
                            ideaInfo.user.nickname ? ideaInfo.user.nickname : ideaInfo.user.username
                          }}</span>
                        <span class="idea-num">共有{{ ideaInfo.user.ideaNum }}个想法</span>
                      </div>
                      <div>
                        <el-button type="warning" circle plain
                                   @click="collect({typeId: ideaInfo.user.id , type: 'author'})">
                          <el-icon v-if="ideaInfo.userIsAttention">
                            <Check/>
                          </el-icon>
                          <el-icon v-else>
                            <Plus/>
                          </el-icon>
                          <span><span v-show="ideaInfo.userIsAttention">已</span>关注</span>
                        </el-button>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="right">
                    <span>该想法被{{ ideaInfo.praiseNum }}人认可</span>
                    <span class="vertical">|</span>
                    <span>{{ browseNum }}次浏览</span>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <div class="idea-content">
              <div class="tag-panel">
                <el-tag type="warning" v-for="(item,index) in ideaInfo.labelList" :key="index">{{
                    item.labelName
                  }}
                </el-tag>
              </div>
              <div>
                <MdEditor v-model="ideaInfo.content" class="markdown" previewOnly></MdEditor>
              </div>
              <div class="btn-group">
                <el-row>
                  <el-col :span="3">
                    <div class="attention">
                      <el-button type="warning" plain size="large" @click="giveALike">
                        赞同&nbsp;
                        <i class="iconfont icon-good"></i>
                        {{ ideaInfo.praiseNum }}
                      </el-button>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="comment" @click="sendComment">
                      <span class="iconfont icon-comment"></span>
                      <span>{{ ideaInfo.commentNum }}条评论</span>
                    </div>
                    <div class="send-comment">
                      <SendComment :dialog-visible="showSendComment" :article-info="ideaInfo"
                                   @closed="closeSendComment" theme-color="#ff9607"
                                   @commentSuccess="loadIdeaInfo"/>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="collect" @click="collect({typeId: ideaInfo.id , type: 'article'})">
                      <div v-if="!ideaInfo.isCollect">
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
                      <span>{{ ideaInfo.updateTime }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
            <Comment theme-color="#ff9607" :article-info="ideaInfo"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right-panel">
            <div class="other-idea">
              <el-card shadow="hover">
                <h3>作者的其他想法</h3>
                <el-divider></el-divider>
                <div v-if="otherArticle.length > 0">
                  <span v-for="(item,index) in otherArticle" :key="item.id">
                    <el-link class="blog-link" type="warning" @click="changeArticle(item)">{{ item.title }}</el-link>
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
                <h3>相关想法</h3>
                <el-divider></el-divider>
                <div v-if="relationArticleList.length > 0">
                  <span v-for="(item,index) in relationArticleList" :key="item.id">
                    <el-link class="blog-link" type="warning" @click="changeArticle(item)">{{ item.title }}</el-link>
                    <el-link type="info">{{ item.praiseNum }}人赞同</el-link>
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
import {addBrowse, getArticleDetail, getFixTagArticleList, getUserArticleList} from "@/api/article";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {addPraise} from "@/api/praise";
import {addCollect} from "@/api/collect";
import {addFootprint} from "@/api/footprint";

import {tagPrefix, userIdPrefix} from '@/config'
import {mapGetters} from "vuex";

export default {
  name: "Idea",
  data() {
    return {
      userIdPrefix: userIdPrefix,
      tagPrefix: tagPrefix,
      meUrl:
        require('@/assets/image/me.jpg'),
      ideaLove: false,
      showSendComment: false,
      ideaInfo: {},
      loading: false,
      browseNum: 0,
      relationArticleList: [],
      otherArticle: []
    }
  },
  created() {
    this.addBrowseNum();
  },
  computed: {
    ...mapGetters(['getToken', 'getUser']),
    articleId() {
      return this.$route.query.id;
    }
  },
  watch: {
    articleId(newVal, oldVal) {
      this.addBrowseNum()
    }
  },
  methods: {
    getOtherArticle() {
      getUserArticleList(userIdPrefix + this.ideaInfo.user.id, 1, 6, this.ideaInfo.type).then(res => {
        if (res.code == 200) {
          this.otherArticle = res.data.records.filter(item => item.id != this.ideaInfo.id);
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
      this.ideaInfo = data;
      this.addBrowseNum()
    },
    getRelationArticle() {
      const tags = this.ideaInfo.labelList.map(temp => this.tagPrefix + temp.labelName).join(',')
      getFixTagArticleList({
        tag: tags,
        current: 1,
        size: 6,
        type: this.ideaInfo.type
      }).then(res => {
        if (res.code == 200) {
          this.relationArticleList = res.data.records.filter(temp => temp.id != this.ideaInfo.id);
        }
      })
    },
    loadIdeaInfo(flag) {
      if (flag) {
        this.getIdeaInfo()
      }
    },
    addVisited() {
      addFootprint({articleId: this.$route.query.id}).then(res => {
        // console.log(res.message)
      })
    },
    addBrowseNum() {
      addBrowse(this.$route.query.id).then(res => {
        this.getIdeaInfo()
        console.log("添加浏览次数成功")
        this.browseNum = res.data;
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
          this.getIdeaInfo()
        }
      })
    },
    giveALike() {
      addPraise({
        "giveType": 'article',
        "praiseType": 1,
        "typeId": this.ideaInfo.id
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
        }
        this.getIdeaInfo();
      })
    },
    getIdeaInfo() {
      this.loading = true;
      getArticleDetail(this.$route.query.id).then(res => {
        if (res.code == 200) {
          this.ideaInfo = res.data;
        }
        this.loading = false;
        this.getRelationArticle()
        this.getOtherArticle()
      })
    },
    closeSendComment(closed) {
      this.showSendComment = !closed;
    },
    sendComment() {
      this.showSendComment = true
    },
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, Comment, SendComment, MdEditor, Check
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
