<template>
  <div class="login-container">
    <section class="login-body">
      <div class="login-header">登录</div>
      <el-form :model="accountData" status-icon>
        <el-form-item prop="username">
          <div class="login-id">
            <div class="id-title">您的账户</div>
            <el-input type="input" v-model="accountData.username"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="login-password">
            <div class="password-tite">您的密码</div>
            <el-input type="password" v-model="accountData.password"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="login-tips">
            <el-checkbox label="记住我"></el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <n-space>
            <div class="login-submit">
              <el-button type="primary" @click="handleLogin()">登录</el-button>
            </div>
          </n-space>
        </el-form-item>

        <div class="login-footer">
          您还没有账号？
          <span @click="handleRegister">
            马上注册
            <el-icon
              ><promotion style="width: 30px; height: 30px; margin-right: 6px"
            /></el-icon>
          </span>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { Promotion } from "@element-plus/icons-vue";

import LocalCache from "@/util/cache";
export default defineComponent({
  components: {
    Promotion
  },
  setup() {
    const router = useRouter();
    const accountData = reactive({
      username:
        (LocalCache.getCache("userInfo") &&
          LocalCache.getCache("userInfo").username) ||
        "",
      password:
        (LocalCache.getCache("userInfo") && LocalCache.getCache("userInfo")) ||
        ""
    });

    const handleLogin = () => {
      router.push({
        path: "/main"
      });
    };
    return {
      accountData,
      handleLogin
    };
  }
});
</script>

<style lang="less" scope>
.login-body {
  position: relative;
  margin: 0 auto;
  width: 480px;
  height: 450px;
  border-radius: 5px;
  border-top: 2px solid #48dbfb;
  padding: 30px 40px 30px 40px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .login-header {
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    color: #0abde3;
  }
  .login-footer {
    text-align: center;
    font-size: 13px;
    .el-icon {
      font-size: 2em;
      position: relative;
      top: 7px;
      left: 4px;
    }
  }
  .login-id,
  .login-password {
    width: 100%;
  }
  .login-id > :nth-child(1),
  .login-password > :nth-child(1) {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: bold;
  }
  .login-id > .el-input input.el-input__inner,
  .login-password > .el-input input.el-input__inner {
    height: 40px;
  }
  .el-form-item__content div {
    width: 400px;
  }
  .login-submit {
    .el-button--primary {
      width: 100%;
      height: 40px;
      letter-spacing: 8px;
    }
  }
  .login-footer > span {
    color: #0abde3;
    font-size: 15px;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
