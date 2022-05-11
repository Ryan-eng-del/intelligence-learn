<template>
  <n-message-provider>
    <n-layout
      class="chapter-container"
      content-style="padding: 30px 30px 30px 30px;"
    >
      <!--标题-->
      <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px"
        >编辑章节</n-h2
      >
      <n-divider />
      <!--操作区-->
      <div class="operation">
        <!--搜索框-->
        <n-input-group style="width: 260px">
          <n-input style="width: 200px" />
          <n-button type="primary">搜索</n-button>
        </n-input-group>
        <!--新建课程按钮-->
        <n-button
          style="height: 34px; width: 120px"
          size="medium"
          round
          type="primary"
          @click="showCreateNodeFn"
        >
          <template #icon>
            <n-icon>
              <add />
            </n-icon>
          </template>
          新建总节点
        </n-button>
      </div>
      <!-- 树形选择器 -->
      <n-tree
        :data="data"
        selectable
        default-expand-all
        block-line
        draggable
        :node-props="nodeProps"
        :render-switcher-icon="renderSwitcherIcon"
      ></n-tree>
      <!-- 右键菜单 -->
      <n-dropdown
        trigger="manual"
        placement="bottom-start"
        :show="showDropdown"
        :options="options"
        :x="x"
        :y="y"
        @select="handleSelect"
        @clickoutside="handleClickoutside"
      />
    </n-layout>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue";
import Add from "@/components/icon/Add.vue";
import { TreeOption, NIcon, DropdownOption } from "naive-ui";
import { ChevronForward } from "@vicons/ionicons5";
import { getRandomInt } from "element-plus/lib/utils";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "chapter",
  components: {
    Add
  },
  setup() {
    const data: TreeOption[] = [
      {
        label: "Chapter I",
        key: 1,
        isLeaf: false,
        children: [
          { label: "Chapter I-I", key: 11, isLeaf: false, children: [] },
          { label: "Node I-II", key: 12, isLeaf: true }
        ]
      },
      { label: "Node II", key: 2, isLeaf: true }
    ];
    function showCreateNodeFn() {
      data.push({
        label: "Node New",
        key: getRandomInt(999),
        isLeaf: false,
        children: []
      });
    }
    const showDropdownRef = ref(false);
    const optionsRef = ref<DropdownOption[]>([]);
    const router = useRouter();
    const xRef = ref(0);
    const yRef = ref(0);
    // 点击了选项
    const handleSelect = () => {
      showDropdownRef.value = false;
    };
    // 仅关闭菜单
    const handleClickoutside = () => {
      showDropdownRef.value = false;
    };
    // 节点功能设置
    const nodeProps = ({ option }: { option: TreeOption }) => {
      return {
        style: {
          height: "30px"
        },
        onClick() {
          if (option.children == undefined) {
            router.push({
              path: `/study/courseId/${option.key}`
            });
          }
          console.log("点击了", option.children);
        },
        onContextmenu(e: MouseEvent): void {
          optionsRef.value = [
            { label: "添加内容", key: "new" }, // TODO: 右键叶节点不应该存在此项
            { label: "新建子节点", key: "newNode" },
            { label: "重命名", key: "rename" },
            { label: "删除", key: "delete" }
          ];
          showDropdownRef.value = true;
          xRef.value = e.clientX;
          yRef.value = e.clientY;
          console.log("右键菜单 ", e.clientX, e.clientY);
          e.preventDefault();
        }
      };
    };
    const renderSwitcherIcon = () =>
      h(NIcon, null, { default: () => h(ChevronForward) });
    return {
      data,
      showCreateNodeFn,
      showDropdown: showDropdownRef,
      x: xRef,
      y: yRef,
      options: optionsRef,
      handleSelect,
      handleClickoutside,
      nodeProps,
      renderSwitcherIcon
    };
  }
});
</script>

<style lang="less">
.chapter-container {
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

  .cour-list {
    padding: 0 30px 0 30px;

    .cour-glance {
      margin-bottom: 40px;
    }

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding-top: 40px;

      .title {
        font-size: 20px;
        // font-family: @font-family;
        font-weight: 500;
        transform: translateY(-14px);
      }
    }
  }
}
</style>
