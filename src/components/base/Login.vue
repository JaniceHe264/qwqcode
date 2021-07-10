<template>
  <div class="login">
    <div class="panel">
      <el-dialog
        v-model="dialogVisible"
        :lock-scroll="false"
        title="Tips"
        width="35%"
        :before-close="handClose"
        center
      >
        <template #title>
          <div class="logo">
            <span class="zhi">栀</span>
            <span class="xiao">晓</span>
          </div>
          <div class="login-status">
            <div class="login-btn">
              <span class="login" :class="{active: loginType=='login'}" @click="changeLoginStatus('login')">登录</span>
              <span class="vertical">|</span>
              <span class="register" :class="{active: loginType=='register'}"
                    @click="changeLoginStatus('register')">注册</span>
            </div>
          </div>
        </template>
        <div class="login-panel" v-if="loginType=='login'">
          <el-form ref="loginForm" :model="loginForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名">

              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="密码">

              </el-input>
            </el-form-item>
            <el-form-item prop="authCode">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-input v-model="loginForm.authCode" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="6">
                  <div @click="getCaptcha" class="captcha">
                    <el-image
                      style="width: 100%; height: 35px"
                      :src="captchaUrl"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col>
                  <el-button color="#17a788" type="primary" plain @click="subLogin">确认登录</el-button>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="12">
                      <div class="forget-text">
                        <span>忘记密码？</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="to-register-text">
                        <span>没有账号，去注册?</span>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

            </el-form-item>
          </el-form>
        </div>
        <div class="register-panel" v-if="loginType=='register'">
          <el-form ref="registerForm" :model="registerForm">
            <el-form-item prop="username">
              <el-input placeholder="用户名" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="手机号" v-model="registerForm.phone">
                <template #append>
                  <el-button type="primary">
                    <el-icon>
                      <Cellphone/>
                    </el-icon>
                    发送验证码
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="authCode">
              <el-input placeholder="验证码" v-model="registerForm.authCode"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input placeholder="确认密码" v-model="registerForm.repassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col>
                  <el-button class="reg-btn" type="primary" plain color="#17a788">立即注册</el-button>
                </el-col>
                <el-col>
                  <span>已有账号？去登录</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import {Cellphone} from '@element-plus/icons-vue'

import {captcha, login} from '@/api/auth'

export default {
  name: "Login",
  data() {
    return {
      captchaUrl: '',
      loginForm: {
        username: '',
        password: '',
        code: '',
        key: ''
      },
      registerForm: {
        username: '',
        phone: '',
        authCode: '',
        password: '',
        repassword: ''
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    loginType: {
      type: String,
      default: 'login'
    }
  },
  created() {
    // console.log(this.loginType)
    this.getCaptcha()
  },
  methods: {
    subLogin() {
      login().then(res => {
        console.log(res);
      })
    },
    getCaptcha() {
      captcha().then(res => {
        console.log(res);
        this.captchaUrl = res.data.image;
        this.loginForm.key = res.data.key
      })
    },
    changeLoginStatus(status) {
      this.$emit('changeLoginStatus', status)
    },
    handClose(done) {
      // 将子组件的状态发送给父组件 让父组件修改
      this.$emit("dialogClosed", true)
    }
  },
  components: {
    Cellphone
  }
}
</script>

<style scoped lang="scss">
.login {
  .panel {
    box-sizing: border-box;

    .logo {
      height: $header-height;
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

    .login-status {
      .login-btn {
        span {
          cursor: pointer;
        }

        .login, .register {
          &.active {
            color: $theme-color;
          }

          &:hover {
            color: $theme-color;
            transition: color .3s;
          }
        }

        .vertical {
          display: inline-block;
          padding: 0 10px;
          color: $theme-color;
        }
      }
    }

    .login-panel {
      box-sizing: border-box;
      padding: 10px 30px;

      .el-row {
        width: 100%;

        span {
          cursor: pointer;
        }
      }

      .el-button {
        width: 100%;
      }

      .to-register-text {
        text-align: right;
      }

      .captcha {
        .el-image {
          cursor: pointer;
        }
      }


    }

    .register-panel {
      box-sizing: border-box;
      padding: 10px 30px;

      .el-row {
        width: 100%;

        .reg-btn {
          width: 100%;
        }

        span {
          cursor: pointer;
        }
      }
    }
  }
}

</style>
