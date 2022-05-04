
<template>
  <el-container class="wrap">
    <Flex>
      <el-main>
        <!-- 注册 -->
        <Flex
          :class="['register', action == 'register' ? 'flip-over' : 'flip-down']"
          direction="column"
        >
          <div class="text">
            会员注册
          </div>
          <div class="phone-container">
            <el-input
              v-model="register.mobile"
              placeholder="手机号或者账号"
            />
          </div>
          <el-input
            placeholder="设置密码，6-20字符，包括大小写字母和数字"
            v-model="register.password"
            :type="register.showPassword ? 'text': 'password'"
            style="z-index:0;"
          >
            <i
              slot="suffix"
              v-if="register.showPassword"
              @click="register.showPassword = !register.showPassword"
            >
              <SvgIcon
                name="open_eye"
                class="eye"
                :width="16"
                :height="16"
              />
            </i>
            <i
              slot="suffix"
              v-else
              @click="register.showPassword = !register.showPassword"
            >
              <SvgIcon
                name="close_eye"
                class="eye"
                :width="16"
                :height="16"
              />
            </i>
          </el-input>
          <el-input
            placeholder="确认密码"
            v-model="register.confirmPassword"
            :type="register.showConfirmPassword?'text':'password'"
            style="z-index:0;"
          >
            <i
              slot="suffix"
              v-if="register.showConfirmPassword"
              @click="register.showConfirmPassword = !register.showConfirmPassword"
            >
              <SvgIcon
                name="open_eye"
                class="eye"
                :width="16"
                :height="16"
              />
            </i>
            <i
              slot="suffix"
              v-else
              @click="register.showConfirmPassword = !register.showConfirmPassword"
            >
              <SvgIcon
                name="close_eye"
                class="eye"
                :width="16"
                :height="16"
              />
            </i>
          </el-input>
          <el-button
            type="primary"
            class="registerButton"
            :disabled="registerBtnDisabled"
            @click="startRegister"
          >
            立即注册
          </el-button>
          <span>已有账号?<a
            href="javascript:void(0)"
            style="color:#2468f2"
            @click="goLink('login')"
          >立即登录</a></span>
        </Flex>
        <!-- 登录 -->
        <Flex
          :class="['login', action == 'login' ? 'flip-over' : 'flip-down']"
          direction="column"
        >
          <Flex>

            <div
              :class="['text', login.type == 'account' ? 'active' : '']"
              @click="login.type = 'account'"
            >
              账号登录
            </div>
          </Flex>
          <!-- 账号登录 -->
          <div v-show="login.type == 'account'">
            <el-input
              v-model="login.account.user"
              placeholder="用户名邮箱"
            />
            <Flex>
              <el-input
                placeholder="密码"
                v-model="login.account.password"
                :type="login.account.showPassword?'text':'password'"
                style="z-index:0;"
              >
              <i
                slot="suffix"
                v-if="login.account.showPassword"
                @click="login.account.showPassword = !login.account.showPassword"
              >
                <SvgIcon
                  name="open_eye"
                  class="eye"
                  :width="16"
                  :height="16"
                />
              </i>
              <i
                slot="suffix"
                v-else
                @click="login.account.showPassword = !login.account.showPassword"
              >
                <SvgIcon
                  name="close_eye"
                  class="eye"
                  :width="16"
                  :height="16"
                />
              </i>
              </el-input>
            </Flex>
            <Flex justify-content="space-between">
              <el-checkbox
                v-model="login.remember"
                style="text-align:left;"
              >
                记住用户名
              </el-checkbox>
              <a
                href="javascript:void(0)"
                @click="goLink('recharge')"
              >忘记密码</a>
            </Flex>
          </div>
          <el-button
            type="primary"
            class="registerButton"
            @click="startLogin('account')"
            :loading="loginBtnLoading"
          >
            立即登录
          </el-button>
          <span><a
            href="javascript:void(0)"
            @click="goLink('register')"
          >免费注册</a></span>
        </Flex>
        <!-- 重置密码 -->
        <Flex
          :class="['login', action == 'recharge' ? 'flip-over' : 'flip-down']"
          direction="column"
        >
          <div class="text">
            重置密码
          </div>
          <el-input
            v-model="recharge.tel"
            placeholder="注册时填写的手机号"
          />
          <Flex style="z-index:0;">
            <el-input
              placeholder="新密码"
              v-model="recharge.password"
              :type="recharge.showPassword?'text':'password'"
              style="z-index:0;"
            >
            <i
              slot="suffix"
              v-if="recharge.showPassword"
              @click="recharge.showPassword = !recharge.showPassword"
            >
              <SvgIcon
                name="open_eye"
                class="eye"
                :width="16"
                :height="16"
              />
            </i>
            <i
              slot="suffix"
              v-else
              @click="recharge.showPassword = !recharge.showPassword"
            >
              <SvgIcon
                name="close_eye"
                class="eye"
                :width="16"
                :height="16"
              />
            </i>
            </el-input>
          </Flex>
          <el-button
            type="primary"
            class="registerButton"
            @click="modifyPassword"
          >
            确认修改
          </el-button>
          <span><a
            href="javascript:void(0)"
            @click="goLink('login')"
          >返回登录</a></span>
        </Flex>
      </el-main>
    </Flex>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
        action: this.$route.query.type || 'register',
        register: {
          type: 'specialty',
          mobile: '',
          password: '',
          code: '',
          confirmPassword: '',
          checked: false,
          showPassword: false,
          showConfirmPassword: false,
        },
        login: {
          type: 'account',
          mobile: {
            tel: '',
            code: ''
          },
          account: {
            user: '',
            password: '',
          },
          remember: false,
        },
         recharge: {
          tel: '',
          imageCode: '',
          code: '',
          password: '',
          identifyCode: '',
          key: '',
          blob: '',
          ttl: 6000,
          showPassword: false,
        },
        loginBtnLoading: false,
    };
  },
  computed:{
    registerBtnDisabled(){
      return !(this.register.mobile && this.register.password &&this.register.confirmPassword );
    }
  },
  created () {
  
  },
  mounted() {
    
  },
  watch : {
    '$route.query.type': function (value) {
      this.action = value;
    }
  },
  methods: {
      goLink (action) {
        this.$router.push({name: 'Home', query: {type: action}});
      },
      switchTab(type) {
        this.register.type = type;
      },
      randomNum (min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
      },
      startRegister(){
        const data = {
          username: this.register.mobile,
          password: this.register.password
        }
        console.log(data);
        console.log(this.$minApi.register);
        this.$minApi.register(data).then((res) => {
          console.log(data);
        })
        // this.$http('member/signIn')
        //   ({data: data}).then((data) => {
        //     this.$message({
        //       type: 'success',
        //       message: '注册成功，请登录'
        //     })
        //    this.phoneCodeBtnValue = '获取验证码';
        //    this.login.type = 'account';
        //    this.goLink('login')
        //    this.login.mobile.tel = this.register.mobile;
        //    this.login.account.user = this.register.mobile;
        // });
      },
      modifyPassword() {

      }
  },
};
</script>
<style lang="scss" scoped>
.phone-container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 15px;
  .el-input{
    padding-bottom: 0;
  }
  p{
    margin-top: 5px;
    font-size: 12px;
    color: #EB3C3C;
  }
}
.btn-phone-code{
  color: #ccc;
  border: none;
  width: 140px;
  height: 48px;
}
.el-input {
  height: 48px;
  width: 400px;
  border-radius: 4px;
  font-size: 14px;
  padding-bottom: 20px;
  border: none;
}
.el-input ::v-deep .el-input__inner{
  height: 48px;
  border: none;
}
::v-deep .el-input__suffix {
  display: flex;
  margin-top: 15px;
  margin-right: 8px;
  .eye {
    width: 16px !important;
    height: 16px !important;
    cursor: pointer;
  }
}
.wrap {
  height: 100vh;
  > div {
    height: 100%;
  }
  .el-main {
    position: relative;
    background: url("images/right_bg@2x.png") no-repeat;
    background-size: 100% 100%;
    .register {
      top: calc(50% - 200px);
      margin-left: calc(50vw - 200px);
      position: absolute;
      text-align: center;
      /* top: 50%; */
    /* left: 50%; */
    /* transform: translateY(-50%); */
      .text {
        width: 96px;
        height: 24px;
        font-size: 24px;
        color: #333333;
        line-height: 36px;
        margin-bottom: 40px;
      }
      .tab {
        width: 400px;
        height: 48px;
        font-size: 14px;
        background: #ffffff;
        border-radius: 4px;
        margin: 20px 0;
        color:#666;
        position: relative;
        .tabItem {
          width: 191px;
          height: 36px;
          border-radius: 4px;
          text-align: center;
          line-height: 36px;
          cursor: pointer;
          &.active {
              color: #2468f2;
              z-index: 1001;
          }
        }
        .mask {
          background: #e7f0ff;
          top: 6px;
          left: 0;
          width: 191px;
          height: 36px;
          position: absolute;
          line-height: 36px;
          transition: 0.4s;
          &.left {
            transform: translateX(8px);
          }
          &.right {
            transform: translateX(204px);
          }
        }
        .users {
          width: 10px;
        }
      }
      .code {
        width: 250px;
      }
      .registerButton {
        margin-top: 20px;
        width: 400px;
        height: 48px;
        margin-bottom: 20px;
      }
    }
    .login {
      @extend .register;
      text-align: right;
      .text {
        color: #666;
        &.active {
          color: #333;
        }
        &:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
    
