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
            :style="menuStyle.name"
            class="name"
            @click="leave.leave"
            @mousemove="leave.showleave"
            @mouseleave="leave.showName"
          >
            {{ showText }}
          </n-button>
        </div>
        <!--分割线-->
        <div class="divider" />
        <!-- 树结构 -->
        <n-tree
          :data="data"
          selectable
          default-expand-all
          block-line
          :node-props="nodeProps"
        ></n-tree>
      </n-layout-sider>
      <!--右侧-->
      <n-layout class="right-view" :native-scrollbar="false">
        <router-view> </router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script>
import { defineComponent, ref, h } from "vue";
import { NIcon } from "naive-ui";
import { ChevronForward } from "@vicons/ionicons5";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const menuCurrent = ref("chapter");
    const Course = {};
    Course.name = "离散数学";
    const showText = ref(Course.name + "[章节]");
    Course.cover = require("@/assets/img/newCourse.jpg");
    const data = [
      {
        label: "Chapter I",
        key: 1,
        isLeaf: false,
        children: [
          { label: "Chapter I-I", key: 11, isLeaf: false, children: [] },
          { label: "Node I-II", key: 12, isLeaf: true }
        ]
      },
      { label: "Node II", key: 2, isLeaf: true }
    ];
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
        width: "320px",
        margin: "6px 0 10px 0",
        opacity: 1
      }
    };
    const router = useRouter();
    const nodeProps = ({ option }) => {
      return {
        style: {
          height: "30px"
        },
        onClick() {
          if (option.children == undefined) {
            router.push({
              path: `/chapter/${router.currentRoute.value.params.courseId}/teach/${option.key}`
            });
          }
          console.log("点击了", option.children);
        }
      };
    };
    //返回按钮
    const leave = {
      leave() {
        router.push({
          path: "/teachinfo/courseid/chapter"
        });
      },
      showleave() {
        menuStyle.name.color = "#17d16b";
        showText.value = "返回课程";
      },
      showName() {
        menuStyle.name.color = "#333639";
        showText.value = Course.name + "[章节]";
      }
    };

    const renderSwitcherIcon = () =>
      h(NIcon, null, { default: () => h(ChevronForward) });
    return {
      data,
      Course,
      showText,
      menuStyle,
      menuCurrent,
      nodeProps,
      renderSwitcherIcon,
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
    height: 100vh;
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
