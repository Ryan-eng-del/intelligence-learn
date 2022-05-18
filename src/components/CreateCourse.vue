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
    <!-- 有报错但不用管能跑 -->
    <n-form label-width="400" size="medium">
      <!--课程名称-->
      <n-form-item label="课程名称">
        <n-input
          clearable
          placeholder="输入课程名称"
          type="text"
          v-model:value="courseData.name"
        />
      </n-form-item>
      <!--课程类型-->
      <n-form-item label="课程类型">
        <n-auto-complete
          clearable
          placeholder="请输入课程类型"
          type="text"
          v-model:value="courseData.type"
        />
      </n-form-item>
      <n-form-item label="课程封面">
        <img src="../assets/img/newCourse.jpg" alt="" />
      </n-form-item>
      <!--创建课程按钮-->
      <div class="create-button">
        <n-button block type="primary" @click="deliver()">创建课程</n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { courseType } from "@/Type/courseType"; //课程类型的接口
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
    const courseData = ref<courseType>({
      id: 0,
      name: " ",
      type: " "
    });
    const newcourse = {
      id: 0,
      name: " ",
      type: " "
    };
    const deliver = () => {
      newcourse.id = courseData.value.id;
      newcourse.name = courseData.value.name;
      newcourse.type = courseData.value.type;

      props.addCourse(newcourse);
      closeModalFn();
      courseData.value.name = " ";
      courseData.value.type = " ";
    };
    return {
      closeModalFn,
      courseData,
      deliver
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
