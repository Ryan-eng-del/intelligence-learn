<template>
  <div>
    <n-upload multiple directory-dnd action="" :max="5">
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>
    <n-input
      v-model:value="value"
      type="text"
      placeholder="修改文件名或保持默认"
    />
    <n-input
      v-model:value="value"
      type="textarea"
      placeholder="简单介绍一下文件吧！"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";

export default defineComponent({
  name: "UploadResource",
  setup() {
    return {};
  },
  components: {
    ArchiveIcon
  }
});
</script>

<style></style>
