<template>
  <div class="content">
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
    <div v-else>
      <h1>暂时不做的富文本编辑器</h1>
      <n-button @click="upload = true">返回</n-button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { defineComponent, ref } from "vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
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
    return {
      complete,
      address,
      upload
    };
  },
  components: {
    ArchiveIcon
  }
});
</script>

<style lang="less" scoped>
.iframe {
  width: 70vw;
  height: 75vh;
  margin: 2vw;
}
.content {
  //怎么居中呢
  align-items: center;
  justify-content: center;
}
</style>
