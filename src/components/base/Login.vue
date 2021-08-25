<!--suppress ALL -->
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
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
              <el-input v-model.trim="loginForm.username" placeholder="用户名">

              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model.trim="loginForm.password" show-password placeholder="密码">
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-input v-model.trim="loginForm.code" placeholder="验证码">
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
                  <el-button color="#17a788" type="primary" plain @click="subLogin('loginForm')">确认登录</el-button>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="12">
                      <div class="forget-text">
                        <!--                        <span>忘记密码？</span>-->
                        <span> </span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="to-register-text" @click="changeLoginStatus('register')">
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
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
            <el-form-item prop="username">
              <el-input placeholder="用户名" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="手机号" v-model="registerForm.phone">
                <template #append>
                  <el-button type="primary" @click="sendCode('registerForm')">
                    <el-icon>
                      <Cellphone/>
                    </el-icon>
                    发送验证码
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input placeholder="验证码" v-model="registerForm.code"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" show-password v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="rpassword">
              <el-input placeholder="确认密码" show-password v-model="registerForm.rpassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col>
                  <el-button class="reg-btn" type="primary" plain color="#17a788" @click="subRegister('registerForm')">
                    立即注册
                  </el-button>
                </el-col>
                <el-col>
                  <span @click="changeLoginStatus('login')">已有账号？去登录</span>
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

import {captcha, login, sendCode, register} from '@/api/auth'
import {mapActions, mapGetters} from "vuex";
import {dateFormat} from "@/utils/utils";

export default {
  name: "Login",
  data() {
    const checkRpassword = (rule, value, callback) => {
      if (value.trim() !== this.registerForm.password) {
        callback(new Error("两次密码不一致"))
      }
      callback()
    }

    return {
      captchaUrl: '',
      loginForm: {
        username: '',
        password: '',
        code: '',
        key: ''
      },
      loginRules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }, {
          max: 30, message: '最多示输入30个字符', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          max: 30, message: '最多输入30个字符', trigger: 'blur'
        }],
        code: [{
          required: true, message: '请输入验证码', trigger: 'blur'
        }, {
          max: 4, message: '验证码最多为4个字符', trigger: 'blur'
        }]
      },
      registerForm: {
        username: '',
        phone: '',
        code: '',
        password: '',
        rpassword: ''
      },
      registerRules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }, {
          max: 30, message: '最多示输入30个字符', trigger: 'blur'
        }],
        phone: [{
          required: true, message: '请输入手机号', trigger: 'blur'
        }, {
          pattern: /^1[3-9][\d]{9}$/, message: '请输入正确的手机号', trigger: 'blur'
        }],
        code: [{
          required: true, message: '请输入验证码', trigger: 'blur'
        }, {
          max: 4, message: '验证码最多为4个字符', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          max: 30, message: '最多输入30个字符', trigger: 'blur'
        }],
        rpassword: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          max: 30, message: '最多输入30个字符', trigger: 'blur'
        }, {
          validator: checkRpassword, trigger: 'blur'
        }],
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
    this.getCaptcha()
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  methods: {
    ...mapActions(['setToken', 'setUser', 'setAuth']),
    subRegister(formName) {
      this.$refs[formName].validate(val => {
        if (val) {
          register(this.registerForm).then(res => {
            if (res.code == 200) {
              this.$notify({
                title: "提示",
                message: res.message,
                type: 'success'
              })
              this.$refs[formName].resetFields()
              this.changeLoginStatus('login')
            }
          })
        }
      })
    },
    sendCode(formName) {
      this.$refs[formName].validateField('username', userErr => {
        if (!userErr) {
          this.$refs[formName].validateField('phone', phoneErr => {
            if (!phoneErr) {
              sendCode(this.registerForm).then(res => {
                if (res.code == 200) {
                  if (!phoneErr) {
                    this.$notify({
                      title: "提示",
                      message: res.message,
                      type: 'success'
                    })
                  }
                }
              })
            }
          })
        }
      })
    },
    subLogin(formName) {
      this.$refs[formName].validate(val => {
        if (val) {
          login(this.loginForm).then(res => {
            if (res.code == 200) {
              this.$notify({
                title: '提示',
                message: '登录成功',
                type: 'success'
              })
              res.data.user.birthday = dateFormat(new Date(res.data.user.birthday), 'yyyy-MM-dd HH:mm:ss')
              const token = res.data.token;
              const user = res.data.user;
              const auth = res.data.auth;
              this.setToken(token);
              this.setUser(user);
              this.setAuth(auth);
              // console.log(this.getToken)
              this.handClose();
            }
          })
        }
      })

    },
    getCaptcha() {
      if (!this.getToken) {
        captcha().then(res => {
          // console.log(res);
          this.captchaUrl = res.data.image;
          this.loginForm.key = res.data.key
        })
      }
    },
    changeLoginStatus(status) {
      this.$emit('changeLoginStatus', status)
    },
    handClose() {
      // 将子组件的状态发送给父组件 让父组件修改
      this.$emit("dialogClosed", true)
    }
  },
  watch: {
    getToken(newVal, oldVal) {
      this.getCaptcha()
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
