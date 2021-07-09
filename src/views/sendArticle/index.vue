<template>
  <div class="send-article">
    <div class="panel">
      <el-row>
        <el-col>
          <div class="article-title " :class="type">
            <el-input size="large" placeholder="请输入文章标题">
              <template #prepend>
                <el-button type="primary" color="#26bfbf">{{ type == 'blog' ? '博客' : '想法' }}标题</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
        <el-col>
          <MdEditor v-model="value" class="markdown"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="btn-group" :class="type">
            <el-row :gutter="20">
              <el-col :span="type == 'blog' ? 12 : 24">
                <el-row>
                  <el-col>
                    <el-select
                      v-model="selectTagList"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      :reserve-keyword="false"
                      value-key="value"
                      placeholder="请至少选择一个文章标签，没有合适的可以创建哦"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col>
                    <div class="send-btn">
                      <el-button type="primary" :color="type == 'blog' ? '#26bfbf' : '#f4c807'">保存文章</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="type == 'blog'">
                <el-upload
                  v-if="!firstImageUrl"
                  :show-file-list="false"
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-icon class="el-icon--upload">
                    <upload-filled/>
                  </el-icon>
                  <div class="el-upload__text">
                    上传一张文章<em>首图</em>?
                  </div>
                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png files with a size less than 500kb
                    </div>
                  </template>
                </el-upload>
                <el-popover
                  v-else
                  placement="top"
                  center
                  :width="80"
                  popper-class="upload-popover"
                  trigger="hover"
                >
                  <div class="upload-again">
                    <el-button type="primary" size="mini" color="#26bfbf">重新上传？</el-button>
                  </div>
                  <template #reference>
                    <el-image :src="firstImageUrl"></el-image>
                  </template>
                </el-popover>

              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {UploadFilled} from '@element-plus/icons-vue'

export default {
  name: "SendArticle",
  data() {
    return {
      firstImageUrl: '',
      selectTagList: [],
      options: [
        {
          value: 'HTML',
          label: 'HTML',
        },
        {
          value: 'CSS',
          label: 'CSS',
        },
        {
          value: 'JavaScript',
          label: 'JavaScript',
        },
      ],
      sanitize: '',
      type: '博客',
      value: `# 一级标题

\`你好\`
哈哈
_d_

> fsdaf aspduf

\`\`\`java
import java.util.Scanner;

public static void main(String[] args){
  Scanner sc = new Scanner(System.in);
  System.out.println(sc.nextInt() + sc.nextInt())
}
\`\`\`

## 二级标题

1. 你好
2. 哈哈哈
3. helloworld`
    }
  },
  created() {
    this.type = this.$route.query.type
  },
  methods: {},
  components: {MdEditor, UploadFilled}
}
</script>

<style scoped lang="scss">
.send-article {
  .panel {
    width: $panel-width;
    min-height: 500px;
    box-sizing: border-box;
    box-shadow: $panel-shadow;
    margin: auto;
    padding: 20px 20px 30px 20px;


    .article-title {
      margin-bottom: 20px;
    }

    .markdown {
      min-height: 600px;
    }

    .btn-group {
      margin: 20px 0;

      .send-btn {
        margin: 20px 0;
        text-align: right;
      }

      .el-select {
        width: 100%;
      }

      .el-image {
        border-radius: 5px;
      }

    }
  }
}

</style>
