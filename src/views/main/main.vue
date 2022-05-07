<template>
  <div><h2>欢迎来到首页！！！</h2></div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
<template>
  <n-layout>
    <n-header :style="menuStyle.header" class="header">
      <div>智能导学系统</div>
    </n-header>
    <n-layout has-sider embedded class="home-container">
      <!--左侧菜单栏-->
      <n-layout-sider class="left-sider" :width="240" :style="menuStyle.sider"
                      content-style="padding-bottom: 2px;">
          <div class="profile">
            <n-avatar round :size="80" :style="menuStyle.avatar"
                      :src="Profile.avatar ? Profile.avatar : require('@/assets/img/icon.png')"
                      @error="Profile.avatar = ''"/>
            <div class="nickname" :style="menuStyle.nickName">
                {{ Profile.nickname }}
            </div>
          </div>
          <!--分割线-->
          <div class="divider"/>
          <!--菜单选项-->
          <n-menu :options="menuOptions" v-model:value="menuCurrent"
                  @update:value="handleMenuUpdateFn"/>
      </n-layout-sider>
      <!--右侧-->
      <n-layout class="right-view" :native-scrollbar="false">
          <router-view > </router-view>
      </n-layout>
    </n-layout>
  </n-layout>

</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    //此页面应该获取到的属性
    let Profile = {};
    Profile.nickname = "用户名字";
    Profile.avatar = require("@/assets/img/icon.png");
    // 菜单栏样式变量
    const menuStyle = {
      header:{
        height: "60px",
        width: "100vw",
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
    // 菜单栏当前选项
    const menuCurrent = ref("home-student");
    // 菜单栏所有选项
    const menuOptions = [
      { label: "消息中心", key: "home-inbox" },
      { label: "我学的课", key: "home-student" },
      { label: "我教的课", key: "home-teacher" },
      { label: "作业考试", key: "home-exam" },
      { label: "用户中心", key: "home-settings" }
    ];
    // 处理菜单栏当前选项更新
    function handleMenuUpdateFn(key) {
      console.log("233");
    }
    // 监听路由路径, 防止地址栏直接输入路由地址时时菜单没有跟着变化
    const route = useRoute();
    watch(
      () => route.path,
      (value) => {
        if (value.indexOf("/home/inbox") !== -1)
          menuCurrent.value = "home-inbox";
        else if (value.indexOf("/home/student") !== -1)
          menuCurrent.value = "home-student";
        else if (value.indexOf("/home/teacher") !== -1)
          menuCurrent.value = "home-teacher";
        else if (value.indexOf("/home/exam") !== -1)
          menuCurrent.value = "home-exam";
        else if (value.indexOf("/home/settings") !== -1)
          menuCurrent.value = "home-settings";
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
  min-width: 992px;
  margin: 0 auto 0 auto;
  background-color: #5ab1f0;
  .left-sider {
    margin: 22px 22px 20px 30px;
    border-radius: 10px;
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
