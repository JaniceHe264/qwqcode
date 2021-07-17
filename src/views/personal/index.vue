<template>
  <div class="personal">
    <div class="panel">
      <div class="panel-header">
        <div class="top" :style="{backgroundImage: backImg}">
          <el-button size="large" type="primary" plain color="#17a788">上传背景图片</el-button>
        </div>
        <div class="bottom">
          <el-row>
            <el-col :span="4">
              <div class="avatar">
                <el-avatar :src="meUrl" shape="square" :size="200"></el-avatar>
                <div class="hover">
                  <div class="hover-shade"></div>
                  <span class="hover-text">点击上传头像</span>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="info-panel">
                <div class="author-info">
                  <h2>孙峻</h2>
                  <span class="info-text">这家伙很懒什么都没留下...</span>
                </div>
                <div>
                  <el-button size="large" type="primary" plain color="#17a788">编辑个人资料</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="panel-bottom">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="回答" :name="item.name" v-for="(item,index) in data" :key="index">
                <template #label>
                  <span>{{ item.label }}({{ item.num }})</span>
                </template>
                <template v-for="article in item.articleList" :key="article.id">
                  <Answer v-if="article.type == 'answer'"/>
                  <QuestionItem v-if="article.type == 'question'"/>
                  <BlogItem v-if="article.type == 'blog'"/>
                  <IdeaItem v-if="article.type == 'idea'"/>
                </template>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="6">
            <div class="write">
              <WritePanel/>
            </div>
            <div class="hot-topic">
              <HotTopic/>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/views/home/item/question/index";
import BlogItem from "@/views/home/item/index";
import IdeaItem from "@/views/home/item/idea/index";
import Answer from "@/views/personal/answer/index";
import WritePanel from "@/components/base/WritePanel";
import NavPanel from "@/components/base/NavPanel";
import HotTopic from "@/components/base/HotTopic";

export default {
  name: "Personal",
  components: {HotTopic, NavPanel, WritePanel, Answer, IdeaItem, BlogItem, QuestionItem,},
  data() {
    return {
      activeName: 'answer',
      meUrl: require('@/assets/image/me.jpg'),
      backImg: `url(${require('@/assets/image/me.jpg')})`,
      data: [
        {
          label: '回答',
          name: 'answer',
          num: 6,
          articleList: [
            {
              id: 1,
              type: 'answer'
            }, {
              id: 2,
              type: 'answer'
            }, {
              id: 3,
              type: 'answer'
            }
          ]
        },
        {
          label: '关注问题',
          name: 'attentionQuestion',
          num: 6,
          articleList: [
            {
              id: 1,
              type: 'question'
            }, {
              id: 2,
              type: 'question'
            }, {
              id: 3,
              type: 'question'
            }
          ]
        }, {
          label: '提问',
          name: 'question',
          num: 6,
          articleList: [
            {
              id: 1,
              type: 'question'
            }, {
              id: 2,
              type: 'question'
            }, {
              id: 3,
              type: 'question'
            }
          ]
        }, {
          label: '博客',
          name: 'blog',
          num: 6,
          articleList: [
            {
              id: 1,
              type: 'blog'
            }, {
              id: 2,
              type: 'blog'
            }, {
              id: 3,
              type: 'blog'
            }
          ]
        }, {
          label: '想法',
          name: 'idea',
          num: 6,
          articleList: [
            {
              id: 1,
              type: 'idea'
            }, {
              id: 2,
              type: 'idea'
            }, {
              id: 3,
              type: 'idea'
            }
          ]
        }, {
          label: '收藏',
          name: 'collect',
          num: 6,
          articleList: [
            {
              id: 1,
              type: 'idea'
            }, {
              id: 2,
              type: 'question'
            }, {
              id: 3,
              type: 'blog'
            }
          ]
        }, {
          label: '浏览足迹',
          name: 'footprint',
          num: 6,
          articleList: [
            {
              id: 1,
              type: 'idea'
            }, {
              id: 2,
              type: 'question'
            }, {
              id: 3,
              type: 'blog'
            }
          ]
        }
      ]
    }
  },
  created() {

  },
  methods: {}
}
</script>

<style scoped lang="scss">
.personal {
  .panel {
    box-sizing: border-box;
    width: $panel-width;
    min-height: 300px;
    margin: auto;

    .panel-header {
      width: 100%;
      min-height: 100px;
      box-shadow: $panel-shadow;

      .top {
        display: flex;
        align-items: flex-start;
        height: 200px;
        padding: 30px;
        box-sizing: border-box;
        justify-content: flex-end;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .el-button {
          opacity: .5;
        }
      }

      .bottom {
        padding: 10px 40px 50px 40px;

        .avatar {
          position: absolute;
          transform: translateY(-50%);
          z-index: 5;
          cursor: pointer;
          overflow: hidden;
          animation: hideIndex 0.3s;
          -moz-animation: hideIndex 0.3s; /* Firefox */
          -webkit-animation: hideIndex 0.3s; /* Safari and Chrome */
          -o-animation: hideIndex 0.3s; /* Opera */

          .hover {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: all .6s;
            top: 0;
            z-index: -10;

            .hover-shade {
              overflow: hidden;
              border-radius: 5px;
              position: absolute;
              width: 100%;
              height: 98%;

              &:hover {
                background: black;
                transition: background-color .3s;
                opacity: .3;
              }
            }

            .hover-text {
              color: white;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }

          &:hover {
            .hover {
              z-index: 10;
            }
          }
        }

        .info-panel {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .author-info {

          }
        }

      }
    }

    .panel-bottom {
      box-shadow: $panel-shadow;
      margin-top: 20px;
      min-height: 100px;
      padding: 20px;

      ::v-deep .el-tabs__item.is-active {
        color: $theme-color;
      }

      ::v-deep .el-tabs__active-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: $theme-color;
        z-index: 1;
        transition: width var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier), transform var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
        list-style: none;
      }

      ::v-deep .el-tabs__item {
        &:hover {
          color: $theme-color;
        }
      }

      .hot-topic {
        margin-top: 20px;
      }
    }

  }
}
</style>
