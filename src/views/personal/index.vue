<template>
  <div class="personal">
    <div class="panel">
      <div class="panel-header" v-infinite-scroll="loadMore">
        <div class="top" :style="{backgroundImage: 'url('+ userInfo.backImg + ')'}">
          <el-upload
            class="upload-demo"
            :action="uploadApi"
            :multiple="false"
            method="POST"
            name="file"
            :on-success="onUploadBackImgSuccess"
            :show-file-list="false"
            :headers="uploadHeaders"
          >
            <el-button size="large" type="primary" plain color="#17a788">上传背景图片</el-button>
          </el-upload>
        </div>
        <div class="bottom">
          <el-row>
            <el-col :span="4">
              <el-upload
                class="upload-demo"
                :action="uploadApi"
                :multiple="false"
                method="POST"
                name="file"
                :on-success="onUploadAvatarImgSuccess"
                :show-file-list="false"
                :headers="uploadHeaders"
              >
                <div class="avatar">
                  <el-avatar :src="userInfo.avatarUrl" shape="square" :size="200"></el-avatar>
                  <div class="hover">
                    <div class="hover-shade"></div>
                    <span class="hover-text">点击上传头像</span>
                  </div>
                </div>
              </el-upload>
            </el-col>
            <el-col :span="18">
              <div class="info-panel">
                <div class="author-info">
                  <h2>孙峻</h2>
                  <span class="info-text" v-if="userInfo.introduction">{{ userInfo.introduction }}</span>
                  <span class="info-text" v-else>这家伙很懒什么都没留下...</span>
                </div>
                <div>
                  <el-button size="large" type="primary" plain color="#17a788" @click="editUserInfo">编辑个人资料</el-button>
                  <el-dialog
                    :lock-scroll="false"
                    v-model="dialogVisible"
                    title="编辑个人资料"
                    width="55%"
                    top="3%"
                    destroy-on-close
                  >
                    <template #default>
                      <div class="user-info-form">
                        <el-form :model="userInfoForm" ref="userInfoForm" label-width="70px" label-position="right"
                                 :rules="rules">
                          <el-form-item label="用户名">
                            <el-input placeholder="用户名不能修改" v-model.trim="userInfoForm.username" readonly></el-input>
                          </el-form-item>
                          <el-form-item label="昵称" prop="nickname">
                            <el-input placeholder="请输入昵称" v-model.trim="userInfoForm.nickname"></el-input>
                          </el-form-item>
                          <el-form-item label="简介" prop="introduction">
                            <el-input placeholder="简单介绍一下自己吧，会显示在个人主页哦~" type="textarea" :rows="3"
                                      v-model.trim="userInfoForm.introduction"></el-input>
                          </el-form-item>
                          <el-form-item label="手机号" prop="phone">
                            <el-input placeholder="请输入手机号" v-model.trim="userInfoForm.phone"></el-input>
                          </el-form-item>
                          <el-form-item label="邮箱" prop="email">
                            <el-input placeholder="请输入邮箱" v-model.trim="userInfoForm.email"></el-input>
                          </el-form-item>
                          <el-form-item label="QQ" prop="qq">
                            <el-input placeholder="请输入QQ号码" v-model.trim="userInfoForm.qq"></el-input>
                          </el-form-item>
                          <el-form-item label="微信" prop="wechat">
                            <el-input placeholder="请输入微信号" v-model.trim="userInfoForm.wechat"></el-input>
                          </el-form-item>
                          <el-form-item label="生日" prop="birthday">
                            <el-date-picker v-model="userInfoForm.birthday" format="YYYY/MM/DD"
                                            @change="getZodiac"
                                            value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%;" type="date"
                                            placeholder="请选择生日"/>
                          </el-form-item>
                          <el-form-item label="性别">
                            <el-select v-model="userInfoForm.sex" placeholder="请选择您的性别" style="width: 100%">
                              <el-option label="男" value="男"></el-option>
                              <el-option label="女" value="女"></el-option>
                              <el-option label="其他" value="其他"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="星座">
                            <el-input placeholder="星座会根据生日自动计算哦" v-model.trim="userInfoForm.constellation"
                                      readonly></el-input>
                          </el-form-item>
                          <el-form-item label="生肖">
                            <el-input placeholder="生肖会根据生日自动计算哦" v-model.trim="userInfoForm.chineseZodiac"
                                      readonly></el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                      <el-dialog
                        v-model="updatePassVisible"
                        top="10%"
                        width="30%"
                        title="修改密码"
                        append-to-body
                        :lock-scroll="false"
                        destroy-on-close
                      >
                        <el-form :model="passForm" :rules="passRules" ref="passForm">
                          <el-form-item prop="oldPassword">
                            <el-input placeholder="请输入原始密码" show-password
                                      v-model.trim="passForm.oldPassword"></el-input>
                          </el-form-item>
                          <el-form-item prop="newPassword">
                            <el-input placeholder="请输入新密码" show-password v-model.trim="passForm.newPassword"></el-input>
                          </el-form-item>
                          <el-form-item prop="confirmPassword">
                            <el-input placeholder="确认密码" show-password
                                      v-model.trim="passForm.confirmPassword"></el-input>
                          </el-form-item>
                        </el-form>
                        <template #footer>
                          <span class="dialog-footer">
                            <el-button @click="updatePassVisible = false">取消</el-button>
                            <el-button type="success" @click="subPassUpdate('passForm')">确认修改</el-button>
                          </span>
                        </template>
                      </el-dialog>
                    </template>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="danger" @click="updatePassVisible = true">修改密码</el-button>
                        <el-button type="primary" @click="subUpdateUserInfo('userInfoForm')"
                        >保存</el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="panel-bottom">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-tabs v-model="activeName" class="demo-tabs" :before-leave="changeTabHandle">
              <el-tab-pane :name="item.value" v-for="(item,index) in userArticleNumGroup"
                           :key="item.id">
                <template #label>
                  <span>{{ item.label }}({{ item.articleNum }})</span>
                </template>
                <template v-for="article in showData.data" :key="article.id">
                  <div v-if="showData.type == 'answer'">
                    <Answer :answer-data="article"/>
                  </div>
                  <ArticleItem v-else
                               @reload="reload"
                               :theme-color="article.type == 'blog' ? '#26bfbf' : article.type == 'idea' ? '#f4c807' : '#0066ff'"
                               :article-info="article"
                               :has-first-pic="article.firstUrl != '' && article.firstUrl != null"/>
                </template>
                <template v-if="!showData.data.length">
                  <el-empty description="没有内容哦~"/>
                </template>
              </el-tab-pane>
              <div class="footer">
                <div>
                  <span class="info-text">{{ infoText }}</span>
                </div>
              </div>
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
import Answer from "@/views/personal/answer/index";
import WritePanel from "@/components/base/WritePanel";
import NavPanel from "@/components/base/NavPanel";
import HotTopic from "@/components/base/HotTopic";
import ArticleItem from '@/views/home/item'

import {getUserArticleNum} from "@/api/user";
import {getFixArticleList} from "@/api/article";
import {updateUserInfo, getDateZodiac, updateUserPass} from "@/api/user";

import {mapGetters, mapActions} from 'vuex'

import {uploadUrl, baseApi} from '@/config'

export default {
  name: "Personal",
  components: {HotTopic, NavPanel, WritePanel, Answer, ArticleItem},
  data() {
    const checkConfirmPass = (rule, value, callback) => {
      if (value.trim() != this.passForm.newPassword.trim()) {
        callback(new Error("两次密码不一致"))
      }
      callback();
    }

    return {
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      userInfoForm: {
        username: '',
        nickname: '',
        introduction: '',
        phone: '',
        email: '',
        qq: '',
        wechat: '',
        birthday: '',
        sex: '男',
        chineseZodiac: '',
        constellation: ''
      },
      updatePassVisible: false,
      dialogVisible: false,
      uploadApi: baseApi + uploadUrl,
      infoText: '玩命加载中...',
      userArticleNumGroup: [],
      activeName: 'answer-num',
      meUrl: require('@/assets/image/me.jpg'),
      backImg: `url(${require('@/assets/image/me.jpg')})`,
      page: {
        current: 1,
        size: 5,
        total: 0,
        pages: 1
      },
      showData: {
        type: 'article',
        data: []
      },
      rules: {
        nickname: [
          {required: false, max: 10, message: '最多输10个字符', trigger: 'blur'}
        ],
        introduction: [
          {required: false, max: 250, message: '最多输入250个字符哦', trigger: 'blur'}
        ],
        phone: [
          {required: false, pattern: /^1[3-9][\d]{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}
        ],
        email: [{
          required: false,
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }],
        qq: [{
          required: false, pattern: /^\d{5,11}$/, message: '请输入正确的QQ号码', trigger: 'blur'
        }],
        wechat: [{
          required: false, pattern: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message: '请输入正确的微信号', trigger: 'blur'
        }],
      },
      passRules: {
        oldPassword: [{
          required: true, message: '请输入原始密码', trigger: 'blur'
        }],
        newPassword: [{
          required: true, min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur'
        }],
        confirmPassword: [{
          required: true, min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur'
        }, {
          validator: checkConfirmPass, trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getUser']),
    userInfo() {
      return this.getUser;
    },
    uploadHeaders() {
      return {
        Authorization: this.getToken
      }
    }
  },
  created() {
    this.getArticleNumGroup()
    // console.log(this.userInfo)
  },
  methods: {
    ...mapActions(['setUser', 'clearInfo']),
    reload(flag) {
      if (flag) {
        this.page.current = 1;
        this.showData.data = [];
        this.getShowData();
      }
    },
    subPassUpdate(formName) {
      this.$refs[formName].validate(flag => {
        if (flag) {
          updateUserPass(this.passForm).then(res => {
            if (res.code == 200) {
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'success'
              })
              this.clearInfo(false);
              this.$router.push({
                path: '/home',
                name: 'Home'
              })
              this.updatePassVisible = false;
              this.dialogVisible = false;
            }
          })
        }
      })
    },
    getZodiac(date) {
      getDateZodiac(date).then(res => {
        if (res.code == 200) {
          this.userInfoForm.chineseZodiac = res.data.chineseZodiac;
          this.userInfoForm.constellation = res.data.constellation;
        }
      })
    },
    subUpdateUserInfo(formName) {
      this.$refs[formName].validate(flag => {
        if (flag) {
          this.userUpdate(this.userInfoForm);
        }
      })
    },
    editUserInfo() {
      this.dialogVisible = true;
      this.userInfoForm = JSON.parse(JSON.stringify(this.getUser))
    },
    userUpdate(user) {
      updateUserInfo(user).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
          this.setUser(res.data)
        }
      })
    },
    onUploadAvatarImgSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.userInfo.avatarUrl = res.data.url
        this.userUpdate(this.userInfo);
      }
    },
    onUploadBackImgSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.userInfo.backImg = res.data.url
        this.userUpdate(this.userInfo);
      }
    },
    loadMore() {
      this.page.current++;
      if (this.page.current > this.page.pages) {
        return;
      }
      this.getShowData();
    },
    getShowData() {
      getFixArticleList({
        type: this.activeName,
        current: this.page.current,
        size: this.page.size
      }).then(res => {
        this.showData.type = this.activeName == 'answer_num' ? 'answer' : 'article';
        this.showData.data.push(...res.data.records);
        this.page.current = res.data.current;
        this.page.size = res.data.size;
        this.page.total = res.data.total;
        this.page.pages = res.data.pages;
        if (this.page.current >= this.page.pages) {
          this.infoText = ''
        }
      })
    },
    changeTabHandle(activeName, oldName) {
      // console.log(123)
      if (activeName != oldName) {
        this.page.current = 1;
        this.showData.data = [];
      }
      this.activeName = activeName;
      this.getShowData();
      return true;
    },
    getArticleNumGroup() {
      getUserArticleNum().then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.userArticleNumGroup = res.data;
          if (res.data.length) {
            if (this.$route.query.active) {
              this.activeName = this.$route.query.active
            } else {
              this.activeName = res.data[0].value
            }
          }
        }
      })
    }
  }
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
        min-height: 200px;
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

          .user-info-form {
            padding: 20px;
          }
        }

      }
    }

    .panel-bottom {
      box-shadow: $panel-shadow;
      margin-top: 20px;
      min-height: 100px;
      padding: 20px;

      .footer {
        text-align: center;

        .info-text {
          color: $info-color;
        }
      }

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
