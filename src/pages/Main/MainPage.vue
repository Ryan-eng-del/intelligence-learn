<template>
  <n-layout>
    <n-layout has-sider embedded class="home-container">
      <!--左侧菜单栏-->
      <n-layout-sider
        class="left-sider"
        :width="240"
        :style="menuStyle.sider"
        content-style="padding-bottom: 2px;"
      >
        <div class="profile">
          <n-avatar
            round
            :size="80"
            :style="menuStyle.avatar"
            :src="
              Profile.avatar ? Profile.avatar : require('@/assets/img/icon.png')
            "
            @error="Profile.avatar = ''"
          />
          <div class="nickname" :style="menuStyle.nickName">
            {{ Profile.nickname }}
          </div>
        </div>
        <!--分割线-->
        <div class="divider" />
        <!--菜单选项-->
        <n-menu
          :options="menuOptions"
          v-model:value="menuCurrent"
          @update:value="handleMenuUpdateFn"
        />
      </n-layout-sider>
      <!--右侧-->
      <n-layout class="right-view" :native-scrollbar="false">
        <router-view> </router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const menuCurrent = ref("teach");
    const Profile = {};
    Profile.nickname = "彭于晏";
    Profile.avatar = require("@/assets/img/avatar/pyyPro.jpg");
    const menuStyle = {
      header: {
        height: "60px",
        width: "100vw"
      },
      sider: {
        height: "480px",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)"
      },
      avatar: {
        height: "80px",
        margin: "20px 0 0 0",
        border: "1px solid #ececec",
        backgroundColor: "#fefefe",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)"
      },
      nickName: {
        maxWidth: "160px",
        height: "32px",
        margin: "6px 0 10px 0",
        opacity: 1
      }
    };

    const menuOptions = [
      { label: "消息中心", key: "message" },
      { label: "我学的课", key: "learn" },
      { label: "我教的课", key: "teach" },
      { label: "作业考试", key: "exam" },
      { label: "用户中心", key: "userinfo" }
    ];
    function handleMenuUpdateFn(key) {
      router.push({
        path: `/main/${key}`
      });
    }

    watch(
      () => route.path,
      (value) => {
        if (value.indexOf("/main/message") !== -1)
          menuCurrent.value = "message";
        else if (value.indexOf("/main/learn") !== -1)
          menuCurrent.value = "learn";
        else if (value.indexOf("/main/teach") !== -1)
          menuCurrent.value = "teach";
        else if (value.indexOf("/main/exam") !== -1) menuCurrent.value = "exam";
        else if (value.indexOf("/main/userinfo") !== -1)
          menuCurrent.value = "userinfo";
      },
      { immediate: true }
    );
    return {
      Profile,
      menuStyle,
      menuCurrent,
      menuOptions,
      handleMenuUpdateFn
    };
  }
});
</script>

<style lang="less" scoped>
.header {
  margin: 0 0 10px 0;
  font-size: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}
.home-container {
  background-color: rgb(245, 245, 245);
  min-width: 992px;
  margin: 0 auto 0 auto;
  height: 800px;
  .left-sider {
    margin: 22px 22px 20px 30px;
    border-radius: 10px;
    height: 800px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .nickname {
        color: #333639;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
    .divider {
      width: 100%;
      height: 1px;
      margin-bottom: 2px;
      background-color: #efeff5;
    }
  }
  .right-view {
    margin: 22px 30px 20px 0;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
