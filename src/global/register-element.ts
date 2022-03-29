import { App } from "vue";
import "element-plus/theme-chalk/index.css";
import { ElInput, ElButton, ElForm } from "element-plus";
/* 注册全局UI组件 */
const components = [ElInput, ElButton, ElForm];
export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
}
