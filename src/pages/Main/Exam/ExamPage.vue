<template>
  <n-layout
    class="Exam-container"
    content-style="padding: 30px 30px 30px 30px;"
  >
    <!--标题-->
    <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px">
      作业考试
    </n-h2>
    <n-divider />
    <!--操作区-->
    <div class="operation">
      <!--搜索框-->
      <n-input-group style="width: 260px">
        <n-input style="width: 200px" />
        <n-button type="primary">搜索</n-button>
      </n-input-group>
      <n-dropdown
        trigger="click"
        :options="dropdown.options"
        @select="dropdown.handleSelect"
      >
        <n-button type="primary">完成状态</n-button>
      </n-dropdown>
    </div>
    <!-- 资源列表 -->
    <div>
      <n-list bordered>
        <n-list-item v-for="item in ResList" :key="item.ResID">
          <template #prefix>
            <h1>
              <n-ellipsis style="max-width: 30px">
                {{ item.subject }}
              </n-ellipsis>
            </h1>
          </template>
          <template #suffix>
            <div style="width: 200px">
              <h1>{{ item.status }}</h1>
            </div>
          </template>
          <n-thing
            :title="item.name"
            :description="item.description"
            @click="entry(item.ResID)"
          ></n-thing>
        </n-list-item>
      </n-list>
    </div>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue";
import { useDialog } from "naive-ui";
import { useRouter } from "vue-router";
import UploadResource from "@/businessComponents/UploadResource.vue";

export default defineComponent({
  name: "exam",
  setup() {
    const router = useRouter();
    const dialog = useDialog();
    const ResList = ref([
      {
        subject: "英语",
        name: "作文",
        status: "未完成",
        description: "截止日期",
        ResID: "2333"
      },
      {
        subject: "数学",
        name: "作业",
        status: "待批阅",
        description: "截止日期",
        ResID: "233"
      },
      {
        subject: "计算机操作系统",
        name: "程序",
        status: "98分",
        description: "截止日期",
        ResID: "23333"
      }
    ]);
    const dropdown = {
      show: ref(false),
      options: [
        {
          label: "未完成",
          key: "UnC"
        },
        {
          label: "待批阅",
          key: "Com"
        },
        {
          label: "已出分",
          key: "Soc"
        },
        {
          label: "已过期",
          key: "Lad"
        }
      ],
      handleSelect(key: string | number) {
        console.log("筛选！", key);
      },
      handleClick() {
        dropdown.show.value = !dropdown.show.value;
      }
    };
    function Upload() {
      dialog.success({
        title: "上传课程资源",
        content: () => h(UploadResource),
        positiveText: "上传",
        onPositiveClick: () => {
          console.log("上传");
        }
      });
    }
    function entry(ResID: any) {
      router.push({
        path: `/exam/${ResID}`
      });
    }
    return {
      ResList,
      Upload,
      dropdown,
      entry
    };
  }
});
</script>

<style lang="less">
.Exam-container {
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
}
</style>
