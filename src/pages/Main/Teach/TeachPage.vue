<template>
  <n-layout
    class="teacher-container"
    content-style="padding: 30px 30px 30px 30px;"
  >
    <!--标题-->
    <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px"
      >桃李满天下</n-h2
    >
    <n-divider />
    <!--操作区-->
    <div class="operation">
      <!--搜索框-->
      <n-input-group style="width: 260px">
        <n-input style="width: 200px" />
        <n-button type="primary">搜索</n-button>
      </n-input-group>
      <!--新建课程按钮-->
      <n-button
        style="height: 34px; width: 120px"
        size="medium"
        round
        type="primary"
        @click="showCreateCourseFn"
      >
        <template #icon>
          <n-icon>
            <add />
          </n-icon>
        </template>
        新建课程
      </n-button>
      <!--新建课程模态框-->
      <create-course v-model:show="showCreateCourse" :addCourse="addCourse" />
    </div>
    <n-button type="primary" @click="handleClickCourseInfo"
      >所教课程详情测试链接</n-button
    >
    <list :courses="courses" />
  </n-layout>
</template>

<script lang="ts">
import { getRandomInt } from "element-plus/lib/utils";
import { defineComponent, reactive, ref, toRefs } from "vue";
import CreateCourse from "@/components/CreateCourse.vue";
import Add from "@/components/icon/Add.vue";
import { useRouter } from "vue-router";
import list from "./list.vue";
import { courseType } from "@/Type/courseType"; //课程类型的接口

export default defineComponent({
  name: "Teacher",
  components: {
    Add,
    CreateCourse,
    list
  },
  setup() {
    //
    const state = reactive<{ courses: courseType[] }>({
      courses: [
        { id: 1, name: "离散数学", type: "专业必修" },
        { id: 2, name: "java", type: "专业必修" },
        { id: 3, name: "马原", type: "专业选修" }
      ]
    });
    //
    const showCreateCourse = ref(false);
    const router = useRouter();
    // 展示创建课程模态框
    function showCreateCourseFn() {
      showCreateCourse.value = true;
      console.log(showCreateCourse.value);
    }
    function handleClickCourseInfo() {
      router.push({
        path: `/teachinfo/${getRandomInt(999)}/chapter`
      });
    }
    function addCourse(c: courseType) {
      console.log(state.courses);
      state.courses.forEach((c) => {
        c.id += 1;
      });
      state.courses.unshift(c);
    }
    return {
      addCourse,
      ...toRefs(state),
      showCreateCourse,
      showCreateCourseFn,
      handleClickCourseInfo
    };
  }
});
</script>

<style lang="less">
.teacher-container {
  cursor: default;

  .operation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 4px 30px 30px 30px;
    box-sizing: border-box;
    align-items: center;
  }

  .cour-list {
    padding: 0 30px 0 30px;

    .cour-glance {
      margin-bottom: 40px;
    }

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding-top: 40px;

      .title {
        font-size: 20px;
        // font-family: @font-family;
        font-weight: 500;
        transform: translateY(-14px);
      }
    }
  }
}
</style>
