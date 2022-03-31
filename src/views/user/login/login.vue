<template>
  <div class="login-container">
    <section class="login-logo">
      <img src="@/assets/img/icon.png" alt="" />
    </section>
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
          <div class="login-submit">
            <el-button type="primary" @click="handleClick(ruleFromRef)"
              >登录</el-button
            >
          </div>
        </el-form-item>

        <div class="login-footer">
          <div>
            您还没有账号？<a href="javascript:void"
              >马上注册
              <el-icon
                ><promotion
                  style="
                    width: 30px;
                    height: 30px;
                    margin-right: 6px;
                  " /></el-icon
            ></a>
          </div>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Promotion } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { validateUser, validatePassword } from "./config/rule.ts";
export default defineComponent({
  components: {
    Promotion
  },
  setup() {
    const ruleFromRef = ref<FormInstance>();
    const accountData = reactive({ username: "", password: "" });
    const isKeepPassword = ref(false);
    const rules = reactive({
      username: [{ validator: validateUser, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }]
    });
    const handleClick = (formEl: FormInstance) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit");
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
      handleClick
    };
  }
});
</script>

<style lang="less">
.login-container {
  width: 100%;
  height: 100%;
  min-height: 800px;
  position: absolute;
  background: rgb(235, 245, 245);
  .login-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
    margin: 40px auto 30px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80px;
    }
  }
  .login-body {
    position: relative;
    margin: 0 auto;
    width: 480px;
    height: 450px;
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

    .login-submit {
      width: 100%;
      .el-button--primary {
        width: 100%;
        height: 40px;
        letter-spacing: 8px;
      }
    }
  }
}
</style>
