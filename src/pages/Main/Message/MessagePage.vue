<template>
  <n-layout
    class="message-container"
    content-style="padding: 30px 30px 30px 30px;"
  >
    <!--标题-->
    <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px">
      消息中心(未完成的页面)
    </n-h2>
    <n-divider />
    <!--操作区-->
    <div class="operation">
      <!--搜索框-->
      <n-input-group style="width: 260px">
        <n-input style="width: 200px" />
        <n-button type="primary">搜索</n-button>
      </n-input-group>
      <!-- 日期筛选 -->
      <n-date-picker v-model:value="range" type="datetimerange" clearable />
      <n-breadcrumb separator=" | ">
        <n-breadcrumb-item @click="Filter('All')">全部</n-breadcrumb-item>
        <n-breadcrumb-item @click="Filter('TODO')">收藏</n-breadcrumb-item>
        <n-breadcrumb-item @click="Filter('Broadcast')">推广</n-breadcrumb-item>
        <n-breadcrumb-item @click="Filter('Course')">课程</n-breadcrumb-item>
        <n-breadcrumb-item @click="Filter('Chat')">私聊</n-breadcrumb-item>
        <n-breadcrumb-item @click="Filter('System')">系统</n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <!-- 消息列表 -->
    <n-collapse>
      <n-collapse-item
        v-for="item in message"
        :key="item.msgID"
        :title="item.title"
        :name="item.msgID"
      >
        <template #header-extra>
          <!-- 操作区域 -->
          <n-button
            v-if="item.Type == 'Course'"
            @click="console.log('跳转到作业界面')"
          >
            去完成
          </n-button>
          <n-button @click="star(item.msgID)">
            {{ item.isTODO ? "取消收藏" : "收藏" }}
          </n-button>
        </template>
        <div>{{ item.content }}</div>
      </n-collapse-item>
    </n-collapse>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "message",
  setup() {
    const range = ref<[number, number]>([1183135260000, Date.now()]);
    const filter = ref("All");
    function Filter(Type: string) {
      console.log(Type);
      filter.value = Type;
    }
    const message = [
      {
        title: "来自 xxx 的邮件信息",
        msgID: 1,
        Type: "Chat",
        content: "在吗？",
        isTODO: false,
        unReaded: true
      },
      {
        title: "xxx 课程发布了作业",
        msgID: 2,
        Type: "Course",
        content: "快去完成吧！",
        isTODO: false,
        unReaded: true
      },
      {
        title: "班级内部广播",
        msgID: 3,
        Type: "Broadcast",
        content: "关于入团信息。。。",
        isTODO: false,
        unReaded: true
      }
    ];
    function star(id: number) {
      console.log(id);
      var item = message.find((item) => item.msgID == id);
      (item as any).isTODO = !item?.isTODO;
    }
    return {
      range,
      Filter,
      message,
      star
    };
  }
});
</script>

<style lang="less">
.message-container {
  cursor: default;

  .operation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 4px 30px 30px 30px;
    box-sizing: border-box;
    align-items: center;
  }
}
</style>
