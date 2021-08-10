<template>
  <div class="send-comment">
    <div class="panel">
      <el-dialog
        v-model="dialogVisible"
        :lock-scroll="false"
        :before-close="handleClose"
        width="35%"
      >
        <el-row :gutter="10">
          <el-col :span="2">
            <el-avatar :src="getUser.avatarUrl" shape="square"></el-avatar>
          </el-col>
          <el-col :span="20">
            <div class="textarea-panel">
              <el-input type="textarea" :rows="5" :maxlength="70" :show-word-limit="true" v-model="questionForm.title"
                        placeholder="写下你的问题，准确地描述问题更容易得到解答哦" clearable resize="none"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div class="send-panel" v-show="hasContent">
            <el-row>
              <el-col>
                <el-select
                  v-model="questionForm.tags"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  :reserve-keyword="false"
                  value-key="label"
                  placeholder="至少选择一个标签，或者自己输入"
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
                  <el-checkbox v-model="questionForm.anonymity" label="匿名提问" size="large"></el-checkbox>
                  <el-button type="primary" size="large" @click="saveQuestion">提出问题</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import {getLabelList} from "@/api/label";
import {saveArticle} from "@/api/article";
import {mapGetters} from 'vuex'

export default {
  name: "SendQuestion",
  data() {
    return {
      meUrl: require('@/assets/image/me.jpg'),
      questionForm: {
        type: 'question',
        title: '',
        tags: [],
        anonymity: false
      },
      options: []
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getUser']),
    hasContent() {
      return this.questionForm.title.length > 0
    }
  },
  props: {
    updateData: {
      type: Object,
      default: null
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.updateData) {
      this.questionForm = this.updateData;
    }
    this.getLabelOptions();
  },
  watch: {
    updateData(newVal, oldVal) {
      this.questionForm = newVal;
    },
    dialogVisible(newVal, oldVal) {
      if (newVal) {
        this.getLabelOptions()
      }
    }
  },
  methods: {
    saveQuestion() {
      if (this.getToken) {
        const subForm = JSON.parse(JSON.stringify(this.questionForm));
        if (subForm.tags.length == 0) {
          return this.$notify({
            title: '提示',
            message: '请至少选择一个标签，没有也可以自己创建哦',
            type: 'error'
          })
        }
        subForm.tags = subForm.tags.join(',')
        saveArticle(subForm).then(res => {
          // console.log(res)
          if (res.code == 200) {
            this.$notify({
              title: '提示',
              message: res.message,
              type: 'success'
            })
            this.questionForm = {
              type: 'question',
              title: '',
              tags: [],
              anonymity: false
            }
            this.$emit("saveQuestion", true)
            this.handleClose()
          }
        })
      }
    },
    getLabelOptions() {
      if (this.getToken) {
        getLabelList().then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.options = res.data;
          }
        })
      }
    },
    handleClose() {
      this.$emit('closed', true);
    }
  }
}
</script>

<style scoped lang="scss">
.send-comment {
  .panel {
    ::v-deep .el-dialog__header {
      padding: 0;
    }

    .textarea-panel {
      display: flex;
      align-items: flex-start;
      padding-top: 5px;

      ::v-deep .el-textarea__inner {
        display: block;
        resize: vertical;
        padding: 5px 15px;
        line-height: 1.5;
        box-sizing: border-box;
        width: 100%;
        font-size: 20px;
        font-family: inherit;
        color: var(--el-input-text-color, var(--el-text-color-regular));
        background-color: var(--el-input-bg-color, var(--el-color-white));
        background-image: none;
        border: none;
        border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
        transition: var(--el-transition-border);

      }
    }

    .send-panel {
      .el-col {
        .el-select {
          width: 50%;
        }

        .send-btn {
          display: flex;
          justify-content: space-between;
        }
      }

    }
  }
}
</style>
