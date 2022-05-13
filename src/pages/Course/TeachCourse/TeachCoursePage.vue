<template>
  <n-layout>
    <n-layout has-sider embedded class="course-container">
      <!--左侧菜单栏-->
      <n-layout-sider
        class="left-sider"
        :width="240"
        :style="menuStyle.sider"
        content-style="padding-bottom: 2px;"
      >
        <div class="courseDetail">
          <n-avatar
            :size="240"
            :style="menuStyle.cover"
            :src="
              Course.cover
                ? Course.cover
                : require('@/assets/img/newCourse.jpg')
            "
            @error="Course.cover = ''"
          />
          <n-button
            text
            class="name"
            :style="menuStyle.name"
            @click="leave.leave"
            @mousemove="leave.showleave"
            @mouseleave="leave.showName"
          >
            {{ showText }}
          </n-button>
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
    const menuCurrent = ref("chapter");
    const Course = {};
    Course.name = "离散数学";
    Course.cover = require("@/assets/img/newCourse.jpg");
    const showText = ref(Course.name);
    //返回按钮
    const leave = {
      leave() {
        router.push({
          path: "/main/teach"
        });
      },
      showleave() {
        menuStyle.name.color = "#17d16b";
        showText.value = "回到首页";
      },
      showName() {
        menuStyle.name.color = "#333639";
        showText.value = Course.name;
      }
    };
    const menuStyle = {
      sider: {
        height: "100vh"
      },
      cover: {
        height: "140px",
        margin: "0",
        border: "1px solid #ececec",
        borderRadius: "10px 10px 0 0",
        backgroundColor: "#fefefe"
      },
      name: {
        maxWidth: "160px",
        height: "32px",
        margin: "6px 0 10px 0",
        opacity: 1
      }
    };

    const menuOptions = [
      { label: "章节", key: "chapter" },
      { label: "资源", key: "resource" },
      { label: "讨论", key: "discuss" },
      { label: "作业考试", key: "courseExam" },
      { label: "知识点", key: "knowledge" }
    ];
    function handleMenuUpdateFn(key) {
      router.push({
        path: `/teachinfo/${router.currentRoute.value.params.courseId}/${key}`
      });
    }

    watch(
      () => route.path,
      (value) => {
        if (value.indexOf(`/teachinfo/1/chapter`) !== -1)
          menuCurrent.value = "chapter";
        else if (value.indexOf("/teachinfo/1/resource") !== -1)
          menuCurrent.value = "resource";
        else if (value.indexOf("/teachinfo/1/discuss") !== -1)
          menuCurrent.value = "discuss";
        else if (value.indexOf("/teachinfo/1/courseExam") !== -1)
          menuCurrent.value = "courseExam";
        else if (value.indexOf("/teachinfo/1/knowledge") !== -1)
          menuCurrent.value = "knowledge";
      },
      { immediate: true }
    );
    return {
      Course,
      showText,
      menuStyle,
      menuCurrent,
      menuOptions,
      handleMenuUpdateFn,
      leave
    };
  }
});
</script>

<style lang="less" scoped>
.course-container {
  background-color: rgb(245, 245, 245);
  min-width: 992px;
  margin: 0 auto 0 auto;
  height: 100vh;
  .left-sider {
    margin: 22px 22px 20px 30px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .courseDetail {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .name {
        color: #333639;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
