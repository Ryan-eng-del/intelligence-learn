import { App } from "vue";
import registerElement from "./register-element";
import naive from "./register-naive";
/* 全局UI组件统一出口 */
export default function registerGlobal(app: App): void {
  app.use(registerElement);
  app.use(naive);
}
