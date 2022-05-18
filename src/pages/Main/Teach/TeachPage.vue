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
      <create-course 
      v-model:show="showCreateCourse" 
      :addCourse="addCourse" />
    </div>
    <n-button type="primary" @click="handleClickCourseInfo"
      >所教课程详情测试链接</n-button
    >
    </n-layout>
    <!-- 展示生成的课程 -->
    <n-layout>
        <ul>
            <course-item v-for="(courseItem,id) in courses" :key="id" :Item="courseItem"/>
        </ul>
    </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref ,reactive,toRefs} from "vue";
import CreateCourse from "@/businessComponents/CreateCourseModal.vue";
import Add from "@/components/iconComponents/Add.vue";
import { useRouter } from "vue-router";
import { getRandomInt } from "element-plus/lib/utils";
import CourseList from "@/pages/Main/Teach/type";
import CourseItem from "@/components/Teach/CourseItem.vue"
export default defineComponent({
  name: "Teacher",
  components: {
    Add,
    CreateCourse,
    CourseItem
  },
  setup() {
    const showCreateCourse = ref(false);
    const router = useRouter();
    // 展示添加的课程
    const courseList = reactive<{courses : CourseList[]}>({
        courses:[] 
    })
    
    function addCourse(courseItem: any): void {
        courseList.courses.unshift(courseItem);
    }
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
    return {
        showCreateCourse,
        showCreateCourseFn,
        handleClickCourseInfo,
        ...toRefs(courseList),
        addCourse
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
