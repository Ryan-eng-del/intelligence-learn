<template>
  <tr style="border: 1px solid; flex-direction: row">
    <item v-for="course in courses" :key="course.id" :course="course" />
  </tr>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import item from "./item.vue";
export default defineComponent({
  name: "list",
  components: {
    item
  },
  props: ["courses"]
});
</script>
