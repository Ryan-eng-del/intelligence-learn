<template>
  <td style="display: grid; grid-template-columns: 275px 275px 275px 275px">
    <item v-for="course in courses" :key="course.id" :course="course" />
  </td>
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
