<template>
  <li>
        <n-card hoverable>
        <n-result
        :title="Item.courseName"
        :description="Item.courseType"
    >
        <template #icon>
        <div style="width: 300px">
            <a href="">
                <img src="@/assets/img/newCourse.jpg" />
            </a>
        </div>
        </template>
    </n-result>
        </n-card>
    </li>
</template>

<script lang="ts">
import CourseList from "@/pages/Main/Teach/type";
export default {
    name: "CourseItem",
    props: {
        Item: Object as () => CourseList
    }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.n-card {
  float: left;
  margin-top: 50px;
  margin-left: 55px;
  max-width: 245px;
  height: 300px;
  border: 0.1px solid rgb(231, 228, 228);
  background-color: rgb(251, 248, 248);
}
img {
    width: 100%;
}
</style>
