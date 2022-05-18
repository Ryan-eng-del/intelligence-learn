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
        <n-input clearable placeholder="输入课程名称" />
      </n-form-item>
      <!--课程类型-->
      <n-form-item label="课程类型">
        <n-auto-complete clearable placeholder="请输入课程类型" />
      </n-form-item>
      <n-form-item label="课程封面">
        <img src="../assets/img/newCourse.jpg" alt="" />
      </n-form-item>
      <!--创建课程按钮-->
      <div class="create-button">
        <n-button block type="primary">创建课程</n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateCourse",
  props: {
    show: {
      type: Boolean,
      require: true
    }
  },
  setup(props, { emit }) {
    function closeModalFn() {
      emit("update:show", false);
      console.log(props);
    }

    return {
      closeModalFn
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
