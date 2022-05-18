<template>
  <n-modal
    :show="show"
    title="新建课程"
    preset="card"
    size="huge"
    style="width: 500px"
    @update:show="closeModalFn"
  >
    <!--课程数据录入表单-->
    <n-form :model="courseData" label-width="400" size="medium">
      <!--课程名称-->
      <n-form-item label="课程名称">
        <n-input clearable placeholder="输入课程名称" v-model:value="courseName" />
      </n-form-item>
      <!--课程类型-->
      <n-form-item label="课程类型">
        <n-auto-complete clearable placeholder="请输入课程类型" v-model:value="courseType"/>
      </n-form-item>
      <n-form-item label="课程封面">
        <img src="../assets/img/newCourse.jpg" alt="" />
      </n-form-item>
      <!--创建课程按钮-->
      <div class="create-button">
        <n-button block type="primary" @click="createCourse">创建课程</n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";

export default defineComponent({
  name: "CreateCourse",
  props: {
    show: {
      type: Boolean,
      require: true
    },
    addCourse: {
      type: Function,
      required: true
    }
  },
  setup(props, { emit }) {
    function closeModalFn() {
      emit("update:show", false);
      console.log(props);
    }

    const courseName = ref("");
    const courseType = ref("");

    //获取用户输入的课程信息
    function createCourse() {
      const cName = courseName.value;
      const cType = courseType.value;
      // const cCover     封面
      if (!cName.trim() && !cType.trim()) return;
      //有数据
      const courseItem = {
        id: 222,
        teacherName: "彭于晏", //获取当前用户的姓名
        courseName: cName,
        courseType: cType,
        courseCover: "我是图片"
      };
      //调用addCourse
      props.addCourse(courseItem);
      courseName.value = "";
      courseType.value = "";
      // courseCover
      //关闭模态窗
      emit("update:show", false);
    }

    return {
      closeModalFn,
      createCourse,
      courseName,
      courseType
    };
  }
});
</script>

<style scoped lang="less">
.create-button {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 8px auto 10px auto;
}
img {
  width: 200px;
}
</style>
