<template>
  <div class="send-article">
    <div class="panel">
      <el-row>
        <el-col>
          <div class="article-title " :class="articleForm.type">
            <el-input size="large" v-model.trim="articleForm.title" placeholder="请输入文章标题">
              <template #prepend>
                <el-button type="primary" color="#26bfbf">{{ articleForm.type == 'blog' ? '博客' : '想法' }}标题</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
        <el-col>
          <MdEditor v-model="articleForm.content" class="markdown" @onUploadImg="uploadImg"></MdEditor>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="btn-group" :class="articleForm.type">
            <el-row :gutter="20">
              <el-col :span="articleForm.type == 'blog' ? 12 : 24">
                <el-row>
                  <el-col>
                    <el-select
                      v-model="articleForm.labels"
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
                        :key="item.id"
                        :label="item.labelName"
                        :value="item.labelName"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col>
                    <div class="send-btn">
                      <el-button type="primary" :color="articleForm.type == 'blog' ? '#26bfbf' : '#f4c807'"
                                 @click="subArticle">保存文章
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="articleForm.type == 'blog'">
                <el-upload
                  v-if="!articleForm.firstUrl"
                  :show-file-list="false"
                  class="upload-demo"
                  drag
                  :multiple="false"
                  method="POST"
                  name="file"
                  :on-success="onUploadImgSuccess"
                  :action="uploadApi"
                  :headers="uploadHeaders"
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
                  :limit="1"
                  popper-class="upload-popover"
                  trigger="hover"
                >
                  <div class="upload-again">
                    <el-button type="primary" size="mini" color="#26bfbf" @click="uploadAgain">重新上传？</el-button>
                  </div>
                  <template #reference>
                    <el-image :src="articleForm.firstUrl"></el-image>
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
import {uploadImg} from "@/api/file";
import {uploadUrl, baseApi} from '@/config'
import {mapGetters} from 'vuex'
import {getLabelList} from "@/api/label";
import {saveArticle, getArticleDetail} from "@/api/article";
import {checkLogin} from "@/utils/utils";

export default {
  name: "SendArticle",
  data() {
    return {
      uploadApi: baseApi + uploadUrl,
      articleForm: {
        id: '',
        title: '',
        content: '',
        labels: [],
        type: 'blog',
        firstUrl: ''
      },
      firstImageUrl: '',
      selectTagList: [],
      options: [],
      sanitize: '',
      value: ""
    }
  },
  created() {
    if (!checkLogin()) {
      this.$notify({
        title: '提示',
        message: '请先登录',
        type: 'error',
      })
      this.$router.go(-1);
      return;
    }
    if (this.$route.query.id) {
      this.articleForm.id = this.$route.query.id;
      this.getArticleDetail(this.articleForm.id)
    }
    this.articleForm.type = this.$route.query.type
    this.getLabelOptions()
  },
  computed: {
    ...mapGetters(['getToken']),
    uploadHeaders() {
      return {
        Authorization: this.getToken
      }
    }
  },
  methods: {
    getArticleDetail(id) {
      getArticleDetail(id).then(res => {
        if (res.code == 200) {
          if(!res.data.content){
            res.data.content = ''
          }
          res.data.labels = res.data.labelList.map(temp => temp.labelName);
          this.articleForm = res.data;
        }
      })
    },
    subArticle() {
      if (this.articleForm.title.trim() == '') {
        return this.$notify({
          title: '提示',
          message: '请输入文章标题',
          type: 'error'
        })
      }
      if (this.articleForm.labels.length == 0) {
        return this.$notify({
          title: '提示',
          message: '请至少选择一个标签，没有也可以自己创建哦',
          type: 'error'
        })
      }
      this.articleForm.tags = this.articleForm.labels.join(',')
      saveArticle(this.articleForm).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
        }
      })
    },
    getLabelOptions() {
      if (this.getToken) {
        getLabelList().then(res => {
          console.log(res);
          if (res.code == 200) {
            this.options = res.data;
          }
        })
      }
    },
    uploadAgain() {
      this.articleForm.firstUrl = ''
    },
    onUploadImgSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.articleForm.firstUrl = res.data.url
      }
    },
    async uploadImg(fileList, callback) {
      const result = await Promise.all(
        Array.from(fileList).map(file => {
          console.log(file);
          return new Promise((rev, rej) => {
            const form = new FormData()
            form.append("file", file)
            uploadImg(form).then(res => {
              rev(res)
            }).catch(err => {
              rej(err)
            })
          })
        })
      )
      callback(result.map(item => item.data.url))
    }
  },
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
