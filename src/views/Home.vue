<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import request from "@/server";
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld
  },
  setup() {
    request
      .request({
        url: "/song/detail",
        params: {
          ids: 1
        },
        interceptors: {
          requestInterceptor(config) {
            console.log("某次请求的拦截器");
            return config;
          }
        }
      })
      .then((res) => {
        console.log(res);
      });
  }
});
</script>
