<template>
  <n-layout
    class="chapter-container"
    content-style="padding: 30px 30px 30px 30px;"
  >
    <!--标题-->
    <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px"
      >编辑课件</n-h2
    >
    <!--绑定知识点-->
    <div class="operation">
      <!--这层控制tag显示范围 -->
      <div>
        <n-tag
          v-for="i in knowledge.knowledgeList.value"
          :key="i.id"
          type="success"
          closable
          @close="knowledge.handleDelete(i.id)"
          >{{ i.text }}</n-tag
        >
      </div>
      <n-button
        style="height: 34px; width: 120px"
        size="medium"
        round
        type="primary"
        @click="knowledge.handleRelate"
      >
        <template #icon>
          <n-icon><add /></n-icon>
        </template>
        绑定知识点
      </n-button>
    </div>
    <n-divider />
    <!-- 上传界面 -->
    <div v-if="upload">
      <h1>你还没有上传过课件</h1>
      <n-upload multiple directory-dnd :action="address" :on-finish="complete">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0"> 支持MP4,doc,pdf格式 </n-p>
        </n-upload-dragger>
      </n-upload>
      <n-button @click="complete">点击此处预览</n-button>
      <n-button @click="upload = false">打开在线编辑器</n-button>
    </div>
    <!-- 富文本编辑界面 -->
    <div v-else>
      <h1>暂时不做的富文本编辑器</h1>
      <n-button @click="upload = true">返回</n-button>
    </div>
    <!-- 弹出的关联知识点 -->
  </n-layout>
</template>

<script>
import router from "@/router";
import { defineComponent, ref, h } from "vue";
import Add from "@/components/iconComponents/Add.vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { useDialog } from "naive-ui";
import AddKnowledge from "@/businessComponents/AddKnowledge.vue";

export default defineComponent({
  setup() {
    function complete() {
      const path = router.currentRoute.value.fullPath.split("/editor/");
      router.push({
        path: `${path[0]}/preview/${path[1]}`
      });
    }
    const address = "http://unknowed";
    const upload = ref(true);
    const dialog = useDialog();
    const knowledge = {
      // 已经关联的知识点
      knowledgeList: ref([
        { text: "离散数学", id: 2333 },
        { text: "考点", id: 2363 },
        { text: "送分题", id: 2343 }
      ]),
      //全部知识点列表，TODO: 放到store
      dataRef: ref([
        {
          label: "知识点1",
          key: 1,
          children: [
            {
              label: "知识点1-2",
              key: 12
            }
          ]
        },
        {
          label: "知识点3",
          key: 3
        },
        {
          label: "知识点2",
          key: 2
        }
      ]),
      //勾选了的知识点
      preAddList: [],
      CheckedNode() {
        console.log("2333");
      },
      // 打开关联知识点窗口
      handleRelate() {
        dialog.success({
          title: "添加绑定知识点",
          content: () =>
            h(AddKnowledge, {
              exist: knowledge.knowledgeList.value,
              list: knowledge.dataRef.value,
              // 传回来的值
              onSubmit(preAdd) {
                knowledge.preAddList = JSON.parse(JSON.stringify(preAdd));
              }
            }),
          positiveText: "添加",
          onPositiveClick: () => {
            //把label 映射为 text
            knowledge.preAddList.forEach((i) => {
              knowledge.knowledgeList.value.push({ text: i.label, key: i.key });
            });
          }
        });
      },
      handleDelete(id) {
        const ls = knowledge.knowledgeList.value;
        for (let i = 0; i < ls.length; i++) {
          if (ls[i].id == id) {
            ls.splice(i, 1);
            break;
          }
        }
      }
    };
    return {
      complete,
      address,
      upload,
      knowledge
    };
  },
  components: {
    ArchiveIcon,
    Add
  }
});
</script>

<style lang="less" scoped>
.iframe {
  width: 70vw;
  height: 75vh;
  margin: 2vw;
}
</style>
