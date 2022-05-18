<template>
  <div style="margin: 10px">
    <n-card>
      <template #cover>
        <img src="@/assets/img/newCourse.jpg" />
      </template>
      <h1>{{ course?.name }}</h1>
      <h2>{{ course?.type }}</h2>
    </n-card>
  </div>
</template>

<style>
.n-card {
  max-width: 300px;
}
</style>
<script lang="ts">
import { courseType } from "@/Type/courseType";
import { defineComponent } from "vue";
export default defineComponent({
  name: "item",
  props: {
    course: Object as () => courseType //函数返回object类型
  }
});
</script>
