<template>
  <div class="app-wrapper">
    <n-loading-bar-provider>
      <Context />
    </n-loading-bar-provider>
  </div>
</template>

<script>
import Context from "./Context.vue";
export default {
  name: "App",
  components: {
    Context
  }
};
</script>
<style lang="less">
body {
  background-color: rgb(245, 245, 245);
}
</style>
