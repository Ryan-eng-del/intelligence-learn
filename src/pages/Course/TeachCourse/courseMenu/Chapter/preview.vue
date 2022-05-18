<template>
  <n-button @click="handleDelete">删除 此 课件</n-button>
  <n-button>打开编辑模式</n-button>
  <iframe :src="src" class="iframe" frameborder="0"></iframe>
</template>

<script>
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    function handleDelete() {
      const path = router.currentRoute.value.fullPath.split("/preview/");
      router.push({
        path: `${path[0]}/editor/${path[1]}`
      });
    }
    return {
      handleDelete,
      src: "https://ocw.mit.edu/courses/res-ll-005-mathematics-of-big-data-and-machine-learning-january-iap-2020/401f741bad396cbf0fcf9ae7b79e1029_MITRES_LL_005IAP20_Supplemental_Ses01.pdf"
    };
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
