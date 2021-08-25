<template>
  <el-affix position="top">
    <div class="header">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="left" @click="goHome()">
            <span class="zhi">栀</span>
            <span class="xiao">晓</span>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="center">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-row>
                  <el-col :span="6">
                    <div class="header-title-item" :class="{active: $route.path == '/home'}"><span
                      @click="goto({path:'/', name:'Home'})">首页</span></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="header-title-item" :class="{active: $route.path == '/category'}"><span
                      @click="goto({path:'/category', name:'Category'})">分类</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="header-title-item" :class="{active: $route.path == '/tag'}"><span
                      @click="goto({path:'/tag', name:'Tag'})">标签</span></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="header-title-item" :class="{active: $route.path == '/question'}"><span
                      @click="goto({path:'/question', name:'Question'})">我来回答</span>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="14">
                <el-row :gutter="20">
                  <el-col :span="18">
                    <el-input v-model="keyword" ref="searchInput" placeholder="输入您想搜索的关键字..." clearable size="large"
                              @keydown.enter="searchParent">
                      <template #suffix>
                        <el-icon class="el-input__icon">
                          <Search/>
                        </el-icon>
                      </template>
                    </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="success" size="large" class="sub-question-btn" @click="searchParent">找一找
                    </el-button>
                    <SearchResult @loadPage="loadPage" :result-visible="searchResultVisible" @closed="closeSearchResult"
                                  :result-data="articleData"></SearchResult>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="right">
            <el-popover v-if="getToken"
                        placement="bottom"
                        :width="150"
                        trigger="click"
                        center
                        popper-class="popover-panel"
            >
              <template #default>
                <div class="avatar-menu">
                  <el-row>
                    <el-col>
                      <div class="avatar-item">
                        <el-link :underline="false" class="avatar-link"
                                 @click="goto({path: '/personal' , name: 'Personal'})"><i
                          class="iconfont icon-personal-data"></i>个人资料
                        </el-link>
                      </div>
                    </el-col>
                    <el-col v-if="getAuth.indexOf('sys:menu') != -1">
                      <div class="avatar-item">
                        <el-link :underline="false" @click="goto({path: '/admin'})"><i
                          class="iconfont icon-back-manage"></i>后台管理
                        </el-link>
                      </div>
                    </el-col>
                    <el-col>
                      <div class="avatar-item">
                        <el-link :underline="false" @click="logout"><i
                          class="iconfont icon-exit"></i>退出
                        </el-link>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>

              <template #reference>
                <el-avatar class="avatar" :src="getUser.avatarUrl" :size="45"></el-avatar>
              </template>
            </el-popover>
            <div class="login-btn" v-else>
              <span class="login" @click="openLogin('login')">登录</span>
              <span class="vertical">|</span>
              <span class="register" @click="openLogin('register')">注册</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <Login :dialog-visible="showLogin" :login-type="loginType" @dialogClosed="dialogClosed"
             @changeLoginStatus="openLogin"/>
    </div>
  </el-affix>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import Login from "@/components/base/Login";
import {mapActions, mapGetters} from 'vuex'
import SearchResult from "@/components/base/SearchResult";
import {searchByKeyword} from "@/api/article";
import {searchPrefix} from '@/config'

export default {
  name: "Header",
  data() {
    return {
      searchFlag: false,
      fullscreenLoading: false,
      searchPrefix: searchPrefix,
      searchResultVisible: false,
      keyword: '',
      showLogin: false,
      circleUrl:
        require('@/assets/image/me.jpg'),
      loginType: 'login',
      infoText: '玩命加载中...',
      page: {
        current: 1,
        size: 5,
        total: 0,
        pages: 1
      },
      articleData: {
        records: []
      }
    }
  },
  components: {
    SearchResult,
    Login,
    Search
  },
  computed: {
    ...mapGetters(['getToken', 'getUser', 'getAuth'])
  },
  created() {
  },
  watch: {
    keyword(newVal, oldVal) {
      this.page = {
        current: 1,
        size: 5,
        total: 0,
        pages: 1
      };
      this.articleData = {}
    }
  },
  methods: {
    ...mapActions(['clearInfo']),
    searchParent() {
      if (this.searchFlag) {
        return;
      }
      this.searchFlag = true;
      this.search();
    },
    loadPage(data) {
      // console.log(data);
      this.page.current = ++data.current;
      this.search();
    },
    closeSearchResult(flag) {
      if (flag) {
        this.searchResultVisible = !flag;
        this.page = {
          current: 1,
          size: 5,
          total: 0,
          pages: 1
        };
        this.articleData = {}
        this.searchFlag = false;
      }
    },
    search() {
      if (this.keyword.trim() == '') {
        this.searchFlag = false;
        return this.$notify.error({
          title: '提示',
          message: '搜索关键字不能为空',
          type: 'error'
        })
      }
      searchByKeyword(this.searchPrefix + this.keyword, this.page.current, this.page.size).then(res => {
        if (res.code == 200) {
          this.page.current = res.data.current;
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
          const temp = this.articleData.records || []
          this.articleData = res.data
          temp.push(...this.articleData.records);
          this.articleData.records = temp;
        }
      })
      this.searchResultVisible = true;
    },
    logout() {
      const loading = this.$loading({
        lock: true,
        text: '正在清理缓存中，请稍等...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.clearInfo(true).then(() => {
        setTimeout(() => {
          if (this.$route.meta.requireAuth) {
            this.$router.push({
              path: '/home',
              name: 'Home'
            })
          }
          loading.close();
        }, 2000)
      })

    },
    dialogClosed(closed) {
      this.showLogin = !closed;
    },
    goto(route) {
      // console.log(123)
      this.$router.push(route);
    },
    goHome() {
      this.$router.push({
        path: '/home',
        name: 'Home'
      })
    },
    openLogin(loginType) {
      this.showLogin = true
      this.loginType = loginType
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  overflow: hidden;
  margin-bottom: 15px;
  background-color: white;
  box-shadow: 0px 0px 20px -13px $theme-color;

  .left {
    height: $header-height;
    text-align: right;
    width: 100%;
    line-height: $header-height;

    span {
      font-weight: bolder;
      cursor: pointer;
    }

    .zhi {
      font-family: 华文隶书;
      color: $header-zhi-color;
      font-size: $header-zhi-size;
    }

    .xiao {
      font-family: 方正舒体;
      color: $header-xiao-color;
      font-size: $header-xiao-size;
    }

  }

  .center {
    width: 100%;
    height: $header-height;
    line-height: $header-height;

    .header-title-item {
      width: 100%;
      cursor: pointer;
      text-align: center;

      span {
        font-size: 20px;

        &:hover {
          color: $theme-color;
          transition: color .3s;
        }
      }

      &.active {
        color: $theme-color;
        transition: color .3s;
      }
    }

    .el-input__icon {
      cursor: pointer;
    }

    .sub-question-btn {
      background-color: $theme-color;
    }
  }

  .right {
    padding-left: 30px;
    width: 100%;
    height: $header-height;
    line-height: $header-height;

    .avatar {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .login-btn {
      span {
        cursor: pointer;
      }

      .login, .register {
        &:hover {
          color: $theme-color;
          transition: color .3s;
        }
      }

      .vertical {
        display: inline-block;
        padding: 0 10px;
      }
    }
  }
}
</style>
