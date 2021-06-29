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
              <WritePanel/>
            </div>
            <div class="hot-topic">
              <HotTopic/>
            </div>
            <div class="nav">
              <NavPanel/>
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
import WritePanel from '@/components/base/WritePanel'
import NavPanel from "@/components/base/NavPanel";

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
    NavPanel, QuestionItem, IdeaItem, BlogItem, HotTopic, WritePanel,
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
        margin: 20px 0;
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
