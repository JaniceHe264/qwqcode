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
            <div class="hot-topic">
              <el-card shadow="hover" class="hot-card">
                <div class="header">
                  <el-row>
                    <el-col>
                      <p>热门话题&nbsp;<span class="iconfont icon-hot"></span></p>
                    </el-col>
                  </el-row>
                </div>
                <div class="hot-body">
                  <el-row>
                    <el-col>
                      <div class="hot-body-item" v-for="(item,index) in 5" :key="index">
                        <p>为什么你没有女朋友？</p>
                        <el-divider></el-divider>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
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
                <el-col>
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
                        <el-link type="primary" :underline="false">阅读全文</el-link>
                      </p>
                      <div class="btn-group">
                        <el-row>
                          <el-col :span="6">
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
                          <el-col :span="3">
                            <div class="comment">
                              <span class="iconfont icon-comment"></span>
                              <span>1888条评论</span>
                            </div>
                          </el-col>
                          <el-col :span="3">
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
                          <el-col :span="4">
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
                </el-col>
                <el-col>
                  <div class="item idea">
                    <!-- 想法 -->
                    <div>
                      <h3>这是想法的标题</h3>
                      <div class="tag-panel">
                        <el-tag class="ml-2" type="success">Tag 2</el-tag>
                        <el-tag class="ml-2" type="info">Tag 3</el-tag>
                        <el-tag class="ml-2" type="warning">Tag 4</el-tag>
                        <el-tag class="ml-2" type="danger">Tag 5</el-tag>
                      </div>
                      <p class="item-text">这是想法的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                        文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
                        测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                        文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
                        测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                        文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测 </p>
                      <p>
                        <el-link type="warning" :underline="false">阅读全文</el-link>
                      </p>
                      <div class="btn-group">
                        <el-row>
                          <el-col :span="5">
                            <el-button type="warning" plain size="large">
                              这是一个好想法&nbsp;
                              <span class="iconfont icon-good"></span>
                              <span>188</span>
                            </el-button>
                          </el-col>
                          <el-col :span="3">
                            <div class="comment">
                              <span class="iconfont icon-comment"></span>
                              <span>1888条评论</span>
                            </div>
                          </el-col>
                          <el-col :span="3">
                            <div class="collect" @click="ideaLove = !ideaLove">
                              <div v-if="ideaLove">
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
                              <span>2022-02-04 12:39</span>
                            </div>
                          </el-col>
                          <el-col :span="4">
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
                </el-col>
                <el-col>
                  <div class="item blog">
                    <!-- 博客 -->
                    <div>
                      <h3>这是博客的标题</h3>
                      <div class="tag-panel">
                        <el-tag class="ml-2" type="success">Tag 2</el-tag>
                        <el-tag class="ml-2" type="info">Tag 3</el-tag>
                        <el-tag class="ml-2" type="warning">Tag 4</el-tag>
                        <el-tag class="ml-2" type="danger">Tag 5</el-tag>
                      </div>
                      <p class="item-text">这是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                        文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
                        测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                        文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
                        测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                        文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测 </p>
                      <p>
                        <el-link class="blog-link" type="warning" :underline="false">阅读全文</el-link>
                      </p>
                      <div class="btn-group">
                        <el-row>
                          <el-col :span="5">
                            <el-button color="#26bfbf" plain size="large">
                              我觉得很有用&nbsp;
                              <span class="iconfont icon-good"></span>
                              <span>188</span>
                            </el-button>
                          </el-col>
                          <el-col :span="3">
                            <div class="comment">
                              <span class="iconfont icon-comment"></span>
                              <span>1888条评论</span>
                            </div>
                          </el-col>
                          <el-col :span="3">
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
                          <el-col :span="4">
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
                </el-col>
                <el-col>
                  <div class="item blog">
                    <!-- 博客 -->
                    <div>
                      <h3>这是博客的标题</h3>
                      <div class="tag-panel">
                        <el-tag class="ml-2" type="success">Tag 2</el-tag>
                        <el-tag class="ml-2" type="info">Tag 3</el-tag>
                        <el-tag class="ml-2" type="warning">Tag 4</el-tag>
                        <el-tag class="ml-2" type="danger">Tag 5</el-tag>
                      </div>
                      <div>
                        <el-row :gutter="20">
                          <el-col :span="5">
                            <el-image :src="squareUrl" fit="fill">
                              <template #placeholder>
                                <div class="image-slot">Loading<span class="dot">...</span></div>
                              </template>
                            </el-image>
                          </el-col>
                          <el-col :span="18">
                            <p class="item-text">这是博客的内容测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                              文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
                              测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                              文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字试文字
                              测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试
                              文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测 </p>
                          </el-col>
                        </el-row>
                      </div>
                      <p>
                        <el-link class="blog-link" type="warning" :underline="false">阅读全文</el-link>
                      </p>
                      <div class="btn-group">
                        <el-row>
                          <el-col :span="5">
                            <el-button color="#26bfbf" plain size="large">
                              我觉得很有用&nbsp;
                              <span class="iconfont icon-good"></span>
                              <span>188</span>
                            </el-button>
                          </el-col>
                          <el-col :span="3">
                            <div class="comment">
                              <span class="iconfont icon-comment"></span>
                              <span>1888条评论</span>
                            </div>
                          </el-col>
                          <el-col :span="3">
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
                          <el-col :span="4">
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

export default {
  name: "index",
  data() {
    return {
      questionAttention: false,
      ideaLove: false,
      blogLove: false,
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
      circleUrl:
        require('@/assets/image/me.jpg'),
      squareUrl:
        require('@/assets/image/shy.png'),
      curActive: 1
    }
  },
  methods: {
    changeNav(index) {
      this.curActive = index;
    }
  },
  components: {
    Plus, Key, CirclePlus, Promotion, AlarmClock, UserFilled
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
    width: 80%;
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
              color: #8590a6;
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

      .hot-topic {
        .header {
          .iconfont.icon-hot {
            color: #ff0000;
            font-size: 20px;
          }
        }

        ::v-deep .el-card__body {
          padding: 10px !important;
        }

        .hot-card {
          margin: 20px 0;

          .hot-body {
            .hot-body-item {
              cursor: pointer;
            }
          }
        }
      }

      .nav {
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

          .tag-panel{
            .el-tag{
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
            color: #8590a6;
          }

          .collect {
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            color: #8590a6;

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
  }
}
</style>
