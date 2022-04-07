<template>
  <div class="login-container">
    <section class="login-body">
      <div class="login-header">登录</div>
      <el-form
        ref="ruleFromRef"
        :rules="rules"
        :model="accountData"
        status-icon
      >
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
            <el-checkbox label="记住我" v-model="isKeepPassword"></el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <n-space>
            <div class="login-submit">
              <el-button type="primary" @click="handleLogin(ruleFromRef)"
                >登录</el-button
              >
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
import { defineComponent, reactive, ref } from "vue";
import { Promotion } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { useLoadingBar } from "naive-ui";
import LocalCache from "@/util/cache";
import { validateUser, validatePassword } from "./config/rule";
import Server from "@/server";
export default defineComponent({
  components: {
    Promotion
  },
  setup() {
    console.log("om in");
    const ruleFromRef = ref<FormInstance>();
    const loadingBar = useLoadingBar();
    const disabledRef = ref(true);
    const accountData = reactive({
      username:
        (LocalCache.getCache("userInfo") &&
          LocalCache.getCache("userInfo").username) ||
        "",
      password:
        (LocalCache.getCache("userInfo") && LocalCache.getCache("userInfo")) ||
        ""
    });
    const isKeepPassword = ref(false);
    const rules = reactive({
      username: [{ validator: validateUser, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }]
    });
    const handleLogin = (formEl: FormInstance) => {
      if (!formEl) return;
      if (isKeepPassword.value) {
        LocalCache.setCache("userInfo", accountData);
      }
      formEl.validate((valid) => {
        if (valid) {
          Server.get({
            url: "/song/detail",
            params: {
              ids: 1
            },
            interceptors: {
              requestInterceptor(config) {
                loadingBar.start();
                disabledRef.value = false;
                return config;
              },
              responseInterceptor(res) {
                setTimeout(() => {
                  loadingBar.finish();
                  disabledRef.value = true;
                }, 1000);
                return res;
              }
            }
          }).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submie");
          return false;
        }
      });
    };
    return {
      accountData,
      isKeepPassword,
      ruleFromRef,
      rules,
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
    width: 100%;
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
