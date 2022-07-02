<template>
  <n-layout
    class="resource-container"
    content-style="padding: 30px 30px 30px 30px;"
  >
    <!--标题-->
    <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px">
      课程资源
    </n-h2>
    <n-divider />
    <!--操作区-->
    <div class="operation">
      <!--搜索框-->
      <n-input-group style="width: 260px">
        <n-input style="width: 200px" />
        <n-button type="primary">搜索</n-button>
      </n-input-group>
      <!--上传资源按钮-->
      <n-button
        style="height: 34px; width: 120px"
        size="medium"
        round
        type="primary"
        @click="Upload"
      >
        <template #icon>
          <n-icon>
            <add />
          </n-icon>
        </template>
        上传资源
      </n-button>
    </div>
    <!-- 资源列表 -->
    <div>
      <n-list bordered>
        <n-list-item v-for="item in ResList" :key="item.ResID">
          <template #prefix>
            <n-icon :src="item.icon">图标</n-icon>
          </template>
          <template #suffix>
            <div :style="Operate.style">
              <n-button @click="Operate.download(item.ResID)" type="success"
                >下载</n-button
              >
              <n-button @click="Operate.alter(item.ResID)">修改</n-button>
              <n-popconfirm @positive-click="Operate.delete(item.ResID)">
                <template #trigger>
                  <n-button type="error">删除</n-button>
                </template>
                确认删除？
              </n-popconfirm>
            </div>
          </template>
          <n-thing :title="item.name" :description="item.description"></n-thing>
        </n-list-item>
      </n-list>
    </div>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue";
import { NInput, useDialog } from "naive-ui";
import UploadResource from "@/businessComponents/UploadResource.vue";
import Add from "@/components/iconComponents/Add.vue";

export default defineComponent({
  name: "chapter",
  components: {
    Add
  },
  setup() {
    const dialog = useDialog();
    const ResList = ref([
      {
        icon: "图标 ",
        name: "文件名PNG",
        description: "上传者没有添加描述",
        ResID: "2333"
      },
      {
        icon: "图标",
        name: "文件NP4",
        description: "上传者没有添加描述",
        ResID: "233"
      },
      {
        icon: "图标",
        name: "文件名VUE",
        description: "上传者没有添加描述",
        ResID: "23333"
      }
    ]);
    const file = ref({ name: "选择的文件", desp: "文件的描述" });
    const Operate = {
      download: (ResID: any) => {
        console.log("下载", ResID);
      },
      alter: (ResID: any) => {
        console.log(ResID);
        dialog.success({
          title: "修改资源信息",
          content: () =>
            h("div", [
              h(NInput, {
                ":value": file.value.name,
                type: "text",
                placeholder: "文件名"
              }),
              h(NInput, {
                ":value": file.value.desp,
                type: "textarea",
                placeholder: "文件简介"
              })
            ]),
          positiveText: "保存",
          onPositiveClick: () => {
            console.log("保存");
            console.log(file.value);
          }
        });
      },
      delete: (ResID: any) => {
        // axios
        const List = ResList.value;
        const toRemove = List.find((e) => e.ResID == ResID);
        List.splice(List.indexOf(toRemove as any), 1);
      },
      style: {
        width: "200px"
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
    return {
      ResList,
      Operate,
      Upload
    };
  }
});
</script>

<style lang="less">
.resource-container {
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
