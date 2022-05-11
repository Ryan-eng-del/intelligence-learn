<template>
  <h1>学习中心</h1>
  <n-button type="primary" @click="handleClickCourseInfo"
    >所学课程详情测试链接</n-button
  >
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function handleClickCourseInfo() {
      router.push({
        path: "/learninfo"
      });
    }
    return {
      handleClickCourseInfo
    };
  }
};
</script>

<style></style>
