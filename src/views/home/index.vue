<template>
  <div class="home">
    <div class="panel">
      <el-row :gutter="50">
        <el-col :span="6">
          <div class="left">
            <div class="avatar">
              <el-avatar :size="150" :src="circleUrl"></el-avatar>
              <div class="user">
                <p>孙峻</p>
              </div>
              <div class="info">
                <p>这个人很懒，什么都没留下...</p>
              </div>
            </div>
            <div class="write">
              <div class="header">
                <el-row>
                  <el-col>
                    <el-row>
                      <el-col :span="12">
                        <div class="left">
                          <span class="iconfont icon-write"></span>
                          <span>&nbsp;&nbsp;放手去做吧</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="right">
                        <span>
                          草稿箱(0)
                        </span>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div class="center">
                <div class="btn-group">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div>
                        <span class="iconfont icon-question"></span><br>
                        <span class="text-question">提问</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="iconfont icon-answer"></span>
                        <br>
                        <span class="text-answer">解决问题</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="iconfont icon-idea"></span>
                        <br>
                        <span class="text-idea">发布想法</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="iconfont icon-blog"></span>
                        <br>
                        <span class="text-blog">写博客</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="text-panel">
                  <el-row :gutter="20">
                    <el-col :span="18">
                      <div class="write-text">
                        <p>开启你的创作之路吧...</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="footer">
                <el-button auto-insert-space size="large" type="success" plain>
                  从这里开始
                  <el-icon class="el-icon--right">
                    <Plus/>
                  </el-icon>
                </el-button>
              </div>
            </div>
            <HotTopic/>
            <div class="nav">
              <el-card shadow="hover">
                <div class="header">
                  <span>菜单导航</span>&nbsp;<span class="iconfont icon-nav"></span>
                </div>
                <div class="nav-item">
                  <span class="iconfont icon-attention"></span>
                  <span>已关注问题</span>
                </div>
                <div class="nav-item">
                  <span class="iconfont icon-history"></span>
                  <span>浏览足迹</span>
                </div>
                <div class="nav-item">
                  <span class="iconfont icon-collect"></span>
                  <span>我的收藏</span>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="right">
            <div class="header">
              <el-row>
                <el-col :span="6" v-for="(item , index) in navData" :key="index">
                  <div class="nav-item" :class="{active: curActive == (index + 1)}" @click="changeNav(index + 1)">
                    <span>{{ item.name }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="body">
              <el-row>
                <el-col v-for="(item , index) in articleList" :key="index">
                  <QuestionItem v-if="item.type == 'question'"/>
                  <IdeaItem v-if="item.type == 'idea'"/>
                  <BlogItem v-if="item.type == 'blog'" :has-first-pic="item.hasFirstPic"/>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled} from '@element-plus/icons-vue'
import QuestionItem from './item/question'
import IdeaItem from './item/idea'
import BlogItem from './item/blog'
import HotTopic from '@/components/base/HotTopic'

export default {
  name: "Home",
  data() {
    return {
      navData: [
        {
          name: '推荐'
        },
        {
          name: '热榜'
        },
        {
          name: '关注'
        },
        {
          name: '我发布的'
        },
      ],
      articleList: [
        {
          type: 'blog',
          hasFirstPic: false
        },
        {
          type: 'blog',
          hasFirstPic: true
        },
        {
          type: 'question'
        },
        {
          type: 'idea'
        }
      ],
      circleUrl:
        require('@/assets/image/me.jpg'),
      squareUrl:
        require('@/assets/image/shy.png'),
      curActive: 1
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
    changeNav(index) {
      this.curActive = index;
    }
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled, QuestionItem, IdeaItem, BlogItem, HotTopic
  }
}
</script>

<style lang="scss" scoped>
.home {
  .panel {
    box-sizing: border-box;
    padding: 15px;
    box-shadow: $panel-shadow;
    margin: auto;
    width: $panel-width;
    min-height: 800px;

    .left {
      .avatar {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        p {
          padding: 0;
          margin: 0;
        }

        .user {
          margin-top: 10px;

          p {
            font-weight: bold;
            font-size: 16px;
          }
        }

        .info {
          p {
            font-size: 15px;
            color: #98a6ad;
          }
        }
      }

      .write {

        border-radius: $panel-radius;
        padding: 10px;
        border: 1px solid gainsboro;
        margin: 20px 0;

        &:hover {
          box-shadow: $panel-shadow;
          transition: box-shadow .6s;
        }

        .header {
          height: 30px;
          line-height: 30px;
          margin-bottom: 15px;

          .left {
            text-align: left;

            .iconfont {
              font-size: 24px;
              color: $theme-color;
            }

            span:last-child {
              font-size: 16px;
              font-weight: bold;
            }
          }

          .right {
            text-align: right;

            span {
              font-size: 14px;
              color: $info-color;
              cursor: pointer;
            }
          }
        }

        .center {
          .btn-group {
            div {
              text-align: center;
              cursor: pointer;

              [class^='text'] {
                font-size: 14px;
              }

              .iconfont {
                display: inline-block;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                line-height: 50px;
                font-size: 24px;
                font-weight: bold;

                &.icon-question {
                  background-color: $nav-btn-question-back;
                  color: $nav-btn-question-icon;
                }

                &.icon-answer {
                  background-color: $nav-btn-answer-back;
                  color: $nav-btn-answer-icon;
                }

                &.icon-idea {
                  background-color: $nav-btn-idea-back;
                  color: $nav-btn-idea-icon;
                }

                &.icon-blog {
                  background-color: $nav-btn-blog-back;
                  color: $nav-btn-blog-icon;
                }

              }
            }
          }

          .text-panel {
            padding: 30px 0;

            .write-text {
              text-align: center;
            }
          }

        }

        .footer {
          text-align: center;

          .el-button {
            width: 80%;
          }
        }
      }

      .nav {
        margin-top: 20px;

        ::v-deep .el-card__body {
          padding: 20px 0;
        }

        .header {
          .iconfont {
            font-size: 25px;
            color: $nav-header-icon;
          }

          padding-left: 10px;
          margin-bottom: 10px;
        }

        .nav-item {
          cursor: pointer;
          height: 45px;
          line-height: 45px;
          padding-left: 20px;

          &:hover {
            background-color: #f6f6f6;
          }

          .iconfont {
            font-size: 23px;
            font-weight: bold;

            &.icon-attention {
              color: $nav-item-attention-icon;
            }

            &.icon-history {
              color: $nav-item-history-icon;
            }

            &.icon-collect {
              color: $nav-item-collect-icon;
            }

            &:after {
              content: ' ';
            }
          }
        }
      }
    }

    .right {
      .header {
        margin-bottom: 20px;

        .nav-item {
          text-align: center;

          &.active {
            span {
              color: $theme-color;
              display: inline-block;
              border-bottom: 2px solid $theme-color;
            }
          }

          span {
            cursor: pointer;
            transition: color .3s;

            &:hover {
              color: $theme-color;
              display: inline-block;
              border-bottom: 2px solid $theme-color;
            }
          }
        }
      }

      .body {
        padding: 20px 45px;
      }
    }
  }
}
</style>
