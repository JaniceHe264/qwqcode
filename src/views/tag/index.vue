<template>
  <div class="tag">
    <div class="panel">
      <el-row :gutter="30">
        <el-col :span="5">
          <div class="left">
            <div class="header">
              <h4>标签列表</h4>
            </div>
            <div class="tag-name-panel">
              <div class="tag-item" :class="{active: curTag == item.name}" v-for="(item , index) in tagList"
                   :key="index"
                   @click="curTag = item.name">
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="right">
            <el-row>
              <el-col v-for="(item , index) in articleList" :key="index">
                <QuestionItem v-if="item.type == 'question'"/>
                <IdeaItem v-if="item.type == 'idea'"/>
                <BlogItem v-if="item.type == 'blog'" :has-first-pic="item.hasFirstPic"/>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/views/home/item/question/index";
import IdeaItem from "@/views/home/item/idea/index";
import BlogItem from "@/views/home/item/blog/index";

export default {
  name: "Tag",
  data() {
    return {
      curTag: 'blog',
      tagList: [
        {
          name: 'blog'
        }, {
          name: '学习'
        }, {
          name: '生活'
        }, {
          name: '心理'
        }, {
          name: 'java'
        }, {
          name: '学习笔记'
        }
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
    }
  },
  created() {

  },
  methods: {},
  components: {
    QuestionItem, IdeaItem, BlogItem,
  }
}
</script>

<style scoped lang="scss">
.tag {
  .panel {
    width: $panel-width;
    box-sizing: border-box;
    box-shadow: $panel-shadow;
    min-height: 300px;
    padding: 20px;
    margin: auto;

    .left {
      width: 100%;
      min-height: 100px;
      padding: 0 10px;

      .header {
        box-shadow: $panel-shadow;
        box-sizing: border-box;
        padding: 5px;

        h4 {
          padding: 5px;
          margin: 0;
          color: $info-color;
        }
      }

      .tag-name-panel {
        box-sizing: border-box;
        box-shadow: $panel-shadow;

        .tag-item {
          cursor: pointer;
          padding: 10px 0 10px 15px;

          &:hover {
            background-color: $tint-back;
            transition: background-color .5s;
          }

          &.active {
            background-color: $tint-back;
            transition: background-color .5s;
          }

          p {
            margin: 0;
            padding: 0;
            color: $info-color;
          }
        }
      }
    }

    .right {
      box-sizing: border-box;
      width: 100%;
      min-height: 100px;
    }
  }
}
</style>
