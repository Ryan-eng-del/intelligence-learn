/* Vue */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/* Vue */
/* UI */
import ElementPlus from "element-plus";
import registerGolbal from "@/global";
/* UI */
createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(registerGolbal)
  .mount("#app");
