<template>
  <div style="margin: 40px">
    <div class="head">
      <Rheader />
    </div>
    <h6 style="padding-top: 20px; color: dimgrey">全部文件</h6>
    <div>
      <Rlist />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Rheader from "./resourceComponent/Rheader.vue";
import Rlist from "./resourceComponent/Rlist.vue";
export default defineComponent({
  name: "resouse",
  components: {
    Rheader,
    Rlist
  }
});
</script>
<style scoped>
.head {
}
</style>
