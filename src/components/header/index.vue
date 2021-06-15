<template>
  <el-affix position="top">
    <div class="header">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="left">
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
                    <div class="header-title-item"><span>首页</span></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="header-title-item"><span>分类</span></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="header-title-item"><span>标签</span></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="header-title-item"><span>我来回答</span></div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="14">
                <el-row :gutter="20">
                  <el-col :span="18">
                    <el-input v-model="keyword" placeholder="输入您想搜索的关键字..." clearable size="large">
                      <template #suffix>
                        <el-icon class="el-input__icon">
                          <Search/>
                        </el-icon>
                      </template>
                    </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="success" size="large" class="sub-question-btn">提出问题</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="right">
            <el-popover
              placement="bottom"
              :width="150"
              trigger="click"
              center
              popper-class="poper-panel"
            >
              <template #default>
                <div class="avatar-menu">
                  <el-row>
                    <el-col>
                      <div class="avatar-item">
                        <el-link :underline="false" class="avatar-link">个人资料</el-link>
                      </div>
                    </el-col>
                    <el-col>
                      <div class="avatar-item">
                        <el-link :underline="false">后台管理</el-link>
                      </div>
                    </el-col>
                    <el-col>
                      <div class="avatar-item">
                        <el-link :underline="false">退出</el-link>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>

              <template #reference>
                <el-avatar class="avatar" :src="circleUrl" :size="45"></el-avatar>
              </template>
            </el-popover>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-affix>
</template>

<script>
import {Search} from '@element-plus/icons-vue'

export default {
  name: "Header",
  data() {
    return {
      keyword: '',
      circleUrl:
        require('@/assets/image/me.jpg'),
    }
  },
  components: {
    Search
  },
  created() {
  },
  methods: {}
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
      }

      :hover {
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
  }
}
</style>
